//cacheCount
Rabbit.Collection.Contract.cacheCount('officeCount', Rabbit.Collection.Office, 'contractId');
Rabbit.Collection.Contract.cacheCount('paymentCount', Rabbit.Collection.Payment, 'contractId');
//cacheDoc
Rabbit.Collection.Contract.cacheDoc('product', Rabbit.Collection.Product, ['_id', 'name', 'basePrice', 'maintenancePrice', 'feature']);
Rabbit.Collection.Contract.cacheDoc('customer', Rabbit.Collection.Customer, ['_id', 'companyName', 'companyTelephone', 'companyAddress', 'companyWebsite', 'companyEmail', 'contractName', 'gender', 'id', 'email',
    'position', 'dob']);