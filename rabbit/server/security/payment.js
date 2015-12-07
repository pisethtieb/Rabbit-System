// Customer
Rabbit.Collection.Product.permit(['insert', 'update', 'remove'])
    .rabbit_ifData()
    .apply();
