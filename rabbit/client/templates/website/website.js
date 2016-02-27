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
    createNewAlertify(["website"], {size: 'sm'});
    createNewAlertify(["addFile"]);
    createNewAlertify(["websiteShow"], {size: 'sm'});
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
        var id = this._id;
        let self = this;
        var arr = [
            {collection: 'Rabbit.Collection.Service', selector: {websiteId: id}},
            {collection: 'Rabbit.Collection.PaymentWebsite', selector: {websiteId: id}}
        ];
        Meteor.call('isRelationExist', arr, function (error, result) {
                if (result) {

                    alertify.message(self._id + '|' + self.webName + '  is in used !');
                    return false
                } else {
                    alertify.confirm(
                        fa("remove", "Webite"),
                        "Are you sure to delete [" + self._id + "] ?",
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
                }
            }
        );
    },
    'click .js-show': function (e, t) {
        alertify.websiteShow(fa("eye", "Website"), renderTemplate(showTpl, this));
    },
    'click .serviceAction': function () {
        FlowRouter.go('rabbit.service', {
            customerId: this.customerId, websiteId: this._id
        });
    },
    'click .paymentWebsiteAction': function () {
        FlowRouter.go('rabbit.paymentWebsite', {
            customerId: this.customerId, websiteId: this._id
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
insertTpl.events({
    'keypress .price': function (evt) {
        var charCode = (evt.which) ? evt.which : evt.keyCode;
        if ($(evt.currentTarget).val().indexOf('.') != -1) {
            if (charCode == 46) {
                return false;
            }
        }
        return !(charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57));
    }
});

/**
 * Update
 */
updateTpl.events({
    'keypress .price': function (evt) {
        var charCode = (evt.which) ? evt.which : evt.keyCode;
        if ($(evt.currentTarget).val().indexOf('.') != -1) {
            if (charCode == 46) {
                return false;
            }
        }
        return !(charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57));
    }
});
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
