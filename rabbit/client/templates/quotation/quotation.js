/**
 * Declare template
 */
var indexTpl = Template.rabbit_quotation,
    insertTpl = Template.rabbit_quotationInsert,
    updateTpl = Template.rabbit_quotationUpdate,
    showTpl = Template.rabbit_quotationShow;

//locationAddOnTpl = Template.rabbit_locationAddOnQuotation;
/**
 * Index
 */
indexTpl.onCreated(function () {
    // SEO
    SEO.set({
        title: 'Quotation',
        description: 'Description for this page'
    });

    // Create new  alertify
    createNewAlertify(["quotation"], {size: 'lg'});
    createNewAlertify(["quotationShow"]);
    createNewAlertify(["locationAddon"], {transition: 'zoom', size: 'lg'});
});
indexTpl.helpers({
    selector: function () {
        let id = FlowRouter.getParam('customerId');
        //return FlowRouter.getParam('customerId');
        return {customerId: id}
    },
    customer: function () {
        //let id = FlowRouter.getParam('customerId');
        let customer = Rabbit.Collection.Customer.findOne({_id: '001-000001'});
        return customer

    }
});
indexTpl.events({
    'click .js-insert': function (e, t) {
        alertify.quotation(fa("plus", "Quotation"), renderTemplate(insertTpl));
    },
    'click .js-update': function (e, t) {
        alertify.quotation(fa("pencil", "Quotation"), renderTemplate(updateTpl, this));
    },
    'click .js-remove': function (e, t) {
        var self = this;

        alertify.confirm(
            fa("remove", "Quotation"),
            "Are you sure to delete [" + self._id + "] ?",
            function () {
                Rabbit.Collection.Quotation.remove(self._id, function (error) {
                    if (error) {
                        alertify.error(error.message);
                    } else {
                        alertify.success("Success");
                    }
                });
            },
            null
        );
    },
    'click .js-show': function (e, t) {
        alertify.quotationShow(fa("eye", "Quotation"), renderTemplate(showTpl, this));
    },
    'click .officeAction': function () {
        FlowRouter.go('rabbit.office', {
            customerId: this.customerId, quotationId: this._id

        });
    }
});

/**
 * Insert
 */
insertTpl.onCreated(function () {


    Meteor.subscribe('rabbit_customer');
});
insertTpl.onRendered(function () {
    Meteor.typeahead.inject();
    Meteor.setTimeout(function () {
        $('#basePriceHeadOffice').attr('disabled', "disabled");
        $('#basePriceBranch').attr('disabled', "disabled");
        $('#MaintenaceHeadOffice').attr('disabled', "disabled");
        $('#MaintenaceBranch').attr('disabled', "disabled");
        $('#monthlyFeeHeadOffice').attr('disabled', "disabled");
        $('#monthlyFeeBranch').attr('disabled', "disabled");
        $('.productId').attr('disabled', "disabled");
        $('.installationFee').attr('disabled', "disabled");
        $('.trainingFee').attr('disabled', "disabled");
        configOnRender();
    }, 100);
});
insertTpl.helpers({
    quotationData(){
        debugger;
        return {
            quotationDate: moment(ReactiveMethod.call("currentDate"), 'YYYY-MM-DD').format('YYYY-MM-DD'),
            customerId: Rabbit.Collection.Customer.findOne({_id: '001-000001'})._id,
            contractorId: Rabbit.Collection.Contractor.findOne({_id: '001-01'})._id
        }

    },
    search: function (query, sync, callback) {
        Meteor.call('searchCustomer', query, {}, function (err, res) {
            if (err) {
                console.log(err);
                return;
            }
            callback(res);
        });
    },
    selected: function (event, suggestion, dataSetName) {
        // event - the jQuery event object
        // suggestion - the suggestion object
        // datasetName - the name of the dataset the suggestion belongs to
        // TODO your event handler here
        var id = suggestion._id;
        var selector = {_id: id};
        var data = getValidatedValues();
        if (data.valid) {
            checkBeforeAddOrUpdate(selector, data);
        } else {
            alertify.warning(data.message);
        }
        $('#product-barcode').focus();
    },
});
insertTpl.events({
    'click .customerAddon': function () {
        alertify.quotationShow(fa("plus", "Customer"), renderTemplate(Template.rabbit_customerInsert)).maximize()
    },
    'change .productId': function (e, t) {
        let productId = $(e.currentTarget).val();
        let type = $('.type').val();

        let product = Rabbit.Collection.Product.findOne({_id: productId});
        if (type == 'fullyFee') {
            if (product) {
                $('#basePriceHeadOffice').val(product.basePrice[0].headOffice);
                $('#basePriceBranch').val(product.basePrice[0].branch);
                $('#MaintenaceHeadOffice').val(product.maintenancePrice[0].headOffice);
                $('#MaintenaceBranch').val(product.maintenancePrice[0].branch);
                $('#monthlyFeeHeadOffice').val('');
                $('#monthlyFeeBranch').val('');
            } else if (productId == "") {
                $('#basePriceHeadOffice').val("");
                $('#basePriceBranch').val("");
                $('#MaintenaceHeadOffice').val("");
                $('#MaintenaceBranch').val("");
                $('#monthlyFeeHeadOffice').val('');
                $('#monthlyFeeBranch').val('');
            }
        } else if (type == "monthlyFee") {
            if (product) {
                $('#monthlyFeeHeadOffice').val(product.monthlyFee[0].headOffice);
                $('#monthlyFeeBranch').val(product.monthlyFee[0].branch);
                $('.trainingFee').val(product.trainingFee);
                $('.installationFee').val(product.installationFee);
                $('#basePriceHeadOffice').val("");
                $('#basePriceBranch').val("");
                $('#MaintenaceHeadOffice').val("");
                $('#MaintenaceBranch').val("");
            } else if (productId == "") {
                $('#basePriceHeadOffice').val("");
                $('#basePriceBranch').val("");
                $('#MaintenaceHeadOffice').val("");
                $('#MaintenaceBranch').val("");
                $('#monthlyFeeHeadOffice').val('');
                $('#monthlyFeeBranch').val('');
                $('.installation').val('');
                $('.trainingFee').val('');
            }
        }
    },
    'keypress #basePriceHeadOffice,#basePriceBranch,#MaintenaceHeadOffice,#MaintenaceBranch,#monthlyFeeHeadOffice,#monthlyFeeBranch,.trainingFee,.installationFee': function (evt) {
        var charCode = (evt.which) ? evt.which : evt.keyCode;
        if ($(evt.currentTarget).val().indexOf('.') != -1) {
            if (charCode == 46) {
                return false;
            }
        }
        return !(charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57));
    },
    "change .type": function (e, t) {
        let type = $('.type').val()
        if (type == 'fullyFee') {
            $('#basePriceHeadOffice').val("");
            $('#basePriceBranch').val("");
            $('#MaintenaceHeadOffice').val("");
            $('#MaintenaceBranch').val("");
            $('#monthlyFeeHeadOffice').val('');
            $('#monthlyFeeBranch').val('');
            $('.installationFee').val('');
            $('.trainingFee').val('');
            $('#basePriceHeadOffice').removeAttr('disabled', "disabled");
            $('#basePriceBranch').removeAttr('disabled', "disabled");
            $('#MaintenaceHeadOffice').removeAttr('disabled', "disabled");
            $('#MaintenaceBranch').removeAttr('disabled', "disabled");
            $('#monthlyFeeHeadOffice').attr('disabled', "disabled");
            $('#monthlyFeeBranch').attr('disabled', "disabled");
            $('.installationFee').attr('disabled', "disabled");
            $('.trainingFee').attr('disabled', "disabled");
            $('.productId').removeAttr('disabled', "disabled");
        } else if (type == "monthlyFee") {
            $('#basePriceHeadOffice').val("");
            $('#basePriceBranch').val("");
            $('#MaintenaceHeadOffice').val("");
            $('#MaintenaceBranch').val("");
            $('#monthlyFeeHeadOffice').val('');
            $('#monthlyFeeBranch').val('');
            $('.installationFee').val('');
            $('.trainingFee').val('');
            $('#basePriceHeadOffice').attr('disabled', "disabled");
            $('#basePriceBranch').attr('disabled', "disabled");
            $('#MaintenaceHeadOffice').attr('disabled', "disabled");
            $('#MaintenaceBranch').attr('disabled', "disabled");
            $('#monthlyFeeHeadOffice').removeAttr('disabled', "disabled");
            $('#monthlyFeeBranch').removeAttr('disabled', "disabled");
            $('.trainingFee').removeAttr('disabled', "disabled");
            $('.installationFee').removeAttr('disabled', "disabled");
            $('.productId').removeAttr('disabled', "disabled");
        } else {
            $('#basePriceHeadOffice').val("");
            $('#basePriceBranch').val("");
            $('#MaintenaceHeadOffice').val("");
            $('#MaintenaceBranch').val("");
            $('#monthlyFeeHeadOffice').val('');
            $('#monthlyFeeBranch').val('');
            $('.installationFee').val('');
            $('.trainingFee').val('');
            $('#basePriceHeadOffice').attr('disabled', "disabled");
            $('#basePriceBranch').attr('disabled', "disabled");
            $('#MaintenaceHeadOffice').attr('disabled', "disabled");
            $('#MaintenaceBranch').attr('disabled', "disabled");
            $('#monthlyFeeHeadOffice').attr('disabled', "disabled");
            $('#monthlyFeeBranch').attr('disabled', "disabled");
            $('.productId').attr('disabled', "disabled");
            $('.installationFee').attr('disabled', "disabled");
            $('.trainingFee').attr('disabled', "disabled");
        }
    }
});

/**
 * Update
 */
//updateTpl.onCreated(function () {
//    this.subscribe('rabbit_quotation', this.data._id);
//});

updateTpl.onRendered(function () {
    Meteor.setTimeout(function () {
        $('#basePriceHeadOffice').attr('disabled', "disabled");
        $('#basePriceBranch').attr('disabled', "disabled");
        $('#MaintenaceHeadOffice').attr('disabled', "disabled");
        $('#MaintenaceBranch').attr('disabled', "disabled");
        $('#monthlyFeeHeadOffice').attr('disabled', "disabled");
        $('#monthlyFeeBranch').attr('disabled', "disabled");
        $('.productId').attr('disabled', "disabled");
        $('.trainingFee').attr('disabled', "disabled");
        $('.installationFee').attr('disabled', "disabled");
        configOnRender();
    }, 100);
});

updateTpl.events({
    'click .customerAddon': function () {
        alertify.quotationShow(fa("plus", "Customer"), renderTemplate(Template.rabbit_customerInsert)).maximize()
    },
    'change .productId': function (e, t) {
        let productId = $(e.currentTarget).val();
        let type = $('.type').val();

        let product = Rabbit.Collection.Product.findOne({_id: productId});
        if (type == 'fullyFee') {
            if (product) {
                $('#basePriceHeadOffice').val(product.basePrice[0].headOffice);
                $('#basePriceBranch').val(product.basePrice[0].branch);
                $('#MaintenaceHeadOffice').val(product.maintenancePrice[0].headOffice);
                $('#MaintenaceBranch').val(product.maintenancePrice[0].branch);
                $('#monthlyFeeHeadOffice').val('');
                $('#monthlyFeeBranch').val('');
            } else if (productId == "") {
                $('#basePriceHeadOffice').val("");
                $('#basePriceBranch').val("");
                $('#MaintenaceHeadOffice').val("");
                $('#MaintenaceBranch').val("");
                $('#monthlyFeeHeadOffice').val('');
                $('#monthlyFeeBranch').val('');
            }
        } else if (type == "monthlyFee") {
            if (product) {
                $('#monthlyFeeHeadOffice').val(product.monthlyFee[0].headOffice);
                $('#monthlyFeeBranch').val(product.monthlyFee[0].branch);
                $('.trainingFee').val(product.trainingFee);
                $('.installationFee').val(product.installationFee);
                $('#basePriceHeadOffice').val("");
                $('#basePriceBranch').val("");
                $('#MaintenaceHeadOffice').val("");
                $('#MaintenaceBranch').val("");
            } else if (productId == "") {
                $('#basePriceHeadOffice').val("");
                $('#basePriceBranch').val("");
                $('#MaintenaceHeadOffice').val("");
                $('#MaintenaceBranch').val("");
                $('#monthlyFeeHeadOffice').val('');
                $('#monthlyFeeBranch').val('');
                $('.installation').val('');
                $('.trainingFee').val('');
            }
        }
    },
    'keypress #basePriceHeadOffice,#basePriceBranch,#MaintenaceHeadOffice,#MaintenaceBranch,#monthlyFeeHeadOffice,#monthlyFeeBranch,.trainingFee,.installationFee': function (evt) {
        var charCode = (evt.which) ? evt.which : evt.keyCode;
        if ($(evt.currentTarget).val().indexOf('.') != -1) {
            if (charCode == 46) {
                return false;
            }
        }
        return !(charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57));
    },
    "change .type": function (e, t) {
        let type = $('.type').val()
        if (type == 'fullyFee') {
            $('#basePriceHeadOffice').val("");
            $('#basePriceBranch').val("");
            $('#MaintenaceHeadOffice').val("");
            $('#MaintenaceBranch').val("");
            $('#monthlyFeeHeadOffice').val('');
            $('#monthlyFeeBranch').val('');
            $('.installationFee').val('');
            $('.trainingFee').val('');
            $('#basePriceHeadOffice').removeAttr('disabled', "disabled");
            $('#basePriceBranch').removeAttr('disabled', "disabled");
            $('#MaintenaceHeadOffice').removeAttr('disabled', "disabled");
            $('#MaintenaceBranch').removeAttr('disabled', "disabled");
            $('#monthlyFeeHeadOffice').attr('disabled', "disabled");
            $('#monthlyFeeBranch').attr('disabled', "disabled");
            $('.installationFee').attr('disabled', "disabled");
            $('.trainingFee').attr('disabled', "disabled");
            $('.productId').removeAttr('disabled', "disabled");
        } else if (type == "monthlyFee") {
            $('#basePriceHeadOffice').val("");
            $('#basePriceBranch').val("");
            $('#MaintenaceHeadOffice').val("");
            $('#MaintenaceBranch').val("");
            $('#monthlyFeeHeadOffice').val('');
            $('#monthlyFeeBranch').val('');
            $('.installationFee').val('');
            $('.trainingFee').val('');
            $('#basePriceHeadOffice').attr('disabled', "disabled");
            $('#basePriceBranch').attr('disabled', "disabled");
            $('#MaintenaceHeadOffice').attr('disabled', "disabled");
            $('#MaintenaceBranch').attr('disabled', "disabled");
            $('#monthlyFeeHeadOffice').removeAttr('disabled', "disabled");
            $('#monthlyFeeBranch').removeAttr('disabled', "disabled");
            $('.trainingFee').removeAttr('disabled', "disabled");
            $('.installationFee').removeAttr('disabled', "disabled");
            $('.productId').removeAttr('disabled', "disabled");
        } else {
            $('#basePriceHeadOffice').val("");
            $('#basePriceBranch').val("");
            $('#MaintenaceHeadOffice').val("");
            $('#MaintenaceBranch').val("");
            $('#monthlyFeeHeadOffice').val('');
            $('#monthlyFeeBranch').val('');
            $('.installationFee').val('');
            $('.trainingFee').val('');
            $('#basePriceHeadOffice').attr('disabled', "disabled");
            $('#basePriceBranch').attr('disabled', "disabled");
            $('#MaintenaceHeadOffice').attr('disabled', "disabled");
            $('#MaintenaceBranch').attr('disabled', "disabled");
            $('#monthlyFeeHeadOffice').attr('disabled', "disabled");
            $('#monthlyFeeBranch').attr('disabled', "disabled");
            $('.productId').attr('disabled', "disabled");
            $('.installationFee').attr('disabled', "disabled");
            $('.trainingFee').attr('disabled', "disabled");
        }
    }
});
//updateTpl.helpers({
//    data: function () {
//        var data = Rabbit.Collection.Quotation.findOne(this._id);
//        return data;
//    }
//})
/**
 * Show
 */
showTpl.onCreated(function () {
    this.subscribe('rabbit_quotation', this.data._id);
});
showTpl.helpers({
    data: function () {
        var data = Rabbit.Collection.Quotation.findOne(this._id);
        return data;
    },
    base: function () {
        var str = "<table class='table table-bordered'><thead>" +
            "<tr>" +
            "<th>Head Office</th>" +
            "<th>Branch</th>" +
            "</tr>" +
            "</thead><tbody>";
        this.basePrice.forEach(function (o) {
            str += '<tr>' +
                '<td>' + o.headOffice + '</td>' +
                '<td>' + o.branch + '</td>' +
                '</tr>'
        });
        str += "</tbody></table>";
        return new Spacebars.SafeString(str);
    },
    maintenance: function () {
        var str = "<table class='table table-bordered'><thead>" +
            "<tr>" +
            "<th>Head Office</th>" +
            "<th>Branch</th>" +
            "</tr>" +
            "</thead><tbody>";
        this.maintenancePrice.forEach(function (o) {
            str += '<tr>' +
                '<td>' + o.headOffice + '</td>' +
                '<td>' + o.branch + '</td>' +
                '</tr>'
        });
        str += "</tbody></table>";
        return new Spacebars.SafeString(str);
    },
    monthlyFee: function () {
        var str = "<table class='table table-bordered'><thead>" +
            "<tr>" +
            "<th>Head Office</th>" +
            "<th>Branch</th>" +
            "</tr>" +
            "</thead><tbody>";
        this.monthlyFee.forEach(function (o) {
            str += '<tr>' +
                '<td>' + o.headOffice + '</td>' +
                '<td>' + o.branch + '</td>' +
                '</tr>'
        });
        str += "</tbody></table>";
        return new Spacebars.SafeString(str);
    }
});
/**
 * Hook
 */
AutoForm.hooks({
    // Quotation
    rabbit_quotationInsert: {
        before: {
            insert: function (doc) {
                doc.branchId = Session.get('currentBranch');
                var prefix = doc.branchId + '-';
                Meteor.call('rabbit', prefix);
                return doc;
            }
        },
        onSuccess: function (formType, result) {
            alertify.quotation().close();
            alertify.success('Success');
        },
        onError: function (formType, error) {
            alertify.error(error.message);
        }
    },
    rabbit_quotationUpdate: {
        onSuccess: function (formType, result) {
            alertify.quotation().close();
            alertify.success('Success');
        },
        onError: function (formType, error) {
            alertify.error(error.message);
        }
    }
});
// Config date picker
var configOnRender = function () {
    // date
    var quotationDate = $('[name="quotationDate"]');
    DateTimePicker.date(quotationDate);
};
