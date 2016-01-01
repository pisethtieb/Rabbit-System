// Collection
Rabbit.Collection.Payment = new Mongo.Collection("rabbit_payment");

// Schema
Rabbit.Schema.Payment = new SimpleSchema({
    customerId: {
        type: String,
        label: 'CustomerId'
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
        label: 'ContractId'
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
        custom: function () {
            if (this.value <= this.field('office.$.price').value) {
                return "greaterThan";
            }
        },
        optional: true,
        decimal:true
    },
    'office.$.dueAmount': {
        type: Number,
        decimal:true
    }
    //type: {
    //    type: String,
    //    label: 'Type',
    //    autoform: {
    //        type: "select",
    //        options: function () {
    //            return Rabbit.List.contractPaymentType();
    //        }
    //    }
    //}
//    officeMaintenance: {
//        type: String,
//        label: "Office & Maintenance"
//        //,
//        //autoform: {
//        //    type: "select",
//        //    options: function () {
//        //        return Rabbit.List.officeMaintenance();
//        //    }
//        //}
//    },
//    paymentDate: {
//        type: String,
//        label: 'Payment Date',
//        defaultValue: function () {
//            var currentDate = moment(ReactiveMethod.call("currentDate"), 'YYYY-MM-DD').format('YYYY-MM-DD');
//            return currentDate;
//        }
//
//    },
//    price: {
//        type: Number,
//        label: 'price'
//
//    },
//    paidAmount: {
//        type: Number,
//        label: "Paid Amount",
//        min: 1,
//        custom: function () {
//            if (this.value > this.field('price').value) {
//                return "greaterThan";
//            }
//        }
//    },
//    dueAmount: {
//        type: Number,
//        label: 'Due Amount'
//    },
//    des: {
//        type: String,
//        label: "Description",
//        optional: true,
//        autoform: {
//            afFieldInput: {
//                type: "textarea"
//            }
//        }
//    },
//    branchId: {
//        type: String,
//        label: "Branch",
//        optional: true
//    },
//    officeId: {
//        type: String,
//        //autoform: {
//        //    type: "hidden",
//        //    label: false
//        //},
//        optional: true
//
//
//    },
//    maintenanceId: {
//        type: String,
//        //autoform: {
//        //    type: "hidden",
//        //    label: false
//        //},
//        optional: true
//    }
})
;

// Attach schema
Rabbit.Collection.Payment.attachSchema(Rabbit.Schema.Payment);

// Attach soft remove
//Rabbit.Collection.Customer.attachBehaviour('softRemovable');
SimpleSchema.messages({
    "greaterThan": "PaidAmount mustn't be greater than price!"
});