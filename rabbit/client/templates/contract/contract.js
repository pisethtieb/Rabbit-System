/**
 * Declare template
 */
var indexTpl = Template.rabbit_contract,
    insertTpl = Template.rabbit_contractInsert,
    updateTpl = Template.rabbit_contractUpdate,
    showTpl = Template.rabbit_contractShow;

//locationAddOnTpl = Template.rabbit_locationAddOnContract;


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
    createNewAlertify(["contractShow"]);
    createNewAlertify(["locationAddon"], {transition: 'zoom', size: 'lg'});
});
Template.rabbit_addOffice.events({
    'click #addOffice'() {
        FlowRouter.go('rabbit.office', {
            contractId: this._id
        });
        Meteor.subscribe('rabbit_office');
        alertify.contract(fa("plus", "Office"), renderTemplate(Template.rabbit_officeInsert));
    }
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
        alertify.contract(fa("plus", "Contract"), renderTemplate(insertTpl));
    },
    'click .js-update': function (e, t) {
        alertify.contract(fa("pencil", "Contract"), renderTemplate(updateTpl, this));
    },
    'click .js-remove': function (e, t) {
        var self = this;

        alertify.confirm(
            fa("remove", "Contract"),
            "Are you sure to delete [" + self._id + "]?",
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
    }
    //'dblclick tbody > tr': function (event) {
    //    var dataTable = $(event.target)
    //        .closest('table')
    //        .DataTable();
    //    var rowData = dataTable.row(event.currentTarget)
    //        .data();
    //
    //    FlowRouter.go('rabbit.order', {contractId: rowData._id});
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
//    this.subscribe('rabbit_contract', this.data._id);
//});

updateTpl.onRendered(function () {
    configOnRender();
});

//updateTpl.helpers({
//    data: function () {
//        var data = Rabbit.Collection.Contract.findOne(this._id);
//        return data;
//    }
//})
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
            alertify.success('Success');
        },
        onError: function (formType, error) {
            alertify.error(error.message);
        }
    },
    rabbit_contractUpdate: {
        onSuccess: function (formType, result) {
            alertify.contract().close();
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
