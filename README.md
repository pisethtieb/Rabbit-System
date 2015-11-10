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
    type: Object, <!--(name, gender, tel)-->
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

- Sale

```js
clientId: {
    type: String,
    label: 'Client Id'
   
},
productId: {
    type: String,
    label: "Product Id"
},
saleDate:{
    type: DateTime,
    label: "date"
},
totalPrice:{
    type: String,
    label: "Total Price"
}
```

- Maintenance_service

```js
saleId: {
    type: String,
    label: 'Sale Id'
   
},
des: {
    type: String,
    label: "Description"
}
```

### Develop
- ~~Product~~
- Customer
- Quotation
- Sale

### Report
- Quotation
- Invoice
