Meteor.methods({
    rabbit_paymentWebsiteBalanceReport: function (params) {
        var data = {
            title: {},
            header: {},
            content: [],
            footer: {}
        };
        data.title = Cpanel.Collection.Company.findOne();

        date = s.words(params.date, ' To '),
            fDate = date[0],
            newDate = new Date(date[1]);
        var tDate = new Date(newDate.getFullYear(), newDate.getMonth(),
            newDate.getDate() + 1);
        tDate = moment(tDate).format('YYYY-MM-DD');
        //var date = s.words(params.date, ' To ');
        //var fDate = moment(date[0], 'YYYY-MM-DD').toDate();
        //var tDate = moment(date[1], 'YYYY-MM-DD').add(1, 'days').toDate();
        //****** Title *****/
        data.title = Cpanel.Collection.Company.findOne();

        /****** Header *****/
        data.header = params;
        params.paymentWebisteDate = {$lte: moment(params.date + ' 23:59:59').format('YYYY-MM-DD HH:mm:ss')};

        /****** Content *****/
        var content = [];
        var selector = {};
        //
        if (!_.isEmpty(params.branch)) {
            //selector.branchId = params.branch;
        }
        if (!_.isEmpty(params.websiteId)) {
            selector._id = params.websiteId
        }
        var index = 1;
        let totalBuildPrice = 0,
            totalBuildPaid = 0,
            totalBuildDue = 0,
            totalDomainNamePrice = 0,
            totalDomainNamePaid = 0,
            totalDomainNameDue = 0,
            totalHostingPrice = 0,
            totalHostingPaid = 0,
            totalHostingDue = 0,
            totalMaintenancePrice = 0,
            totalMaintenancePaid = 0,
            totalMaintenanceDue = 0;

        let website = Rabbit.Collection.Website.find(selector);
        website.forEach(function (o) {

            var paymentWebsite = Rabbit.Collection.PaymentWebsite.findOne({
                websiteId: o._id,
                paymentWebsiteDate: params.paymentWebisteDate
            }, {sort: {_id: -1}});
            if (paymentWebsite != null) {

                paymentWebsite.index = index;
                paymentWebsite.domainNamePrice = paymentWebsite.domainNamePrice == null ? 0 : paymentWebsite.domainNamePrice;
                paymentWebsite.domainNamePaid = paymentWebsite.domainNamePaid == null ? 0 : paymentWebsite.domainNamePaid;
                paymentWebsite.domainNameDue = paymentWebsite.domainNameDue == null ? 0 : paymentWebsite.domainNameDue;
                paymentWebsite.hostingPrice = paymentWebsite.hostingPrice == null ? 0 : paymentWebsite.hostingPrice;
                paymentWebsite.hostingPaid = paymentWebsite.hostingPaid == null ? 0 : paymentWebsite.hostingPaid;
                paymentWebsite.hostingDue = paymentWebsite.hostingDue == null ? 0 : paymentWebsite.hostingDue;
                paymentWebsite.maintenancePrice = paymentWebsite.maintenancePrice == null ? 0 : paymentWebsite.maintenancePrice;
                paymentWebsite.maintenancePaid = paymentWebsite.maintenancePaid == null ? 0 : paymentWebsite.maintenancePaid;
                paymentWebsite.miantenanceDue = paymentWebsite.miantenanceDue == null || paymentWebsite.miantenanceDue == undefined ? 0 : paymentWebsite.miantenanceDue;
                paymentWebsite.buildPrice = paymentWebsite.buildPrice == null ? 0 : paymentWebsite.buildPrice;
                paymentWebsite.buildPaid = paymentWebsite.buildPaid == null ? 0 : paymentWebsite.buildPaid;
                paymentWebsite.buildDue = paymentWebsite.buildDue == null ? 0 : paymentWebsite.buildDue;
                if (paymentWebsite.buildDue > 0 || paymentWebsite.maintenanceDue > 0 || paymentWebsite.hostingDue > 0 || paymentWebsite.domainNameDue > 0) {
                    totalBuildPrice += paymentWebsite.buildPrice;
                    totalBuildDue += paymentWebsite.buildDue;
                    totalBuildPaid += paymentWebsite.buildPaid;

                    totalDomainNamePrice += paymentWebsite.domainNamePrice;
                    totalDomainNamePaid += paymentWebsite.domainNamePaid;
                    totalDomainNameDue += paymentWebsite.domainNameDue;

                    totalHostingPrice += paymentWebsite.hostingPrice;
                    totalHostingPaid += paymentWebsite.hostingPaid;
                    totalHostingDue += paymentWebsite.hostingDue;

                    totalMaintenancePrice += paymentWebsite.maintenancePrice;
                    totalMaintenancePaid += paymentWebsite.maintenancePaid;
                    if (paymentWebsite.maintenanceDue == undefined) {
                        paymentWebsite.maintenanceDue = 0;
                    }
                    totalMaintenanceDue += paymentWebsite.maintenanceDue;
                    data.content.push(paymentWebsite);
                    index++;
                }
            }


        });
        if (data.content.length > 0) {
            // data.content = content;
            data.footer.totalBuildPrice = totalBuildPrice;
            data.footer.totalBuildPaid = totalBuildPaid;
            data.footer.totalBuildDue = totalBuildDue;

            data.footer.totalDomainNamePrice = totalDomainNamePrice;
            data.footer.totalDomainNamePaid = totalDomainNamePaid;
            data.footer.totalDomainNameDue = totalDomainNameDue;

            data.footer.totalHostingPrice = totalHostingPrice;
            data.footer.totalHostingPaid = totalHostingPaid;
            data.footer.totalHostingDue = totalHostingDue;

            data.footer.totalMaintenancePrice = totalMaintenancePrice;
            data.footer.totalMaintenancePaid = totalMaintenancePaid;
            data.footer.totalMaintenanceDue = totalMaintenanceDue;

        }

        if (params.branch == '') {
            params.branch = 'All'
        }

        if (params.contractId == '') {
            params.contractId = 'All'
        }
        /****** Header *****/
        data.header = params;


        return data
    }
});
