/**
 * Declare template
 */
var indexTpl = Template.rabbit_contract,
    insertTpl = Template.rabbit_contractInsert,
    updateTpl = Template.rabbit_contractUpdate,
    showTpl = Template.rabbit_contractShow;

/**
 * Index
 */
indexTpl.onCreated(function () {
    // SEO
    SEO.set({
        title: 'Contract',
        description: 'Description for this page'
    });
    // Create new  alertify
    createNewAlertify(["contract"], {size: 'lg'});
    createNewAlertify(["addFile"]);
    createNewAlertify(["contractShow"], {size: 'lg'});
    createNewAlertify(["locationAddon"], {transition: 'zoom', size: 'lg'});
});

indexTpl.helpers({
    selector: function () {
        let id = FlowRouter.getParam('customerId');
        return {customerId: id}
    },
    customer: function () {
        let id = FlowRouter.getParam('customerId');
        let customer = Rabbit.Collection.Customer.findOne({_id: id});
        return customer;

    }
});
indexTpl.events({
    'click .js-insert': function (e, t) {
        alertify.contract(fa("plus", "Contract"), renderTemplate(insertTpl));
    },
    'click .js-update': function (e, t) {
        alertify.contract(fa("pencil", "Contract"), renderTemplate(updateTpl, this));
    },
    'click .js-remove': function (e, t) {
        var self = this;
        let office = Rabbit.Collection.Office.findOne({contractId: self._id});
        let paymentOffice = Rabbit.Collection.PaymentOffice.findOne({contractId: self._id});
        let paymentMaintenance = Rabbit.Collection.PaymentMaintenance.findOne({contractId: self._id});
        if (office != null || paymentOffice != null || paymentMaintenance) {
            alertify.message(self._id + '  is in used !');
            return false;

        }
        alertify.confirm(
            fa("remove", "Contract"),
            "Are you sure to delete [" + self._id + "] ?",
            function () {
                Rabbit.Collection.Contract.remove(self._id, function (error) {
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
        alertify.contractShow(fa("eye", "Contract"), renderTemplate(showTpl, this));
    },
    'click .officeAction': function () {
        FlowRouter.go('rabbit.office', {
            customerId: this.customerId, contractId: this._id

        });
    },
    'click .paymentOfficeAction': function () {
        FlowRouter.go('rabbit.paymentOffice', {
            customerId: this.customerId, contractId: this._id

        });
    },
    'click .paymentMaintenanceAction': function () {
        FlowRouter.go('rabbit.paymentMaintenance', {
            customerId: this.customerId, contractId: this._id

        });
    }, 'click .addFile': function () {
        alertify.addFile(fa("pencil", "Contract"), renderTemplate(Template.rabbit_UpdateAddFile, this)).minimize()
    }
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
    //data on insert
    contractObj(){

        return {
            paymentMethod: [
                {paymentDuration: "- លើកទី១ ត្រូវបង់ប្រាក់ ៤០% ពេលចុះកិច្ចសន្យាដំបូង។"}, {paymentDuration: "- លើកទី២ ត្រូវបង់ប្រាក់ ៣០% ពេលដាក់ឱ្យប្រើប្រាស់សាកល្បង។"}, {paymentDuration: "- លើកទី៣ ត្រូវបង់ប្រាក់ ៣០% ចុងក្រោយនៅពេលដាក់ឱ្យប្រើប្រាស់ជាផ្លូវការ។"}
            ],

            contractDate: moment(ReactiveMethod.call("currentDate"), 'YYYY-MM-DD').format('YYYY-MM-DD'),
            agentId: '001-000001',
            amount: 0,
            contractorId: '001-01',
            type: 'product'

        }
    },
    customerId(){
        return FlowRouter.getParam('customerId');
    }
});
updateTpl.onRendered(function () {
    Meteor.setTimeout(function () {
        configOnRender();
    }, 200);
});
insertTpl.events({
    'change .productId': function (e, t) {
        let productId = $(e.currentTarget).val();
        let product = Rabbit.Collection.Product.findOne({_id: productId});
        if (product) {
            $('#basePriceHeadOffice').val(numeral(product.basePrice[0].headOffice).format('0'));
            $('#basePriceBranch').val(numeral(product.basePrice[0].branch).format('0'));
            $('#MaintenaceHeadOffice').val(numeral(product.maintenancePrice[0].headOffice).format('0'));
            $('#MaintenaceBranch').val(numeral(product.maintenancePrice[0].branch).format('0'));
        } else if (productId == "") {
            $('#basePriceHeadOffice').val("");
            $('#basePriceBranch').val("");
            $('#MaintenaceHeadOffice').val("");
            $('#MaintenaceBranch').val("");
        }
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


    }

});
/**
 * Show
 */
showTpl.onCreated(function () {
    this.subscribe('rabbit_contract', this.data._id);
});
showTpl.helpers({
    data: function () {
        var data = Rabbit.Collection.Contract.findOne(this._id);
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
    paymentMethod(){

        var str = "<table class='table table-bordered'><thead>" +
            "<tr>" +
            "<th>PaymentDuration</th>" +
            "</tr>" +
            "</thead><tbody>";
        this.paymentMethod.forEach(function (o) {
            str += '<tr>' +
                '<td>' + o.paymentDuration + '</td>' +
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
    // Contract
    rabbit_contractInsert: {
        before: {
            insert: function (doc) {
                doc.branchId = Session.get('currentBranch');
                var prefix = doc.branchId + '-';
                Meteor.call('rabbit', prefix);
                return doc;
            }
        },
        onSuccess: function (formType, result) {
            alertify.contract().close();
            alertify.success('Success');
        },
        onError: function (formType, error) {
            alertify.error(error.message);
        }
    },
    rabbit_contractUpdate: {
        onSuccess: function (formType, result) {
            alertify.contract().close();
            alertify.addFile().close();
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
    var contractDate = $('[name="contractDate"]');
    DateTimePicker.date(contractDate);
};
