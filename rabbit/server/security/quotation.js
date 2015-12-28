// Sale
Rabbit.Collection.Quotation.permit(['insert', 'update', 'remove'])
    .rabbit_ifData()
    .apply();
