Rabbit.TabularTable.PaymentMaintenance = new Tabular.Table({
    name: "rabbit_saleBranchPaymentMaintenanceList",
    collection: Rabbit.Collection.PaymentMaintenance,
    pagingType: "full_numbers",
    autoWidth: false,
    columnDefs: [
        {"width": "12px", "targets": 0}
    ],
    order: [['1', 'desc']],
    columns: [
        {title: '<i class="fa fa-bars"></i>', tmpl: Meteor.isClient && Template.rabbit_paymentMaintenanceAction},
        {data: "_id", title: "ID"},
        {data: "_customer.companyName", title: "customer"},
        {data: "contractId", title: "Contract ID"},
        {
            data: "maintenance", title: "payment",
            render: function (val, type, doc) {
                return JSON.stringify(val);
            }
        },
        //{
    //
    //data: "childItem", title: "Child Item",
    //render: function (val, type, doc) {
    //    //return EJSON.stringify(val, true);
    //    var str = "<ul>";
    //    if(val!=null) {
    //        val.forEach(function (o) {
    //            str += "<li>Name: " + o.name + " | NVal: " + (o.normalValue) + " | PVal: " + o.prependValue + " | AVal: " + (o.appendValue) + "</li>";
    //        });
    //    }
    //    str += '</ul>';
    //    return str
    //
    //},
    ],
    extraFields: ['maintenance', 'paymentMaintenanceDate', 'customerId', 'des']
});