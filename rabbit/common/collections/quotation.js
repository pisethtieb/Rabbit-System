// Collection
Rabbit.Collection.Quotation = new Mongo.Collection("rabbit_quotation");

// Schema
Rabbit.Schema.Quotation = new SimpleSchema({
    quotationDate: {
        type: String,
        label: "quotation Date",
        defaultValue: function () {
            var currentDate = moment(ReactiveMethod.call("currentDate"), 'YYYY-MM-DD').format('YYYY-MM-DD');
            return currentDate;
        }
    },
    customerId: {
        type: String,
        label: 'Customer Id',
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
    contractorId: {
        type: String,
        label: "ContractorId",
        autoform: {
            type: 'select2',
            options(){
                return Rabbit.List.contractors();
            }
        }
    }


})
;
// Attach schema
Rabbit.Collection.Quotation.attachSchema(Rabbit.Schema.Quotation);

// Attach soft remove
//Rabbit.Collection.Customer.attachBehaviour('softRemovable');