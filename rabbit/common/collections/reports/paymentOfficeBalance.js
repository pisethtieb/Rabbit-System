// Schema
Rabbit.Schema.PaymentOfficeBalanceReport = new SimpleSchema({
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
    contractId: {
        type: String,
        max: 100,
        optional: true,
        label: "ContractId",
        autoform: {
            type: 'select2',
            options(){
                return Rabbit.ListForReport.contract();
            },
            afFieldInput: {
                select2Options: {
                    theme: "bootstrap"
                }
            }
        }
    },
    //officeId: {
    //    type: String,
    //    max: 100,
    //    optional: true,
    //    label: "OfficeId",
    //    autoform: {
    //        type: 'select2',
    //        options(){
    //            return Rabbit.ListForReport.office();
    //        }
    //    }
    //},
    date: {
        type: String,
        label:'Date'

    }
});