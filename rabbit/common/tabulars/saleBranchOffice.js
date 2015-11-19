Rabbit.TabularTable.SaleBranchOffice = new Tabular.Table({
    name: "rabbit_saleBranchOfficeList",
    collection: Rabbit.Collection.SaleBranchOffice,
    pagingType: "full_numbers",
    autoWidth: false,
    columnDefs: [
        {"width": "12px", "targets": 0}
    ],
    order: [['1', 'desc']],
    columns: [
        {title: '<i class="fa fa-bars"></i>', tmpl: Meteor.isClient && Template.rabbit_saleBranchOfficeAction},
        {data: "_id", title: "ID"},
        {data: "saleHeadOfficeId", title: "Sale HeadOffice ID"},
        {data: "branchBasePrice", title: "Branch BasePrice"},
        {data: "branchMaintainPrice", title: "Branch Maintenance Price"},
        {data: "totalPrice", title: "Total Price"}
    ]
});