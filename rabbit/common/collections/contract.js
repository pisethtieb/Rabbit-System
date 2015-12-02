// Collection
Rabbit.Collection.Contract = new Mongo.Collection("rabbit_contract");

// Schema
Rabbit.Schema.Contract = new SimpleSchema({
    customerId: {
        type: String,
        label: 'Customer'
     

    },
    productId: {
        type: String,
        label: "Product Id",
        autoform: {
            type: 'select2',
            options(){
                return Rabbit.List.product();
            }
        }
    },
    saleDate: {
        type: Date,
        label: "date",
        defaultValue: function () {
            return moment().format('YYYY-MM-DD');
        }
    }
    ,
    branchId: {
        type: String,
        label: "Branch"
    }
})
;

// Attach schema
Rabbit.Collection.Contract.attachSchema(Rabbit.Schema.Contract);

// Attach soft remove
//Rabbit.Collection.Customer.attachBehaviour('softRemovable');