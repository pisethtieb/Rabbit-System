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
        let id = FlowRouter.getParam('customerId');
        let customer = Rabbit.Collection.Customer.findOne({_id: id});
        console.log(customer);
        return customer;

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
            "Are you sure to delete [" + self._id + "]?",
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
    },
    'click .paymentAction': function () {
        FlowRouter.go('rabbit.payment', {
            customerId: this.customerId, quotationId: this._id

        });
    },'click .paymentMaintenanceAction': function () {
        FlowRouter.go('rabbit.paymentMaintenance', {
            customerId: this.customerId, quotationId: this._id

        });
    }
    //'dblclick tbody > tr': function (event) {
    //    var dataTable = $(event.target)
    //        .closest('table')
    //        .DataTable();
    //    var rowData = dataTable.row(event.currentTarget)
    //        .data();
    //
    //    FlowRouter.go('rabbit.order', {quotationId: rowData._id});
    //}
});

/**
 * Insert
 */
insertTpl.onCreated(function () {
    Meteor.subscribe('rabbit_customer');
    $('.testing').hide();
});
insertTpl.onRendered(function () {
    configOnRender();
});
insertTpl.helpers({
    customerId(){
        return FlowRouter.getParam('customerId');
    }
});
insertTpl.events({
    'change .productId': function (e, t) {
        let productId = $(e.currentTarget).val();
        let product = Rabbit.Collection.Product.findOne({_id: productId});
        if (product) {
            $('#basePriceHeadOffice').val(product.basePrice[0].headOffice);
            $('#basePriceBranch').val(product.basePrice[0].branch);
            $('#MaintenaceHeadOffice').val(product.maintenancePrice[0].headOffice);
            $('#MaintenaceBranch').val(product.maintenancePrice[0].branch);
        } else if (productId == "") {
            $('#basePriceHeadOffice').val("");
            $('#basePriceBranch').val("");
            $('#MaintenaceHeadOffice').val("");
            $('#MaintenaceBranch').val("");
        }
        debugger;


    },
    'change .type': function (e, t) {
        let type = $(e.currentTarget).val();
        if (type == 'product') {
            $('.testing').hide()
        } else if (type == "new") {
            $('.testing').show()
        } else if (type == '') {
            $('.testing').hide()
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
    configOnRender();

    var type = $('#type').val();
    if (type == 'product') {
        $('#testing').hide();
    } else {
        $('#testing').show();
    }
});

updateTpl.events({
    'change .productId': function (e, t) {
        let productId = $(e.currentTarget).val();
        let product = Rabbit.Collection.Product.findOne({_id: productId});
        if (product) {
            $('#basePriceHeadOffice').val(product.basePrice[0].headOffice);
            $('#basePriceBranch').val(product.basePrice[0].branch);
            $('#MaintenaceHeadOffice').val(product.maintenancePrice[0].headOffice);
            $('#MaintenaceBranch').val(product.maintenancePrice[0].branch);
        } else if (productId == "") {
            $('#basePriceHeadOffice').val("");
            $('#basePriceBranch').val("");
            $('#MaintenaceHeadOffice').val("");
            $('#MaintenaceBranch').val("");
        }
        debugger;


    },
    'change #type': function (e, t) {
        let type = $(e.currentTarget).val();
        if (type == 'product') {
            $('#testing').hide()
        } else if (type == "new") {
            $('#testing').show()
        } else if (type == '') {
            $('#testing').hide()
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
            "<th>Branch</th>" + +
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
            "<th>Branch</th>" + +
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
