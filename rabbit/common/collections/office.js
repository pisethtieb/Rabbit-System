// Collection
Rabbit.Collection.Office = new Mongo.Collection("rabbit_office");

// Schema
Rabbit.Schema.Office = new SimpleSchema({
    contractId: {
        type: String,
        label: 'Contract ID'

    },
    type: {
        type: String,
        label: 'Type',
        autoform: {
            type: "select2",
            options: function () {
                return Rabbit.List.type();
            }
        }
    }
    ,
    price: {
        type: Number,
        decimal: true
    },
    productId: {
        type: String,
        optional: true
    },
    branchId: {
        type: String,
        label: "Branch",
        optional: true
    }
})
;

// Attach schema
Rabbit.Collection.Office.attachSchema(Rabbit.Schema.Office);

// Attach soft remove
//Rabbit.Collection.Customer.attachBehaviour('softRemovable');