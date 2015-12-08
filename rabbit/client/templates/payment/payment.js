/**
 * Created by ratanak on 11/19/15.
 */
/**
 * Declare template
 */
var indexTpl = Template.rabbit_payment,
    insertTpl = Template.rabbit_paymentInsert,
    updateTpl = Template.rabbit_paymentUpdate,
    showTpl = Template.rabbit_paymentShow;

//locationAddOnTpl = Template.rabbit_locationAddOnPayment;


/**
 * Index
 */
indexTpl.onCreated(function () {
    // SEO
    SEO.set({
        title: 'Sale Branch Payment',
        description: 'Description for this page'
    });

    // Create new  alertify
    createNewAlertify(["payment"], {size: 'lg'});
    createNewAlertify(["paymentShow"]);
    //createNewAlertify(["locationAddon"], {transition: 'zoom', size: 'lg'});
});

indexTpl.events({
    'click .js-insert': function (e, t) {

        alertify.payment(fa("plus", "Payment"), renderTemplate(insertTpl));

    },
    'click .js-update': function (e, t) {
        alertify.payment(fa("pencil", "Payment"), renderTemplate(updateTpl, this));
        debugger;
    },
    'click .js-remove': function (e, t) {
        var self = this;

        alertify.confirm(
            fa("remove", "Payment"),
            "Are you sure to delete [" + self._id + "]?",
            function () {
                Rabbit.Collection.Payment.remove(self._id, function (error) {
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
        alertify.paymentShow(fa("eye", "Payment"), renderTemplate(showTpl, this));

    },
    'click .maintenanceAction': function () {
        FlowRouter.go('rabbit.maintenance', {
            customerId: this._contract.customerId, contractId: this.contractId, paymentId: this._id
        })
    }

});

indexTpl.helpers({
    selector: function () {
        let id = FlowRouter.getParam('contractId');
        //console.log(id);
        return {contractId: id}
    }
});

/*Insert*/
insertTpl.helpers({
    contractId(){
        return FlowRouter.getParam('contractId');

    },
    customerId(){
        return FlowRouter.getParam('customerId');
    }
});
insertTpl.events({
    'change .type'(e, t) {
        let type = $(e.currentTarget).val();
        var contractId = FlowRouter.getParam('contractId');
        var contract = Rabbit.Collection.Contract.findOne({_id: contractId});
        //let types = Rabbit.List.getProduct(type);
        if (type == 'HO') {
            $('[name=price]').val(contract._product.basePrice[0].headPayment);
        } else if (type == "BO") {
            $('[name=price]').val(contract._product.basePrice[0].branch);
        } else {
            $('[name=price]').val("");
        }
    },
    'change .type': function (e, t) {

        let checkOM = $(e.currentTarget).val();
        Session.set('checkOfficeMaintenance', checkOM);
    },
    'keyup .paidAmount': function (e, t) {

        $('.dueAmount').val($('.price').val() - $('.paidAmount').val());
    },

    'change .officeMaintenance': function (e) {

        let checkOM = Session.get('checkOfficeMaintenance');
        if (checkOM == "office") {
            let officeId = $(e.currentTarget).val();
            var office = Rabbit.Collection.Office.findOne({_id: officeId});
            Rabbit.Collection.Office.find(office._id).forEach(function (obj) {
                var payment = Rabbit.Collection.Payment.findOne({
                        contractId: obj.contractId
                    },
                    {
                        sort: {
                            _id: -1
                        }
                    });
                debugger;
                if (payment != null && payment.price > 0) {
                    $('.price').val(payment.price);
                    $('.paidAmount').val(payment.paidAmount);
                    $('.dueAmount').val(payment.dueAmount);
                } else if (payment == null) {
                    $('.price').val(office.price);
                    $('.paidAmount').val(office.price);
                    $('.dueAmount').val(office.price);
                }
            });
        } else if (checkOM == 'maintenance') {

        }
    }
});
/**
 * Update
 */
updateTpl.onCreated(function () {
    this.subscribe('rabbit_payment', this.data._id);
});

updateTpl.onRendered(function () {
    configOnRender();
});
/**
 * Hook
 */
AutoForm.hooks({
    // Payment
    rabbit_paymentInsert: {
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
    rabbit_paymentUpdate: {
        onSuccess: function (formType, result) {
            alertify.payment().close();
            alertify.success('Success');
        },
        onError: function (formType, error) {
            alertify.error(error.message);
        }
    }
});