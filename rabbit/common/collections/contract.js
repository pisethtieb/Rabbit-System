// Collection
Rabbit.Collection.Contract = new Mongo.Collection("rabbit_contract");

// Schema
Rabbit.Schema.Contract = new SimpleSchema({
    contractDate: {
        type: String,
        label: "Contract Date"

    },
    customerId: {
        type: String,
        label: 'Customer ID'
    },
    productId: {
        type: String,
        label: "Product ID",
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
        type: Array,
        minCount: 1,
        maxCount: 3
    },
    'paymentMethod.$': {
        type: Object
    },
    'paymentMethod.$.paymentDuration': {
        type: String
    },
    type: {
        type: String,
        label: 'Type',
        autoform: {
            type: 'select2',
            options(){
                return Rabbit.List.contractType();
            }
        }
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
        },
        optional: true
    },
    addFile: {
        type: String,
        autoform: {
            afFieldInput: {
                type: 'fileUpload',
                collection: 'Files'
            }
        },
        optional: true
    },
    contractorId: {
        type: String,
        label: "ContractorId",
        autoform: {
            type: 'select2',
            options(){
                return Rabbit.List.contractors();
            }
        }
    },
    agentId: {
        type: String,
        label: 'AgentId',
        autoform: {
            type: 'select2',
            options(){
                return Rabbit.List.agent();
            }
        }
    },
    amount: {
        type: Number,
        label: 'Agent Fee',
        decimal: true
    }
});

// Attach schema
Rabbit.Collection.Contract.attachSchema(Rabbit.Schema.Contract);

