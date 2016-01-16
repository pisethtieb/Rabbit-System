// Collection
Rabbit.Collection.Contractor = new Mongo.Collection("rabbit_contractor");

// Schema
Rabbit.Schema.Contractor = new SimpleSchema({
    name: {
        type: String,
        label: "Name"
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
        label: "Date Of Birth"

    },
    id: {
        type: String,
        label: 'ID Card'
    },
    address: {
        type: String,
        label: 'Address'
    },
    telephone: {
        type: String,
        label: "Telephone"
    },
    email: {
        type: String,
        label: 'Email',
        optional: true,
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
