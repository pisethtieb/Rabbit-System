Meteor.methods({
    rabbit_renewServiceReport: function (params) {
        var data = {
            title: {},
            header: {},
            content: [{index: 'No Result'}],
            footer: {}
        };

        date = s.words(params.date, ' To '),
            fDate = date[0],
            newDate = new Date(date[1]);
        var tDate = new Date(newDate.getFullYear(), newDate.getMonth(),
            newDate.getDate() + 1);
        tDate = moment(tDate).format('YYYY-MM-DD');
        //****** Title *****/
        data.title = Cpanel.Collection.Company.findOne();

        /****** Header *****/
        data.header = params;

        /****** Content *****/
        var content = [];
        var selector = {};
        //selector.serviceDate = {$gte: fDate, $lte: tDate};
        params.serviceDate = {$lte: moment(params.date + ' 23:59:59').format('YYYY-MM-DD HH:mm:ss')};
//console.log(params.serviceDate);
        //console.log(selector.serviceDate);
        if (!_.isEmpty(params.branch)) {
            selector.branchId = params.branch;
        }

        if (!_.isEmpty(params.websiteId)) {
            selector._id = params.websiteId;
        }
        var index = 1;
        let totalDomainName = 0;
        let totalHosting = 0;
        let totalMaintenance = 0;
        let website = Rabbit.Collection.Website.find(selector);
        website.forEach(function (obj) {
            let service = Rabbit.Collection.Service.findOne({websiteId: obj._id}, {sort: {_id: -1}});
            if (service) {
                if (service.domainNameEndDate < params.date || service.hostingEndDate < params.date || service.maintenanceEndDate < params.date) {
                    
                    service.index = index;
                    //total += service.price;
                    service.domainNamePrice = service.domainNamePrice == null ? 0 : service.domainNamePrice;
                    service.hostingPrice = service.hostingPrice == null ? 0 : service.hostingPrice;
                    service.maintenancePrice = service.maintenancePrice == null ? 0 : service.maintenancePrice;
                    totalDomainName += service.domainNamePrice;
                    totalHosting += service.hostingPrice;
                    totalMaintenance += service.maintenancePrice;
                    if (service.domainNameEndDate < params.date) {
                        service.domainNameEndDate = " <font color=red>" + service.domainNameEndDate + " </font>"
                        service.domainNameStartDate = " <font color=red>" + service.domainNameStartDate + " </font>"
                    } else {
                        service.domainNameEndDate = " <font color=green>" + service.domainNameEndDate + " </font>"
                        service.domainNameStartDate = " <font color=green>" + service.domainNameStartDate + " </font>"
                    }
                    if (service.hostingEndDate < params.date) {
                        service.hostingStartDate = " <font color=red>" + service.hostingStartDate + " </font>"
                        service.hostingEndDate = " <font color=red>" + service.hostingEndDate + " </font>"
                    } else {
                        service.hostingStartDate = " <font color=green>" + service.hostingStartDate + " </font>"
                        service.hostingEndDate = " <font color=green>" + service.hostingEndDate + " </font>"
                    }
                    if (service.maintenanceEndDate < params.date) {
                        service.maintenanceStartDate = " <font color=red>" + service.maintenanceStartDate + " </font>"
                        service.maintenanceEndDate = " <font color=red>" + service.maintenanceEndDate + " </font>"
                    } else {
                        service.maintenanceStartDate = " <font color=green>" + service.maintenanceStartDate + " </font>"
                        service.maintenanceEndDate = " <font color=green>" + service.maintenanceEndDate + " </font>"
                    }
                    content.push(service);
                    index++;
                }
            }
        });

        if (content.length > 0) {
            data.content = content;
            data.footer.totalDomainName = totalDomainName;
            data.footer.totalHosting = totalHosting;
            data.footer.totalMaintenance = totalMaintenance;
        }
        if (params.branch == '') {
            params.branch = 'All'
        } else {
            params.branch = params.branch;
        }

        //if (params.customerId == '') {
        //    params.customerId = 'All'
        //
        //} else {
        //
        //    params.customerId = Rabbit.Collection.Customer.findOne({_id: params.customerId}).companyName;
        //}
        /****** Header *****/
        data.header = params;

        return data
    }
});
