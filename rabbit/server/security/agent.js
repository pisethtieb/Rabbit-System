// Sale
Rabbit.Collection.Agent.permit(['insert', 'update', 'remove'])
    .rabbit_ifData()
    .apply();
