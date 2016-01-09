// Customer
Rabbit.Collection.PaymentMaintenance.permit(['insert', 'update', 'remove'])
    .rabbit_ifData()
    .apply();
