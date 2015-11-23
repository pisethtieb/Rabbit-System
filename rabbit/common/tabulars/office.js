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
        {data: "_id", title: "ID"}
    ]
});