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
                    arr.push(maintenance._id, maintenance.paymentMaintenanceDate);
                }
            }
        });
    }
    Counts.publish(this, 'alertRenewMaintenance', Rabbit.Collection.Maintenance.find({_id: {$in: arr}}));

    this.ready();
});

Meteor.publish('alertRenewService', function () {
    let today = moment().format("YYYY-MM-DD");
    var doc = Rabbit.Collection.Service.find();
    if (doc != null) {
        var arr = [];
        doc.forEach(function (obj) {
            let service = Rabbit.Collection.Service.findOne({websiteId: obj.websiteId}, {sort: {_id: -1}});
            if (service) {
                if ((service.domainNameEndDate <= today || service.hostingEndDate <= today || service.maintenanceEndDate <= today)) {
                    arr.push(service._id);
                }

            }
        });
    }
    Counts.publish(this, 'alertRenewService', Rabbit.Collection.Service.find({_id: {$in: arr}}));

    this.ready();
});
