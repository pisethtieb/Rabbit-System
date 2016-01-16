// Collection
Rabbit.Collection.Payment = new Mongo.Collection("rabbit_payment");

// Schema
Rabbit.Schema.Payment = new SimpleSchema({
    customerId: {
        type: String,
        label: 'Customer ID'
    },
    des: {
        type: String,
        label: "Description",
        optional: true,
        autoform: {
            afFieldInput: {
                type: "textarea"
            }
        },
    },
    contractId: {
        type: String,
        label: 'Contract ID'
    },
    paymentDate: {
        type: String,
        label: 'Payment Date',
        defaultValue: function () {
            var currentDate = moment(ReactiveMethod.call("currentDate"), 'YYYY-MM-DD').format('YYYY-MM-DD');
            return currentDate;
        }

    },

    office: {
        type: Array,
        minCount: 1,
        optional: true
    },
    'office.$': {
        type: Object
    },
    'office.$.officeId': {
        type: String,
        autoform: {
            type: "select",
            options: function () {
                return Rabbit.List.officeMaintenance();
            }
        }
    },
    'office.$.price': {
        type: Number,
        decimal: true,
        optional: true

    },
    'office.$.discount': {
        type: Number,
        decimal: true,
        optional: true

    },
    'office.$.office': {
        type: String,
        decimal: true,
        optional: true

    },
    'office.$.paidAmount': {
        type: Number,
        optional: true,
        decimal: true
    },
    'office.$.dueAmount': {
        type: Number,
        decimal: true
    }
})
;

// Attach schema
Rabbit.Collection.Payment.attachSchema(Rabbit.Schema.Payment);

// Attach soft remove
//Rabbit.Collection.Customer.attachBehaviour('softRemovable');
