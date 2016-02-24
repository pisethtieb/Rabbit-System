//Meteor.methods({
//    getRenewServiceAlert(){
//        let today = moment().format("YYYY-MM-DD");
//
//        var doc = Rabbit.Collection.Service.find();
//        console.log(doc.count());
//        if (doc != null) {
//            var event = [];
//            data.count = 0;
//            doc.forEach(function (obj) {
//                let service = Rabbit.Collection.Service.findOne({websiteId: obj.websiteId}, {sort: {_id: -1}});
//                if (service && service._id == obj._id) {
//                    if ((service.domainNameEndDate <= today || service.hostingEndDate <= today || service.maintenanceEndDate <= today)) {
//                        data.count += 1;
//                    }
//                    event.push(obj);
//                }
//            });
//
//            data.event = event;
//        }
//        return data
//    }
//});
