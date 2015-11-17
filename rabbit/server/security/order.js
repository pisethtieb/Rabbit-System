// Order
Rabbit.Collection.Order.permit(['insert', 'update', 'remove'])
    .rabbit_ifData()
    .apply();
