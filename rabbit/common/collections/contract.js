// Collection
Rabbit.Collection.Contract = new Mongo.Collection("rabbit_contract");

// Schema
Rabbit.Schema.Contract = new SimpleSchema({
    contractDate: {
        type: String,
        label: "contractDate"
    },
    customerId: {
        type: String,
        label: 'customer Id'

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
    basePrice: {
        type: Array,
        //label: "Branch Price",
        minCount: 1,
        maxCount: 1
    },
    'basePrice.$': {
        type: Object
    },
    'basePrice.$.headOffice': {
        type: Number,
        decimal: true
    },
    'basePrice.$.branch': {
        type: Number,
        decimal: true
    },
    maintenancePrice: {
        type: Array,
        minCount: 1,
        maxCount: 1
    },
    'maintenancePrice.$': {
        type: Object
    },
    'maintenancePrice.$.headOffice': {
        type: Number,
        decimal: true
    },
    'maintenancePrice.$.branch': {
        type: Number,
        decimal: true
    },
    paymentMethod: {
        type: String,
        label: "Payment Method"
        //,
        //autoform: {
        //    type: 'select2',
        //    options(){
        //        return Rabbit.List.paymentMethod();
        //    }
        //}
    },
    type: {
        type: String,
        label: 'type',
        autoform: {
            type: 'select2',
            options(){
                return Rabbit.List.contractType();
            }
        }
    },
    testing: {
        type: String,
        label: "testing",
        optional: true
    },
    maintenanceFee: {
        type: String,
        label: "maintenanceFee"
        //example
        //" 1 year,one month"
    },
    branchId: {
        type: String,
        label: "Branch"
    }
    ,
    des: {
        type: String,
        label: "Description"
    }
})
;
// Attach schema
Rabbit.Collection.Contract.attachSchema(Rabbit.Schema.Contract);

// Attach soft remove
//Rabbit.Collection.Customer.attachBehaviour('softRemovable');