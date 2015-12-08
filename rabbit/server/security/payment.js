// Customer
Rabbit.Collection.Payment.permit(['insert', 'update', 'remove'])
    .rabbit_ifData()
    .apply();
