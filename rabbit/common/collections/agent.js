// Collection
Rabbit.Collection.Agent= new Mongo.Collection("rabbit_agent");

// Schema
Rabbit.Schema.Agent= new SimpleSchema({
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
    address: {
        type: String,
        label: 'address',
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
