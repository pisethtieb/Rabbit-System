// Schema
Rabbit.Schema.PaymentWebsiteBalanceReport = new SimpleSchema({
    branch: {
        type: String,
        autoform: {
            type: "select2",
            options: function () {
                return Rabbit.ListForReport.branch();
            }
        },
        optional: true
    },
    websiteId: {
        type: String,
        max: 100,
        optional: true,
        label: "WebsiteId",
        autoform: {
            type: 'select2',
            options(){
                return Rabbit.ListForReport.website();
            }
        }
    },
    //OfficeId: {
    //    type: String,
    //    max: 100,
    //    optional: true,
    //    label: "OfficeId",
    //    autoform: {
    //        type: 'select2',
    //        options(){
    //            return Rabbit.ListForReport.Office();
    //        }
    //    }
    //},
    date: {
        type: String,
        label:'Date'

    }
});