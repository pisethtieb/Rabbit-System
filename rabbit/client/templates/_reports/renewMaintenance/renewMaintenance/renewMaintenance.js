/**
 * Created by piseth on 1/28/16.
 */

var state = new ReactiveObj();

Template.dental_alertEventMsg.onRendered(function () {
    //$('.menu').slimScroll({
    //    height: '100%'
    //});

    Meteor.setInterval(function () {
        var data = appointmentEvent();

        state.set('data', data);
    }, 1000);
});


Template.dental_alertEventMsg.helpers({
    data: function () {
        return state.get('data');
    }
});

Template.dental_alertEventMsg.events({
    'click .eventItem': function () {
        var data = Rabbit.Collection.Maintenance.findOne(this._id);
        // Update status
        Rabbit.Collection.Maintenance.update({_id: this._id}, {$set: {status: 'Disable'}});
        alertify.alert(fa("eye", "Maintenance"), renderTemplate(Template.rabbit_maintenanceShow, data));


    }
});

// Count event
function appointmentEvent(alertDate, endDate) {
    var data = {};

    let today = moment().format("YYYY-MM-DD");
    var doc = Rabbit.Collection.Maintenance.find({endDate: {$lte: today}});

    if (doc.count() > 0) {
        data.count = doc.count();

        var event = [];
        doc.forEach(function (obj) {

            event.push(obj);
        });

        data.event = event;
    }
    return data;
}