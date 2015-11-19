 //Publication
 Meteor.publish('rabbit_saleHeadOffice', function (branchId) {
     this.unblock();
     if (this.userId) {
         var selector = {};
         if (!_.isUndefined(branchId)) {
             selector.branchId = branchId;
         }
         return Rabbit.Collection.SaleHeadOffice.find(selector, {removed: true});
     }
     this.ready();
 });