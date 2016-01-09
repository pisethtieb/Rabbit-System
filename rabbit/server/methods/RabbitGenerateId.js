///**
// * Created by piseth on 11/30/15.
// */
Meteor.methods({
    rabbit: function (prefix) {
        StateRabbit = new ReactiveObj({rabbit: prefix})
    }
});