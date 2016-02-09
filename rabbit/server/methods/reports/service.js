Meteor.methods({
    rabbit_serviceReport: function (params) {
        var data = {
            title: {},
            header: {},
            content: [{index: 'No Result'}],
            footer: {}
        };

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
        selector.serviceDate = {$gte: fDate, $lte: tDate};


        //
        if (!_.isEmpty(params.branch)) {
            selector.branchId = params.branch;
        }

        if (!_.isEmpty(params.customerId)) {
            selector.customerId = params.customerId;
        }
        var index = 1;
        let totalDomainName = 0;
        let totalHosting = 0;
        let totalMaintenance = 0;
        Rabbit.Collection.Service.find(selector)
            .forEach(function (obj) {


                obj.index = index;
                //total += obj.price;
                obj.domainNamePrice = obj.domainNamePrice == null ? 0 : obj.domainNamePrice;
                obj.hostingPrice = obj.hostingPrice == null ? 0 : obj.hostingPrice;
                obj.maintenancePrice = obj.maintenancePrice == null ? 0 : obj.maintenancePrice;
                totalDomainName += obj.domainNamePrice;
                totalHosting += obj.hostingPrice;
                totalMaintenance += obj.maintenancePrice;
                content.push(obj);

                index++;
            });

        if (content.length > 0) {
            data.content = content;
            data.footer.totalDomainName = totalDomainName;
            data.footer.totalHosting = totalHosting;
            data.footer.totalMaintenance = totalMaintenance;
        }
        if (params.branch == '') {
            params.branch = 'All'
        } else {
            params.branch = params.branch;
        }

        //if (params.customerId == '') {
        //    params.customerId = 'All'
        //
        //} else {
        //
        //    params.customerId = Rabbit.Collection.Customer.findOne({_id: params.customerId}).companyName;
        //}
        /****** Header *****/
        data.header = params;

        return data
    }
});
