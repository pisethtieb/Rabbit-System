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
        let customer = Rabbit.Collection.Website.findOne({_id: paymentWebsite.websiteId});
        data.header = customer._customer;
        data.header.paymentDate = paymentWebsite.paymentWebsiteDate;
        data.header.websiteName = customer.webName;
//data

        //console.log(data.product);
        //let i = 1;
        //let totalPrice = 0;
        //let sumPaid = 0;
        //let dueAmount = 0;
        //paymentOffice.office.forEach(function (obj) {
        //
        //    let office = Rabbit.Collection.Office.findOne(obj.officeId);
        //    obj.index = i;
        //    totalPrice += parseFloat(office.price);
        //
        //    obj.priceOffice = office.price;
        //    obj.sumAmount = office.price - obj.dueAmount;
        //    sumPaid += parseFloat(obj.sumAmount);
        //    dueAmount += parseFloat(obj.dueAmount);
        //    obj.officeName = office.name;
        //    data.content.push(obj);
        //    i++;
        //
        //});
        //data.footer.totalPrice = numeral(totalPrice).format('$0,0.00');
        ////data.footer.maintenancePrice = maintenancePrice;
        //data.footer.sumPaid = numeral(sumPaid).format('$0,0.00');
        //data.footer.dueAmount = numeral(dueAmount).format('$0,0.00');
        //data.footer.paidAmountMaitenance = paidAmountMaintenance;
        //data.content.dueAmountOffice = totalPrice - paidAmountOffice;
        //data.footer.dueAmountMaintenance = maintenancePrice - paidAmountMaintenance;

        return data

    }
});
