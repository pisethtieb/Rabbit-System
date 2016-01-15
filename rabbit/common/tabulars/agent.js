// Customer
Rabbit.TabularTable.Agent = new Tabular.Table({
    name: "rabbit_agent",
    collection: Rabbit.Collection.Agent,
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
        //{data: "dob", title: "DOB"},
        {data: "gender", title: "Gender"},
        //{data: "id", title: "ID"},
        {data: "telephone", title: "Telephone"},
        {data: "address", title: "Address"},
        //{data: "email", title: "Email"},
        {data: "_agentCount", title: "contract"}


    ],
    extraFields: ['position', 'contractorDate', 'basePrice', 'maintenancePrice', 'paymentMethod', 'type', 'testing', 'maintenanceFee', 'des', '_product', '_customer', 'addFile']
});