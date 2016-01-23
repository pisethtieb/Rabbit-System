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
                var str = "<ul>";
                if (val != null) {
                    val.forEach(function (o) {
                        o.discount = o.discount == null ? 0 : o.discount;
                        o.paidAmount = o.paidAmount == null ? 0 : o.paidAmount;
                        str += "<li>mainId: " + o.maintenanceId +
                            " | type: " + o.maintenance + " | Price: " + o.price + " | dis: " + o.discount + " | paid: " + o.paidAmount + " | Due: " + o.dueAmount +
                            "</li>";
                    });
                }
                str += '</ul>';
                return str
            }
        }
    ],
    extraFields: ['maintenance', 'paymentMaintenanceDate', 'customerId', 'des']
});