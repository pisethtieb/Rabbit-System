/**
 * Created by piseth on 11/30/15.
 // */
Rabbit.Collection.Product.before.insert(function (userId, doc) {
    var prefix = StateRabbit.get('rabbit');
    doc._id = idGenerator.genWithPrefix(Rabbit.Collection.Product, prefix, 6);
});