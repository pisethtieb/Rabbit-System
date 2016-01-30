// Sale
Rabbit.Collection.Service.permit(['insert', 'update', 'remove'])
    .rabbit_ifData()
    .apply();
