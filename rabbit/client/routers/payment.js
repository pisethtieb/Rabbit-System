var subs = new SubsManager();

rabbitRoutes.route('/payment/:customerId/:contractId', {
    name: 'rabbit.payment',
    subscriptions: function (params, queryParams) {
        // Customer
        this.register('rabbit_contract', subs.subscribe('rabbit_contract', Session.get('currentBranch')));
        this.register('rabbit_maintenance', subs.subscribe('rabbit_maintenance', Session.get('currentBranch')));
        this.register('rabbit_office', subs.subscribe('rabbit_office', Session.get('currentBranch')));
    },
    action: function (params, queryParams) {
        Layout.main('rabbit_payment');
    },
    breadcrumb: {
        params: ['customerId', 'contractId'],
        //queryParams: ['show', 'color'],
        title: 'payment',
        parent: 'rabbit.contract'
    }
});
