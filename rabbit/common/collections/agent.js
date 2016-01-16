// Collection
Rabbit.Collection.Agent= new Mongo.Collection("rabbit_agent");

// Schema
Rabbit.Schema.Agent= new SimpleSchema({
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
        label: "Telephone"
    }
})
;
// Attach schema
Rabbit.Collection.Agent.attachSchema(Rabbit.Schema.Agent);
