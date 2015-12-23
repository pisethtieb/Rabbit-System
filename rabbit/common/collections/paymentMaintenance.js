// Collection
Rabbit.Collection.PaymentMaintenance = new Mongo.Collection("rabbit_paymentMaintenance");

// Schema
Rabbit.Schema.PaymentMaintenance = new SimpleSchema({
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
    paymentMaintenanceDate: {
        type: String,
        label: 'PaymentMaintenance Date',
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
        type: String,
        autoform: {
            type: "select",
            options: function () {
                return Rabbit.List.paymentMaintenance();
            }
        }
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
        custom: function () {
            if (this.value <= this.field('maintenance.$.price').value) {
                return "greaterThan";
            }
        },
        optional: true
    },
    'maintenance.$.dueAmount': {
        type: Number
    }
    //type: {
    //    type: String,
    //    label: 'Type',
    //    autoform: {
    //        type: "select",
    //        options: function () {
    //            return Rabbit.List.contractPaymentMaintenanceType();
    //        }
    //    }
    //}
//    maintenanceMaintenance: {
//        type: String,
//        label: "maintenance & Maintenance"
//        //,
//        //autoform: {
//        //    type: "select",
//        //    options: function () {
//        //        return Rabbit.List.maintenanceMaintenance();
//        //    }
//        //}
//    },
//    paymentMaintenanceDate: {
//        type: String,
//        label: 'PaymentMaintenance Date',
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
//    maintenanceId: {
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
Rabbit.Collection.PaymentMaintenance.attachSchema(Rabbit.Schema.PaymentMaintenance);

// Attach soft remove
//Rabbit.Collection.Customer.attachBehaviour('softRemovable');
SimpleSchema.messages({
    "greaterThan": "PaidAmount mustn't be greater than price!"
});