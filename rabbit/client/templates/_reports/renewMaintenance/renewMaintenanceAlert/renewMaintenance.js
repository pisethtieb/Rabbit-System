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
    'click .renewMaintenance': function () {
        Meteor.subscribe('rabbit_maintenance');
        var data = Rabbit.Collection.Maintenance.findOne(this._id);
        // Update status
        Rabbit.Collection.Maintenance.update({_id: this._id}, {$set: {status: 'yes'}});
        alertify.alert(fa("eye", "Maintenance"), renderTemplate(Template.rabbit_maintenanceShow, data));


    }
});

// Count event
function appointmentEvent(alertDate, endDate) {
    var data = {};
    Meteor.subscribe('rabbit_maintenance');
    let today = moment().format("YYYY-MM-DD");
    var doc = Rabbit.Collection.Maintenance.find({endDate: {$lte: today}}, {sort: {_id: -1}});
    if (doc) {
        var event = [];
        data.count = 0;
        doc.forEach(function (obj) {
            let maintenance = Rabbit.Collection.Maintenance.findOne({officeId: obj.officeId}, {sort: {_id: -1}});
            if (maintenance._id == obj._id && maintenance.endDate <= today) {
                data.count += 1;
            }
            event.push(obj);
        });

        data.event = event;
    }
    return data;
}