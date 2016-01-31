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
        let contractId = FlowRouter.getParam('contractId');
        return {
            contractId: contractId,
            serviceDate: moment(ReactiveMethod.call("currentDate"), 'YYYY-MM-DD').format('YYYY-MM-DD'),
        }
    }
});
insertTpl.events({
  "change .domainName"(e,t){

    let domain=$('.domainName').prop();

    console.log(domain);
    // if(domain==checked){
    //     $('.domainNamePrice').removeAttr('disabled');
    //     $('.domainNameStartDate').removeAttr('disabled');
    //     $('.domainNameEndDate').removeAttr('disabled');
    // }else if (domain=="off"){
    //   $('.domainNamePrice').attr('disabled', "disabled");
    //   $('.domainNameStartDate').attr('disabled', "disabled");
    //   $('.domainNameEndDate').attr('disabled', "disabled");
    // }

  }


});
/**
 * Update
 */
updateTpl.onCreated(function () {
    this.subscribe('rabbit_service', this.data._id);
});

updateTpl.onRendered(function () {
    configOnRender();
});


updateTpl.events({
    'change .type'(e, t) {
        let type = $(e.currentTarget).val();
        var contractId = FlowRouter.getParam('contractId');
        var contract = Rabbit.Collection.Contract.findOne({_id: contractId});
        //let types = Rabbit.List.getProduct(type);
        let service = Rabbit.Collection.Service.findOne({contractId: contractId});
        if (type == 'HO' && service != null) {
            $('.type').val("BO");
            $('.type').change();
            $('.discount').val(0);
            $('[name=price]').val(contract.basePrice[0].branch);

        } else if (type == 'BO' && service == null) {
            $('.type').val("HO");
            $('.type').change();
            $('.discount').val(0);
            $('[name=price]').val(contract.basePrice[0].headService);
            $('[name=contractPrice]').val(contract.basePrice[0].headService);
        } else if (type == 'BO') {
            $('.discount').val(0);
            $('[name=price]').val(contract.basePrice[0].branch);
            $('[name=contractPrice]').val(contract.basePrice[0].branch);
        } else if (type == "HO") {
            $('.discount').val(0);
            $('[name=price]').val(contract.basePrice[0].headService);
            $('[name=contractPrice]').val(contract.basePrice[0].headService);

        } else {
            $('.discount').val('');
            $('[name=price]').val("");
            $('[name=contractPrice]').val("");
        }
    },
    'keyup .discount'(e){

        $('#price').val($('.contractPrice').val() - $('.discount').val());
    }
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
    // date
    var serviceDate = $('[name="serviceDate"]');
    DateTimePicker.date(serviceDate);
};
