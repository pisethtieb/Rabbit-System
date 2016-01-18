// Collection
Rabbit.Collection.Office = new Mongo.Collection("rabbit_office");

// Schema
Rabbit.Schema.Office = new SimpleSchema({
    name: {
        type: String,
        label: "name"
    },
    contractId: {
        type: String,
        label: 'Contract ID'

    },
    type: {
        type: String,
        label: 'Type',
        autoform: {
            type: "select2",
            options: function () {
                return Rabbit.List.type();
            }
        }
    },
    contractPrice: {
        label: "Contract Price",
        type: Number,
        decimal: true
    },
    discount: {
        label: "Discount(Amount)",
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
        label: "price",
        type: Number,
        decimal: true
    },
    productId: {
        type: String,
        optional: true
    },
    des: {
        type: String,
        label: 'Description',
        optional: true,
        autoform: {
            afFieldInput: {
                type: "textarea"
            }
        }
    },
    branchId: {
        type: String,
        label: "Branch",
        optional: true
    },
    officeDate: {
        type: String,
        label: "Office Date",
        defaultValue: function () {
            var currentDate = moment(ReactiveMethod.call("currentDate"), 'YYYY-MM-DD').format('YYYY-MM-DD');
            return currentDate;
        }
    }
})
;

// Attach schema
Rabbit.Collection.Office.attachSchema(Rabbit.Schema.Office);

// Attach soft remove
//Rabbit.Collection.Customer.attachBehaviour('softRemovable');

SimpleSchema.messages({
    "greaterThan": "it mustn't be greater than ContractPrice!"
});
//Status API Training Shop Blog About Pricing
