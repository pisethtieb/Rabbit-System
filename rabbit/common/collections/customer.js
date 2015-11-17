// Collection
Rabbit.Collection.Customer = new Mongo.Collection("rabbit_customer");

// Schema
Rabbit.Schema.Customer = new SimpleSchema({
    companyName: {
        type: String,
        label: "Name",
        max: 200
    },
    address: {
        type: String,
        label: "Address"
    },
    telephone: {
        type: String,
        label: "Telephone"
    },
    contactPerson: {
        type: Array,
        label: "Contact Person",
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
            type: "select2",
            options: function () {
                return Rabbit.List.gender();
            }
        }
    },
    'contactPerson.$.position': {
        type: String
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