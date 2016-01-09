//cacheDoc
Rabbit.Collection.Office.cacheDoc('product', Rabbit.Collection.Product, ['_id', 'name', 'basePrice', 'maintenancePrice', 'feature']);
Rabbit.Collection.Office.cacheDoc('contract', Rabbit.Collection.Contract, ['_id',
    'customerId', 'contractDate', 'productId', 'basePrice', 'maintenancePrice', 'paymentMethod', 'type',
    'maintenanceFee', 'des']);
//cacheCount
Rabbit.Collection.Office.cacheCount('maintenanceCount', Rabbit.Collection.Maintenance, 'officeId');
