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

indexTpl.onRendered(function () {
    //
});

indexTpl.helpers({
    selector: function () {
        return {branchId: Session.get('currentBranch')};
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
    'click #branch'(){
        FlowRouter.go('rabbit.office',{
            contractId: this._id
        })
    },
    'click .js-show': function (e, t) {
        alertify.contractShow(fa("eye", "Contract"), renderTemplate(showTpl, this));
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
insertTpl.onCreated(function (){
    Meteor.subscribe('rabbit_customer');

});
insertTpl.onRendered(function () {
    configOnRender();
});

insertTpl.helpers({

});

insertTpl.events({
    'change .productId'(e, t) {
        let productId = $('.productId').val();
        let product = Rabbit.List.getProduct(productId);
        $('[name=headBasePrice]').val(product.basePrice[0].headOffice);
        $('[name=headMaintainPrice]').val(product.maintenancePrice[0].headOffice);
        $('[name=totalPrice]').val(product.maintenancePrice[0].headOffice + product.basePrice[0].headOffice);
    },
    'keyup [name=headBasePrice]'(){

        $('[name=totalPrice]').val(parseFloat($('[name=headBasePrice]').val()) + parseFloat($('[name=headMaintainPrice]').val()));

    },
    'keyup [name=headMaintainPrice]'(){

        $('[name=totalPrice]').val(parseFloat($('[name=headBasePrice]').val()) + parseFloat($('[name=headMaintainPrice]').val()));

    }
});

/**
 * Update
 */
updateTpl.onCreated(function () {
    this.subscribe('rabbit_contract', this.data._id);
});

updateTpl.onRendered(function () {
    configOnRender();
});

updateTpl.helpers({
    data: function () {
        var data = Rabbit.Collection.Contract.findOne(this._id);
        return data;
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
                var prefix = Session.get('currentBranch') + '-';
                doc._id = idGenerator.genWithPrefix(Rabbit.Collection.Contract, prefix, 6);
                doc.branchId = Session.get('currentBranch');
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
    var saleDate = $('[name="saleDate"]');
    DateTimePicker.date(saleDate);
};
