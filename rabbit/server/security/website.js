// Sale
Rabbit.Collection.Website.permit(['insert', 'update', 'remove'])
    .rabbit_ifData()
    .apply();
