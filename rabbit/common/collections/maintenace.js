// Collection
Rabbit.Collection.Maintenance = new Mongo.Collection("rabbit_maintenance");

// Schema
Rabbit.Schema.Maintenance = new SimpleSchema({
    date: {
        type: String,
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
        type: Number,
        label: "Paid Amount",
        min: 1,
        custom: function () {
            if (this.value > this.field('price').value) {
                return "greaterThan";
            }
        }

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
SimpleSchema.messages({
    "greaterThan": "PaidAmount mustn't be greater than price!"
});