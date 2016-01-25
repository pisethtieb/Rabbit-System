Meteor.methods({
    getOfficeWithContract(contractId){
        var officeObj = {};
        var arr = [];
        var offices = Rabbit.Collection.Office.find({contractId: contractId}).fetch();
        offices.forEach((office)=> {
            var paymentOffice = Rabbit.Collection.PaymentOffice.findOne({
                'office.officeId': office._id
            }, {
                sort: {
                    _id: -1
                }
            });
            if (paymentOffice != null) {
                paymentOffice.office.forEach(function (payObj) {
                    if (office._id == payObj.officeId && payObj.dueAmount > 0) {
                        arr.push({
                            officeId: payObj.officeId,
                            office: payObj.office,
                            price: payObj.dueAmount,
                            dueAmount: payObj.dueAmount
                        });
                    }
                });
            } else if (paymentOffice == null) {
                arr.push({
                    officeId: office._id,
                    office: office.type,
                    price: office.price,
                    dueAmount: office.price
                });
            }
        });
        officeObj.office = arr;
        return officeObj;
    }
});
