// Customer
Rabbit.TabularTable.Product = new Tabular.Table({
    name: "rabbit_productList",
    collection: Rabbit.Collection.Product,
    pagingType: "full_numbers",
    autoWidth: false,
    columnDefs: [
        {"width": "12px", "targets": 0}
    ],
    order: [['1', 'desc']],
    columns: [
        {title: '<i class="fa fa-bars"></i>', tmpl: Meteor.isClient && Template.rabbit_productAction},
        {data: "_id", title: "ID"},
        {data: "name", title: "Name"},
        {
            data: "basePrice", title: "Product Price",
            render: function (val, type, doc) {
                return JSON.stringify(val);
            }
        },
        {
            data: "maintenancePrice", title: "Maintenance Price",
            render: function (val, type, doc) {
                return JSON.stringify(val);
            }
        },
        {data: "_contractCunt", title: "Contract"},
        {data: "_quotationCount", title: "Quotation"}
    ],
    extraFields: ['feature']
});