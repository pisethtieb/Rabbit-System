Meteor.methods({
    paymentInvoice: function (paymentId) {
        var data = {
            title: {},
            header: {},
            content: [],
            footer: {},
            custom: {},
            payment: []
        };
        //var exchange = Cpanel.Collection.Exchange.findOne({}, {sort: {dateTime: -1}});
        //fx.base = exchange.base;
        //fx.rates = exchange.rates;
        /****** Title *****/
        data.title = Cpanel.Collection.Company.findOne();
        /****** Header *****/
        //data.header = params;

        var payment = Rabbit.Collection.Payment.findOne(paymentId);
        console.log(payment.officeId)
        let customer = Rabbit.Collection.Contract.findOne({customerId: payment.customerId})._customer;
        data.header = customer;

        ///****** Content *****/
        let i = 1;
        var totalPrice = 0;
        let sumAmount = 0;
        //let maintenancePrice = 0;
        let office = Rabbit.Collection.Office.find({contractId: payment.contractId});
        if (office.count() > 0) {
            office.forEach(function (obj) {
                let payment = Rabbit.Collection.Payment.findOne({officeId: obj._id}, {sort: {_id: -1}});
                data.payment.push(payment);
                if (payment) {
                    obj.sumAmount = parseFloat(payment.price);
                    obj.paidAmount = parseFloat(payment.paidAmount);
                    obj.dueAmount = parseFloat(payment.dueAmount);
                } else {
                    obj.sumAmount = 0;
                    obj.paidAmount = 0;
                    obj.sumAmount = parseFloat(payment.price);

                }

                totalPrice += parseFloat(obj.price);
                obj.index = i;
                data.content.push(obj);
                i++;


            });
        }

        //

        data.footer.totalPrice = totalPrice;
        //data.footer.maintenancePrice = maintenancePrice;
        //data.footer.paidAmountOffice = paidAmountOffice;
        //data.footer.paidAmountMaitenance = paidAmountMaintenance;
        //data.content.dueAmountOffice = totalPrice - paidAmountOffice;
        //data.footer.dueAmountMaintenance = maintenancePrice - paidAmountMaintenance;

        return data

    }
});