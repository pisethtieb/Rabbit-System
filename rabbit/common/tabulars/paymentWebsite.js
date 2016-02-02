Rabbit.TabularTable.PaymentWebsite = new Tabular.Table({
    name: "rabbit_saleBranchPaymentWebsiteList",
    collection: Rabbit.Collection.PaymentWebsite,
    pagingType: "full_numbers",
    autoWidth: false,
    columnDefs: [
        {"width": "12px", "targets": 0}
    ],
    order: [['1', 'desc']],
    columns: [
        {title: '<i class="fa fa-bars"></i>', tmpl: Meteor.isClient && Template.rabbit_paymentWebsiteAction},
        {data: "_id", title: "ID"},
        {data: "websiteId", title: "paymentWebsite ID"},
        {
            data: "PaymentWebsiteDate", title: "PaymentWebsite Date",
            render: function (val, type, doc) {
                return moment(val).format('YYYY-MM-DD');
            }
        },
        {data: "buildPrice", title: "Build"},
        {data: "domainNamePrice", title: "Domain"},
        {data: "hostingPrice", title: "Hosting"},
        {data: "maintenancePrice", title: "Maintenance"},

    ],
    extraFields: ['domainNameStartDate', 'domainNameEndDate', 'hostingStartDate', 'hostingEndDate', 'maintenanceStartDate', 'maintenanceEndDate']
});