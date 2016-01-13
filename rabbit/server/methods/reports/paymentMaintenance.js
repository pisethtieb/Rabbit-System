Meteor.methods({
    rabbit_paymentMaintenanceReport: function (params) {
        var data = {
            title: {},
            header: {},
            content: [{index: 'No Result'}],
            footer: {}
        };
        //exchange = Cpanel.Collection.Exchange.findOne(exchangeId);
        date = s.words(params.date, ' To '),
            fDate = date[0],
            newDate = new Date(date[1]);
        var tDate = new Date(newDate.getFullYear(), newDate.getMonth(), newDate.getDate() + 1);
        tDate = moment(tDate).format('YYYY-MM-DD');
        //var date = s.words(params.date, ' To ');
        //var fDate = moment(date[0], 'YYYY-MM-DD').toDate();
        //var tDate = moment(date[1], 'YYYY-MM-DD').add(1, 'days').toDate();
        //****** Title *****/
        data.title = Cpanel.Collection.Company.findOne();

        /****** Header *****/
        data.header = params;

        /****** Content *****/
        var content = [];
        var selector = {};
        selector.paymentMaintenanceDate = {$gte: fDate, $lte: tDate};
        //
        if (!_.isEmpty(params.branch)) {
            selector.branchId = params.branch;
        }
        //if (!_.isEmpty(params.contractId)) {
        //    selector.{office.contractId}= params.contractId
        //}
        if (!_.isEmpty(params.contractId)) {
            selector.contractId = params.contractId;
        }

        var index = 1;
        let total = 0;
        var totalDueAmount = 0;
        let totalPaidAmount = 0;

        let paymentMaintenance = Rabbit.Collection.PaymentMaintenance.find(selector);
        paymentMaintenance.forEach(function (obj) {
            //if (obj._office.contractId == params.contractId) {
            //    console.log(obj._id);
            // Do something
            obj.payment = JSON.stringify(obj.maintenance);
            obj.index = index;
            let amount = 0;
            let paidAmount = 0;
            let dueAmount = 0;
            obj.maintenance.forEach(function (office) {
                paidAmount += parseFloat(office.paidAmount);
                amount += parseFloat(office.price);
                //dueAmount += parseFloat(office.dueAmount);
            });
            //amount
            obj.amount = amount;
            obj.paid = paidAmount;
            obj.due = dueAmount;
            contractId = obj.contractId;
            content.push(obj);
            index++;
            //}
        });
        if (paymentMaintenance.count() == 1) {
            let office = Rabbit.Collection.Maintenance.find({'_office.contractId': contractId});
            office.forEach(function (o) {
                total += o.price;
            })
        } else {
            let office = Rabbit.Collection.Maintenance.find();
            office.forEach(function (o) {
                total += o.price;
            })
        };

        totalDueAmount = total - totalPaidAmount;

        if (content.length > 0) {
            data.content = content;
            data.footer.totalPrice = total;
            data.footer.totalDueAmount = totalDueAmount;
            data.footer.totalPaidAmount = totalPaidAmount;
            //data.footer.paidAmount = numeral(fx.convert(paidAmount, {from: 'KHR', to: 'USD'})).format('0,0.00')
        }

        return data
    }
});
