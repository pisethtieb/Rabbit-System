Meteor.methods({
    printFeature: function (productId) {
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
        //console.log(productId)
        data.title = Cpanel.Collection.Company.findOne();
        data.content= Rabbit.Collection.Product.findOne(productId);

        return data

    }
});