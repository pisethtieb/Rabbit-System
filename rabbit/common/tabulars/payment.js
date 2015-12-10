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
        {data: "officeMaintenance", title: "officeMaintenance"},
        {data: "price", title: "Price"},
        {data: "paidAmount", title: "PaidAmount"},
        {data: "dueAmount", title: "DueAmount"},
        {data: "des", title: "des"}
    ],
    extraFields: ['customerId', 'paymentDate', 'paidAmount', 'dueAmount', 'des', 'officeMaintenance', 'officeId', 'maintenanceId']
});