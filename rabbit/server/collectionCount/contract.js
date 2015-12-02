//cacheCount
Rabbit.Collection.Contract.cacheCount('officeCount', Rabbit.Collection.Office, 'contractId');
//cacheDoc
Rabbit.Collection.Contract.cacheDoc('product', Rabbit.Collection.Product, ['_id', 'name', 'basePrice', 'maintenancePrice', 'feature']);
Rabbit.Collection.Contract.cacheDoc('customer', Rabbit.Collection.Customer, ['_id', 'companyName', 'contractPerson']);