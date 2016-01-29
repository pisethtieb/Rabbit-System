/**
 * Created by piseth on 11/30/15.
 // */
Rabbit.Collection.Website.before.insert(function (userId, doc) {
    var prefix = StateRabbit.get('rabbit');
    doc._id = idGenerator.genWithPrefix(Rabbit.Collection.Website, prefix, 6);
});