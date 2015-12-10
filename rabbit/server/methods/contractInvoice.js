Meteor.methods({
    contractInvoice: function (contractId) {
        var data = {
            title: {},
            header: {},
            content: [],
            footer: {},
            custom: {}
        };
        //var exchange = Cpanel.Collection.Exchange.findOne({}, {sort: {dateTime: -1}});
        //fx.base = exchange.base;
        //fx.rates = exchange.rates;
        /****** Title *****/
        data.title = Cpanel.Collection.Company.findOne();
        /****** Header *****/
        //data.header = params;
        let customer = Rabbit.Collection.Contract.findOne(contractId)._customer;

        data.header = customer;
        /****** Content *****/
        let i = 1;
        var totalPrice = 0;
        let office = Rabbit.Collection.Office.find({contractId: contractId});
        if (office.count() > 0) {
            office.forEach(function (obj) {
                let maintenance = Rabbit.Collection.Maintenance.findOne({officeId: obj._id}, {sort: {_id: -1}});
                if (maintenance == null) {
                    obj.maintenance = "None";
                } else {
                    var today = moment().format("YYYY-MM-DD");
                    if (maintenance.endDate > today) {
                        obj.maintenance = maintenance.price;

                    } else {
                        obj.maintenance = "Expire";
                    }
                }
                totalPrice += parseFloat(obj.price);
                obj.index = i;
                data.content.push(obj);
                i++;


            })
        }


        //lastPayment = Rabbit.Collection.Payment.findOne({contractId: contractId}, {sort: {_id: -1}});
        //let contract = Rabbit.Collection.Contract.findOne(contractId);
        ////var content = [labo];
        //var index = 1;
        //labo.laboItem.forEach(function (item) {
        //    item.itemName = Rabbit.Collection.Items.findOne({_id: item.itemId}).name;
        //    item.index = index++;
        //});
        //data.payment = [];
        //var payment = Rabbit.Collection.Payment.find({
        //    laboId: laboId
        //});
        //var totalPaid = 0;
        //if (payment.count() > 0) {
        //    var i = 1;
        //
        //    payment.forEach(function (obj) {
        //        obj. data.content = office;;
        //        totalPaid += parseFloat(obj.paidAmount);
        //        i++;
        //        data.payment.push(obj);
        //        data.outstadingAmount = labo.total - totalPaid;
        //        data.outstadingAmountIndolar = numeral(fx.convert(data.outstadingAmount, {
        //            from: 'KHR',
        //            to: 'USD'
        //        })).format('0,0.00');
        //        data.paymentStaff = lastPayment._staff;
        //        data.paymentDate = lastPayment.paymentDate;
        //    });
        //}
        //
        //if (lastPayment == null || undefined) {
        //    data.outstadingAmount = labo.total;
        //    data.outstadingAmountIndolar = numeral(fx.convert(data.outstadingAmount, {
        //        from: 'KHR',
        //        to: 'USD'
        //    })).format('0,0.00');
        //    data.paymentStaff = labo._staff;
        //    data.paymentDate = moment().format('DD-MM-YYYY');
        //}
        //data.totalPaid = totalPaid;
        //data.content = content;
        //data.header = labo;
        //
        data.footer.totalPrice = totalPrice;
        return data

    }
});