// Sale
Rabbit.Collection.Office.permit(['insert', 'update', 'remove'])
    .rabbit_ifData()
    .apply();
