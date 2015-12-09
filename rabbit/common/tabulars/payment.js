Rabbit.TabularTable.Payment = new Tabular.Table({
    name: "rabbit_saleBranchPaymentList",
    collection: Rabbit.Collection.Payment,
    pagingType: "full_numbers",
    autoWidth: false,
    columnDefs: [
        {"width": "12px", "targets": 0}
    ],
    order: [['1', 'desc']],
    columns: [
        {title: '<i class="fa fa-bars"></i>', tmpl: Meteor.isClient && Template.rabbit_paymentAction},
        {data: "_id", title: "ID"},
        {data: "_customer.companyName", title: "customer"},
        {data: "contractId", title: "Contract ID"},
        {data: "type", title: "Type"},
        {data: "price", title: "Price"},
        {
            data: "_maintenanceCount",
            title: "Maintenance <i class='fa fa-arrow-up'></i>",
            tmpl: Meteor.isClient && Template.rabbit_maintenanceLinkActions
        }
    ],
    extraFields: ['customerId', 'paymentDate', 'paidAmount', 'dueAmount', 'des', 'officeMaintenance', 'officeId', 'maintenanceId']
});