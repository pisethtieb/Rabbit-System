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
    //dob: {
    //    type: String,
    //    label: "DOB"
    //
    //},
    //id: {
    //    type: String,
    //    label: 'ID'
    //},
    address: {
        type: String,
        label: 'address'
    },
    telephone: {
        type: String,
        label: "Telephone"
    }
    //email: {
    //    type: String,
    //    label: 'Email',
    //    regEx: SimpleSchema.RegEx.Email
    //},
    //position: {
    //    type: String,
    //    label: "Position"
    //}
})
;
// Attach schema
Rabbit.Collection.Agent.attachSchema(Rabbit.Schema.Agent);

// Attach soft remove
//Rabbit.Collection.Customer.attachBehaviour('softRemovable');