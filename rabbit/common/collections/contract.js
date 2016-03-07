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
    productType: {
        type: String,
        label: 'ProductType',
        autoform: {
            type: 'select2',
            options(){
                return Rabbit.List.type();
            },
            afFieldInput: {
                select2Options: {
                    theme: "bootstrap"
                }
            }
        }
    },
    productId: {
        type: String,
        label: "Product",
        autoform: {
            type: 'select2',
            options(){
                return Rabbit.List.product();
            },
            afFieldInput: {
                select2Options: {
                    theme: "bootstrap"
                }
            }
        }
    },
    installationFee: {
        type: Number,
        label: 'InstallationFee',
        decimal: true,
        optional: true
    },
    trainingFee: {
        type: Number,
        label: 'TrainingFee',
        decimal: true,
        optional: true
    },
    monthlyFee: {
        type: Array,
        //label: "Branch Price",
        minCount: 1,
        maxCount: 1,
        optional: true
    },
    'monthlyFee.$': {
        type: Object,
        decimal: true

    },
    'monthlyFee.$.headOffice': {
        type: Number,
        decimal: true

    },
    'monthlyFee.$.branch': {
        type: Number,
        decimal: true

    },


    basePrice: {
        type: Array,
        label: "Branch Price",
        minCount: 1,
        maxCount: 1,
        optional: true
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
        maxCount: 1,
        label: "Maintenance Price",
        optional: true
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
        maxCount: 3,
        label: "Payment Method"
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
            },
            afFieldInput: {
                select2Options: {
                    theme: "bootstrap"
                }
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
        label: "Contractor",
        autoform: {
            type: 'select2',
            options(){
                return Rabbit.List.contractors();
            },
            afFieldInput: {
                select2Options: {
                    theme: "bootstrap"
                }
            }
        }
    },
    agentId: {
        type: String,
        label: 'Agent',
        autoform: {
            type: 'select2',
            options(){
                return Rabbit.List.agent();
            },
            afFieldInput: {
                select2Options: {
                    theme: "bootstrap"
                }
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
