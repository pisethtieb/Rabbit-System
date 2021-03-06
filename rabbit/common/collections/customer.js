// Collection
Rabbit.Collection.Customer = new Mongo.Collection("rabbit_customer");

// Schema
Rabbit.Schema.Customer = new SimpleSchema({
  contractName: {
    type: String,
    label: "Name"
  },
  gender: {
    type: String,
    label: 'Gender',
    autoform: {
      type: "select2",
      options: function() {
        return Rabbit.List.gender();
      },
      afFieldInput: {
        select2Options: {
          theme: "bootstrap"
        }
      }
    }
  },
  dob: {
    type: String,
    label: 'Date Of Birth'
  },
  id: {
    type: String,
    label: 'ID Card',
    optional: true
  },
  position: {
    type: String,
    label: "Position"
  },
  address: {
    type: String,
    label: 'Address',
    // autoform: {
    //     afFieldInput: {
    //         type: "textarea"
    //     }
    // },
    optional: true
  },
  telephone: {
    type: String,
    label: 'Telephone'
  },
  email: {
    type: String,
    label: 'Email',
    regEx: SimpleSchema.RegEx.Email,
    optional: true
  },


  companyName: {
    type: String,
    label: "Company Name",
    max: 200
  },
  companyAddress: {
    type: String,
    label: "Address",
    autoform: {
      afFieldInput: {
        type: "textarea"
      }
    }
  },
  companyTelephone: {
    type: String,
    label: "Telephone"
  },
  companyEmail: {
    type: String,
    label: "Email",
    regEx: SimpleSchema.RegEx.Email,
    optional: true
  },
  companyWebsite: {
    type: String,
    label: "Website",
    optional: true
  },
  contactPerson: {
    type: Array,
    minCount: 1,
    maxCount: 5,
    optional: true,
    label: "Contact Person"
  },
  'contactPerson.$': {
    type: Object
  },
  'contactPerson.$.name': {
    type: String
  },
  'contactPerson.$.gender': {
    type: String,
    autoform: {
      type: "selectize",
      options: function() {
        return Rabbit.List.gender();
      }
    }
  },
  'contactPerson.$.position': {
    type: String
  },
  'contactPerson.$.tel': {
    type: String
  },
  branchId: {
    type: String,
    label: "Branch"
  }
});
Rabbit.Collection.Customer.attachSchema(Rabbit.Schema.Customer);
