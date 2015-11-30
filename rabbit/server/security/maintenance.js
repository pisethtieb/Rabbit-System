// Sale
Rabbit.Collection.Maintenance.permit(['insert', 'update', 'remove'])
    .rabbit_ifData()
    .apply();
