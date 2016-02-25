/**
 * Created by piseth on 2/25/16.
 */
Meteor.publish('alertRenewMaintenance', function () {
    let today = moment().format("YYYY-MM-DD");
    var doc = Rabbit.Collection.Maintenance.find({endDate: {$lte: today}}, {sort: {_id: -1}});
    if (doc) {
        var arr = [];
        doc.forEach(function (obj) {
            let maintenance = Rabbit.Collection.Maintenance.findOne({officeId: obj.officeId}, {sort: {_id: -1}});
            if (maintenance) {
                if (maintenance._id == obj._id && maintenance.endDate <= today) {
                    //maintenance.countIndex = [maintenance];
                    arr.push(maintenance._id);
                }
            }
        });
    }
    Counts.publish(this, 'alertRenewMaintenance', Rabbit.Collection.Maintenance.find({_id:{$in:arr}}));

    this.ready();
});
