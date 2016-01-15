Meteor.methods({
    getMaintenanceWithContract(contractId){
        var maintenanceObj = {}
        var arr = []
        var maintenances = Rabbit.Collection.Maintenance.find({'_office.contractId': contractId}).fetch();
        maintenances.forEach((maintenance)=> {
            var payment = Rabbit.Collection.PaymentMaintenance.findOne({
                'maintenance.maintenanceId': maintenance._id
            }, {
                sort: {
                    _id: -1
                }
            });

            if (payment != null) {
                payment.maintenance.forEach(function (payObj) {
                    if (maintenance._id == payObj.maintenanceId && payObj.dueAmount > 0) {
                        arr.push({
                            maintenanceId: payObj.maintenanceId,
                            maintenance: payObj.maintenance,
                            price: payObj.dueAmount,
                            dueAmount: payObj.dueAmount,
                            discount: 0
                        });
                    }
                });
            } else if (payment == null) {
                arr.push({
                    maintenanceId: maintenance._id,
                    maintenance: maintenance.type,
                    price: maintenance.price,
                    dueAmount: maintenance.price,
                    discount: 0
                });
            }
        });
        maintenanceObj.maintenance = arr;
        return maintenanceObj;
    }
});
