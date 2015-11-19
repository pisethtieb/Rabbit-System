// Sale
Rabbit.Collection.SaleBranchOffice.permit(['insert', 'update', 'remove'])
    .rabbit_ifData()
    .apply();
