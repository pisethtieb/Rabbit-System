var subs = new SubsManager();

rabbitRoutes.route('/contract/:customerId', {
    name: 'rabbit.contract',
    subscriptions: function (params, queryParams) {
        // Customer
        this.register('rabbit_customer', subs.subscribe('rabbit_customer', Session.get('currentBranch')));
    },
    action: function (params, queryParams) {
        Layout.main('rabbit_contract');
    },
    breadcrumb: {
        params: ['customerId'],
        //queryParams: ['show', 'color'],
        title: 'contract',
        parent: 'rabbit.customer'
    }
});
