// Customer
Rabbit.TabularTable.Quotation = new Tabular.Table({
    name: "rabbit_quotationLists",
    collection: Rabbit.Collection.Quotation,
    pagingType: "full_numbers",
    autoWidth: false,
    columnDefs: [
        {"width": "12px", "targets": 0}
    ],
    order: [['1', 'desc']],
    columns: [
        {title: '<i class="fa fa-bars"></i>', tmpl: Meteor.isClient && Template.rabbit_quotationAction},
        {data: "_id", title: "ID"},
        {data: "_customer.companyName", title: "Customer"},
        {
            data: "quotationDate", title: "Quotation Date",
            render: function (val, type, doc) {
                return moment(val).format('YYYY-MM-DD');
            }
        },
        {data: "type", title: "Pro Type"},
        {data: "productId", title: "Product ID"}

    ],
    extraFields: ['customerId', 'quotationDate', 'basePrice', 'maintenancePrice', 'paymentMethod', 'type', 'testing', 'maintenanceFee', 'des', '_product', '_customer', 'addFile', 'contractorId', 'monthlyFee', 'installationFee', 'trainingFee']
});