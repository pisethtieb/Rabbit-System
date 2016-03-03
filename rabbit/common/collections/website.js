// Collection
Rabbit.Collection.Website = new Mongo.Collection("rabbit_website");

// Schema
Rabbit.Schema.Website = new SimpleSchema({

    registerDate: {
        type: String,
        label: "Register Date"

    },
    customerId: {
        type: String,
        label: 'Customer ID'
    },
    webName: {
        type: String,
        label: 'Website Name',
        unique: true
    },
    type: {
        type: String,
        label: "Type",
        autoform: {
            type: 'select2',
            options(){
                return Rabbit.List.webType();
            },
            afFieldInput: {
                select2Options: {
                    theme: "bootstrap"
                }
            }
        }
    },
    price: {
        type: Number,
        label: 'Price'
    },
    des: {
        type: String,
        label: "Description",
        autoform: {
            afFieldInput: {
                type: "textarea"
            }
        },
        optional: true
    }

});

// Attach schema
Rabbit.Collection.Website.attachSchema(Rabbit.Schema.Website);
