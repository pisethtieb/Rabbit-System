// Collection
Rabbit.Collection.Contractor = new Mongo.Collection("rabbit_contractor");

// Schema
Rabbit.Schema.Contractor = new SimpleSchema({
    name: {
        type: String,
        label: "name"
    },
    gender: {
        type: String,
        label: "Gender",
        autoform: {
            type: "selectize",
            options: function () {
                return Rabbit.List.gender();
            }
        }
    },
    dob: {
        type: String,
        label: "DOB"

    },
    id: {
        type: String,
        label: 'ID'
    },
    address: {
        type: String,
        label: 'address'
    },
    telephone: {
        type: String,
        label: "Telephone"
    },
    email: {
        type: String,
        label: 'Email',
        regEx: SimpleSchema.RegEx.Email
    },
    position: {
        type: String,
        label: "Position"
    }
})
;
// Attach schema
Rabbit.Collection.Contractor.attachSchema(Rabbit.Schema.Contractor);

// Attach soft remove
//Rabbit.Collection.Customer.attachBehaviour('softRemovable');