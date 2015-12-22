// Collection
Rabbit.Collection.Contract = new Mongo.Collection("rabbit_contract");

// Schema
Rabbit.Schema.Contract = new SimpleSchema({
    contractDate: {
        type: String,
        label: "Contract Date",
        defaultValue: function () {
            var currentDate = moment(ReactiveMethod.call("currentDate"), 'YYYY-MM-DD').format('YYYY-MM-DD');
            return currentDate;
        }
    },
    customerId: {
        type: String,
        label: 'Customer Id'
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
    //paymentMethod: {
    //    type: Array,
    //    minCount: 1,
    //    maxCount: 1
    //},
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
        label: "Testing Duration",
        optional: true
    },
    maintenanceFee: {
        type: String,
        label: "MaintenanceFee"
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
        label: "Description",
        autoform: {
            afFieldInput: {
                type: "textarea"
            }
        }
    },
    addFile: {
        type: String,
        autoform: {
            afFieldInput: {
                type: 'fileUpload',
                collection: 'Files',
                accept: 'image/*'
            }
        },
        optional: true
    },
    contractId: {
        type: String,
        label: "ContractorId",
        autoform: {
            type: 'select2',
            options(){
                return Rabbit.List.contractor();
            }
        }
    }
})
;
// Attach schema
Rabbit.Collection.Contract.attachSchema(Rabbit.Schema.Contract);

// Attach soft remove
//Rabbit.Collection.Customer.attachBehaviour('softRemovable');