var subs = new SubsManager();

rabbitRoutes.route('/order/:customerId', {
    name: 'rabbit.order',
    subscriptions: function (params, queryParams) {
        // Order
        //this.register(
        //    'rabbit_orderByCustomer',
        //    subs.subscribe('rabbit_orderByCustomer', params.customerId)
        //);
    },
    action: function (params, queryParams) {
        Layout.main('rabbit_order');
    },
    breadcrumb: {
        params: ['customerId'],
        //queryParams: ['show', 'color'],
        title: 'Order',
        parent: 'rabbit.customer'
    }
});
