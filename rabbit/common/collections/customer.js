// Collection
Rabbit.Collection.Customer = new Mongo.Collection("rabbit_customer");

// Schema
Rabbit.Schema.Customer = new SimpleSchema({
    contractName: {
        type: String,
        label: "Contract Name"
    },
    gender: {
        type: String,
        label: 'Gender',
        autoform: {
            type: "selectize",
            options: function () {
                return Rabbit.List.gender();
            }
        }
    },
    dob: {
        type: String,
        label: 'Dob'
    },
    id: {
        type: Number,
        label: 'ID'
    },
    position: {
        type: String,
        label: "Position"
    },
    address: {
        type: String,
        label: 'Address',
        autoform: {
            afFieldInput: {
                type: "textarea"
            }
        }
    },
    telephone: {
        type: String,
        label: 'Telephone'
    },
    email: {
        type: String,
        label: 'Email',
        regEx: SimpleSchema.RegEx.Email
    },


    companyName: {
        type: String,
        label: "Company Name",
        max: 200
    },
    companyAddress: {
        type: String,
        label: "Address",
        autoform: {
            afFieldInput: {
                type: "textarea"
            }
        }
    },
    companyTelephone: {
        type: String,
        label: "Telephone"
    },
    companyEmail: {
        type: String,
        label: "Email",
        regEx: SimpleSchema.RegEx.Email
    },
    companyWebsite: {
        type: String,
        label: "Website"
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