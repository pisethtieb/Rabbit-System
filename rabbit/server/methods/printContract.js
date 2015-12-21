Meteor.methods({
    printContract: function (contractId) {
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
        //data.title = Cpanel.Collection.Company.findOne();
        let contract = Rabbit.Collection.Contract.findOne(contractId);
        /****** Header *****/
            //data.header = params;
        data.product = contract._product;
        data.customer = contract._customer;
        data.customer.age = moment().diff(contract._customer.dob, 'years');
        console.log(data.customer.age);
        //data.header = customer;
        ///****** Content *****/
        //let i = 1;
        //var totalPrice = 0;
        //let maintenancePrice = 0;
        //let office = Rabbit.Collection.Office.find({contractId: contractId});
        //if (office.count() > 0) {
        //    office.forEach(function (obj) {
        //        let maintenance = Rabbit.Collection.Maintenance.findOne({officeId: obj._id}, {sort: {_id: -1}});
        //        if (maintenance == null) {
        //            obj.maintenance = "None";
        //        } else {
        //            var today = moment().format("YYYY-MM-DD");
        //
        //            console.log(maintenance.endDate > today)
        //            console.log(maintenance.endDate)
        //            console.log(today)
        //            if (maintenance.endDate > today) {
        //
        //                obj.maintenance = maintenance.price;
        //                maintenancePrice += parseFloat(maintenance.price)
        //
        //            } else {
        //                obj.maintenance = "Expire";
        //            }
        //        }
        //        totalPrice += parseFloat(obj.price);
        //        obj.index = i;
        //        data.content.push(obj);
        //        i++;
        //
        //
        //    })
        //}
        //let j = 1;
        //let payment = Rabbit.Collection.Payment.find({contractId: contractId});
        //let paidAmountOffice = 0;
        //let paidAmountMaintenance = 0;
        //if (payment.count() > 0) {
        //    payment.forEach(function (obj) {
        //        obj.index = j;
        //        data.payment.push(obj);
        //        j++;
        //        console.log(obj.officeId);
        //        if (obj.type == 'office' && obj.officeId) {
        //            paidAmountOffice += parseFloat(obj.paidAmount);
        //            console.log(paidAmountOffice)
        //        } else if (obj.type == 'maintenance' && obj.maintenanceId) {
        //            paidAmountMaintenance += parseFloat(obj.paidAmount);
        //            console.log(paidAmountMaintenance)
        //        }
        //
        //    })
        //}
        //
        //
        //data.footer.totalPrice = totalPrice;
        //data.footer.maintenancePrice = maintenancePrice;
        //data.footer.paidAmountOffice = paidAmountOffice;
        //data.footer.paidAmountMaitenance = paidAmountMaintenance;
        //data.footer.dueAmountOffice = totalPrice - paidAmountOffice;
        //data.footer.dueAmountMaintenance = maintenancePrice - paidAmountMaintenance;
        //
        return data

    }
});