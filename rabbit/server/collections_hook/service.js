/**
 * Created by piseth on 11/30/15.
 // */
Rabbit.Collection.Service.before.insert(function (userId, doc) {
    var prefix = StateRabbit.get('rabbit');
    doc._id = idGenerator.genWithPrefix(Rabbit.Collection.Service, prefix, 6);
});