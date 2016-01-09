// Customer
Rabbit.Collection.Customer.permit(['insert', 'update', 'remove'])
    .rabbit_ifData()
    .apply();
