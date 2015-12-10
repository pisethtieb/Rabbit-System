Meteor.methods({
    contractInvoice: function (contractId) {
        var data = {
            title: {},
            header: {},
            content: [{index: 'No Item'}],
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
        //        obj.index = i;
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
        //data.footer = labo;
        return data

    }
});