// Collection
Rabbit.Collection.Office = new Mongo.Collection("rabbit_office");

// Schema
Rabbit.Schema.Office = new SimpleSchema({
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
Rabbit.Collection.Office.attachSchema(Rabbit.Schema.Office);

// Attach soft remove
//Rabbit.Collection.Customer.attachBehaviour('softRemovable');