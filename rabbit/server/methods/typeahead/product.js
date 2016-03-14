//Meteor.methods({
//    searchCustomer: function (query, options) {
//        console.log('hello')
//        if (!Meteor.userId()) {
//            throw new Meteor.Error("not-authorized");
//        }
//        options = options || {};
//        // guard against client-side DOS: hard limit to 50
//        if (options.limit) {
//            options.limit = Math.min(50, Math.abs(options.limit));
//        } else {
//            options.limit = 50;
//        }
//        //TODO fix regexp to support multiple tokens
//        var regex = new RegExp(query, 'i');
//        var Customers = Rabbit.Collection.Customer.find({$or: [{_id: {$regex: regex}}, {contractName: {$regex: regex}}, {barcode: {$regex: regex}}]}, options).fetch()``;
//        console.log(Customers.count());
//        return Customers;
//    },
//    search: function (collectionName, query, options) {
//        if (!Meteor.userId()) {
//            throw new Meteor.Error("not-authorized");
//        }
//        collectionName = eval(collectionName);
//        options = options || {};
//        // guard against client-side DOS: hard limit to 50
//        if (options.limit) {
//            options.limit = Math.min(50, Math.abs(options.limit));
//        } else {
//            options.limit = 50;
//        }
//         TODO fix regexp to support multiple tokens
//        var regex = new RegExp(query, 'i');
//        return collectionName.find({
//            $or: [{_id: {$regex: regex}}, {name: {$regex: regex}}]
//        }, options).fetch();
//    }
//});