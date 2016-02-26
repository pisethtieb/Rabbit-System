/**
 * Created by ratanak on 11/19/15.
 */
Rabbit.ListState = new ReactiveObj();
/**
 * Declare template
 */
var indexTpl = Template.rabbit_paymentOffice,
    insertTpl = Template.rabbit_paymentOfficeInsert,
    updateTpl = Template.rabbit_paymentOfficeUpdate,
    showTpl = Template.rabbit_paymentOfficeShow;

//locationAddOnTpl = Template.rabbit_locationAddOnPaymentOffice;


/**
 * Index
 */
indexTpl.onCreated(function () {
    // SEO
    SEO.set({
        title: 'Sale Branch PaymentOffice',
        description: 'Description for this page'
    });

    // Create new  alertify
    createNewAlertify(["paymentOffice"], {size: 'lg'});
    createNewAlertify(["paymentOfficeShow"], {size: 'lg'});
    //createNewAlertify(["locationAddon"], {transition: 'zoom', size: 'lg'});
});

indexTpl.events({

    'click .btn-link': function (e, t) {
        var self = this;
        checkLastPaymentOffice(self);
    },
    'click .js-insert': function (e, t) {
        let id = FlowRouter.getParam('contractId');

        alertify.paymentOffice(fa("plus", "Payment Office"), renderTemplate(insertTpl));

    },
    'click .js-update': function (e, t) {
        alertify.paymentOffice(fa("pencil", "Payment Office"), renderTemplate(updateTpl, this));
    },
    'click .js-remove': function (e, t) {
        var self = this;

        alertify.confirm(
            fa("remove", "Payment Office"),
            "Are you sure to delete [" + self._id + "] ?",
            function () {
                Rabbit.Collection.PaymentOffice.remove(self._id, function (error) {
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
        alertify.paymentOfficeShow(fa("eye", "Payment Office"), renderTemplate(showTpl, this));

    },
    'click .maintenanceAction': function () {
        FlowRouter.go('rabbit.maintenance', {
            customerId: this._contract.customerId, contractId: this.contractId, paymentOfficeId: this._id
        })
    }

});
showTpl.helpers({

    office: function () {
        var str = "<table class='table table-bordered'><thead>" +
            "<tr>" +
            "<th>Office ID</th>" +
            "<th>Office Type</th>" +
            "<th>Price</th>" +
            "<th>Discount</th>" +
            "<th>Paid Amount</th>" +
            "<th>Due Amount</th>" +
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
        office.paymentOfficeDate = moment(ReactiveMethod.call("currentDate"), 'YYYY-MM-DD').format('YYYY-MM-DD');
        return office;
    }
});
insertTpl.onRendered(function () {
    configOnRender();
    $('#officeMaintenance').attr('disabled', "disabled");
    $('.btnAdd').attr('disabled', "disabled");
});
insertTpl.events({
    'keyup .discount': function (e, t) {

        var thisObj = $(e.currentTarget);
        thisObj.parents('div.item-list').find('.paidAmount').val('');
        var price = thisObj.parents('div.item-list').find('.price').val();
        var discount = thisObj.parents('div.item-list').find('.discount').val();
        let dueAmount = price - discount;
        thisObj.parents('div.item-list').find('.dueAmount').val(dueAmount);
        if (parseFloat(price) < parseFloat(discount)) {
            thisObj.parents('div.item-list').find('.dueAmount').val(price);
            thisObj.parents('div.item-list').find('.discount').val('');
        }
    },
    'keyup .paidAmount': function (e, t) {
        var thisObj = $(e.currentTarget);
        var price = thisObj.parents('div.item-list').find('.price').val();
        var paid = thisObj.parents('div.item-list').find('.paidAmount').val();
        var discount = thisObj.parents('div.item-list').find('.discount').val();
        if (discount > 0) {
            let disAmount = (price - discount);
            let subAmount = disAmount - paid;
            thisObj.parents('div.item-list').find('.dueAmount').val(subAmount);
            if (disAmount < paid) {
                thisObj.parents('div.item-list').find('.paidAmount').val('');
                thisObj.parents('div.item-list').find('.dueAmount').val(subAmount);
            }
        } else if (discount == 0 || discount == null) {
            let dueAmount = parseFloat(price) - parseFloat(paid);
            debugger;
            thisObj.parents('div.item-list').find('.dueAmount').val(dueAmount);
            if (parseFloat(price) < parseFloat(paid)) {
                thisObj.parents('div.item-list').find('.paidAmount').val('');
                thisObj.parents('div.item-list').find('.dueAmount').val(price);
            }

        } else {
            thisObj.parents('div.item-list').find('.dueAmount').val(price);

        }

    },
    'keypress .paidAmount,.discount,.dueAmount,.price': function (evt) {
        var charCode = (evt.which) ? evt.which : evt.keyCode;
        if ($(evt.currentTarget).val().indexOf('.') != -1) {
            if (charCode == 46) {
                return false;
            }
        }
        return !(charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57));
    }
});
updateTpl.events({
    'keyup .discount': function (e, t) {

        var thisObj = $(e.currentTarget);
        thisObj.parents('div.item-list').find('.paidAmount').val('');
        var price = thisObj.parents('div.item-list').find('.price').val();
        var discount = thisObj.parents('div.item-list').find('.discount').val();
        let dueAmount = price - discount;
        thisObj.parents('div.item-list').find('.dueAmount').val(dueAmount);
        if (parseFloat(price) < parseFloat(discount)) {
            thisObj.parents('div.item-list').find('.dueAmount').val(price);
            thisObj.parents('div.item-list').find('.discount').val('');
        }


    },
    'keyup .paidAmount': function (e, t) {
        var thisObj = $(e.currentTarget);
        var price = thisObj.parents('div.item-list').find('.price').val();
        var paid = thisObj.parents('div.item-list').find('.paidAmount').val();
        var discount = thisObj.parents('div.item-list').find('.discount').val();
        if (discount > 0) {
            let disAmount = (price - discount);
            let subAmount = disAmount - paid;
            thisObj.parents('div.item-list').find('.dueAmount').val(subAmount);
            if (disAmount < paid) {
                thisObj.parents('div.item-list').find('.paidAmount').val('');
                thisObj.parents('div.item-list').find('.dueAmount').val(subAmount);
            }
        } else if (discount == 0 || discount == null) {
            let dueAmount = parseFloat(price) - parseFloat(paid);
            debugger;
            thisObj.parents('div.item-list').find('.dueAmount').val(dueAmount);
            if (parseFloat(price) < parseFloat(paid)) {
                thisObj.parents('div.item-list').find('.paidAmount').val('');
                thisObj.parents('div.item-list').find('.dueAmount').val(price);
            }

        } else {
            thisObj.parents('div.item-list').find('.dueAmount').val(price);

        }

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
});
updateTpl.onRendered(function () {
    Meteor.setTimeout(function () {
        configOnRender();
    }, 200);
});

AutoForm.hooks({
    // PaymentOffice
    rabbit_paymentOfficeInsert: {
        before: {

            insert: function (doc) {
                doc.branchId = Session.get('currentBranch');
                var prefix = doc.branchId + '-';
                Meteor.call('rabbit', prefix);
                return doc;
            }
        },
        onSuccess: function (formType, result) {
            alertify.paymentOffice().close();
            alertify.success('Success');
        },
        onError: function (formType, error) {
            alertify.error(error.message);
        }
    },
    rabbit_paymentOfficeUpdate: {
        onSuccess: function (formType, result) {
            alertify.paymentOffice().close();
            alertify.success('Success');
        },
        onError: function (formType, error) {
            alertify.error(error.message);
        }
    }
});

var configOnRender = function () {
    // date
    var dob = $('[name="paymentOfficeDate"]');
    DateTimePicker.date(dob);
};

function checkLastPaymentOffice(self) {

    let checkingLastPaymentOfficeForOffice = Rabbit.Collection.PaymentOffice.findOne({contractId: self.contractId}, {sort: {_id: -1}})._id;
    if (checkingLastPaymentOfficeForOffice == self._id) {
        $('.updatePaymentOffice').show();
        $('.removePaymentOffice').show();
    } else {
        $('.updatePaymentOffice').hide();
        $('.removePaymentOffice').hide();
    }
}
