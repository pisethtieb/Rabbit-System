/**
 * Created by piseth on 2/25/16.
 */
//Meteor.publish('alertRenewMaintenance', function () {
//    let today = moment().format("YYYY-MM-DD");
//    //var doc = Rabbit.Collection.Maintenance.find({endDate: {$lte: today}}, {sort: {_id: -1}});
//    //if (doc) {
//    //    var event = [data];
//    //
//    //    doc.forEach(function (obj) {
//    //        let maintenance = Rabbit.Collection.Maintenance.findOne({officeId: obj.officeId}, {sort: {_id: -1}});
//    //        if (maintenance._id == obj._id && maintenance.endDate <= today) {
//    //            data += 1;
//    //        }
//    //        //event.push(data);
//    //    });
//    //    console.log(event.count());
//    //    //data.event = event;
//    //    //console.log(data.event.count());
//    //}
//    //Counts.publish(this, 'alertRenewMaintenance', event);
//
//
//    Counts.publish(this, 'alertRenewMaintenance', Rabbit.Collection.Maintenance.find({endDate: {$lte: today},}));
//
//    this.ready();
//});
