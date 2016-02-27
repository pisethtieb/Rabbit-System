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
    createNewAlertify(["paymentWebsiteShow"], {size: 'sm'});
    //createNewAlertify(["locationAddon"], {transition: 'zoom', size: 'lg'});
});

indexTpl.events({

    'click .btn-link': function (e, t) {
        var self = this;
        checkLastPaymentWebsite(self);
    },
    'click .js-insert': function (e, t) {
        let id = FlowRouter.getParam('contractId');

        alertify.paymentWebsite(fa("plus", "Payment Website"), renderTemplate(insertTpl));

    },
    'click .js-update': function (e, t) {
        debugger;
        alertify.paymentWebsite(fa("pencil", "Payment Website"), renderTemplate(updateTpl, this));
        debugger;
    },
    'click .js-remove': function (e, t) {
        var self = this;

        alertify.confirm(
            fa("remove", "Payment Website"),
            "Are you sure to delete [" + self._id + "] ?",
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
        alertify.paymentWebsiteShow(fa("eye", "Payment Website"), renderTemplate(showTpl, this));

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
    'keypress .maintenancePaid,.hostingPaid,.domainNamePaid,.buildPrice': function (evt) {
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
    'keypress .maintenancePaid,.hostingPaid,.domainNamePaid,.buildPrice': function (evt) {
        var charCode = (evt.which) ? evt.which : evt.keyCode;
        if ($(evt.currentTarget).val().indexOf('.') != -1) {
            if (charCode == 46) {
                return false;
            }
        }
        return !(charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57));
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
    let checkingLastPaymentWebsiteForWebsite = Rabbit.Collection.PaymentWebsite.findOne({websiteId: self.websiteId}, {sort: {_id: -1}})._id;
    if (checkingLastPaymentWebsiteForWebsite == self._id) {
        $('.updatePaymentWebsite').show();
        $('.removePaymentWebsite').show();
    } else {
        $('.updatePaymentWebsite').hide();
        $('.removePaymentWebsite').hide();
    }
}
