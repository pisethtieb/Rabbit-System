// Collection
Rabbit.Collection.SaleBranchOffice = new Mongo.Collection("rabbit_saleBranchOffice");

// Schema
Rabbit.Schema.SaleBranchOffice = new SimpleSchema({
    saleHeadOfficeId: {
        type: String,
        label: 'Sale HeadOffice ID'

    },
    branchBasePrice: {
        type: Number,
        decimal: true
    }
    ,
    branchMaintainPrice: {
        type: Number,
        decimal: true
    },
    totalPrice: {
        type: Number,
        decimal:true,
        label: "Total Price"
    },
    branchId: {
        type: String,
        label: "Branch",
        optional:true
    }
})
;

// Attach schema
Rabbit.Collection.SaleBranchOffice.attachSchema(Rabbit.Schema.SaleBranchOffice);

// Attach soft remove
//Rabbit.Collection.Customer.attachBehaviour('softRemovable');