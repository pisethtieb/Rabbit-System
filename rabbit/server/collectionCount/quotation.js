//cacheCount

Rabbit.Collection.Quotation.cacheDoc('product', Rabbit.Collection.Product, ['_id', 'name', 'basePrice', 'maintenancePrice', 'feature']);
Rabbit.Collection.Quotation.cacheDoc('customer', Rabbit.Collection.Customer, ['_id', 'companyName', 'companyTelephone', 'companyAddress', 'companyWebsite', 'companyEmail', 'Quotation.me', 'gender', 'id', 'email',
    'position', 'dob', 'telephone', 'address']);
Rabbit.Collection.Quotation.cacheDoc('contractor', Rabbit.Collection.Contractor, ['name', 'dob', 'gender', 'id', 'telephone', 'email', 'address', 'position']);