/**
 * Created by piseth on 11/30/15.
 // */
Rabbit.Collection.Customer.before.insert(function (userId, doc) {
    console.log(doc._id);
    var prefix = StateRabbit.get('rabbit');
    // var prefix = doc.branchId + '-';
    doc._id = idGenerator.genWithPrefix(Rabbit.Collection.Customer, prefix, 6);
});