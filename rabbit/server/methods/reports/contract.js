Meteor.methods({
    rabbit_contractReport: function (params) {
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
        selector.contractDate = {$gte: fDate, $lte: tDate};


        //
        if (!_.isEmpty(params.branch)) {
            selector.branchId = params.branch;
        }

        if (!_.isEmpty(params.customerId)) {
            selector.customerId = params.customerId;
        }


        var index = 1;
        let totalHeadBasePrice = 0;
        let totalBranchBasePrice = 0;
        let totalHeadMainPrice = 0;
        let totalBranchMainPrice = 0;
        let totalMonthlyFeeBranchPrice = 0;
        let totalMonthlyFeeHeadPrice = 0;
        let totalInstallationFeePrice = 0;
        let totalTrainingFeePrice = 0;
        let totalFee = 0;
        Rabbit.Collection.Contract.find(selector)
            .forEach(function (obj) {
                // Do something
                obj.index = index;
                totalFee += obj.amount;
                if (obj.productType == "fullyFee") {

                    obj.headBasePrice = obj.basePrice[0].headOffice;
                    totalHeadBasePrice += obj.headBasePrice;

                    obj.brachBasePrice = obj.basePrice[0].branch;
                    totalBranchBasePrice += obj.brachBasePrice;

                    obj.headMainPrice = obj.maintenancePrice[0].headOffice;
                    totalHeadMainPrice += obj.headMainPrice;

                    obj.brachMainPrice = obj.maintenancePrice[0].branch;
                    totalBranchMainPrice += obj.brachMainPrice;
                    content.push(obj);
                    index++;
                } else {
                    obj.monthlyFeePriceHead = obj.monthlyFee[0].headOffice;
                    totalMonthlyFeeHeadPrice += obj.monthlyFeePriceHead;

                    obj.monthlyFeeBriceBrand = obj.monthlyFee[0].branch;
                    totalMonthlyFeeBranchPrice += obj.monthlyFeeBriceBrand;
                    totalInstallationFeePrice += obj.installationFee;
                    totalTrainingFeePrice += obj.trainingFee;
                    content.push(obj);
                    index++;
                }
            });

        if (content.length > 0) {
            data.content = content;
            data.footer.totalHeadBasePrice = numeral(totalHeadBasePrice).format('$0,0.00');
            data.footer.totalBranchBasePrice = numeral(totalBranchBasePrice).format('$0,0.00');
            data.footer.totalHeadMainPrice = numeral(totalHeadMainPrice).format('$0,0.00');
            data.footer.totalBranchMainPrice = numeral(totalBranchMainPrice).format('$0,0.00');
            data.footer.totalMonthlyFeeHeadPrice = numeral(totalMonthlyFeeHeadPrice).format('$0,0.00');
            data.footer.totalMonthlyFeeBranchPrice = numeral(totalMonthlyFeeBranchPrice).format('$0,0.00');
            data.footer.totalInstallationFeePrice = numeral(totalInstallationFeePrice).format('$0,0.00');
            data.footer.totalTrainingFeePrice = numeral(totalTrainingFeePrice).format('$0,0.00');
            data.footer.totalFee = numeral(totalFee).format('$0,0.00');
        }

        if (params.branch == '') {
            params.branch = 'All'

        } else {

            params.branch = params.branch;
        }

        if (params.customerId == '') {
            params.customerId = 'All'

        } else {

            params.customerId = Rabbit.Collection.Customer.findOne({_id: params.customerId}).companyName;
        }
        /****** Header *****/
        data.header = params;

        return data
    }
});
