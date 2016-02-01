// Collection
Rabbit.Collection.PaymentWebsite = new Mongo.Collection("rabbit_paymentWebsite");

// Schema
Rabbit.Schema.PaymentWebsite = new SimpleSchema({
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
//    domainName
    domainNamePrice: {
        type: Number,
        label: "Price",
        decimal: true,
        optional: true
    },
    domainNameStartDate: {
        type: String,
        label: "StartDate",
        optional: true
    },
    domainNameEndDate: {
        type: String,
        label: "EndDate",
        optional: true
    },
//    Hosting
    hostingPrice: {
        type: Number,
        label: "Price",
        decimal: true,
        optional: true
    },
    hostingStartDate: {
        type: String,
        label: "StartDate",
        optional: true
    },
    hostingEndDate: {
        type: String,
        label: "EndDate",
        optional: true
    },
    //    maintenance

    maintenancePrice: {
        type: Number,
        label: "Price",
        decimal: true,
        optional: true
    },
    maintenanceStartDate: {
        type: String,
        label: "StartDate",
        optional: true
    },
    maintenanceEndDate: {
        type: String,
        label: "EndDate",
        optional: true
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
