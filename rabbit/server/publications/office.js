 //Publication
 Meteor.publish('rabbit_office', function (branchId) {
     this.unblock();
     if (this.userId) {
         var selector = {};
         if (!_.isUndefined(branchId)) {
             selector.branchId = branchId;
         }
         return Rabbit.Collection.Office.find(selector, {removed: true});
     }
     this.ready();
 });