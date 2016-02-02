// Customer
Rabbit.TabularTable.Website = new Tabular.Table({
    name: "rabbit_websiteLists",
    collection: Rabbit.Collection.Website,
    pagingType: "full_numbers",
    autoWidth: false,
    columnDefs: [
        {"width": "12px", "targets": 0}
    ],
    order: [['1', 'desc']],
    columns: [
        {title: '<i class="fa fa-bars"></i>', tmpl: Meteor.isClient && Template.rabbit_websiteAction},
        {data: "_id", title: "ID"},
        {data: "_customer.companyName", title: "Customer"},
        {
            data: "registerDate", title: "Register Date",
            render: function (val, type, doc) {
                return moment(val).format('YYYY-MM-DD');
            }
        },
        {data: "webName", title: "Web Name"},
        {data: "type", title: "Type"},
        {data: "price", title: "price"},
        {
            data: "_serviceCount",
            title: "Service <i class='fa fa-arrow-up'></i>",
            tmpl: Meteor.isClient && Template.rabbit_serviceLinkAction
        }, {
            data: "_paymentWebsiteCount",
            title: "Payment <i class='fa fa-arrow-up'></i>",
            tmpl: Meteor.isClient && Template.rabbit_paymentWebsiteLinkAction
        }
    ],
    extraFields: ['customerId']
});
