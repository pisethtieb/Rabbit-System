// Collection
Rabbit.Collection.Customer = new Mongo.Collection("rabbit_customer");

// Schema
Rabbit.Schema.Customer = new SimpleSchema({
    companyName: {
        type: String,
        label: "Company Name",
        max: 200
    },
    address: {
        type: String,
        label: "Address",
        autoform: {
            afFieldInput: {
                type: "textarea"
            }
        }
    },
    telephone: {
        type: String,
        label: "Telephone"
    },
    contactPerson: {
        type: Array,
        minCount: 1,
        optional: true
    },
    'contactPerson.$': {
        type: Object
    },
    'contactPerson.$.name': {
        type: String
    },
    'contactPerson.$.gender': {
        type: String,
        autoform: {
            type: "selectize",
            options: function () {
                return Rabbit.List.gender();
            }
        }
    },
    'contactPerson.$.position': {
        type: String
    },
    'contactPerson.$.age': {
        type: String,
        optional: true
    },
    'contactPerson.$.idCard': {
        type: String,
        optional: true
    },
    'contactPerson.$.tel': {
        type: String
    },
    branchId: {
        type: String,
        label: "Branch"
    }
});

// Attach schema
Rabbit.Collection.Customer.attachSchema(Rabbit.Schema.Customer);

// Attach soft remove
//Rabbit.Collection.Customer.attachBehaviour('softRemovable');