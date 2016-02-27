var subs = new SubsManager();

rabbitRoutes.route('/quotation', {
    name: 'rabbit.quotation',
    subscriptions: function (params, queryParams) {
        // Customer
        this.register('rabbit_customer', subs.subscribe('rabbit_customer', Session.get('currentBranch')));
        this.register('rabbit_product', subs.subscribe('rabbit_product'));
        this.register('rabbit_contractor', subs.subscribe('rabbit_contractor'));
    },
    action: function (params, queryParams) {
        Layout.main('rabbit_quotation');
    },
    breadcrumb: {
        params: ['customerId'],
        //queryParams: ['show', 'color'],
        title: 'quotation',
        parent: 'rabbit.home'
    }
});
