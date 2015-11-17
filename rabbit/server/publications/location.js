// Publication
//Meteor.publish('rabbit_location', function () {
//    this.unblock();
//    if (this.userId) {
//
//        return Rabbit.Collection.Location.find({});
//        //return Rabbit.Collection.Location.find({}, {removed: true}); // for soft remove
//    }
//
//    this.ready();
//});

Meteor.publish('rabbit_locationById', function (id) {
    this.unblock();
    if (this.userId) {
        check(id, String);

        return Rabbit.Collection.Location.find({_id: id});
        //return Rabbit.Collection.Location.find({}, {removed: true}); // for soft remove
    }

    this.ready();
});
