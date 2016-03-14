///**
// * Created by root on 3/11/16.
// */
//
//Meteor.startup(function() {
//    if (Rabbit.Collection.Contract.find().count() > 0) {
//        var data = Rabbit.Collection.Contract.find();
//
//        _.each(data, function(obj) {
//            Rabbit.Collection.Contract.update({},{$set:{productType:"fullyFee"}},{multi:true});
//        });
//    }
//});