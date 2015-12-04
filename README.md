Rabbit System
===============

## ToDo
### Schema

- Product

```js
name: {
    type: String,
    label: 'Name',
    unique: true,
    max: 250
},
branchPrice: {
    type: Object,
    label: "Branch Price",
    decimal: true
},
matanancePrice: {
    type: Object,
    label: "Matanance Price",
    decimal: true
},
feature: {
    type: String,
    label: 'Feature'
}
```

- Customer

```js
companyName: {
    type: String,
    label: 'Company Name',
    max: 250
},
address: {
    type: String,
    label: "Address"
},
telephone: {
    type: String,
    label: 'Company'
}
contactPerson: {
    type: Object, <!--(name, gender,age,idCard, tel)-->
    label: 'Contact Person'
}
```

- Quotation

```js
clientId: {
    type: String,
    label: 'Client Id'
},
productId: {
    type: String,
    label: "Product Id"
},
date:{
    type: DateTime,
    label: "date"
}
```

- misContract

```js
saleDate:{
    type: DateTime,
    label: "date"
},
customerId: {
    type: String,
    label: 'Client Id'
   
},

productId: {
    type: String,
    label: "Product Id"
},

basePrice:{
    type: obj,
    label: "Base Price"
}
maintenancePrice:{
    type: obj,
    label: "Maintenance Price"
}
des:{
    type: string,
    label: "Description"
}
paymentMethod{
    type:string,
    label:"Payment Method"

}
type{
    type:string,
    label:'type'(new/old product)
}

if new product have this collection
    testing{
        type:string
        label:"testing",
        optional:true,
    }
maintenanceFee{
        type:string
        label:"maintenanceFee"; example" 1 year,one month"

    }
}
```

-office{
id{
    type:string,
    label:"ID"
},
contractId{
     type:string,
        label:"contractId"

},
type{
     type:string,
     label:"type" list (HO,BO)

},
price{
     type:string,
     label:"price"

}
des{
     type: String,
     label: "Description"

}

- Maintenance_service

```js
id{
    type:string,
    label:"ID"
},
officeId: {
    type: String,
    label: 'office Id'

},
startDate{
    type:String,
    label:"startDate"
    }
EndDate{
        type:String,
        label:"endDate"
        }
price{
    type:string,
    label:"price"
 }
des: {
    type: String,
    label: "Description"
}

-payment

Id: {
    type: String,
    label: 'Id'

},
customerId{
    type:String,
    label:"customerId"
    }
type{
        type:String,
        label:"type" list (office/maintenance
        }
price{
    type:string,
    label:"price"
 }
paid: {
    type: String,
    label: "paid"
}
dueAmount: {
    type: String,
    label: "dueAmount"
}




### Develop
- ~~Product~~
- Customer
- Quotation
- Sale

### Report
- Quotation
- Invoice
