Rabbit.TabularTable.Service = new Tabular.Table({
    name: "rabbit_saleBranchServiceList",
    collection: Rabbit.Collection.Service,
    pagingType: "full_numbers",
    autoWidth: false,
    columnDefs: [
        {"width": "12px", "targets": 0}
    ],
    order: [['1', 'desc']],
    columns: [
        {title: '<i class="fa fa-bars"></i>', tmpl: Meteor.isClient && Template.rabbit_ServiceAction},
        {data: "_id", title: "ID"},
        {data: "websiteId", title: "paymentWebsite ID"},
        {
            data: "serviceDate", title: "Service Date",
            render: function (val, type, doc) {
                return moment(val).format('YYYY-MM-DD');
            }
        },
        {data: "des", title: "Description"},
        {data: "domainNamePrice", title: "Domain Price"},
        {data: "hostingPrice", title: "Hosting Price"},
        {data: "maintenancePrice", title: "Maintenance Price"}


    ],
    extraFields: ['domainNameStartDate', 'domainNameEndDate', 'hostingStartDate', 'hostingEndDate', 'maintenanceStartDate', 'maintenanceEndDate']
});