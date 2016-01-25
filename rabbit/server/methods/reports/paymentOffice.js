Meteor.methods({
    rabbit_paymentOfficeReport: function (params) {
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
        selector.paymentOfficeDate = {$gte: fDate, $lte: tDate};
        //
        if (!_.isEmpty(params.branch)) {
            //selector.branchId = params.branch;
        }
        if (!_.isEmpty(params.contractId)) {
            selector.contractId = params.contractId
        }
        var index = 1;
        let total = 0;
        var totalDueAmount = 0;
        let totalPaidAmount = 0;
        var officePayment = Rabbit.Collection.PaymentOffice.find(selector);
        officePayment.forEach(function (obj) {
            var str = "<ul>";
            if (obj.office != null) {
                obj.office.forEach(function (o) {
                    o.discount = o.discount == null ? 0 : o.discount;
                    o.paidAmount = o.paidAmount == null ? 0 : o.paidAmount;
                    str += "<li>officeId: " + o.officeId +
                        " | type: " + o.office + " | Price: " + o.price + " | dis: " + o.discount + " | paid: " + o.paidAmount + " | Due: " + o.dueAmount +
                        "</li>";
                });
            }
            str += '</ul>';
            let product = Rabbit.Collection.Product.findOne({_id: obj._contract.productId});
            obj.product = product;
            obj.paymentOffice = str;
            obj.index = index;
            let amount = 0;
            let paidAmount = 0;
            let dueAmount = 0;
            obj.office.forEach(function (office) {
                office.discount = office.discount == null ? 0 : office.discount;
                office.paidAmount = office.paidAmount == null ? 0 : office.paidAmount;
                paidAmount += parseFloat(office.paidAmount);
                amount += parseFloat(office.price);
                dueAmount += parseFloat(office.dueAmount);
            });
            obj.amount = numeral(amount).format('$0,0.00');
            obj.paid = numeral(paidAmount).format('$0,0.00');
            obj.due = numeral(dueAmount).format('$0,0.00');
            total += amount;
            totalPaidAmount += paidAmount;
            content.push(obj);
            index++;
        });
        totalDueAmount = total - totalPaidAmount;
        if (content.length > 0) {
            data.content = content;
            data.footer.totalPrice = numeral(total).format('$0,0.00');
            data.footer.totalDueAmount = numeral(totalDueAmount).format('$0,0.00');
            data.footer.totalPaidAmount = numeral(totalPaidAmount).format('$0,0.00');
        }
        if (params.branch == '') {
            params.branch = 'All'
        }

        if (params.contractId == '') {
            params.contractId = 'All'
        }
        /****** Header *****/
        data.header = params;


        return data
    }
});
