// Customer
Rabbit.TabularTable.Customer = new Tabular.Table({
    name: "rabbit_customerList",
    collection: Rabbit.Collection.Customer,
    pagingType: "full_numbers",
    autoWidth: false,
    columnDefs: [
        {"width": "12px", "targets": 0}
    ],
    order: [['1', 'desc']],
    columns: [
        {title: '<i class="fa fa-bars"></i>', tmpl: Meteor.isClient && Template.rabbit_customerAction},
        {data: "_id", title: "ID"},
        {data: "companyName", title: "Company Name"},
        {data: "address", title: "Address"},
        {data: "telephone", title: "Telephone"},
        {
            data: "contactPerson", title: "Contact Person",
            render: function (val, type, doc) {
                return JSON.stringify(val);
            }
        }
    ]
});