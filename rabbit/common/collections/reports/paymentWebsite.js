// Schema
Rabbit.Schema.PaymentWebsiteReport = new SimpleSchema({
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
        label: "websiteId",
        autoform: {
            type: 'select2',
            options(){
                return Rabbit.ListForReport.website();
            }
        }
    },
    date: {
        type: String,
        defaultValue: function () {
            var start = moment().startOf('month').format('YYYY-MM-DD');
            var current = moment().format('YYYY-MM-DD');
            return start + ' To ' + current;
        }
    }
});