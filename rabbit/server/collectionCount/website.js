//cacheCount
Rabbit.Collection.Website.cacheCount('serviceCount', Rabbit.Collection.Service, 'websiteId');
Rabbit.Collection.Website.cacheCount('paymentWebsiteCount', Rabbit.Collection.PaymentWebsite, 'websiteId');
//cacheDoc
Rabbit.Collection.Website.cacheDoc('customer', Rabbit.Collection.Customer, ['_id', 'companyName', 'companyTelephone', 'companyAddress', 'companyWebsite', 'companyEmail', 'gender', 'id', 'email',
    'position', 'dob', 'telephone', 'address', 'contractName']);