// Customer
Rabbit.Collection.PaymentOffice.permit(['insert', 'update', 'remove'])
    .rabbit_ifData()
    .apply();
