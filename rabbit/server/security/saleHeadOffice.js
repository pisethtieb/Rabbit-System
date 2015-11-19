// Sale
Rabbit.Collection.SaleHeadOffice.permit(['insert', 'update', 'remove'])
    .rabbit_ifData()
    .apply();
