/**
 * Created by ratanak on 11/19/15.
 */
/**
 * Declare template
 */
var indexTpl = Template.rabbit_office,
    insertTpl = Template.rabbit_officeInsert,
    updateTpl = Template.rabbit_officeUpdate,
    showTpl = Template.rabbit_officeShow;

//locationAddOnTpl = Template.rabbit_locationAddOnOffice;


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
    createNewAlertify(["office"], {size: 'lg'});
    createNewAlertify(["officeShow"]);
    //createNewAlertify(["locationAddon"], {transition: 'zoom', size: 'lg'});
});

indexTpl.events({
    'click .js-insert': function (e, t) {

        alertify.office(fa("plus", "Office"), renderTemplate(insertTpl));

    },
    'click .js-update': function (e, t) {
        alertify.office(fa("pencil", "Office"), renderTemplate(updateTpl, this));
        debugger;
    },
    'click .js-remove': function (e, t) {
        var self = this;

        alertify.confirm(
            fa("remove", "Office"),
            "Are you sure to delete [" + self._id + "]?",
            function () {
                Rabbit.Collection.Office.remove(self._id, function (error) {
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
        alertify.officeShow(fa("eye", "Office"), renderTemplate(showTpl, this));

    },
    'click .maintenanceAction': function () {
        FlowRouter.go('rabbit.maintenance', {
            customerId: this._contract.customerId, contractId: this.contractId, officeId: this._id
        })

    }

    //'dblclick tbody > tr': function (event) {
    //    var dataTable = $(event.target)
    //        .closest('table')
    //        .DataTable();
    //    var rowData = dataTable.row(event.currentTarget)
    //        .data();
    //
    //    FlowRouter.go('rabbit.order', {officeId: rowData._id});
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
    //auto selected on office selected"HeadOffice"
    let office = Rabbit.Collection.Office.findOne();
    if (office == null || undefined) {
        $('.type').val("HO");
        $('.type').change()
    }
});
insertTpl.helpers({
    contractId(){
        return FlowRouter.getParam('contractId');
        console.log(FlowRouter.getParam('contractId'));
        debugger;
    },
    productId(){
        Meteor.subscribe('rabbit_product');
        let contractId = FlowRouter.getParam('contractId');
        let productId = Rabbit.Collection.Contract.findOne({_id: contractId}).productId;

        return productId;
    }
});
insertTpl.events({
    'change .type'(e, t) {
        let type = $(e.currentTarget).val();
        var contractId = FlowRouter.getParam('contractId');
        var contract = Rabbit.Collection.Contract.findOne({_id: contractId});
        //let types = Rabbit.List.getProduct(type);
        if (type == 'HO') {
            $('[name=price]').val(contract._product.basePrice[0].headOffice);
        } else if (type == "BO") {
            $('[name=price]').val(contract._product.basePrice[0].branch);
        } else {
            $('[name=price]').val("");
        }
        //$('[name=headBasePrice]').val(product.basePrice[0].headOffice);
        //$('[name=headMaintainPrice]').val(product.maintenancePrice[0].headOffice);
        //$('[name=totalPrice]').val(product.maintenancePrice[0].headOffice + product.basePrice[0].headOffice);
    }
});
/**
 * Update
 */
updateTpl.onCreated(function () {
    this.subscribe('rabbit_office', this.data._id);
});

updateTpl.onRendered(function () {
    configOnRender();
});
//
//updateTpl.helpers({
//    data: function () {
//        var data = Rabbit.Collection.Office.findOne(this._id);
//        return data;
//    }
//});
//
///**
// * Show
// */
//showTpl.onCreated(function () {
//    this.subscribe('rabbit_office', this.data._id);
//});
//
//showTpl.helpers({
//    data: function () {
//        var data = Rabbit.Collection.Office.findOne(this._id);
//        return data;
//
//    }
//});

/**
 * Hook
 */
AutoForm.hooks({
    // Office
    rabbit_officeInsert: {
        before: {

            insert: function (doc) {
                debugger;
                var prefix = Session.get('currentBranch') + '-';
                debugger;
                doc._id = idGenerator.genWithPrefix(Rabbit.Collection.Office, prefix, 6);
                debugger;

                doc.branchId = Session.get('currentBranch');
                debugger;
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
    rabbit_officeUpdate: {
        onSuccess: function (formType, result) {
            alertify.office().close();
            alertify.success('Success');
        },
        onError: function (formType, error) {
            alertify.error(error.message);
        }
    }
});