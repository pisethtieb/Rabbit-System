Meteor.methods({
    getWebsiteWithPayment(websiteId){

        var website = Rabbit.Collection.Website.findOne(websiteId);
        let service = Rabbit.Collection.Service.findOne({websiteId: websiteId}, {sort: {_id: -1}});
        return {
            //build website price
            buildPrice: website.price,
            //service price
            domainNamePrice:service.domainNamePrice,
            hostingPrice:service.hostingPrice,
            maintenancePrice:service.maintenancePrice

        };
        //maintenances.forEach((maintenance)=> {
        //    var payment = Rabbit.Collection.PaymentMaintenance.findOne({
        //        'maintenance.maintenanceId': maintenance._id
        //    }, {
        //        sort: {
        //            _id: -1
        //        }
        //    });
        //
        //    if (payment != null) {
        //        payment.maintenance.forEach(function (payObj) {
        //            if (maintenance._id == payObj.maintenanceId && payObj.dueAmount > 0) {
        //                arr.push({
        //                    maintenanceId: payObj.maintenanceId,
        //                    maintenance: payObj.maintenance,
        //                    price: payObj.dueAmount,
        //                    dueAmount: payObj.dueAmount,
        //                    discount: 0
        //                });
        //            }
        //        });
        //    } else if (payment == null) {
        //        arr.push({
        //            maintenanceId: maintenance._id,
        //            maintenance: maintenance.type,
        //            price: maintenance.price,
        //            dueAmount: maintenance.price,
        //            discount: 0
        //        });
        //    }
        //});
        //maintenanceObj.maintenance = arr;
        //return maintenanceObj;
    }
});
