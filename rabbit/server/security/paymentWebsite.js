// Sale
Rabbit.Collection.PaymentWebsite.permit(['insert', 'update', 'remove'])
    .rabbit_ifData()
    .apply();
