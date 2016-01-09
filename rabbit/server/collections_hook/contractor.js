/**
 * Created by piseth on 11/30/15.
 // */
Rabbit.Collection.Contractor.before.insert(function (userId, doc) {
    var prefix = StateRabbit.get('rabbit');
    doc._id = idGenerator.genWithPrefix(Rabbit.Collection.Contractor, prefix, 2);
});