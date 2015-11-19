// Collection
Rabbit.Collection.SaleHeadOffice = new Mongo.Collection("rabbit_saleHeadOffice");

// Schema
Rabbit.Schema.SaleHeadOffice = new SimpleSchema({
    customerId: {
        type: String,
        label: 'Client Id',
        autoform: {
            type: 'select2',
            options(){
                return Rabbit.List.customer();
            }

        }

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
    headBasePrice: {
        type: Number,
        decimal: true
    }
    ,
    headMaintainPrice: {
        type: Number,
        decimal: true
    }
    ,
    saleDate: {
        type: Date,
        label: "date",
        defaultValue: function () {
            return moment().format('YYYY-MM-DD');
        }
    }
    ,
    totalPrice: {
        type: Number,
        decimal:true,
        label: "Total Price"
    }
    ,
    branchId: {
        type: String,
        label: "Branch"
    }
})
;

// Attach schema
Rabbit.Collection.SaleHeadOffice.attachSchema(Rabbit.Schema.SaleHeadOffice);

// Attach soft remove
//Rabbit.Collection.Customer.attachBehaviour('softRemovable');