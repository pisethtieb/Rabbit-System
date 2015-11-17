/**
 * Declare template
 */
var indexTpl = Template.rabbit_order,
    insertTpl = Template.rabbit_orderInsert,
    updateTpl = Template.rabbit_orderUpdate,
    showTpl = Template.rabbit_orderShow,

    customerShowTpl = Template.rabbit_customerShow;

/**
 * Index
 */
indexTpl.onCreated(function () {
    // SEO
    SEO.set({
        title: 'Order',
        description: 'Description for this page'
    });

    // Create new  alertify
    createNewAlertify(['order'], {size: 'lg'});
    createNewAlertify(['orderShow', 'customerShow']);

    // Subscription
    var customerId = FlowRouter.getParam('customerId');
    this.subCustomer = this.subscribe('rabbit_customerById', customerId);
});

indexTpl.helpers({
    tabularSelector: function () {
        return {customerId: FlowRouter.getParam('customerId')};
    },
    customer: function () {
        return getCurrentCustomer();
    }
});

indexTpl.events({
    'click .js-customerInfo': function (e, t) {
        alertify.customerShow(fa("eye", "Customer"), renderTemplate(customerShowTpl, this));
    },
    'click .insert': function (e, t) {
        alertify.order(fa("plus", "Order"), renderTemplate(insertTpl));
    },
    'click .update': function (e, t) {
        alertify.order(fa("pencil", "Order"), renderTemplate(updateTpl, this));
    },
    'click .remove': function (e, t) {
        var self = this;

        alertify.confirm(
            fa("remove", "Order"),
            "Are you sure to delete [" + self._id + "]?",
            function () {
                Rabbit.Collection.Order.remove(self._id, function (error) {
                    if (error) {
                        alertify.error(error.message);
                    } else {
                        alertify.success("Success");
                    }
                });
            },
            null
        );

    },
    'click .show': function (e, t) {
        alertify.orderShow(fa("eye", "Order"), renderTemplate(showTpl, this));
    }
});

/**
 * Insert
 */
insertTpl.onRendered(function () {
    configOnRendered();
});

insertTpl.helpers({
    customer: function () {
        return getCurrentCustomer();
    }
});

/**
 * Update
 */
updateTpl.onCreated(function () {
    this.subscribe('rabbit_orderById', this.data._id);
});

updateTpl.onRendered(function () {
    configOnRendered();
});

updateTpl.helpers({
    data: function () {
        var data = Rabbit.Collection.Order.findOne(this._id);
        data.orderDate = moment(data.orderDate).format('YYYY-MM-DD');

        return data;
    }
});

/**
 * Show
 */
showTpl.onCreated(function () {
    this.subscribe('rabbit_orderById', this.data._id);
});

showTpl.helpers({
    data: function () {
        var data = Rabbit.Collection.Order.findOne(this._id);
        data.desStr = Spacebars.SafeString(data.des);
        return data;
    }
});

// Hook
AutoForm.hooks({
    // Order
    rabbit_orderInsert: {
        before: {
            insert: function (doc) {
                var prefix = Session.get('currentBranch') + '-' + doc.customerId;
                doc._id = idGenerator.genWithPrefix(Rabbit.Collection.Order, prefix, 3);
                doc.branchId = Session.get('currentBranch');
                return doc;
            }
        },
        onSuccess: function (formType, result) {
            itemsStateList.clear(); // Clear items state list from item template
            alertify.success('Success');
        },
        onError: function (formType, error) {
            alertify.error(error.message);
        }
    },
    rabbit_orderUpdate: {
        docToForm: function (doc, ss) {
            doc.orderDate = moment(doc.orderDate).format('YYYY-MM-DD');
            return doc;
        },
        onSuccess: function (formType, result) {
            alertify.order().close();
            alertify.success('Success');
        },
        onError: function (formType, error) {
            alertify.error(error.message);
        }
    }
});

// Config date picker
var configOnRendered = function () {
    var orderDate = $('[name="orderDate"]');
    DateTimePicker.date(orderDate);
};

// Get current customer
var getCurrentCustomer = function () {
    var id = FlowRouter.getParam('customerId');
    var data = Rabbit.Collection.Customer.findOne(id);
    if (!_.isUndefined(data.photo)) {
        data.photoUrl = Files.findOne(data.photo).url();
    } else {
        data.photoUrl = null;
    }

    return data;
};
