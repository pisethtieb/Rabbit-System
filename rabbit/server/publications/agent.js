 //Publication
 Meteor.publish('rabbit_agent', function (branchId) {
     this.unblock();
     if (this.userId) {
         var selector = {};
         if (!_.isUndefined(branchId)) {
             selector.branchId = branchId;
         }
         return Rabbit.Collection.Agent.find(selector, {removed: true});
     }
     this.ready();
 });