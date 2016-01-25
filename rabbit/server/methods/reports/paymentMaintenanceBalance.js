Meteor.methods({
    rabbit_paymentMaintenanceBalanceReport: function (params) {
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
        //    selector.paymentMaintenanceDate = {$lte: moment(params.date + ' 23:59:59').format('YYYY-MM-DD HH:mm:ss')};
        //
        //    if (!_.isEmpty(params.branch)) {
        //        selector.branchId = params.branch;
        //    }
        //    if (!_.isEmpty(params.contractId)) {
        //        selector.contractId = params.contractId;
        //    }
        //
        //    var index = 1;
        //    let total = 0;
        //    var totalDueAmount = 0;
        //    let totalPaidAmount = 0;
        //
        //    let paymentMaintenance = Rabbit.Collection.PaymentMaintenance.find(selector);
        //    paymentMaintenance.forEach(function (obj) {
        //        var str = "<ul>";
        //        if (obj.maintenance != null) {
        //            obj.maintenance.forEach(function (o) {
        //                o.discount = o.discount == null ? 0 : o.discount;
        //                str += "<li>mainId: " + o.maintenanceId +
        //                    " | type: " + o.maintenance + " | Price: " + o.price + " | dis: " + o.discount + " | paid: " + o.paidAmount + " | Due: " + o.dueAmount +
        //                    "</li>";
        //            });
        //        }
        //        str += '</ul>';
        //        let product = Rabbit.Collection.Product.findOne({_id: obj._contract.productId});
        //        obj.product = product;
        //        obj.paymentOffice = str;
        //        obj.index = index;
        //        let amount = 0;
        //        let paidAmount = 0;
        //        let dueAmount = 0;
        //        obj.maintenance.forEach(function (office) {
        //            paidAmount += parseFloat(office.paidAmount);
        //            amount += parseFloat(office.price);
        //            dueAmount += parseFloat(office.dueAmount);
        //        });
        //        obj.amount = amount;
        //        obj.paid = paidAmount;
        //        obj.due = amount - paidAmount;
        //        total += amount;
        //        totalPaidAmount += paidAmount;
        //        content.push(obj);
        //        index++;
        //    });
        //    totalDueAmount = total - totalPaidAmount;
        //    if (content.length > 0) {
        //        data.content = content;
        //        data.footer.totalPrice = numeral(total).format('$0,0.00');
        //        data.footer.totalDueAmount = numeral(totalDueAmount).format('$0,0.00');
        //        data.footer.totalPaidAmount = numeral(totalPaidAmount).format('$0,0.00');
        //    }
        //    return data
        //}
        params.paymentMaintenanceDate = {$lte: moment(params.date + ' 23:59:59').format('YYYY-MM-DD HH:mm:ss')};

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
            let offPayment = Rabbit.Collection.PaymentMaintenance.findOne({
                contractId: obj._id,
                paymentMaintenanceDate: params.paymentMaintenanceDate
            }, {sort: {_id: -1}});
            console.log(offPayment)

            if (offPayment != null) {
                var str = "<ul>";
                offPayment.maintenance.forEach(function (o) {
                    console.log(o.paidAmount);
                    o.discount = o.discount == null ? 0 : o.discount;
                    o.paidAmount = o.paidAmount == null ? 0 : o.paidAmount;
                    str += "<li>maintenanceId: " + o.maintenanceId +
                        " | type: " + o.maintenance + " | Price: " + o.price + " | dis: " + o.discount + " | paid: " + o.paidAmount + " | Due: " + o.dueAmount +
                        "</li>";
                });
                let product = Rabbit.Collection.Product.findOne({_id: offPayment._contract.productId});
                let amount = 0;
                let paidAmount = 0;
                let dueAmount = 0;
                offPayment.maintenance.forEach(function (off) {
                    off.paidAmount = off.paidAmount == null ? 0 : off.paidAmount;
                    paidAmount += parseFloat(off.paidAmount);
                    amount += parseFloat(off.price);
                    dueAmount += parseFloat(off.dueAmount);
                });
                if (dueAmount != 0) {
                    offPayment.product = product;
                    str += '</ul>';
                    offPayment.payment = str;
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
        return data
    }
});
