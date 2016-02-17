Meteor.methods({
    paymentWebsiteInvoice: function (paymentWebsiteId) {
        var data = {
            title: {},
            header: {},
            content: [],
            footer: {},
            custom: {},
            payment: [],
            product: []
        };
        //var exchange = Cpanel.Collection.Exchange.findOne({}, {sort: {dateTime: -1}});
        //fx.base = exchange.base;
        //fx.rates = exchange.rates;
        /****** Title *****/
        data.title = Cpanel.Collection.Company.findOne();
        /****** Header *****/
        //data.header = params;
        let paymentWebsite = Rabbit.Collection.PaymentWebsite.findOne(paymentWebsiteId);
        paymentWebsite.domainNamePrice = paymentWebsite.domainNamePrice == null ? 0 : paymentWebsite.domainNamePrice;
        paymentWebsite.domainNamePaid = paymentWebsite.domainNamePaid == null ? 0 : paymentWebsite.domainNamePaid;
        paymentWebsite.domainNameDue = paymentWebsite.domainNameDue == null ? 0 : paymentWebsite.domainNameDue;
        paymentWebsite.hostingPrice = paymentWebsite.hostingPrice == null ? 0 : paymentWebsite.hostingPrice;
        paymentWebsite.hostingPaid = paymentWebsite.hostingPaid == null ? 0 : paymentWebsite.hostingPaid;
        paymentWebsite.hostingDue = paymentWebsite.hostingDue == null ? 0 : paymentWebsite.hostingDue;
        paymentWebsite.maintenancePrice = paymentWebsite.maintenancePrice == null ? 0 : paymentWebsite.maintenancePrice;
        paymentWebsite.maintenancePaid = paymentWebsite.maintenancePaid == null ? 0 : paymentWebsite.maintenancePaid;
        paymentWebsite.miantenanceDue = paymentWebsite.miantenanceDue == null ? 0 : paymentWebsite.miantenanceDue;
        paymentWebsite.buildPaid = paymentWebsite.buildPaid == null ? 0 : paymentWebsite.buildPaid;
        paymentWebsite.buildDue = paymentWebsite.buildDue == null ? 0 : paymentWebsite.buildDue;
        //let website = Rabbit.Collection.PaymentWebsite.find({
        //    websiteId: paymentWebsite.websiteId
        //});
        let service = Rabbit.Collection.Service.findOne({websiteId: paymentWebsite.websiteId}, {short: {_id: -1}})

        data.service = service;
        let getPrice = Rabbit.Collection.Website.findOne(paymentWebsite.websiteId);
        data.buildPrice = getPrice.price;

        data.builSumPaid = getPrice.price - paymentWebsite.buildDue;
        data.buildDue = paymentWebsite.buildDue;


        data.header = paymentWebsite._customer;
        data.content = paymentWebsite;
        console.log(data.content)
        data.header.paymentDate = paymentWebsite.paymentWebsiteDate;
        data.header.websiteName = paymentWebsite._website.webName;
        //console.log(paymentWebsite.buildDue);
        //console.log(paymentWebsite.domainNameDue);
        //console.log(paymentWebsite.hostingDue);

        if (paymentWebsite.maintenanceDue == null) {
            paymentWebsite.maintenanceDue = 0;
        }

        let total = getPrice.price + paymentWebsite.domainNamePrice + paymentWebsite.hostingPrice + paymentWebsite.maintenancePrice;
        let due = paymentWebsite.buildDue + paymentWebsite.domainNameDue + paymentWebsite.hostingDue + paymentWebsite.maintenanceDue;
        let totalPaid = data.builSumPaid + paymentWebsite.domainNamePaid + paymentWebsite.hostingPaid + paymentWebsite.maintenancePaid;

        data.footer.total = total;
        data.footer.due = due;
        data.footer.totalPaid = totalPaid;
        return data

    }
});
