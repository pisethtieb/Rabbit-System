// List
Rabbit.ListState = new ReactiveObj();

Rabbit.List = {
    gender: function () {
        var list = [];
        //list.push({label: "", value: ""});
        list.push({label: 'Male', value: 'M'});
        list.push({label: 'Female', value: 'F'});

        return list;
    },
    address: function () {
        var list = [];
        list.push({label: "(Select One)", value: ""});

        // Set default for update
        var id = Rabbit.ListState.get(['customer', 'addressId']);
        Rabbit.Collection.Address.find(id)
            .forEach(function (obj) {
                list.push({label: obj._id + ' : ' + obj.name, value: obj._id});
            });

        return list;
    },
    product: function () {
        var list = [];
        list.push({label: "(Select One)", value: ""});

        Rabbit.Collection.Product.find()
            .forEach(function (obj) {
                list.push({label: obj._id + ' : ' + obj.name, value: obj._id});
            });

        return list;
    },
    customer: function () {
        var list = [];
        list.push({label: "(Select One)", value: ""});

        Rabbit.Collection.Customer.find()
            .forEach(function (obj) {
                list.push({label: obj._id + ' : ' + obj.companyName, value: obj._id});
            });

        return list;
    },
    getProduct(id){
        let product = Rabbit.Collection.Product.findOne(id);
        return product;
    }
};
