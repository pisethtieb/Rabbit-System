//cacheDoc
Rabbit.Collection.Payment.cacheDoc('product', Rabbit.Collection.Product, ['_id', 'name', 'basePrice', 'maintenancePrice', 'feature']);
Rabbit.Collection.Payment.cacheDoc('contract', Rabbit.Collection.Contract, ['_id', 'customerId', 'contractDate', 'productId']);
Rabbit.Collection.Payment.cacheDoc('customer', Rabbit.Collection.Customer, ['companyName', 'telephone', 'address']);
//cacheCount
//Rabbit.Collection.Office.cacheCount('maintenanceCount', Rabbit.Collection.Maintenance, 'officeId');
