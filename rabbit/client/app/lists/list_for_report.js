// List for report
Rabbit.ListForReport = {
    branch: function () {
        var list = [];
        list.push({label: "(Select All)", value: ""});
        Cpanel.Collection.Branch.find()
            .forEach(function (obj) {
                list.push({label: obj.enName, value: obj._id});
            });

        return list;
    },
    product: function () {
        var list = [];
        list.push({label: "(Select All)", value: ""});

        Rabbit.Collection.Product.find()
            .forEach(function (obj) {
                debugger;
                list.push({label: obj._id + ' : ' + obj.name, value: obj._id});
            });

        return list;
    },
    customer: function () {
        var list = [];
        list.push({label: "(Select All)", value: ""});

        Rabbit.Collection.Customer.find()
            .forEach(function (obj) {
                list.push({label: obj._id + ' : ' + obj.companyName, value: obj._id});
            });

        return list;
    },
    contract: function () {
        var list = [];
        list.push({label: "(Select All)", value: ""});
        Rabbit.Collection.Contract.find()
            .forEach(function (obj) {
                list.push({label: obj._id + ' : ' + obj._customer.contractName, value: obj._id});
            });

        return list;
    }
};
