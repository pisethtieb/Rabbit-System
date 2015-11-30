/**
 * Created by ratanak on 11/19/15.
 */
/**
 * Declare template
 */
var indexTpl = Template.rabbit_maintenance,
    insertTpl = Template.rabbit_maintenanceInsert,
    updateTpl = Template.rabbit_maintenanceUpdate,
    showTpl = Template.rabbit_maintenanceShow;

//locationAddOnTpl = Template.rabbit_locationAddOnMaintenance;


/**
 * Index
 */
indexTpl.onCreated(function () {
    // SEO
    SEO.set({
        title: 'Sale Branch Maintenance',
        description: 'Description for this page'
    });

    // Create new  alertify
    createNewAlertify(["maintenance"], {size: 'lg'});
    createNewAlertify(["maintenanceShow"]);
    //createNewAlertify(["locationAddon"], {transition: 'zoom', size: 'lg'});
});

indexTpl.events({
    'click .js-insert': function (e, t) {

        alertify.maintenance(fa("plus", "Maintenance"), renderTemplate(insertTpl));

    },
    'click .js-update': function (e, t) {
        alertify.maintenance(fa("pencil", "Maintenance"), renderTemplate(updateTpl, this));
        console.log(this);
        debugger;
    },
    'click .js-remove': function (e, t) {
        var self = this;

        alertify.confirm(
            fa("remove", "Maintenance"),
            "Are you sure to delete [" + self._id + "]?",
            function () {
                Rabbit.Collection.Maintenance.remove(self._id, function (error) {
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
        alertify.maintenanceShow(fa("eye", "Maintenance"), renderTemplate(showTpl, this));

    },
    'click #addMaitenance'(){
        FlowRouter.go('rabbit.maintenance', {
            maintenanceId: this._id
        })
    }


    //'dblclick tbody > tr': function (event) {
    //    var dataTable = $(event.target)
    //        .closest('table')
    //        .DataTable();
    //    var rowData = dataTable.row(event.currentTarget)
    //        .data();
    //
    //    FlowRouter.go('rabbit.order', {maintenanceId: rowData._id});
    //}
});

indexTpl.helpers({
    selector: function () {
        let id = FlowRouter.getParam('contractId');
        //console.log(id);
        return {contractId: id}
    }

});

/*Insert*/
insertTpl.onRendered(function () {
    //auto selected on maintenance selected"HeadMaintenance"
    let maintenance = Rabbit.Collection.Maintenance.findOne();
    if (maintenance == null || undefined) {
        $('.type').val("HO");
        $('.type').change()
    }
});
insertTpl.helpers({
    //officeId(){
    //    return FlowRouter.getParam('officeId');
    //},
    office(){
        Meteor.subscribe('rabbit_office');
        let officeId = FlowRouter.getParam('officeId');
        let office = Rabbit.Collection.Office.findOne({_id: officeId});

        return office;
    }
});
insertTpl.events({
    'change .type'(e, t) {
        let type = $(e.currentTarget).val();
        var contractId = FlowRouter.getParam('contractId');
        var contract = Rabbit.Collection.Contract.findOne({_id: contractId});
        //let types = Rabbit.List.getProduct(type);
        if (type == 'HO') {
            $('[name=price]').val(contract._product.basePrice[0].headMaintenance);
        } else if (type == "BO") {
            $('[name=price]').val(contract._product.basePrice[0].branch);
        } else {
            $('[name=price]').val("");
        }
        //$('[name=headBasePrice]').val(product.basePrice[0].headMaintenance);
        //$('[name=headMaintainPrice]').val(product.maintenancePrice[0].headMaintenance);
        //$('[name=totalPrice]').val(product.maintenancePrice[0].headMaintenance + product.basePrice[0].headMaintenance);
    }
});
/**
 * Update
 */
updateTpl.onCreated(function () {
    this.subscribe('rabbit_maintenance', this.data._id);
});

updateTpl.onRendered(function () {
    configOnRender();
});

updateTpl.helpers({
    data: function () {
        var data = Rabbit.Collection.Maintenance.findOne(this._id);
        return data;
    }
});

/**
 * Show
 */
showTpl.onCreated(function () {
    this.subscribe('rabbit_maintenance', this.data._id);
});

showTpl.helpers({
    data: function () {
        var data = Rabbit.Collection.Maintenance.findOne(this._id);
        return data;

    }
});

/**
 * Hook
 */
AutoForm.hooks({
    // Maintenance
    rabbit_maintenanceInsert: {
        before: {
            insert: function (doc) {
                var prefix = Session.get('currentBranch') + '-';
                doc._id = idGenerator.genWithPrefix(Rabbit.Collection.Maintenance, prefix, 6);
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
    rabbit_maintenanceUpdate: {
        onSuccess: function (formType, result) {
            alertify.maintenance().close();
            alertify.success('Success');
        },
        onError: function (formType, error) {
            alertify.error(error.message);
        }
    }
});
var configOnRender = function () {
    // date
    var dateRang = $('[name="dateRang"]');
    DateTimePicker.dateRange(dateRang);
};