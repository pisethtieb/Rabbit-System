// Publication
Meteor.publish('rabbit_orderByCustomer', function (customerId) {
    this.unblock();
    if (this.userId) {
        check(customerId, String);
        return Rabbit.Collection.Order.find({customerId: customerId}, {removed: true});
    }

    this.ready();
});

Meteor.publish('rabbit_orderById', function (id) {
    this.unblock();
    if (this.userId) {
        check(id, String);
        return Rabbit.Collection.Order.find({_id: id}, {removed: true});
    }

    this.ready();
});
