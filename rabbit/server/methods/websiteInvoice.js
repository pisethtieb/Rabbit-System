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
        let website = Rabbit.Collection.PaymentWebsite.find({
            websiteId: paymentWebsite.websiteId
        });
        let getPrice = Rabbit.Collection.Website.findOne(paymentWebsite.websiteId);
        data.buildPrice = getPrice.price;
        if (paymentWebsite.buildDue == '' || paymentWebsite.buildDue == null) {
            paymentWebsite.buildDue = 0;
            data.builSumPaid = getPrice.price - paymentWebsite.buildDue;
            data.buildDue = paymentWebsite.buildDue;
            data.footer.totalPaid = data.builSumPaid + paymentWebsite.domainNamePaid + paymentWebsite.hostingPaid + paymentWebsite.maintenancePaid;

        } else {
            data.builSumPaid = getPrice.price - paymentWebsite.buildDue;
            data.buildDue = paymentWebsite.buildDue;


        }
        data.header = paymentWebsite._customer;
        data.content = paymentWebsite;
        data.header.paymentDate = paymentWebsite.paymentWebsiteDate;
        data.header.websiteName = paymentWebsite._website.webName;

        let total = getPrice.price + paymentWebsite.domainNamePrice + paymentWebsite.hostingPrice + paymentWebsite.maintenancePrice;
        let due = paymentWebsite.buildDue + paymentWebsite.domainNameDue + paymentWebsite.hostingDue + paymentWebsite.maintenanceDue;

        data.footer.total = total;
        data.footer.due = due;
        return data

    }
});
