// Schema
Rabbit.Schema.RenewServiceReport = new SimpleSchema({
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
    customerId: {
        type: String,
        max: 100,
        optional: true,
        label: "CustomerId",
        autoform: {
            type: 'select2',
            options(){
                return Rabbit.ListForReport.customer();
            }
        }
    },
    date: {
        type: String
    }
});