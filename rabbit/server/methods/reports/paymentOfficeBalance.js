Meteor.methods({
    rabbit_paymentOfficeBalanceReport: function (params) {
        var data = {
            title: {},
            header: {},
            content: [{index: 'No Result'}],
            footer: {}
        };
        data.title = Cpanel.Collection.Company.findOne();



        /****** Content *****/
        var content = [];
        var selector = {};
        params.paymentOfficeDate = {$lte: moment(params.date + ' 23:59:59').format('YYYY-MM-DD HH:mm:ss')};

        //
        if (!_.isEmpty(params.branch)) {
            selector.branchId = params.branch;
        }
        if (!_.isEmpty(params.contractId)) {
            selector._id = params.contractId
        }
        var index = 1;
        let total = 0;
        let totalPaidAmount = 0;
        var contracts = Rabbit.Collection.Contract.find(selector);
        contracts.forEach(function (obj) {
            let offPayment = Rabbit.Collection.PaymentOffice.findOne({
                contractId: obj._id,
                paymentOfficeDate: params.paymentOfficeDate
            }, {sort: {_id: -1}});

            if (offPayment != null) {
                var str = "<ul>";
                offPayment.office.forEach(function (o) {
                    console.log(o.paidAmount);
                    o.discount = o.discount == null ? 0 : o.discount;
                    o.paidAmount = o.paidAmount == null ? 0 : o.paidAmount;
                    str += "<li>officeId: " + o.officeId +
                        " | type: " + o.office + " | Price: " + o.price + " | dis: " + o.discount + " | paid: " + o.paidAmount + " | Due: " + o.dueAmount +
                        "</li>";
                });
                let product = Rabbit.Collection.Product.findOne({_id: offPayment._contract.productId});
                let amount = 0;
                let paidAmount = 0;
                let dueAmount = 0;
                offPayment.office.forEach(function (off) {
                    off.paidAmount = off.paidAmount == null ? 0 : off.paidAmount;
                    off.discount = off.discount == null ? 0 : off.discount;
                    paidAmount += parseFloat(off.paidAmount);
                    amount += parseFloat(off.price);
                    dueAmount += parseFloat(off.dueAmount);
                });
                if (dueAmount != 0) {
                    offPayment.product = product;
                    str += '</ul>';
                    offPayment.paymentOffice = str;
                    offPayment.index = index;
                    offPayment.amount = amount;
                    offPayment.paid = paidAmount;
                    offPayment.due = dueAmount;
                    totalPaidAmount += paidAmount;
                    total += offPayment.amount;
                    content.push(offPayment);
                    index++;
                }
            }
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

        } else {

            params.branch = params.branch;
        }

        if (params.contractId == '') {
            params.contractId = 'All'

        } else {

            params.contractId = params.contractId;
        }
        /****** Header *****/
        data.header = params;
        return data
    }
});
