 //Publication
 Meteor.publish('rabbit_contract', function (branchId) {
     this.unblock();
     if (this.userId) {
         var selector = {};
         if (!_.isUndefined(branchId)) {
             selector.branchId = branchId;
         }
         return Rabbit.Collection.Contract.find(selector, {removed: true});
     }
     this.ready();
 });