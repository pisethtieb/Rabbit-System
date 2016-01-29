// Customer
Rabbit.TabularTable.Customer = new Tabular.Table({
    name: "rabbit_customerList",
    collection: Rabbit.Collection.Customer,
    pagingType: "full_numbers",
    autoWidth: false,
    columnDefs: [
        {"width": "12px", "targets": 0}
    ],
    order: [['1', 'desc']],
    columns: [
        {title: '<i class="fa fa-bars"></i>', tmpl: Meteor.isClient && Template.rabbit_customerAction},
        {data: "_id", title: "ID"},
        {data: "companyName", title: "Company Name"},
        {data: "contractName", title: "ContractName"},
        {data: "address", title: "Address"},
        {data: "telephone", title: "Telephone"},

        {
            data: "_contractCount",
            title: "System<i class='fa fa-arrow-up'></i>",
            tmpl: Meteor.isClient && Template.rabbit_contractLinkAction
        },
        {
            data: "_websiteCount",
            title: "Web<i class='fa fa-arrow-up'></i>",
            tmpl: Meteor.isClient && Template.rabbit_websiteLinkAction
        }
        //{
        //    data: "_contractCount",
        //    title: "Web<i class='fa fa-arrow-up'></i>",
        //    tmpl: Meteor.isClient && Template.rabbit_contractLinkAction
        //}
    ], extraFields: ['contactPerson', 'contractName', 'age', 'telephone', 'dob', 'id', 'position', 'gender', 'email',
        'companyName', 'companyAddress', 'companyWebsite', 'companyTelephone', 'companyEmail']
});