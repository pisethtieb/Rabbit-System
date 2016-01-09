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
        {data: "des", title: "des"}
    ],
    extraFields: ['office', 'paymentDate']
});