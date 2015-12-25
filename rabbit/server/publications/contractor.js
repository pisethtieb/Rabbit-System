 //Publication
 Meteor.publish('rabbit_contractor', function (branchId) {
     this.unblock();
     if (this.userId) {
         var selector = {};
         if (!_.isUndefined(branchId)) {
             selector.branchId = branchId;
         }
         return Rabbit.Collection.Contractor.find(selector, {removed: true});
     }
     this.ready();
 });