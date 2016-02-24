/**
 * Created by piseth on 1/28/16.
 */

var state = new ReactiveObj();

Template.service_alertEventMsg.onRendered(function () {
    //$('.menu').slimScroll({
    //    height: '100%'
    //});

    Meteor.setInterval(function () {
        var data = appointmentEvent();

        state.set('data', data);
    }, 1000);
});


Template.service_alertEventMsg.helpers({
    data: function () {
        return state.get('data');
    }
});

//Template.service_alertEventMsg.events({
//    'click .renewService': function () {
//        Meteor.subscribe('rabbit_service');
//        var data = Rabbit.Collection.Service.findOne(this._id);
//        // Update status
//        Rabbit.Collection.Service.update({_id: this._id}, {$set: {status: 'yes'}});
//        alertify.alert(fa("eye", "Service"), renderTemplate(Template.rabbit_ServiceShow, data));
//
//
//    }
//});

// Count event
function appointmentEvent(alertDate, endDate) {
    var data = {};
    Meteor.subscribe('rabbit_service');
    let today = moment().format("YYYY-MM-DD");
    //var office = ReactiveMethod.call('getOfficeWithContract', contractId);
    var doc = Rabbit.Collection.Service.find();
    debugger;
    if (doc != null) {
        var event = [];
        data.count = 0;
        doc.forEach(function (obj) {
            let service = Rabbit.Collection.Service.findOne({websiteId: obj.websiteId}, {sort: {_id: -1}});
            if (service && service._id == obj._id) {
                if ((service.domainNameEndDate <= today || service.hostingEndDate <= today || service.maintenanceEndDate <= today)) {
                    data.count += 1;
                }
                event.push(obj);
            }
        });

        data.event = event;
    }
    return data;
}