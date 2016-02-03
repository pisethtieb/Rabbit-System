Meteor.methods({
    getWebsiteWithPayment(websiteId){

        var website = Rabbit.Collection.Website.findOne(websiteId);
        let paymentWebsite = Rabbit.Collection.PaymentWebsite.findOne({websiteId: websiteId}, {sort: {_id: -1}});
        let service = Rabbit.Collection.Service.findOne({websiteId: websiteId}, {sort: {_id: -1}});
        if (website._serviceCount > 0) {


            if (paymentWebsite == null) {
                return {
                    //build website price
                    buildPrice: website.price,
                    buildPaid: website.price,
                    buildDue: 0,
                    //service domain
                    domainNamePrice: service.domainNamePrice,
                    domainNamePaid: service.domainNamePrice,
                    domainNameDue: 0,

                    //hosting
                    hostingPrice: service.hostingPrice,
                    hostingPaid: service.hostingPrice,
                    hostingDue: 0,
                    //
                    maintenancePrice: service.maintenancePrice,
                    maintenancePaid: service.maintenancePrice,
                    maintenanceDue: 0

                };

            }
            else if (paymentWebsite.buildDue != 0 || paymentWebsite.hostingDue != 0 ||
                paymentWebsite.maintenanceDue != 0 || paymentWebsite.domainNameDue != 0) {
                if (paymentWebsite.hostingDue == null ||
                    paymentWebsite.maintenanceDue == null || paymentWebsite.domainNameDue == null) {
                    return {
                        //build
                        buildPrice: paymentWebsite.buildDue,
                        buildPaid: paymentWebsite.buildDue,
                        buildDue: 0,
                        //service domain
                        domainNamePrice: service.domainNamePrice,
                        domainNamePaid: service.domainNamePrice,
                        domainNameDue: 0,
                        //hosting
                        hostingPrice: service.hostingPrice,
                        hostingPaid: service.hostingPrice,
                        hostingDue: 0,
                        //maintenance
                        maintenancePrice: service.maintenancePrice,
                        maintenancePaid: service.maintenancePrice,
                        maintenanceDue: 0
                    }
                } else {
                    return {
                        //build
                        buildPrice: paymentWebsite.buildDue,
                        buildPaid: paymentWebsite.buildDue,
                        buildDue: 0,
                        //service domain
                        domainNamePrice: paymentWebsite.domainNameDue,
                        domainNamePaid: paymentWebsite.domainNameDue,
                        domainNameDue: 0,
                        //hosting
                        hostingPrice: paymentWebsite.hostingDue,
                        hostingPaid: paymentWebsite.hostingDue,
                        hostingDue: 0,
                        //maintenance
                        maintenancePrice: paymentWebsite.maintenanceDue,
                        maintenancePaid: paymentWebsite.maintenanceDue,
                        maintenanceDue: 0
                    }
                }

            }
        } else if (paymentWebsite == null) {
            return {
                //build website price
                buildPrice: website.price,
                buildPaid: website.price,
                buildDue: 0
            }
        } else if (paymentWebsite.buildDue > 0) {
            return {
                //build
                buildPrice: paymentWebsite.buildDue,
                buildPaid: paymentWebsite.buildDue,
                buildDue: 0,
                //
                domainNamePrice: service.domainNamePrice,
                domainNamePaid: service.domainNamePrice,
                domainNameDue: 0,
                //hosting
                hostingPrice: service.hostingPrice,
                hostingPaid: service.hostingPrice,
                hostingDue: 0,
                //maintenance
                maintenancePrice: service.maintenancePrice,
                maintenancePaid: service.maintenancePrice,
                maintenanceDue: 0
            }
        }
    }
});
