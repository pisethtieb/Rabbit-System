Meteor.methods({
    getOfficeWithContract(contractId){
        var officeObj = {}
        var arr = []
        var offices = Rabbit.Collection.Office.find({contractId: contractId}).fetch();
        offices.forEach((office)=> {
            var payment = Rabbit.Collection.Payment.findOne({
                'office.officeId': office._id
            }, {
                sort: {
                    _id: -1
                }
            });
            if (payment != null) {
                payment.office.forEach(function (payObj) {
                    if (office._id == payObj.officeId && payObj.dueAmount > 0) {
                        arr.push({
                            officeId: payObj.officeId,
                            office: payObj.office,
                            price: payObj.dueAmount,
                            dueAmount: payObj.dueAmount,
                            discount: 0
                        });
                    }
                });
            } else if (payment == null) {
                arr.push({
                    officeId: office._id,
                    office: office.type,
                    price: office.price,
                    dueAmount: office.price,
                    discount: 0
                });
            }
        });
        officeObj.office = arr;
        return officeObj;
    }
});
