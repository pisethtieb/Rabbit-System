// Schema
Rabbit.Schema.MaintenanceReport = new SimpleSchema({
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
    contractId: {
        type: String,
        max: 100,
        optional: true,
        label: "ContractId",
        autoform: {
            type: 'select2',
            options(){
                return Rabbit.ListForReport.contract();
            }
        }
    },
    officeId: {
        type: String,
        max: 100,
        optional: true,
        label: "OfficeId",
        autoform: {
            type: 'select2',
            options(){
                return Rabbit.ListForReport.office();
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