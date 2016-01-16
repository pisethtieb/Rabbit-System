// Collection
Rabbit.Collection.PaymentMaintenance = new Mongo.Collection("rabbit_paymentMaintenance");

// Schema
Rabbit.Schema.PaymentMaintenance = new SimpleSchema({
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
        }
    },
    contractId: {
        type: String,
        label: 'Contract ID'
    },
    paymentMaintenanceDate: {
        type: String,
        label: 'Payment Maintenance Date',
        defaultValue: function () {
            var currentDate = moment(ReactiveMethod.call("currentDate"), 'YYYY-MM-DD').format('YYYY-MM-DD');
            return currentDate;
        }

    },

    maintenance: {
        type: Array,
        minCount: 1,
        optional: true
    },
    'maintenance.$': {
        type: Object
    },
    'maintenance.$.maintenanceId': {
        type: String
        //,
        //autoform: {
        //    type: "select",
        //    options: function () {
        //        return Rabbit.List.paymentMaintenance();
        //    }
        //}
    },
    'maintenance.$.discount': {
        type: Number,
        decimal: true,
        optional: true

    },
    'maintenance.$.price': {
        type: Number,
        decimal: true,
        optional: true

    },
    'maintenance.$.maintenance': {
        type: String,
        decimal: true,
        optional: true

    },
    'maintenance.$.paidAmount': {
        type: Number,
        decimal: true,
        optional: true
    },
    'maintenance.$.dueAmount': {
        type: Number,
        decimal: true
    }
})
;

// Attach schema
Rabbit.Collection.PaymentMaintenance.attachSchema(Rabbit.Schema.PaymentMaintenance);

// Attach soft remove
//Rabbit.Collection.Customer.attachBehaviour('softRemovable');
