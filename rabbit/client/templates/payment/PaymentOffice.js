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
    createNewAlertify(["paymentShow"], {size: 'lg'});
    //createNewAlertify(["locationAddon"], {transition: 'zoom', size: 'lg'});
});

indexTpl.events({

    'click .btn-link': function (e, t) {
        var self = this;
        checkLastPayment(self);
    },
    'click .js-insert': function (e, t) {
        let id = FlowRouter.getParam('contractId');
        var data = Rabbit.Collection.Office.findOne({contractId: id});
        data.paymentDate = moment().format("YYYY-MM-DD HH:mm:ss");

        alertify.payment(fa("plus", "Payment"), renderTemplate(insertTpl)).maximize();

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
showTpl.helpers({

    office: function () {
        var str = "<table class='table table-bordered'><thead>" +
            "<tr>" +
            "<th>OfficeId</th>" +
            "<th>Office Type</th>" +
            "<th>Price</th>" +
            "<th>Discount</th>" +
            "<th>PaidAmount</th>" +
            "<th>DueAmount</th>" +
            "</tr>" +
            "</thead><tbody>";
        this.office.forEach(function (o) {
            str += '<tr>' +
                '<td>' + o.officeId + '</td>' +
                '<td>' + o.office + '</td>' +
                '<td>' + o.price + '</td>' +
                '<td>' + o.discount + '</td>' +
                '<td>' + o.paidAmount + '</td>' +
                '<td>' + o.dueAmount + '</td>' +
                '</tr>'
        });
        str += "</tbody></table>";
        return new Spacebars.SafeString(str);
    }
});

indexTpl.helpers({
    selector: function () {
        let id = FlowRouter.getParam('contractId');
        //console.log(id);
        return {contractId: id}
    },
    contract: function () {
        let id = FlowRouter.getParam('contractId');
        let contract = Rabbit.Collection.Contract.findOne({_id: id});

        return contract;

    }
});

/*Insert*/
insertTpl.helpers({
    contract(){
        var contractId = FlowRouter.getParam('contractId');
        var office = ReactiveMethod.call('getOfficeWithContract', contractId);
        office.contractId = contractId;
        office.customerId = FlowRouter.getParam('customerId');
        office.paymentDate = moment(ReactiveMethod.call("currentDate"), 'YYYY-MM-DD').format('YYYY-MM-DD');
        return office;
    }
});
insertTpl.onRendered(function () {
    configOnRender();
    $('#officeMaintenance').attr('disabled', "disabled");
    $('.btnAdd').attr('disabled', "disabled");
});
insertTpl.events({
    //'change .type': function (e, t) {
    //    let checkOM = $(e.currentTarget).val();
    //    Session.set('checkOfficeMaintenance', checkOM);
    //    if (checkOM == '') {
    //        $('#officeMaintenance').attr('disabled', true);
    //    } else {
    //        $('#officeMaintenance').attr('disabled', false);
    //        $('.maintenanceId').val('');
    //        $('.officeId').val('');
    //    }
    //
    //
    //},
    'click .btnRemove': function (e) {

        setTimeout(function () {
            var enable = true;
            $('.amount').each(function () {
                var amount = $(this).val() == "" ? 0 : parseFloat($(this).val());
                if (amount == 0) {
                    enable = false;
                    return false;
                }
                enable = true;
            });
            if (enable) {
                $('.btnAdd').attr('disabled', false);
            } else {
                $('.btnAdd').attr('disabled', true);
            }
        }, 300);
    },
    'keyup .discount': function (e, t) {

        var thisObj = $(e.currentTarget);
        if (thisObj.val() >= 100) {
            thisObj.val(0)
        }
        var price = thisObj.parents('div.item-list').find('.price').val();
        var discount = thisObj.parents('div.item-list').find('.discount').val();
        thisObj.parents('div.item-list').find('.paidAmount').val(0);

        let rightPrice = price - (price * (discount / 100));
        Session.set('amount', rightPrice);

        thisObj.parents('div.item-list').find('.dueAmount').val(rightPrice);
    },
    'keyup .paidAmount': function (e, t) {

        var thisObj = $(e.currentTarget);
        var amount = Session.get('amount');
        var price = thisObj.parents('div.item-list').find('.price').val();
        var paid = thisObj.parents('div.item-list').find('.paidAmount').val();
        //thisObj.parents('div.item-list').find('.dueAmount').val(0);
        let subAmount = amount - paid;
        if (amount) {
            thisObj.parents('div.item-list').find('.dueAmount').val(subAmount);
            if (parseFloat(amount) < parseFloat(paid)) {
                thisObj.parents('div.item-list').find('.paidAmount').val(0);
                thisObj.parents('div.item-list').find('.dueAmount').val(amount);
            }
        } else if (!amount) {
            let dueAmount = price - paid;
            thisObj.parents('div.item-list').find('.dueAmount').val(dueAmount);
            if (parseFloat(price) < parseFloat(paid)) {
                thisObj.parents('div.item-list').find('.paidAmount').val(0);
                thisObj.parents('div.item-list').find('.dueAmount').val(price);
            }

        } else {
            thisObj.parents('div.item-list').find('.dueAmount').val(price);

        }
        debugger;
        //

    },
    'keypress .paidAmount,.discount,.dueAmount,.price': function (evt) {
        var charCode = (evt.which) ? evt.which : evt.keyCode;
        if ($(evt.currentTarget).val().indexOf('.') != -1) {
            if (charCode == 46) {
                return false;
            }
        }
        return !(charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57));
    },
    'click .btnAdd': function (e) {
        setTimeout(function () {
            $('.btnAdd').attr('disabled', 'disabled');
        }, 300);

        var thisObj = $(e.currentTarget);
        var officeId = thisObj.parents('div.item-list').find('.officeId').val();
        var price = thisObj.parents('div.item-list').find('.price').val();
        setTimeout(function () {
            if (officeId != "" && price != 0) {
                $('.btnAdd').attr('disabled', false);
            } else {
                $('.btnAdd').attr('disabled', true);
            }

        }, 300);
    },
    'change .officeId': function (e) {
        //let checkOM = Session.get('checkOfficeMaintenance');
        //if (checkOM == "office") {
        var thisObje = $(e.currentTarget);
        var officeId = $(e.currentTarget).val();
        if (officeId == '') {
            thisObje.parents('div.item-list').find('.officeId').val('');
            thisObje.parents('div.item-list').find('.office').val('');
            thisObje.parents('div.item-list').find('.price').val('');
            thisObje.parents('div.item-list').find('.paidAmount').val('');
            thisObje.parents('div.item-list').find('.dueAmount').val('');

        }

        var office = Rabbit.Collection.Office.findOne({_id: officeId});
        Rabbit.Collection.Office.find(officeId).forEach(function (obj) {
            var payment = Rabbit.Collection.Payment.findOne({
                    'office.officeId': obj._id
                },
                {
                    sort: {
                        _id: -1
                    }
                });


            if (payment != null) {

                payment.office.forEach(function (payObj) {

                    if (obj._id == payObj.officeId && payObj.dueAmount > 0) {
                        thisObje.parents('div.item-list').find('.office').val(payObj.office);
                        thisObje.parents('div.item-list').find('.price').val(payObj.dueAmount);
                        thisObje.parents('div.item-list').find('.paidAmount').val(0);
                        thisObje.parents('div.item-list').find('.discount').val(0);
                        thisObje.parents('div.item-list').find('.dueAmount').val(payObj.dueAmount);
                    }
                })
            } else if (payment == null) {

                thisObje.parents('div.item-list').find('.office').val(office.type);
                thisObje.parents('div.item-list').find('.price').val(office.price);
                thisObje.parents('div.item-list').find('.paidAmount').val(0);
                thisObje.parents('div.item-list').find('.discount').val(0);
                thisObje.parents('div.item-list').find('.dueAmount').val(office.price);
            }
        });
        var num = 0;
        $('.officeId').each(function () {
            if (officeId == $(this).val()) {
                num += 1;
            }
        });
        if (num > 1) {

            thisObje.parents('div.item-list').find('.officeId').val('');
            thisObje.parents('div.item-list').find('.office').val('');
            thisObje.parents('div.item-list').find('.price').val('');
            thisObje.parents('div.item-list').find('.paidAmount').val('');
            thisObje.parents('div.item-list').find('.dueAmount').val('');
            setTimeout(function () {
                $('.btnAdd').attr('disabled', 'disabled');

            }, 100);
        }
        if (officeId) {
            $('.btnAdd').removeAttr('disabled');
        } else {
            $('.btnAdd').attr('disabled', "disabled");
        }

        //} else if (checkOM == 'maintenance') {
        //    let maintenanceId = $(e.currentTarget).val();
        //    //$('.officeMaintenance').val('maintenance');
        //    $('.maintenanceId').val(maintenanceId);
        //    $('.officeId').val('');
        //    var maintenance = Rabbit.Collection.Maintenance.findOne({_id: maintenanceId});
        //    Rabbit.Collection.Maintenance.find(maintenance._id).forEach(function (obj) {
        //        var payment = Rabbit.Collection.Payment.findOne({
        //                maintenanceId: obj._id
        //            },
        //            {
        //                sort: {
        //                    _id: -1
        //                }
        //            });
        //        if (payment != null && payment.price > 0) {
        //            $('.price').val(payment.dueAmount);
        //            $('.paidAmount').val(payment.dueAmount);
        //            $('.dueAmount').val(0);
        //        } else if (payment == null) {
        //            $('.price').val(maintenance.price);
        //            $('.paidAmount').val(maintenance.price);
        //            $('.dueAmount').val(0);
        //        }
        //    });
        //
        //}
    }
});
updateTpl.events({
    'click .btnRemove': function (e) {

        setTimeout(function () {
            var enable = true;
            $('.amount').each(function () {
                var amount = $(this).val() == "" ? 0 : parseFloat($(this).val());
                if (amount == 0) {
                    enable = false;
                    return false;
                }
                enable = true;
            });
            if (enable) {
                $('.btnAdd').attr('disabled', false);
            } else {
                $('.btnAdd').attr('disabled', true);
            }
        }, 300);
    },
    'keyup .discount': function (e, t) {

        var thisObj = $(e.currentTarget);
        if (thisObj.val() >= 100) {
            thisObj.val(0)
        }
        var price = thisObj.parents('div.item-list').find('.price').val();
        var discount = thisObj.parents('div.item-list').find('.discount').val();
        thisObj.parents('div.item-list').find('.paidAmount').val(0);

        let rightPrice = price - (price * (discount / 100));
        Session.set('amount', rightPrice);

        thisObj.parents('div.item-list').find('.dueAmount').val(rightPrice);
    },
    'keyup .paidAmount': function (e, t) {

        var thisObj = $(e.currentTarget);
        var amount = Session.get('amount');
        var price = thisObj.parents('div.item-list').find('.price').val();
        var paid = thisObj.parents('div.item-list').find('.paidAmount').val();
        //thisObj.parents('div.item-list').find('.dueAmount').val(0);

        let subAmount = amount - paid;
        if (amount) {
            thisObj.parents('div.item-list').find('.dueAmount').val(subAmount);
            if (parseFloat(amount) < parseFloat(paid)) {
                thisObj.parents('div.item-list').find('.paidAmount').val(0);
                thisObj.parents('div.item-list').find('.dueAmount').val(amount);
            }
        } else if (!amount) {
            let dueAmount = price - paid;
            thisObj.parents('div.item-list').find('.dueAmount').val(dueAmount);
            if (parseFloat(price) < parseFloat(paid)) {
                thisObj.parents('div.item-list').find('.paidAmount').val(0);
                thisObj.parents('div.item-list').find('.dueAmount').val(price);
            }

        } else {
            thisObj.parents('div.item-list').find('.dueAmount').val(price);

        }
        //debugger;
        //

    },
    'keypress .paidAmount,.discount,.dueAmount,.price': function (evt) {
        var charCode = (evt.which) ? evt.which : evt.keyCode;
        if ($(evt.currentTarget).val().indexOf('.') != -1) {
            if (charCode == 46) {
                return false;
            }
        }
        return !(charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57));
    },
    'click .btnAdd': function (e) {
        setTimeout(function () {
            $('.btnAdd').attr('disabled', 'disabled');
        }, 300);

        var thisObj = $(e.currentTarget);
        var officeId = thisObj.parents('div.item-list').find('.officeId').val();
        var price = thisObj.parents('div.item-list').find('.price').val();
        setTimeout(function () {
            if (officeId != "" && price != 0) {
                debugger;
                $('.btnAdd').attr('disabled', false);
            } else {
                debugger;
                $('.btnAdd').attr('disabled', true);
            }

        }, 300);
    },
    'change .officeId': function (e) {
        //let checkOM = Session.get('checkOfficeMaintenance');
        //if (checkOM == "office") {
        var thisObje = $(e.currentTarget);
        var officeId = $(e.currentTarget).val();
        if (officeId == '') {
            thisObje.parents('div.item-list').find('.officeId').val('');
            thisObje.parents('div.item-list').find('.office').val('');
            thisObje.parents('div.item-list').find('.price').val('');
            thisObje.parents('div.item-list').find('.paidAmount').val('');
            thisObje.parents('div.item-list').find('.dueAmount').val('');

        }

        var office = Rabbit.Collection.Office.findOne({_id: officeId});
        Rabbit.Collection.Office.find(officeId).forEach(function (obj) {
            var payment = Rabbit.Collection.Payment.findOne({
                    'office.officeId': obj._id
                },
                {
                    sort: {
                        _id: -1
                    }
                });
            console.log(payment);
            if (payment != null) {
                payment.office.forEach(function (payObj) {
                    if (obj._id == payObj.officeId && payObj.dueAmount > 0) {
                        thisObje.parents('div.item-list').find('.office').val(payObj.office);
                        thisObje.parents('div.item-list').find('.price').val(payObj.dueAmount);
                        thisObje.parents('div.item-list').find('.paidAmount').val(0);
                        thisObje.parents('div.item-list').find('.discount').val(0);
                        thisObje.parents('div.item-list').find('.dueAmount').val(payObj.dueAmount);
                    }
                })
            } else if (payment == null) {
                thisObje.parents('div.item-list').find('.office').val(office.type);
                thisObje.parents('div.item-list').find('.price').val(office.price);
                thisObje.parents('div.item-list').find('.paidAmount').val(0);
                thisObje.parents('div.item-list').find('.discount').val(0);
                thisObje.parents('div.item-list').find('.dueAmount').val(office.price);
            }
        });
        var num = 0;
        $('.officeId').each(function () {
            if (officeId == $(this).val()) {
                num += 1;
            }
        });
        if (num > 1) {

            thisObje.parents('div.item-list').find('.officeId').val('');
            thisObje.parents('div.item-list').find('.office').val('');
            thisObje.parents('div.item-list').find('.price').val('');
            thisObje.parents('div.item-list').find('.paidAmount').val('');
            thisObje.parents('div.item-list').find('.dueAmount').val('');
            setTimeout(function () {
                $('.btnAdd').attr('disabled', 'disabled');

            }, 100);
        }
        if (officeId) {
            $('.btnAdd').removeAttr('disabled');
        } else {
            $('.btnAdd').attr('disabled', "disabled");
        }

        //} else if (checkOM == 'maintenance') {
        //    let maintenanceId = $(e.currentTarget).val();
        //    //$('.officeMaintenance').val('maintenance');
        //    $('.maintenanceId').val(maintenanceId);
        //    $('.officeId').val('');
        //    var maintenance = Rabbit.Collection.Maintenance.findOne({_id: maintenanceId});
        //    Rabbit.Collection.Maintenance.find(maintenance._id).forEach(function (obj) {
        //        var payment = Rabbit.Collection.Payment.findOne({
        //                maintenanceId: obj._id
        //            },
        //            {
        //                sort: {
        //                    _id: -1
        //                }
        //            });
        //        if (payment != null && payment.price > 0) {
        //            $('.price').val(payment.dueAmount);
        //            $('.paidAmount').val(payment.dueAmount);
        //            $('.dueAmount').val(0);
        //        } else if (payment == null) {
        //            $('.price').val(maintenance.price);
        //            $('.paidAmount').val(maintenance.price);
        //            $('.dueAmount').val(0);
        //        }
        //    });des
        //
        //}
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
            alertify.payment().close();
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

function checkLastPayment(self) {
    let checkingLastPaymentForOffice = Rabbit.Collection.Payment.findOne({contractId: self.contractId}, {sort: {_id: -1}})._id;
    if (checkingLastPaymentForOffice == self._id) {
        $('.updatePayment').show();
        $('.removePayment').show();
    } else {
        $('.updatePayment').hide();
        $('.removePayment').hide();
    }
    //let checkingLastPaymentForMaintenance = Rabbit.Collection.Payment.findOne({maintenanceId: payment.maintenanceId}, {sort: {_id: -1}})._id;
    //
    //if (checkingLastPaymentForMaintenance == self._id) {
    //
    //    $('.updatePayment').show();
    //    $('.removePayment').show();
    //} else {
    //    $('.updatePayment').hide();
    //    $('.removePayment').hide();
    //}

}