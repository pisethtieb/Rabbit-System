/**
 * Created by piseth on 11/30/15.
 // */
Rabbit.Collection.PaymentMaintenance.before.insert(function (userId, doc) {
    var prefix = StateRabbit.get('rabbit');
    doc._id = idGenerator.genWithPrefix(Rabbit.Collection.PaymentMaintenance, prefix, 6);
});