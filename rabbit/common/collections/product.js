// Collection
Rabbit.Collection.Product = new Mongo.Collection("rabbit_product");

// Schema
Rabbit.Schema.Product = new SimpleSchema({
    name: {
        type: String,
        label: 'Name',
        unique: true,
        max: 250
    },
    monthlyFee: {
        type: Array,
        //label: "Branch Price",
        minCount: 1,
        maxCount: 1
    },
    'monthlyFee.$': {
        type: Object,
        decimal: true

    },
    'monthlyFee.$.headOffice': {
        type: Number,
        decimal: true

    },
    'monthlyFee.$.branch': {
        type: Number,
        decimal: true

    },
    basePrice: {
        type: Array,
        //label: "Branch Price",
        minCount: 1,
        maxCount: 1
    },
    'basePrice.$': {
        type: Object
    },
    'basePrice.$.headOffice': {
        type: Number,
        decimal: true
    },
    'basePrice.$.branch': {
        type: Number,
        decimal: true
    },
    maintenancePrice: {
        type: Array,
        minCount: 1,
        maxCount: 1
    },
    'maintenancePrice.$': {
        type: Object
    },
    'maintenancePrice.$.headOffice': {
        type: Number,
        decimal: true
    },
    'maintenancePrice.$.branch': {
        type: Number,
        decimal: true
    },
    feature: {
        type: String,
        label: 'Feature',
        autoform: {
            afFieldInput: {
                type: 'summernote',
                class: 'editor',// optional
                settings: {
                    height: 128,
                    toolbar: [
                        ['style', ['bold', 'italic', 'underline', 'clear']],
                        ['font', ['strikethrough', 'superscript', 'subscript']],
                        ['fontsize', ['fontsize']],
                        ['color', ['color']],
                        ['para', ['ul', 'ol', 'paragraph']],
                        ['height', ['height']],
                        ['picture', ['picture', 'fullscreen']]
                    ]
                }// summernote options goes here
            }
        }
    },
    branchId: {
        type: String,
        label: "Branch"
    }
});

// Attach schema
Rabbit.Collection.Product.attachSchema(Rabbit.Schema.Product);

// Attach soft remove
//Rabbit.Collection.Customer.attachBehaviour('softRemovable');