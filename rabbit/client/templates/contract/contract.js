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

Template.rabbit_addOffice.onRendered(function () {

    $('#addOffice').hide();
    $('#addBranch').hide();

    Meteor.subscribe('rabbit_office');
    let data = Rabbit.Collection.Office.findOne({contractId: this.data._id});

    debugger;
    if (data == null || undefined) {
        $('#addOffice').show();
        $('#addBranch').hide();
    } else {
        $('#addOffice').hide();
        $('#addBranch').show();
    }
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
    'click #addBranch'(){
        FlowRouter.go('rabbit.office', {
            contractId: this._id
        })
    },
    'click .js-show': function (e, t) {
        alertify.contractShow(fa("eye", "Contract"), renderTemplate(showTpl, this));
    },
    'click .showCustomerDetail' (){
        alert('hi');
        alertify.contractShow(fa("eye", "Contract"), renderTemplate(showTpl));

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

});
insertTpl.onRendered(function () {
    configOnRender();
});

insertTpl.helpers({
    customerId(){
        console.log(FlowRouter.getParam('customerId'));
        return FlowRouter.getParam('customerId');
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
