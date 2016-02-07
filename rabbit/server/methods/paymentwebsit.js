Meteor.methods({
    getWebsiteWithPayment(websiteId){
        var website = Rabbit.Collection.Website.findOne({_id: websiteId});
        let paymentWebsite = Rabbit.Collection.PaymentWebsite.findOne({websiteId: website._id}, {sort: {_id: -1}});
        let service = Rabbit.Collection.Service.findOne({websiteId: website._id}, {sort: {_id: -1}});
        if (paymentWebsite != null) {
            if (website._serviceCount > 0) {
                if (paymentWebsite.buildDue > 0 || paymentWebsite.hostingDue > 0 ||
                    paymentWebsite.maintenanceDue > 0 || paymentWebsite.domainNameDue > 0) {

                    if (service._id == paymentWebsite.serviceId) {
                        return {
                            serviceId: paymentWebsite.serviceId,
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
                    } else if (service._id != paymentWebsite.serviceId) {
                        return {
                            buildPrice: paymentWebsite.buildDue,
                            buildPaid: paymentWebsite.buildDue,
                            buildDue: 0,
                            //
                            serviceId: service._id,
                            domainNamePrice: service.domainNameTotalPrice,
                            domainNamePaid: service.domainNameTotalPrice,
                            domainNameDue: 0,
                            //hosting
                            hostingPrice: service.hostingTotalPrice,
                            hostingPaid: service.hostingTotalPrice,
                            hostingDue: 0,
                            //maintenance
                            maintenancePrice: service.maintenanceTotalPrice,
                            maintenancePaid: service.maintenanceTotalPrice,
                            maintenanceDue: 0
                        }
                    }
                } else {
                    if (service._id != paymentWebsite.serviceId) {

                        return {
                            serviceId: service._id,
                            domainNamePrice: service.domainNameTotalPrice,
                            domainNamePaid: service.domainNameTotalPrice,
                            domainNameDue: 0,
                            //hosting
                            hostingPrice: service.hostingTotalPrice,
                            hostingPaid: service.hostingTotalPrice,
                            hostingDue: 0,
                            //maintenance
                            maintenancePrice: service.maintenanceTotalPrice,
                            maintenancePaid: service.maintenanceTotalPrice,
                            maintenanceDue: 0
                        }
                    }

                }
            } else {
                if (paymentWebsite.buildDue > 0) {
                    return {
                        buildPrice: paymentWebsite.buildDue,
                        buildPaid: paymentWebsite.buildDue,
                        buildDue: 0
                    }
                }
            }
        } else {
            if (website._serviceCount > 0) {
                return {
                    serviceId: service._id,
                    buildPrice: website.price,
                    buildPaid: website.price,
                    buildDue: 0,
                    //service domain
                    domainNamePrice: service.domainNameTotalPrice,
                    domainNamePaid: service.domainNameTotalPrice,
                    domainNameDue: 0,
                    //hosting
                    hostingPrice: service.hostingTotalPrice,
                    hostingPaid: service.hostingTotalPrice,
                    hostingDue: 0,
                    //maintenance
                    maintenancePrice: service.maintenanceTotalPrice,
                    maintenancePaid: service.maintenanceTotalPrice,
                    maintenanceDue: 0
                }
            } else {
                return {
                    buildPrice: website.price,
                    buildPaid: website.price,
                    buildDue: 0
                }
            }
        }
        //if (website._serviceCount > 0) {
        //    if (paymentWebsite == null) {
        //        return {
        //            //build website price
        //            buildPrice: website.price,
        //            buildPaid: website.price,
        //            buildDue: 0,
        //            //service domain
        //            domainNamePrice: service.domainNamePrice,
        //            domainNamePaid: service.domainNamePrice,
        //            domainNameDue: 0,
        //            //hosting
        //            hostingPrice: service.hostingPrice,
        //            hostingPaid: service.hostingPrice,
        //            hostingDue: 0,
        //            //maintenance
        //            maintenancePrice: service.maintenancePrice,
        //            maintenancePaid: service.maintenancePrice,
        //            maintenanceDue: 0
        //        };
        //    }
        //    else if (paymentWebsite.buildDue != 0 || paymentWebsite.hostingDue != 0 ||
        //        paymentWebsite.maintenanceDue != 0 || paymentWebsite.domainNameDue != 0) {
        //        if ((paymentWebsite.hostingDue == null || paymentWebsite.hostingDue == 0) &&
        //            (paymentWebsite.maintenanceDue == null || paymentWebsite.hostingDue == 0) &&
        //            (paymentWebsite.domainNameDue == null || paymentWebsite.hostingDue == 0)) {
        //            return {
        //                //build
        //                buildPrice: paymentWebsite.buildDue,
        //                buildPaid: paymentWebsite.buildDue,
        //                buildDue: 0,
        //                //service domain
        //                domainNamePrice: service.domainNamePrice,
        //                domainNamePaid: service.domainNamePrice,
        //                domainNameDue: 0,
        //                //hosting
        //                hostingPrice: service.hostingPrice,
        //                hostingPaid: service.hostingPrice,
        //                hostingDue: 0,
        //                //maintenance
        //                maintenancePrice: service.maintenancePrice,
        //                maintenancePaid: service.maintenancePrice,
        //                maintenanceDue: 0
        //            }
        //        } else {
        //            return {
        //                //build
        //                buildPrice: paymentWebsite.buildDue,
        //                buildPaid: paymentWebsite.buildDue,
        //                buildDue: 0,
        //                //service domain
        //                domainNamePrice: paymentWebsite.domainNameDue,
        //                domainNamePaid: paymentWebsite.domainNameDue,
        //                domainNameDue: 0,
        //                //hosting
        //                hostingPrice: paymentWebsite.hostingDue,
        //                hostingPaid: paymentWebsite.hostingDue,
        //                hostingDue: 0,
        //                //maintenance
        //                maintenancePrice: paymentWebsite.maintenanceDue,
        //                maintenancePaid: paymentWebsite.maintenanceDue,
        //                maintenanceDue: 0
        //            }
        //        }
        //    } else if (service
        //        && (paymentWebsite.hostingDue == null || paymentWebsite.hostingDue == 0) &&
        //        5(paymentWebsite.maintenanceDue == null || paymentWebsite.hostingDue == 0) &&
        //        (paymentWebsite.domainNameDue == null || paymentWebsite.hostingDue == 0)) {
        //        if (paymentWebsite.domainNamePrice > 0 || null) {
        //            return {
        //                //build
        //                buildPrice: paymentWebsite.buildDue,
        //                buildPaid: paymentWebsite.buildDue,
        //                buildDue: 0,
        //                //service domain
        //                domainNamePrice: paymentWebsite.domainNameDue,
        //                domainNamePaid: paymentWebsite.domainNameDue,
        //                domainNameDue: 0,
        //                //hosting
        //                hostingPrice: paymentWebsite.hostingDue,
        //                hostingPaid: paymentWebsite.hostingDue,
        //                hostingDue: 0,
        //                //maintenance
        //                maintenancePrice: paymentWebsite.maintenanceDue,
        //                maintenancePaid: paymentWebsite.maintenanceDue,
        //                maintenanceDue: 0
        //
        //
        //            }
        //        } else {
        //            return {
        //                domainNamePrice: service.domainNamePrice,
        //                domainNamePaid: service.domainNamePrice,
        //                domainNameDue: 0,
        //                //hosting
        //                hostingPrice: service.hostingPrice,
        //                hostingPaid: service.hostingPrice,
        //                hostingDue: 0,
        //                //maintenance
        //                maintenancePrice: service.maintenancePrice,
        //                maintenancePaid: service.maintenancePrice,
        //                maintenanceDue: 0
        //            }
        //        }
        //    }
        //} else if (website._serviceCount == 0 || website._serviceCount == null) {
        //    if (paymentWebsite == null) {
        //        return {
        //            buildPrice: website.price,
        //            buildPaid: website.price,
        //            buildDue: 0
        //        }
        //    } else {
        //        return {
        //            buildPrice: paymentWebsite.buildDue,
        //            buildPaid: paymentWebsite.buildDue,
        //            buildDue: 0
        //        }
        //
        //    }
        //}
        // else if (paymentWebsite.buildDue > 0) {
        //    return {
        //        //build
        //        buildPrice: paymentWebsite.buildDue,
        //        buildPaid: paymentWebsite.buildDue,
        //        buildDue: 0,
        //        //domain
        //        domainNamePrice: service.domainNamePrice,
        //        domainNamePaid: service.domainNamePrice,
        //        domainNameDue: 0,
        //        //hosting
        //        hostingPrice: service.hostingPrice,
        //        hostingPaid: service.hostingPrice,
        //        hostingDue: 0,
        //        //maintenance
        //        maintenancePrice: service.maintenancePrice,
        //        maintenancePaid: service.maintenancePrice,
        //        maintenanceDue: 0
        //    }
        //}
    }
})
;
