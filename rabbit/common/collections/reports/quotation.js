// Schema
Rabbit.Schema.QuotationReport = new SimpleSchema({
    branch: {
        type: String,
        autoform: {
            type: "select2",
            options: function () {
                return Rabbit.ListForReport.branch();
            },
            afFieldInput: {
                select2Options: {
                    theme: "bootstrap"
                }
            }
        },
        optional: true
    },
    productId: {
        type: String,
        max: 100,
        optional: true,
        label: "ProductId",
        autoform: {
            type: 'select2',
            options(){
                return Rabbit.ListForReport.product();
            },
            afFieldInput: {
                select2Options: {
                    theme: "bootstrap"
                }
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