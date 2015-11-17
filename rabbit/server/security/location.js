// Location
Rabbit.Collection.Location.permit(['insert', 'update', 'remove'])
    .rabbit_ifSetting()
    .apply();
