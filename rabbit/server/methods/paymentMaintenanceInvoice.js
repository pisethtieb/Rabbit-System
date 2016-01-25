Meteor.methods({
    paymentMaintenanceInvoice: function (paymentMaintenanceId) {
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

        let payment = Rabbit.Collection.PaymentMaintenance.findOne(paymentMaintenanceId);
        //show product Name
        let product = Rabbit.Collection.Contract.findOne(payment.contractId);
        data.product = product._product;
        //show paymentOffice Info
        data.payment = payment;

        //console.log(data.product);
        data.header = payment._customer;

        let i = 1;
        let totalPrice = 0;
        let sumPaid = 0;
        let dueAmount = 0;
        payment.maintenance.forEach(function (obj) {
            let maintenance = Rabbit.Collection.Maintenance.findOne(obj.maintenanceId);

            obj.index = i;
            obj.priceOffice = parseFloat(maintenance.price);
            totalPrice += parseFloat(maintenance.price);
            obj.sumAmount = maintenance.price - obj.dueAmount;
            sumPaid += obj.sumAmount;
            dueAmount += obj.dueAmount;
            obj.startDate = maintenance.startDate;
            obj.endDate = maintenance.endDate;
            obj.type = maintenance.type;
            obj.officeName = maintenance._office.name;
            data.content.push(obj);
            i++;
        });
        ///****** Content *****/
        //let i = 1;
        //var totalPrice = 0;
        //let sumAmount = 0;
        ////let maintenancePrice = 0;
        //let office = Rabbit.Collection.Office.find({contractId: paymentOffice.contractId});
        //if (office.count() > 0) {
        //    office.forEach(function (obj) {
        //        let paymentOffice = Rabbit.Collection.Payment.findOne({officeId: obj._id}, {sort: {_id: -1}});
        //        data.paymentOffice.push(paymentOffice);
        //        if (paymentOffice) {
        //            obj.sumAmount = parseFloat(paymentOffice.price);
        //            obj.paidAmount = parseFloat(paymentOffice.paidAmount);
        //            obj.dueAmount = parseFloat(paymentOffice.dueAmount);
        //        } else {
        //            obj.sumAmount = 0;
        //            obj.paidAmount = 0;
        //            obj.sumAmount = parseFloat(paymentOffice.price);
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
        //
        data.footer.totalPrice = numeral(totalPrice).format('$0,0.00');
        //data.footer.maintenancePrice = maintenancePrice;
        data.footer.sumPaid = numeral(sumPaid).format('$0,0.00');
        data.footer.dueAmount = numeral(dueAmount).format('$0,0.00');
        //data.footer.paidAmountMaitenance = paidAmountMaintenance;
        //data.content.dueAmountOffice = totalPrice - paidAmountOffice;
        //data.footer.dueAmountMaintenance = maintenancePrice - paidAmountMaintenance;

        return data

    }
});