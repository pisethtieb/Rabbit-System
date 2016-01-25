Meteor.methods({
    rabbit_agentReport: function (params) {
        var data = {
            title: {},
            header: {},
            content: [{index: 'No Result'}],
            footer: {}
        };

        date = s.words(params.date, ' To '),
            fDate = date[0],
            newDate = new Date(date[1]),
            branchId=params.branch,
            agentId=params.agentId;
        var tDate = new Date(newDate.getFullYear(), newDate.getMonth(), newDate.getDate() + 1);
        tDate = moment(tDate).format('YYYY-MM-DD');
        //var date = s.words(params.date, ' To ');
        //var fDate = moment(date[0], 'YYYY-MM-DD').toDate();
        //var tDate = moment(date[1], 'YYYY-MM-DD').add(1, 'days').toDate();
        //****** Title *****/
        data.title = Cpanel.Collection.Company.findOne();


        /****** Content *****/
        var content = [];
        var selector = {};
        selector.contractDate = {$gte: fDate, $lte: tDate};
        //
        if (!_.isEmpty(params.branch)) {
            selector.branchId =branchId;
        }

        if (!_.isEmpty(params.agentId)) {
            selector.agentId = agentId;
        }

        var index = 1;
        let totalFee = 0;
        Rabbit.Collection.Contract.find(selector)
            .forEach(function (obj) {
                // Do something
                obj.index = index;
                totalFee += parseFloat(obj.amount);
                content.push(obj);
                index++;
            });

        if (content.length > 0) {
            data.content = content;
            data.footer.totalFee = numeral(totalFee).format('$0,0.00');
        }

        // show on header
        if (params.branch == '') {
            params.branch = 'All'

        } else {

            params.branch =   params.branch;
        }

        if (params.agentId == '') {
            params.agentId = 'All'

        } else {
          let agent=Rabbit.Collection.Agent.findOne({_id:params.agentId})
            params.agentId = agent.name;
        }


          /****** Header *****/
          data.header = params;


        return data
    }
});
