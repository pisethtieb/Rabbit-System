//Publication
Meteor.publish('rabbit_website', function (branchId) {
    this.unblock();
    if (this.userId) {
        var selector = {};
        if (!_.isUndefined(branchId)) {
            selector.branchId = branchId;
        }
        return Rabbit.Collection.Website.find(selector, {removed: true});
    }
    this.ready();
});