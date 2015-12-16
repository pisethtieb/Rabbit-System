//cacheDoc
Rabbit.Collection.Payment.cacheDoc('product', Rabbit.Collection.Product, ['_id', 'name', 'basePrice', 'maintenancePrice', 'feature']);
Rabbit.Collection.Payment.cacheDoc('contract', Rabbit.Collection.Contract, ['_id', 'customerId', 'contractDate', 'productId']);
Rabbit.Collection.Payment.cacheDoc('customer', Rabbit.Collection.Customer, ['_id', 'companyName', 'companyTelephone', 'companyAddress', 'companyWebsite', 'companyEmail', 'contractName', 'gender', 'id', 'email',
    'position', 'dob', 'telephone', 'address']);
//Rabbit.Collection.Office.cacheCount('maintenanceCount', Rabbit.Collection.Maintenance, 'officeId');
