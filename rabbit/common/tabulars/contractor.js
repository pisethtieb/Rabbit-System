// Customer
Rabbit.TabularTable.Contractor = new Tabular.Table({
    name: "rabbit_saleHeadOfficeList",
    collection: Rabbit.Collection.Contractor,
    pagingType: "full_numbers",
    autoWidth: false,
    columnDefs: [
        {"width": "12px", "targets": 0}
    ],
    order: [['1', 'desc']],
    columns: [
        {title: '<i class="fa fa-bars"></i>', tmpl: Meteor.isClient && Template.rabbit_contractorAction},
        {data: "_id", title: "ID"},
        {data: "_customer.companyName", title: "Customer"},
        {
            data: "contractorDate", title: "Contractor Date",
            render: function (val, type, doc) {
                return moment(val).format('YYYY-MM-DD');
            }
        },
        {data: "productId", title: "Product ID"},
        //{
        //    data: '',
        //    title: "Office <i class='fa fa-arrow-up'></i>",
        //    tmpl: Meteor.isClient && Template.rabbit_addOffice
        //}
        {
            data: "_officeCount",
            title: "O <i class='fa fa-arrow-up'></i>",
            tmpl: Meteor.isClient && Template.rabbit_officeLinkAction
        }, {
            data: "_paymentCount",
            title: "P <i class='fa fa-arrow-up'></i>",
            tmpl: Meteor.isClient && Template.rabbit_paymentLinkAction
        }
    ],
    extraFields: ['customerId', 'contractorDate', 'basePrice', 'maintenancePrice', 'paymentMethod', 'type', 'testing', 'maintenanceFee', 'des', '_product', '_customer', 'addFile']
});