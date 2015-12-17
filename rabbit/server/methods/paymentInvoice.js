Meteor.methods({
    paymentInvoice: function (paymentId) {
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

        let payment = Rabbit.Collection.Payment.findOne(paymentId);
        //show product Name
        let product = Rabbit.Collection.Contract.findOne(payment.contractId);
        data.product = product._product
        //show payment Info
        data.payment = payment;

        //console.log(data.product);
        data.header = payment._customer;
        let i = 1;
        payment.office.forEach(function (obj) {

            let office = Rabbit.Collection.Office.findOne(obj.officeId);
            obj.index = i;
            obj.sumAmount = obj.price - obj.dueAmount;

            obj.officeName = office.name;

            data.content.push(obj);
            i++;

        });
        ///****** Content *****/
        //let i = 1;
        //var totalPrice = 0;
        //let sumAmount = 0;
        ////let maintenancePrice = 0;
        //let office = Rabbit.Collection.Office.find({contractId: payment.contractId});
        //if (office.count() > 0) {
        //    office.forEach(function (obj) {
        //        let payment = Rabbit.Collection.Payment.findOne({officeId: obj._id}, {sort: {_id: -1}});
        //        data.payment.push(payment);
        //        if (payment) {
        //            obj.sumAmount = parseFloat(payment.price);
        //            obj.paidAmount = parseFloat(payment.paidAmount);
        //            obj.dueAmount = parseFloat(payment.dueAmount);
        //        } else {
        //            obj.sumAmount = 0;
        //            obj.paidAmount = 0;
        //            obj.sumAmount = parseFloat(payment.price);
        //
        //        }
        //
        //        totalPrice += parseFloat(obj.price);
        //        obj.index = i;
        //        data.content.push(obj);
        //        i++;
        //
        //
        //    });
        //}
        //
        ////
        //
        //data.footer.totalPrice = totalPrice;
        //data.footer.maintenancePrice = maintenancePrice;
        //data.footer.paidAmountOffice = paidAmountOffice;
        //data.footer.paidAmountMaitenance = paidAmountMaintenance;
        //data.content.dueAmountOffice = totalPrice - paidAmountOffice;
        //data.footer.dueAmountMaintenance = maintenancePrice - paidAmountMaintenance;

        return data

    }
});