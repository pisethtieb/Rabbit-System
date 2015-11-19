 //Publication
 Meteor.publish('rabbit_saleBranchOffice', function (branchId) {
     this.unblock();
     if (this.userId) {
         var selector = {};
         if (!_.isUndefined(branchId)) {
             selector.branchId = branchId;
         }
         return Rabbit.Collection.SaleBranchOffice.find(selector, {removed: true});
     }
     this.ready();
 });