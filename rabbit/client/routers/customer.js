var subs = new SubsManager();

rabbitRoutes.route('/customer', {
    name: 'rabbit.customer',
    subscriptions: function (params, queryParams) {
        // Customer
        //this.register('rabbit_customer', subs.subscribe('rabbit_customer', Session.get('currentBranch')));
    },
    action: function (params, queryParams) {
        Layout.main('rabbit_customer');
    },
    breadcrumb: {
        //params: ['id'],
        //queryParams: ['show', 'color'],
        title: 'customer',
        parent: 'rabbit.home'
    }
});
