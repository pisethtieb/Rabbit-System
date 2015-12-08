Rabbit.TabularTable.Maintenance = new Tabular.Table({
    name: "rabbit_maintenanceList",
    collection: Rabbit.Collection.Maintenance,
    pagingType: "full_numbers",
    autoWidth: false,
    columnDefs: [
        {"width": "12px", "targets": 0}
    ],
    order: [['1', 'desc']],
    columns: [
        {title: '<i class="fa fa-bars"></i>', tmpl: Meteor.isClient && Template.rabbit_maintenanceAction},
        {data: "_id", title: "ID"},
        {data: "officeId", title: "Office Id"},

        {data: "type", title: "Type"},
        {data: "price", title: "Price"},
        {data: "startDate", title: "Start Date"},
        {data: "endDate", title: "End Date"}
        //{
        //    data: '',
        //    title: "Office <i class='fa fa-arrow-up'></i>",
        //    tmpl: Meteor.isClient && Template.rabbit_addMaintenance
        //}
    ]
});