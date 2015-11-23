// Customer
Rabbit.TabularTable.Contract = new Tabular.Table({
    name: "rabbit_saleHeadOfficeList",
    collection: Rabbit.Collection.Contract,
    pagingType: "full_numbers",
    autoWidth: false,
    columnDefs: [
        {"width": "12px", "targets": 0}
    ],
    order: [['1', 'desc']],
    columns: [
        {title: '<i class="fa fa-bars"></i>', tmpl: Meteor.isClient && Template.rabbit_contractAction},
        {data: "_id", title: "ID"},
        {data: "customerId", title: "Customer ID"},
        {
            data: "saleDate", title: "Contract Date",
            render: function (val, type, doc) {
                return moment(val).format('YYYY-MM-DD');
            }
        },
        {data: "productId", title: "Product ID"}
        //{
        //    data: '_branchCount',
        //    title: "Branch <i class='fa fa-arrow-up'></i>",
        //    tmpl: Meteor.isClient && Template.rabbit_branch
        //}

    ]
});