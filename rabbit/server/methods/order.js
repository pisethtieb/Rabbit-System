Meteor.methods({
    rabbit_orderById: function (id) {
        var data = Rabbit.Collection.Order.findOne(id);
        return data;
    }
});