//Publication
Meteor.publish('rabbit_service', function (branchId) {
    this.unblock();
    if (this.userId) {
        var selector = {};
        if (!_.isUndefined(branchId)) {
            selector.branchId = branchId;
        }
        return Rabbit.Collection.Service.find(selector, {removed: true});
    }
    this.ready();
});