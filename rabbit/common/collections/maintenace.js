// Collection
Rabbit.Collection.Maintenance = new Mongo.Collection("rabbit_maintenance");

// Schema
Rabbit.Schema.Maintenance = new SimpleSchema({
    dateRang: {
        type: Date,
        label: 'Date Rang'

    },
    officeId: {
        type: String,
        label: 'officeId'

    },
    price: {
        type: String,
        label: 'price'

    },
    type: {
        type: String,
        label: 'Type'
        //autoform: {
        //    type: "select2",
        //    options: function () {
        //        return Rabbit.List.type();
        //    }
        //}
    }
    ,
    paidAmount: {
        type: String,
        label: 'paidAmount',
        optional: true
    },
    branchId: {
        type: String,
        label: "Branch",
        optional: true
    }
})
;

// Attach schema
Rabbit.Collection.Maintenance.attachSchema(Rabbit.Schema.Maintenance);

// Attach soft remove
//Rabbit.Collection.Customer.attachBehaviour('softRemovable');