var subs = new SubsManager();

rabbitRoutes.route('/product', {
    name: 'rabbit.product',
    subscriptions: function (params, queryParams) {
        // Customer
        //this.register('rabbit_customer', subs.subscribe('rabbit_customer', Session.get('currentBranch')));
    },
    action: function (params, queryParams) {
        Layout.main('rabbit_product');
    },
    breadcrumb: {
        //params: ['id'],
        //queryParams: ['show', 'color'],
        title: 'product',
        parent: 'rabbit.home'
    }
});
