// Collection
Rabbit.Collection.PaymentWebsite = new Mongo.Collection("rabbit_paymentWebsite");

// Schema
Rabbit.Schema.PaymentWebsite = new SimpleSchema({
    customerId: {
        type: String,
        label: 'CustomerId'

    },
    websiteId: {
        type: String,
        label: 'WebSiteID'

    },
    PaymentWebsiteDate: {
        type: String,
        label: 'PaymentWebsiteDate'
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

// Build Website price

    buildPrice: {
        type: Number,
        label: "Price"
    },
    buildPaid: {
        type: Number,
        label: "Paid"
    }, buildDue: {
        type: Number,
        label: "Due"
    },

//    domainName
    domainNamePrice: {
        type: Number,
        label: "Price",
        decimal: true,
        optional: true
    },
    domainNamePaid: {
        type: Number,
        label: "Paid"
    },
    domainNameDue: {
        type: Number,
        label: "Due"
    },
//    Hosting
    hostingPrice: {
        type: Number,
        label: "Price",
        decimal: true,
        optional: true
    },

    hostingPaid: {
        type: Number,
        label: "Paid"
    },
    hostingDue: {
        type: Number,
        label: "Due"
    },
    //    maintenance
    maintenancePrice: {
        type: Number,
        label: "Price",
        decimal: true,
        optional: true
    },
    maintenancePaid: {
        type: Number,
        label: "Paid"
    },
    maintenanceDue: {
        type: Number,
        label: "Due"
    }


});
// Attach schema
Rabbit.Collection.PaymentWebsite.attachSchema(Rabbit.Schema.PaymentWebsite);

// Attach soft remove
//Rabbit.Collection.Customer.attachBehaviour('softRemovable');

SimpleSchema.messages({
    "greaterThan": "it mustn't be greater than ContractPrice!"
});
//Status API Training Shop Blog About Pricing
