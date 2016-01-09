//cacheDoc
Rabbit.Collection.PaymentMaintenance.cacheDoc('product', Rabbit.Collection.Product, ['_id', 'name', 'basePrice', 'maintenancePrice', 'feature']);
Rabbit.Collection.PaymentMaintenance.cacheDoc('contract', Rabbit.Collection.Contract, ['_id', 'customerId', 'contractDate', 'productId']);
Rabbit.Collection.PaymentMaintenance.cacheDoc('customer', Rabbit.Collection.Customer, ['_id', 'companyName', 'companyTelephone', 'companyAddress', 'companyWebsite', 'companyEmail', 'contractName', 'gender', 'id', 'email',
    'position', 'dob', 'telephone', 'address']);
//Rabbit.Collection.Office.cacheCount('maintenanceCount', Rabbit.Collection.Maintenance, 'officeId');
