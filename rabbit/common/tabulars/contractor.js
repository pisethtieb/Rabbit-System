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
        {data: "name", title: "Name"},
        {data: "dob", title: "DOB"},
        {data: "gender", title: "Gender"},
        {data: "id", title: "ID"},
        {data: "telephone", title: "Telephone"},
        {data: "email", title: "Email"},
        {data: "_contractCount", title: "contract"},
        {data: "_quotationCount", title: "Quotation"}


    ],
    extraFields: ['position', 'contractorDate', 'basePrice', 'maintenancePrice', 'paymentMethod', 'type', 'testing', 'maintenanceFee', 'des', '_product', '_customer', 'addFile']
});