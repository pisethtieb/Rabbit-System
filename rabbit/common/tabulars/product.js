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
                var str = "<ul>";
                if (val != null) {
                    val.forEach(function (o) {

                        str += "<li>HeadOffice : " + o.headOffice + "| branch :" + o.branch +
                            "</li>";
                    });
                }
                str += '</ul>';
                return str
            }
        },
        {
            data: "maintenancePrice", title: "Maintenance Price",
            render: function (val, type, doc) {
                var str = "<ul>";
                if (val != null) {
                    val.forEach(function (o) {

                        str += "<li>HeadOffice : " + o.headOffice + "| branch :" + o.branch +
                            "</li>";
                    });
                }
                str += '</ul>';
                return str
            }

        },
        {
            data: "monthlyFee", title: "MonthlyFee Price",
            render: function (val, type, doc) {
                var str = "<ul>";
                if (val != null) {
                    val.forEach(function (o) {

                        str += "<li>HeadOffice : " + o.headOffice + "| branch :" + o.branch +
                            "</li>";
                    });
                }
                str += '</ul>';
                return str
            }

        },
        {data: "_contractCunt", title: "C"},
        {data: "_quotationCount", title: "Q"}
    ],
    extraFields: ['feature']
});