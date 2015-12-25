var subs = new SubsManager();

rabbitRoutes.route('/contract/:customerId', {
    name: 'rabbit.contract',
    subscriptions: function (params, queryParams) {
        // Customer
        this.register('rabbit_customer', subs.subscribe('rabbit_customer', Session.get('currentBranch')));
        this.register('rabbit_contractor', subs.subscribe('rabbit_contractor', Session.get('currentBranch')));
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
