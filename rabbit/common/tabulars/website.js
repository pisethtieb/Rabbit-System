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
        {title: '<i class="fa fa-bars"></i>', tmpl: Meteor.isClient && Template.rabbit_contractAction},
        {data: "_id", title: "ID"},
        {data: "_customer.companyName", title: "Customer"},
        {
            data: "contractDate", title: "Contract Date",
            render: function (val, type, doc) {
                return moment(val).format('YYYY-MM-DD');
            }
        },
        {data: "productId", title: "Product ID"},
        {
            data: "_officeCount",
            title: "Office <i class='fa fa-arrow-up'></i>",
            tmpl: Meteor.isClient && Template.rabbit_officeLinkAction
        }, {
            data: "_paymentOfficeCount",
            title: "Pay Office <i class='fa fa-arrow-up'></i>",
            tmpl: Meteor.isClient && Template.rabbit_paymentOfficeLinkAction
        }, {
            data: "_paymentMaintenanceCount",
            title: "Pay Maintenance <i class='fa fa-arrow-up'></i>",
            tmpl: Meteor.isClient && Template.rabbit_paymentMaintenanceLinkAction
        }, {
            data: "",
            title: "AddFIle",
            tmpl: Meteor.isClient && Template.rabbit_addFile
        }
    ],
    extraFields: ['customerId', 'contractDate', 'basePrice', 'maintenancePrice', 'paymentMethod', 'type', 'testing', 'maintenanceFee', 'des', '_product', '_customer', 'addFile', 'contractorId', 'agentId', 'paymentMethod', 'amount']
});
