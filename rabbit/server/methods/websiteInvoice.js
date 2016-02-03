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
        data.header = paymentWebsite._customer;


        data.content = paymentWebsite;
        data.header.paymentDate = paymentWebsite.paymentWebsiteDate;
        data.header.websiteName = paymentWebsite._website.webName;
        return data

    }
});
