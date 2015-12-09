/**
 * Created by ratanak on 11/19/15.
 */
Rabbit.ListState = new ReactiveObj();
/**
 * Declare template
 */
var indexTpl = Template.rabbit_payment,
    insertTpl = Template.rabbit_paymentInsert,
    updateTpl = Template.rabbit_paymentUpdate,
    showTpl = Template.rabbit_paymentShow;

//locationAddOnTpl = Template.rabbit_locationAddOnPayment;

insertTpl.onRendered(function () {
    configOnRender();
});
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
        debugger;
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
    'change .type': function (e, t) {
        let checkOM = $(e.currentTarget).val();
        Session.set('checkOfficeMaintenance', checkOM);
        $('.maintenanceId').val('');
        $('.officeId').val('');
        //$('.officeMaintenance').select().val('');
    },
    'keyup .paidAmount': function (e, t) {

        $('.dueAmount').val($('.price').val() - $('.paidAmount').val());
    },

    'change .officeMaintenance': function (e) {

        let checkOM = Session.get('checkOfficeMaintenance');
        if (checkOM == "office") {
            let officeId = $(e.currentTarget).val();
            $('.officeId').val(officeId);
            //$('.officeMaintenance').val('office');
            $('.maintenanceId').val('');
            var office = Rabbit.Collection.Office.findOne({_id: officeId});
            Rabbit.Collection.Office.find(office._id).forEach(function (obj) {
                var payment = Rabbit.Collection.Payment.findOne({
                        officeId: obj._id
                    },
                    {
                        sort: {
                            _id: -1
                        }
                    });
                debugger;
                if (payment != null && payment.price > 0) {
                    $('.price').val(payment.dueAmount);
                    $('.paidAmount').val(payment.dueAmount);
                    $('.dueAmount').val(0);
                } else if (payment == null) {
                    $('.price').val(office.price);
                    $('.paidAmount').val(office.price);
                    $('.dueAmount').val(0);
                }
            });
        } else if (checkOM == 'maintenance') {
            let maintenanceId = $(e.currentTarget).val();
            //$('.officeMaintenance').val('maintenance');
            $('.maintenanceId').val(maintenanceId);
            $('.officeId').val('');
            var maintenance = Rabbit.Collection.Maintenance.findOne({_id: maintenanceId});
            Rabbit.Collection.Maintenance.find(maintenance._id).forEach(function (obj) {
                var payment = Rabbit.Collection.Payment.findOne({
                        maintenanceId: obj._id
                    },
                    {
                        sort: {
                            _id: -1
                        }
                    });
                if (payment != null && payment.price > 0) {
                    $('.price').val(payment.dueAmount);
                    $('.paidAmount').val(payment.dueAmount);
                    $('.dueAmount').val(0);
                } else if (payment == null) {
                    $('.price').val(maintenance.price);
                    $('.paidAmount').val(maintenance.price);
                    $('.dueAmount').val(0);
                }
            });

        }
    }
});
updateTpl.events({
    'change #type': function (e, t) {
        let checkOM = $(e.currentTarget).val();
        Session.set('checkOfficeMaintenance', checkOM);

       /* if (checkOM == 'office') {
            $('#officeMaintenance').val('');
            $('#maintenanceId').val('');


        } else {*/
            $('#officeMaintenance').val('');
            $('#officeId').val('');

       /* }*/

    },
    //'keyup .paidAmount': function (e, t) {
    //
    //    $('#dueAmount').val($('#price').val() - $('#paidAmount').val());
    //},
    //
    //'change .officeMaintenance': function (e) {
    //
    //    let checkOM = Session.get('checkOfficeMaintenance');
    //    if (checkOM == "office") {
    //        let officeId = $(e.currentTarget).val();
    //        $('#officeId').val(officeId);
    //        $('#maintenanceId').val('');
    //        var office = Rabbit.Collection.Office.findOne({_id: officeId});
    //        Rabbit.Collection.Office.find(office._id).forEach(function (obj) {
    //            var payment = Rabbit.Collection.Payment.findOne({
    //                    officeId: obj._id
    //                },
    //                {
    //                    sort: {
    //                        _id: -1
    //                    }
    //                });
    //            debugger;
    //            if (payment != null && payment.price > 0) {
    //                $('#price').val(payment.dueAmount);
    //                $('#paidAmount').val(payment.dueAmount);
    //                $('#dueAmount').val(0);
    //            } else if (payment == null) {
    //                $('#price').val(office.price);
    //                $('#paidAmount').val(office.price);
    //                $('#dueAmount').val(0);
    //            }
    //        });
    //    } else if (checkOM == 'maintenance') {
    //        let maintenanceId = $(e.currentTarget).val();
    //        $('#maintenanceId').val(maintenanceId);
    //        $('#officeId').val('');
    //        var maintenance = Rabbit.Collection.Maintenance.findOne({_id: maintenanceId});
    //        Rabbit.Collection.Maintenance.find(maintenance._id).forEach(function (obj) {
    //            var payment = Rabbit.Collection.Payment.findOne({
    //                    maintenanceId: obj._id
    //                },
    //                {
    //                    sort: {
    //                        _id: -1
    //                    }
    //                });
    //            if (payment != null && payment.price > 0) {
    //                $('#price').val(payment.dueAmount);
    //                $('#paidAmount').val(payment.dueAmount);
    //                $('#dueAmount').val(0);
    //            } else if (payment == null) {
    //                $('#price').val(maintenance.price);
    //                $('#paidAmount').val(maintenance.price);
    //                $('#dueAmount').val(0);
    //            }
    //        });
    //
    //    }
    //}
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
var configOnRender = function () {
    // date
    var dob = $('[name="paymentDate"]');
    DateTimePicker.date(dob);
};