/**
 * Created by ratanak on 11/19/15.
 */
/**
 * Declare template
 */
var indexTpl = Template.rabbit_saleBranchOffice,
    insertTpl = Template.rabbit_saleBranchOfficeInsert,
    updateTpl = Template.rabbit_saleBranchOfficeUpdate,
    showTpl = Template.rabbit_saleBranchOfficeShow;

//locationAddOnTpl = Template.rabbit_locationAddOnSaleBranchOffice;


/**
 * Index
 */
indexTpl.onCreated(function () {
    // SEO
    SEO.set({
        title: 'Sale Branch Office',
        description: 'Description for this page'
    });

    // Create new  alertify
    createNewAlertify(["saleBranchOffice"], {size: 'lg'});
    createNewAlertify(["saleBranchOfficeShow"]);
    //createNewAlertify(["locationAddon"], {transition: 'zoom', size: 'lg'});
});

indexTpl.events({
    'click .js-insert': function (e, t) {
        alertify.saleBranchOffice(fa("plus", "SaleBranchOffice"), renderTemplate(insertTpl));
    },
    'click .js-update': function (e, t) {
        alertify.saleBranchOffice(fa("pencil", "SaleBranchOffice"), renderTemplate(updateTpl, this));
    },
    'click .js-remove': function (e, t) {
        var self = this;

        alertify.confirm(
            fa("remove", "SaleBranchOffice"),
            "Are you sure to delete [" + self._id + "]?",
            function () {
                Rabbit.Collection.SaleBranchOffice.remove(self._id, function (error) {
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
        alertify.saleBranchOfficeShow(fa("eye", "SaleBranchOffice"), renderTemplate(showTpl, this));
    }


    //'dblclick tbody > tr': function (event) {
    //    var dataTable = $(event.target)
    //        .closest('table')
    //        .DataTable();
    //    var rowData = dataTable.row(event.currentTarget)
    //        .data();
    //
    //    FlowRouter.go('rabbit.order', {saleBranchOfficeId: rowData._id});
    //}
});

indexTpl.helpers({
    selector: function () {
        let id = FlowRouter.getParam('saleHeadOfficeId');
        //console.log(id);
        return {saleHeadOfficeId:id}
    }

});

/*Insert*/
insertTpl.helpers({
    saleHeadOfficeId(){
        return FlowRouter.getParam('saleHeadOfficeId');
    }
});

/**
 * Update
 */
updateTpl.onCreated(function () {
    this.subscribe('rabbit_saleBranchOffice', this.data._id);
});

updateTpl.onRendered(function () {
    configOnRender();
});

updateTpl.helpers({
    data: function () {
        var data = Rabbit.Collection.SaleBranchOffice.findOne(this._id);
        return data;
    }
});

/**
 * Show
 */
showTpl.onCreated(function () {
    this.subscribe('rabbit_saleBranchOffice', this.data._id);
});

showTpl.helpers({
    data: function () {
        var data = Rabbit.Collection.SaleBranchOffice.findOne(this._id);
        return data;

    }
});

/**
 * Hook
 */
AutoForm.hooks({
    // SaleBranchOffice
    rabbit_saleBranchOfficeInsert: {
        before: {
            insert: function (doc) {
                var prefix = Session.get('currentBranch') + '-';
                doc._id = idGenerator.genWithPrefix(Rabbit.Collection.SaleBranchOffice, prefix, 6);
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
    rabbit_saleBranchOfficeUpdate: {
        onSuccess: function (formType, result) {
            alertify.saleBranchOffice().close();
            alertify.success('Success');
        },
        onError: function (formType, error) {
            alertify.error(error.message);
        }
    }
});