Rabbit.TabularTable.Office = new Tabular.Table({
    name: "rabbit_saleBranchOfficeList",
    collection: Rabbit.Collection.Office,
    pagingType: "full_numbers",
    autoWidth: false,
    columnDefs: [
        {"width": "12px", "targets": 0}
    ],
    order: [['1', 'desc']],
    columns: [
        {title: '<i class="fa fa-bars"></i>', tmpl: Meteor.isClient && Template.rabbit_officeAction},
        {data: "_id", title: "ID"},
        {data: "name", title: "Name"},
        {data: "officeDate", title: "officeDate"},
        {data: "contractId", title: "Contract ID"},
        {data: "type", title: "Type"},
        {data: "price", title: "Price"},
        {
            data: "_maintenanceCount",
            title: "Maintenance <i class='fa fa-arrow-up'></i>",
            tmpl: Meteor.isClient && Template.rabbit_maintenanceLinkActions
        }
    ], extraFields: ['_contract.customerId', 'des']
});