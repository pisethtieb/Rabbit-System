 //Publication
 Meteor.publish('rabbit_quotation', function (branchId) {
     this.unblock();
     if (this.userId) {
         var selector = {};
         if (!_.isUndefined(branchId)) {
             selector.branchId = branchId;
         }
         return Rabbit.Collection.Quotation.find(selector, {removed: true});
     }
     this.ready();
 });