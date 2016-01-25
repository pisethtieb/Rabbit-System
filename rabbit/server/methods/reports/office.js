Meteor.methods({
    rabbit_officeReport: function (params) {
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
        selector.officeDate = {$gte: fDate, $lte: tDate};
        //
        if (!_.isEmpty(params.branch)) {
            selector.branchId = params.branch;
        }

        if (!_.isEmpty(params.contractId)) {
            selector.contractId = params.contractId;
        }

        var index = 1;
        let totalContractPrice = 0;
        let totalDiscount = 0;
        let totalPrice = 0;
        Rabbit.Collection.Office.find(selector)
            .forEach(function (obj) {
                // Do something
                obj.index = index;

                totalContractPrice += obj.contractPrice;

                totalDiscount += obj.discount;

                totalPrice += obj.price;
                let customer = Rabbit.Collection.Customer.findOne({_id: obj._contract.customerId});
                obj.customer = customer;
                let product = Rabbit.Collection.Product.findOne({_id: obj._contract.productId});
                obj.product = product;

                //console.log('hello');

                content.push(obj);

                index++;
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
