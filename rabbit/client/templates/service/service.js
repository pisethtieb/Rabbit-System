/**
 * Created by ratanak on 11/19/15.
 */
/**
 * Declare template
 */
var indexTpl = Template.rabbit_service,
    insertTpl = Template.rabbit_serviceInsert,
    updateTpl = Template.rabbit_serviceUpdate,
    showTpl = Template.rabbit_serviceShow;

//locationAddOnTpl = Template.rabbit_locationAddOnService;


/**
 * Index
 */
indexTpl.onCreated(function () {
    // SEO
    SEO.set({
        title: 'Sale Branch Service',
        description: 'Description for this page'
    });

    // Create new  alertify
    createNewAlertify(["service"], {size: 'lg'});
    createNewAlertify(["serviceShow"]);
    //createNewAlertify(["locationAddon"], {transition: 'zoom', size: 'lg'});
});

indexTpl.events({
    'click .js-insert': function (e, t) {

        alertify.service(fa("plus", "Service"), renderTemplate(insertTpl));

    },
    'click .js-update': function (e, t) {
        alertify.service(fa("pencil", "Service"), renderTemplate(updateTpl, this));
        debugger;
    },
    'click .js-remove': function (e, t) {
        var self = this;

        alertify.confirm(
            fa("remove", "Service"),
            "Are you sure to delete [" + self._id + "]?",
            function () {
                Rabbit.Collection.Service.remove(self._id, function (error) {
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
        alertify.serviceShow(fa("eye", "Service"), renderTemplate(showTpl, this));

    },
    'click .maintenanceAction': function () {
        FlowRouter.go('rabbit.maintenance', {
            customerId: this._contract.customerId, contractId: this.contractId, serviceId: this._id
        })
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
        let websiteId = FlowRouter.getParam('websiteId');
        let website = Rabbit.Collection.Website.findOne({_id: websiteId});
        return website;
    }
});

/*Insert*/
insertTpl.onRendered(function () {
    configOnRender();
    // domainName
    $('.domainNamePrice').attr('disabled', "disabled");
    $('.domainNameStartDate').attr('disabled', "disabled");
    $('.domainNameEndDate').attr('disabled', "disabled");
    // hosting
    $('.hostingPrice').attr('disabled', "disabled");
    $('.hostingStartDate').attr('disabled', "disabled");
    $('.hostingEndDate').attr('disabled', "disabled");
    // maintenance
    $('.maintenancePrice').attr('disabled', "disabled");
    $('.maintenanceStartDate').attr('disabled', "disabled");
    $('.maintenanceEndDate').attr('disabled', "disabled");
});
insertTpl.helpers({
        service(){
            return {

                websiteId: FlowRouter.getParam('websiteId'),
                serviceDate: moment(ReactiveMethod.call("currentDate"), 'YYYY-MM-DD').format('YYYY-MM-DD'),

            }
        }
    }
);
insertTpl.events({
    "change .domainName"(e, t){
        let websiteId = FlowRouter.getParam('websiteId');
        //Meteor.subscribe('rabbit_paymentWebsite');
        let dueAmount = Rabbit.Collection.PaymentWebsite.findOne({websiteId: websiteId}, {sort: {_id: -1}}).domainNameDue;
        debugger;
        if ($('.domainName').is(':checked')) {
            if (dueAmount != null) {
                $('.domainNameOwedAmount').val(dueAmount);
                $('.domainNameTotalPrice').val(dueAmount);
            }
            $('.domainNamePrice').removeAttr('disabled');
            $('.domainNameStartDate').removeAttr('disabled');
            $('.domainNameEndDate').removeAttr('disabled');
        } else {
            $('.domainNamePrice').attr('disabled', "disabled").val('');
            $('.domainNameStartDate').attr('disabled', "disabled").val('');
            $('.domainNameEndDate').attr('disabled', "disabled").val('');
        }
    },
    "keyup .domainNamePrice"(e, t){
        let price = $(e.currentTarget);
        let owedAmount = $('.domainNameOwedAmount').val();
        $('.domainNameTotalPrice').val(price + owedAmount);
    },
    "change .hosting"(e, t){
        let websiteId = FlowRouter.getParam('websiteId');
        //Meteor.subscribe('rabbit_paymentWebsite');
        let dueAmount = Rabbit.Collection.PaymentWebsite.findOne({websiteId: websiteId}, {sort: {_id: -1}}).hostingDue;
        if ($('.hosting').is(':checked')) {

            if (dueAmount != null) {
                $('.hostingOwedAmount').val(dueAmount);
                $('.hostingTotalPrice').val(dueAmount);
            }
            $('.hostingPrice').removeAttr('disabled');
            $('.hostingStartDate').removeAttr('disabled');
            $('.hostingEndDate').removeAttr('disabled');
        } else {
            $('.hostingPrice').attr('disabled', "disabled").val('');
            $('.hostingStartDate').attr('disabled', "disabled").val('');
            $('.hostingEndDate').attr('disabled', "disabled").val('');
        }

    },
    "change .maintenance"(e, t){
        let websiteId = FlowRouter.getParam('websiteId');
        //Meteor.subscribe('rabbit_paymentWebsite');
        let dueAmount = Rabbit.Collection.PaymentWebsite.findOne({websiteId: websiteId}, {sort: {_id: -1}}).maintenanceDue;

        if ($('.maintenance').is(':checked')) {
            if (dueAmount != null) {
                $('.maintenanceOwedAmount').val(dueAmount);
                $('.maintenanceTotalPrice').val(dueAmount);
            }
            $('.maintenancePrice').removeAttr('disabled');
            $('.maintenanceStartDate').removeAttr('disabled');
            $('.maintenanceEndDate').removeAttr('disabled');
        } else {
            $('.maintenancePrice').attr('disabled', "disabled").val('');
            $('.maintenanceStartDate').attr('disabled', "disabled").val('');
            $('.maintenanceEndDate').attr('disabled', "disabled").val('');
        }
    }
});
/**
 * Update
 */
updateTpl.onCreated(function () {
    this.subscribe('rabbit_service', this.data._id);
});

updateTpl.onRendered(function () {
    Meteor.setTimeout(function () {
        //if ($('.domainNamePrice').val() != null) {
        //    $('.domainName').prop('checked', true);
        //    $('.domainNamePrice').attr('disabled', "disabled");
        //    $('.domainNameStartDate').attr('disabled', "disabled");
        //    $('.domainNameEndDate').attr('disabled', "disabled");
        //    // hosting
        //    $('.hosting').prop('checked', true);
        //    $('.hostingPrice').attr('disabled', "disabled");
        //    $('.hostingStartDate').attr('disabled', "disabled");
        //    $('.hostingEndDate').attr('disabled', "disabled");
        //    // maintenance
        //    $('.maintenance').prop('checked', true);
        //    $('.maintenancePrice').attr('disabled', "disabled");
        //    $('.maintenanceStartDate').attr('disabled', "disabled");
        //    $('.maintenanceEndDate').attr('disabled', "disabled");
        //}
        configOnRender();

    }, 200);
});


updateTpl.events({
    //"change .domainName"(e, t){
    //
    //    if ($('.domainName').is(':checked')) {
    //
    //        $('.domainNamePrice').removeAttr('disabled');
    //        $('.domainNameStartDate').removeAttr('disabled');
    //        $('.domainNameEndDate').removeAttr('disabled');
    //    } else {
    //        $('.domainNamePrice').attr('disabled', "disabled").val('');
    //        $('.domainNameStartDate').attr('disabled', "disabled").val('');
    //        $('.domainNameEndDate').attr('disabled', "disabled").val('');
    //    }
    //
    //},
    //"change .hosting"(e, t){
    //
    //    if ($('.hosting').is(':checked')) {
    //
    //        $('.hostingPrice').removeAttr('disabled');
    //        $('.hostingStartDate').removeAttr('disabled');
    //        $('.hostingEndDate').removeAttr('disabled');
    //    } else {
    //        $('.hostingPrice').attr('disabled', "disabled").val('');
    //        $('.hostingStartDate').attr('disabled', "disabled").val('');
    //        $('.hostingEndDate').attr('disabled', "disabled").val('');
    //    }
    //
    //},
    //"change .maintenance"(e, t){
    //
    //    if ($('.maintenance').is(':checked')) {
    //
    //        $('.maintenancePrice').removeAttr('disabled');
    //        $('.maintenanceStartDate').removeAttr('disabled');
    //        $('.maintenanceEndDate').removeAttr('disabled');
    //    } else {
    //        $('.maintenancePrice').attr('disabled', "disabled").val('');
    //        $('.maintenanceStartDate').attr('disabled', "disabled").val('');
    //        $('.maintenanceEndDate').attr('disabled', "disabled").val('');
    //    }
    //
    //}
});
//
//updateTpl.helpers({
//    data: function () {
//        var data = Rabbit.Collection.Service.findOne(this._id);
//        return data;
//    }
//});
//
///**
// * Show
// */
//showTpl.onCreated(function () {
//    this.subscribe('rabbit_service', this.data._id);
//});
//
//showTpl.helpers({
//    data: function () {
//        var data = Rabbit.Collection.Service.findOne(this._id);
//        return data;
//
//    }
//});

/**
 * Hook
 */
AutoForm.hooks({
    // Service
    rabbit_serviceInsert: {
        before: {

            insert: function (doc) {
                doc.branchId = Session.get('currentBranch');
                var prefix = doc.branchId + '-';
                Meteor.call('rabbit', prefix);
                return doc;

            }

        },
        onSuccess: function (formType, result) {
            alertify.service().close();
            alertify.success('Success');
        },
        onError: function (formType, error) {
            alertify.error(error.message);
        }
    },
    rabbit_serviceUpdate: {
        onSuccess: function (formType, result) {
            alertify.service().close();
            alertify.success('Success');
        },
        onError: function (formType, error) {
            alertify.error(error.message);
        }
    }
});
var configOnRender = function () {
    debugger;
    // serviceDate
    var serviceDate = $('[name="serviceDate"]');
    DateTimePicker.date(serviceDate);
//  maintenanceDate
    var maintenanceStartDate = $('[name="maintenanceStartDate"]');
    DateTimePicker.date(maintenanceStartDate);
    var maintenanceEndDate = $('[name="maintenanceEndDate"]');
    DateTimePicker.date(maintenanceEndDate);
    //  hostingDate
    var hostingStartDate = $('[name="hostingStartDate"]');
    DateTimePicker.date(hostingStartDate);
    var hostingEndDate = $('[name="hostingEndDate"]');
    DateTimePicker.date(hostingEndDate);
    //  domainNameDate
    var domainNameStartDate = $('[name="domainNameStartDate"]');
    DateTimePicker.date(domainNameStartDate);
    var domainNameEndDate = $('[name="domainNameEndDate"]');
    DateTimePicker.date(domainNameEndDate);


};
