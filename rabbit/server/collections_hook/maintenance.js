/**
 * Created by piseth on 11/30/15.
 // */
Rabbit.Collection.Maintenance.before.insert(function (userId, doc) {
    var prefix = StateRabbit.get('rabbit');
    doc._id = idGenerator.genWithPrefix(Rabbit.Collection.Maintenance, prefix, 6);
});