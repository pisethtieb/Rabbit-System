/**
 * Created by ratanak on 11/19/15.
 */
Rabbit.ListState = new ReactiveObj();
/**
 * Declare template
 */
var indexTpl = Template.rabbit_paymentWebsite,
    insertTpl = Template.rabbit_paymentWebsiteInsert,
    updateTpl = Template.rabbit_paymentWebsiteUpdate,
    showTpl = Template.rabbit_paymentWebsiteShow;

//locationAddOnTpl = Template.rabbit_locationAddOnPaymentWebsite;


/**
 * Index
 */
indexTpl.onCreated(function () {
    // SEO
    SEO.set({
        title: 'Sale Branch PaymentWebsite',
        description: 'Description for this page'
    });

    // Create new  alertify
    createNewAlertify(["paymentWebsite"], {size: 'lg'});
    createNewAlertify(["paymentWebsiteShow"], {size: 'lg'});
    //createNewAlertify(["locationAddon"], {transition: 'zoom', size: 'lg'});
});

indexTpl.events({

    'click .btn-link': function (e, t) {
        var self = this;
        checkLastPaymentWebsite(self);
    },
    'click .js-insert': function (e, t) {
        let id = FlowRouter.getParam('contractId');

        alertify.paymentWebsite(fa("plus", "PaymentWebsite"), renderTemplate(insertTpl)).maximize();

    },
    'click .js-update': function (e, t) {
        debugger;
        alertify.paymentWebsite(fa("pencil", "PaymentWebsite"), renderTemplate(updateTpl, this));
        debugger;
    },
    'click .js-remove': function (e, t) {
        var self = this;

        alertify.confirm(
            fa("remove", "PaymentWebsite"),
            "Are you sure to delete [" + self._id + "]?",
            function () {
                Rabbit.Collection.PaymentWebsite.remove(self._id, function (error) {
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
        alertify.paymentWebsiteShow(fa("eye", "PaymentWebsite"), renderTemplate(showTpl, this));

    },
    'click .maintenanceAction': function () {
        FlowRouter.go('rabbit.maintenance', {
            customerId: this._contract.customerId, contractId: this.contractId, paymentWebsiteId: this._id
        })
    }

});
showTpl.helpers({

    office: function () {
        var str = "<table class='table table-bordered'><thead>" +
            "<tr>" +
            "<th>WebsiteId</th>" +
            "<th>paymentWebsite Type</th>" +
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
        let id = FlowRouter.getParam('websiteId');
        //console.log(id);
        return {websiteId: id}
    },
    website: function () {
        Meteor.subscribe('rabbit_website');
        let id = FlowRouter.getParam('websiteId');
        let website = Rabbit.Collection.Website.findOne({_id: id});
        return website;

    }
});

/*Insert*/
insertTpl.helpers({
    website(){
        var websiteId = FlowRouter.getParam('websiteId');
        var paymentWebsite = ReactiveMethod.call('getWebsiteWithPayment', websiteId);
        paymentWebsite.websiteId = websiteId;
        paymentWebsite.customerId = FlowRouter.getParam('customerId');
        paymentWebsite.paymentWebsiteDate = moment(ReactiveMethod.call("currentDate"), 'YYYY-MM-DD').format('YYYY-MM-DD');
        if (paymentWebsite.buildPrice == 0 || paymentWebsite.buildPrice == null) {
            $('.buildWebsite').hide();
            paymentWebsite.buildPrice = null;
            paymentWebsite.buildPaid = null;
            paymentWebsite.buildDue = null;
        } else if ((paymentWebsite.domainNamePrice == 0 || paymentWebsite.domainNamePrice == null) && (paymentWebsite.hostingPrice == 0 || paymentWebsite.hostingPrice == null) && (paymentWebsite.maintenancePrice == 0 || paymentWebsite.maintenancePrice == null)) {
            $('.service').hide();
        }
        return paymentWebsite;

    },
    webDesign(){

    }


});
insertTpl.onRendered(function () {
    configOnRender();
    $('#officeMaintenance').attr('disabled', "disabled");
    $('.btnAdd').attr('disabled', "disabled");
});
insertTpl.events({
    'keyup .buildPaid': function (e, t) {

        let paid = $('.buildPaid').val();
        let price = $('.buildPrice').val();
        $('.buildDue').val(price - paid)

    },
    'keyup .domainNamePaid': function (e, t) {

        let paid = $('.domainNamePaid').val();
        let price = $('.domainNamePrice').val();
        $('.domainNameDue').val(price - paid)

    },
    'keyup .hostingPaid': function (e, t) {

        let paid = $('.hostingPaid').val();
        let price = $('.hostingPrice').val();
        $('.hostingDue').val(price - paid)

    },
    'keyup .maintenancePaid': function (e, t) {

        let paid = $('.maintenancePaid').val();
        let price = $('.maintenancePrice').val();
        $('.maintenanceDue').val(price - paid)

    },

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
    //'keypress .paidAmount'(e){
    //    var thisObj = $(e.currentTarget);
    //    var paid = thisObj.parents('div.item-list').find('.paidAmount').val();
    //    if (paid == 0) {
    //        thisObj.parents('div.item-list').find('.paidAmount').val('');
    //    }
    //},
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
        //let checkOM = Session.get('checkWebsiteMaintenance');
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

        var office = Rabbit.Collection.Website.findOne({_id: officeId});
        Rabbit.Collection.Website.find(officeId).forEach(function (obj) {
            var paymentWebsite = Rabbit.Collection.PaymentWebsite.findOne({
                    'office.officeId': obj._id
                },
                {
                    sort: {
                        _id: -1
                    }
                });


            if (paymentWebsite != null) {

                paymentWebsite.office.forEach(function (payObj) {

                    if (obj._id == payObj.officeId && payObj.dueAmount > 0) {
                        thisObje.parents('div.item-list').find('.office').val(payObj.office);
                        thisObje.parents('div.item-list').find('.price').val(payObj.dueAmount);
                        thisObje.parents('div.item-list').find('.paidAmount').val(0);
                        thisObje.parents('div.item-list').find('.discount').val(0);
                        thisObje.parents('div.item-list').find('.dueAmount').val(payObj.dueAmount);
                    }
                })
            } else if (paymentWebsite == null) {

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
    }
});

AutoForm.hooks({
    // PaymentWebsite
    rabbit_paymentWebsiteInsert: {
        before: {

            insert: function (doc) {
                doc.branchId = Session.get('currentBranch');
                var prefix = doc.branchId + '-';
                Meteor.call('rabbit', prefix);
                return doc;
            }
        },
        onSuccess: function (formType, result) {
            alertify.paymentWebsite().close();
            alertify.success('Success');
        },
        onError: function (formType, error) {
            alertify.error(error.message);
        }
    },
    rabbit_paymentWebsiteUpdate: {
        onSuccess: function (formType, result) {
            alertify.paymentWebsite().close();
            alertify.success('Success');
        },
        onError: function (formType, error) {
            alertify.error(error.message);
        }
    }
});
updateTpl.onRendered(function () {
    Meteor.setTimeout(function () {
        configOnRender();
    }, 200);
});
var configOnRender = function () {
    // date
    var dob = $('[name="paymentWebsiteDate"]');
    DateTimePicker.date(dob);
};

function checkLastPaymentWebsite(self) {
    let checkingLastPaymentWebsiteForWebsite = Rabbit.Collection.PaymentWebsite.findOne({contractId: self.contractId}, {sort: {_id: -1}})._id;
    if (checkingLastPaymentWebsiteForWebsite == self._id) {
        $('.updatePaymentWebsite').show();
        $('.removePaymentWebsite').show();
    } else {
        $('.updatePaymentWebsite').hide();
        $('.removePaymentWebsite').hide();
    }
}
