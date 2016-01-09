/**
 * Created by piseth on 11/30/15.
 // */
Rabbit.Collection.Agent.before.insert(function (userId, doc) {
    var prefix = StateRabbit.get('rabbit');
    doc._id = idGenerator.genWithPrefix(Rabbit.Collection.Agent, prefix, 6);
});