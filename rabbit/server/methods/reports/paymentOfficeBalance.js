Meteor.methods({
    rabbit_paymentOfficeBalanceReport: function (params) {
        var data = {
            title: {},
            header: {},
            content: [{index: 'No Result'}],
            footer: {}
        };
        //exchange = Cpanel.Collection.Exchange.findOne(exchangeId);
        //date = s.words(params.date, ' To '),
        //    fDate = date[0],
        //    newDate = new Date(date[1]);
        //var tDate = new Date(newDate.getFullYear(), newDate.getMonth(), newDate.getDate() + 1);
        //tDate = moment(tDate).format('YYYY-MM-DD');
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
        params.paymentDate = {$lte: moment(params.date + ' 23:59:59').format('YYYY-MM-DD HH:mm:ss')};

        //
        if (!_.isEmpty(params.branch)) {
            selector.branchId = params.branch;
        }
        if (!_.isEmpty(params.contractId)) {
            selector._id = params.contractId
        }
        //if (!_.isEmpty(params.officeId)) {
        //    selector.officeId = params.officeId;
        //}

        var index = 1;
        let total = 0;
        let totalPaidAmount = 0;
        var contracts = Rabbit.Collection.Contract.find(selector);
        //var officePayment = Rabbit.Collection.Payment.find(selector);
        contracts.forEach(function (obj) {
            let offPayment = Rabbit.Collection.Payment.findOne({
                contractId: obj._id,
                paymentDate: params.paymentDate
            }, {sort: {_id: -1}});
            var str = "<ul>";
            if (offPayment.office != null) {
                offPayment.office.forEach(function (o) {
                    o.discount = o.discount == null ? 0 : o.discount;
                    dueAmount = o.dueAmount;
                    str += "<li>officeId: " + o.officeId +
                        " | type: " + o.office + " | Price: " + o.price + " | dis: " + o.discount + " | paid: " + o.paidAmount + " | Due: " + o.dueAmount +
                        "</li>";
                });
            }
            if (dueAmount != 0) {
                let product = Rabbit.Collection.Product.findOne({_id: offPayment._contract.productId});
                offPayment.product = product;
                str += '</ul>';
                offPayment.payment = str;
                offPayment.index = index;
                let amount = 0;
                let paidAmount = 0;
                let dueAmount = 0;
                offPayment.office.forEach(function (off) {
                    paidAmount += parseFloat(off.paidAmount);
                    amount += parseFloat(off.price);
                    dueAmount += parseFloat(off.dueAmount);
                });
                //amount
                offPayment.amount = amount;
                offPayment.paid = paidAmount;
                offPayment.due = dueAmount;
                //total
                totalPaidAmount += paidAmount;
                total += offPayment.amount;
                //contractId = obj.contractId;
                content.push(offPayment);
                index++;
            }
        });
        totalDueAmount = total - totalPaidAmount;

        if (content.length > 0) {
            data.content = content;
            data.footer.totalPrice = numeral(total).format('$0,0.00');
            data.footer.totalDueAmount = numeral(totalDueAmount).format('$0,0.00');
            data.footer.totalPaidAmount = numeral(totalPaidAmount).format('$0,0.00');
        }
        return data
    }
});
