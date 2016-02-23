Meteor.methods({
    rabbit_renewMaintenanceReport: function (params) {
        var data = {
            title: {},
            header: {},
            content: [],
            footer: {}
        };
        //****** Title *****/
        data.title = Cpanel.Collection.Company.findOne();


        /****** Content *****/
        var content = [];
        var selector = {};

        selector.endDate = {$lte: moment(params.date).format('YYYY-MM-DD')};

        //
        if (!_.isEmpty(params.branch)) {
            selector.branchId = params.branch;
        }
        if (!_.isEmpty(params.contractId)) {
            selector._id = params.contractId
        }
        var i = 1;
        let total = 0;
        var now = moment().format('YYYY-MM-DD');
        let maintenance = Rabbit.Collection.Maintenance.find(selector);
        maintenance.forEach(function (o) {

            let renew = Rabbit.Collection.Maintenance.findOne({officeId: o.officeId}, {sort: {_id: -1}});
            if (renew._id == o._id) {
                if (renew.endDate <= params.date) {
                    let contract = Rabbit.Collection.Contract.findOne({_id: renew._office.contractId});
                    renew.contract = contract;
                    renew.index = i;
                    total += renew.price;
                    renew.renewMaintenance = 'ReNew';
                    data.content.push(renew);
                    i++
                }
            }

        });

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


        data.footer.total = total
        return data
    }
})
;
