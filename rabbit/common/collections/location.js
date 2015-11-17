// Collection
Rabbit.Collection.Location = new Mongo.Collection("rabbit_location");

// Schema
Rabbit.Schema.Location = new SimpleSchema({
    name: {
        type: String,
        label: "Location"
    }
});

// Attach schema
Rabbit.Collection.Location.attachSchema(Rabbit.Schema.Location);

// Attach soft remove
Rabbit.Collection.Location.attachBehaviour('softRemovable');