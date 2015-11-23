Meteor.methods({
   getBranchBasePrice(saleHeadOfficeId){
       let {productId} = Rabbit.Collection.SaleHeadOffice.findOne(saleHeadOfficeId);
       let product = Rabbit.Collection.Product.findOne(productId);
       console.log(product);
   }

});