// Collection
Rabbit.Collection.Maintenance = new Mongo.Collection("rabbit_maintenance");

// Schema
Rabbit.Schema.Maintenance = new SimpleSchema({
    startDate: {
        type: String,
        label: 'Start Date',
        defaultValue: function () {
            var currentDate = moment(ReactiveMethod.call("currentDate"), 'YYYY-MM-DD').format('YYYY-MM-DD');
            return currentDate;
        }

    },
    endDate: {
        type: String,
        label: 'End Date'

    },
    officeId: {
        type: String,
        label: 'Office ID'

    },
    contractPrice: {
        label: "Contract Price",
        type: Number,
        decimal: true
    },
    discount: {
        label: "Discount (Amount)",
        type: Number,
        decimal: true,
        optional: true,
        custom: function () {
            if (this.value > this.field('contractPrice').value) {
                return "greaterThan";
            }
        }
    },
    price: {
        label: "Price",
        type: Number,
        decimal: true
    },
    type: {
        type: String,
        label: 'Type'

    },

    des: {
        type: String,
        label: "Description",
        optional: true,
        autoform: {
            afFieldInput: {
                type: "textarea"
            }
        }
    },
    status: {
        type: String,
        label: "Status",
        defaultValue: "no"


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
    "greaterThan": "it mustn't be greater than ContractPrice!"
});
