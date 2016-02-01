/**
 * Declare template
 */
var indexTpl = Template.rabbit_website,
    insertTpl = Template.rabbit_websiteInsert,
    updateTpl = Template.rabbit_websiteUpdate,
    showTpl = Template.rabbit_websiteShow;
/**
 * Index
 */
indexTpl.onCreated(function () {
    // SEO
    SEO.set({
        title: 'Website',
        description: 'Description for this page'
    });
    // Create new  alertify
    createNewAlertify(["website"], {size: 'lg'});
    createNewAlertify(["addFile"]);
    createNewAlertify(["websiteShow"], {size: 'lg'});
});

indexTpl.helpers({
    selector: function () {
        let id = FlowRouter.getParam('customerId');
        return {customerId: id}
    },
    customer: function () {
        let id = FlowRouter.getParam('customerId');
        let customer = Rabbit.Collection.Customer.findOne({_id: id});
        return customer;

    }
});
indexTpl.events({
    'click .js-insert': function (e, t) {
        alertify.website(fa("plus", "Website"), renderTemplate(insertTpl));
    },
    'click .js-update': function (e, t) {
        alertify.website(fa("pencil", "Website"), renderTemplate(updateTpl, this));
    },
    'click .js-remove': function (e, t) {
        var self = this;
        let office = Rabbit.Collection.Office.findOne({websiteId: self._id});
        let paymentOffice = Rabbit.Collection.PaymentOffice.findOne({websiteId: self._id});
        let paymentMaintenance = Rabbit.Collection.PaymentMaintenance.findOne({websiteId: self._id});
        if (office != null || paymentOffice != null || paymentMaintenance) {
            alertify.message(self._id + '  is in used !');
            return false;

        }
        alertify.confirm(
            fa("remove", "Website"),
            "Are you sure to delete [" + self._id + "]?",
            function () {
                Rabbit.Collection.Website.remove(self._id, function (error) {
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
        alertify.websiteShow(fa("eye", "Website"), renderTemplate(showTpl, this));
    },
    'click .serviceAction': function () {
        FlowRouter.go('rabbit.service', {
            customerId: this.customerId, websiteId:this._id
        });
    } ,
    'click .paymentWebsiteAction': function () {
        FlowRouter.go('rabbit.paymentWebsite', {
            customerId: this.customerId, websiteId:this._id
        });
    }
});


/**
 * Insert
 */
insertTpl.onCreated(function () {
    Meteor.subscribe('rabbit_customer');
    $('.testing').hide();
});
insertTpl.onRendered(function () {
    configOnRender();
});
insertTpl.helpers({
    //data on insert
    websiteObj(){
        return {
            paymentMethod: [
                {paymentDuration: "- លើកទី១ ត្រូវបង់ប្រាក់ ៤០% ពេលចុះកិច្ចសន្យាដំបូង។"}, {paymentDuration: "- លើកទី២ ត្រូវបង់ប្រាក់ ៣០% ពេលដាក់ឱ្យប្រើប្រាស់សាកល្បង។"}, {paymentDuration: "- លើកទី៣ ត្រូវបង់ប្រាក់ ៣០% ចុងក្រោយនៅពេលដាក់ឱ្យប្រើប្រាស់ជាផ្លូវការ។"}
            ],
            registerDate: moment(ReactiveMethod.call("currentDate"), 'YYYY-MM-DD').format('YYYY-MM-DD'),
            type: 'advertise',
            customerId: FlowRouter.getParam('customerId')


        }
    }
});
insertTpl.events({});

/**
 * Update
 */
/**
 * Show
 */
/**
 * Hook
 */
AutoForm.hooks({
    // paymentWebsite
    rabbit_websiteInsert: {
        before: {
            insert: function (doc) {
                doc.branchId = Session.get('currentBranch');
                var prefix = doc.branchId + '-';
                Meteor.call('rabbit', prefix);
                return doc;
            }
        },
        onSuccess: function (formType, result) {
            alertify.website().close();
            alertify.success('Success');
        },
        onError: function (formType, error) {
            alertify.error(error.message);
        }
    },
    rabbit_websiteUpdate: {
        onSuccess: function (formType, result) {
            alertify.website().close();
            alertify.addFile().close();
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
    var websiteDate = $('[name="websiteDate"]');
    DateTimePicker.date(websiteDate);
};
