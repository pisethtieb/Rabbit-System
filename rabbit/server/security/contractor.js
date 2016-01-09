// Sale
Rabbit.Collection.Contractor.permit(['insert', 'update', 'remove'])
    .rabbit_ifData()
    .apply();
