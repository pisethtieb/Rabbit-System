// Collection
Rabbit.Collection.Payment = new Mongo.Collection("rabbit_payment");

// Schema
Rabbit.Schema.Payment = new SimpleSchema({
    customerId: {
        type: String,
        label: 'CustomerId'
    },
    contractId: {
        type: String,
        label: 'ContractId'
    },
    type: {
        type: String,
        label: 'Type',
        autoform: {
            type: "select",
            options: function () {
                return Rabbit.List.contractPaymentType();
            }
        }
    },
    officeMaintenance: {
        type: String,
        label: "Office & Maintenance",
        autoform: {
            type: "select",
            options: function () {
                return Rabbit.List.officeMaintenance();
            }
        }
    },
    paymentDate: {
        type: String,
        label: 'Payment Date'

    },
    price: {
        type: Number,
        label: 'price'

    },
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
    dueAmount: {
        type: Number,
        label: 'Due Amount'
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
    branchId: {
        type: String,
        label: "Branch",
        optional: true
    },
    officeId: {
        type: String,
        label: "officeId",
        optional: true
    },
    maintenanceId: {
        type: String,
        label: "maintenanceId",
        optional: true
    }
})
;

// Attach schema
Rabbit.Collection.Payment.attachSchema(Rabbit.Schema.Payment);

// Attach soft remove
//Rabbit.Collection.Customer.attachBehaviour('softRemovable');
SimpleSchema.messages({
    "greaterThan": "PaidAmount mustn't be greater than price!"
});