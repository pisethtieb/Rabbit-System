Meteor.methods({
    rabbit_maintenanceReport: function (params) {
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
        console.log(params);

        /****** Content *****/
        var content = [];
        var selector = {};
        selector.startDate = {$gte: fDate, $lte: tDate};


        //
        if (!_.isEmpty(params.branch)) {
            selector.branchId = params.branch;
        }

        //if (!_.isEmpty(params.contractId)) {
        //    selector.{office.contractId}= params.contractId
        //}
        if (!_.isEmpty(params.officeId)) {
            selector.officeId = params.officeId;
        }

        var index = 1;
        let totalContractPrice = 0;
        let totalDiscount = 0;
        let totalPrice = 0;
        Rabbit.Collection.Maintenance.find(selector)

            .forEach(function (obj) {
                if (obj._office.contractId == params.contractId) {
                    obj.index = index;
                    content.push(obj);
                    index++;

                } else {

                    let contract = Rabbit.Collection.Contract.findOne({_id: obj._office.contractId});
                    obj.contract = contract;

                    obj.index = index;
                    totalContractPrice += obj.contractPrice;

                    totalDiscount += obj.discount;

                    totalPrice += obj.price;

                    content.push(obj);

                    index++;
                }
            });

        if (content.length > 0) {
            data.content = content;
            data.footer.totalContractPrice = numeral(totalContractPrice).format('$0,0.00');
            data.footer.totalDiscount = numeral(totalDiscount).format('$0,0.00');
            data.footer.totalPrice = numeral(totalPrice).format('$0,0.00');
        }
        if (params.branch == '') {
            params.branch = 'All'

        } else {

            params.branch = params.branch;
        }

        if (params.officeId == '') {
            params.officeId = 'All'

        } else {

            params.officeId = Rabbit.Collection.Office.findOne({_id: params.officeId}).name;
        }
        //if (params.contractId == '') {
        //    params.contractId = 'All'
        //
        //} else {
        //
        //    params.contractId=  params.contractId
        //}
        /****** Header *****/
        data.header = params;

        return data
    }
});
