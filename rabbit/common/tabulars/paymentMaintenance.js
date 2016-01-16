Rabbit.TabularTable.PaymentMaintenance = new Tabular.Table({
    name: "rabbit_saleBranchPaymentMaintenanceList",
    collection: Rabbit.Collection.PaymentMaintenance,
    pagingType: "full_numbers",
    autoWidth: false,
    columnDefs: [
        {"width": "12px", "targets": 0}
    ],
    order: [['1', 'desc']],
    columns: [
        {title: '<i class="fa fa-bars"></i>', tmpl: Meteor.isClient && Template.rabbit_paymentMaintenanceAction},
        {data: "_id", title: "ID"},
        {data: "_customer.companyName", title: "customer"},
        {data: "contractId", title: "Contract ID"},
        {
            data: "maintenance", title: "payment",
            render: function (val, type, doc) {
                return JSON.stringify(val);
            }
        }
    ],
    extraFields: ['maintenance', 'paymentMaintenanceDate', 'customerId', 'des']
});