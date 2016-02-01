Meteor.methods({
    websiteInvoice: function (websiteId) {
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
        ///****** Title *****/
        //data.title = Cpanel.Collection.Company.findOne();
        ///****** Header *****/
        ////data.header = params;
        //
        //let website = Rabbit.Collection.PaymentOffice.findOne({_id: websiteId});
        ////show product Name
        //let service = Rabbit.Collection.Contract.findOne({websiteId: websiteId});
        ////data.header = product._product
        ////show paymentOffice Info
        //data.payment = paymentOffice;
        //
        ////console.log(data.product);
        //data.header = website._customer;
        //let i = 1;
        //let totalPrice = 0;
        //let sumPaid = 0;
        ////let dueAmount = 0;
        ////paymentOffice.office.forEach(function (obj) {
        ////
        ////    let office = Rabbit.Collection.Office.findOne(obj.officeId);
        ////    obj.index = i;
        ////    totalPrice += parseFloat(office.price);
        ////
        ////    obj.priceOffice = office.price;
        ////    obj.sumAmount = office.price - obj.dueAmount;
        ////    sumPaid += parseFloat(obj.sumAmount);
        ////    dueAmount += parseFloat(obj.dueAmount);
        ////    obj.officeName = office.name;
        ////    data.content.push(obj);
        ////    i++;
        ////
        ////});
        //data.footer.totalPrice = numeral(totalPrice).format('$0,0.00');
        ////data.footer.maintenancePrice = maintenancePrice;
        //data.footer.sumPaid = numeral(sumPaid).format('$0,0.00');
        //data.footer.dueAmount = numeral(dueAmount).format('$0,0.00');
        ////data.footer.paidAmountMaitenance = paidAmountMaintenance;
        ////data.content.dueAmountOffice = totalPrice - paidAmountOffice;
        ////data.footer.dueAmountMaintenance = maintenancePrice - paidAmountMaintenance;
        //
        //return data

    }
});
