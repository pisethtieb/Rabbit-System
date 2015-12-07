var subs = new SubsManager();

rabbitRoutes.route('/office/:customerId/:contractId', {
    name: 'rabbit.office',
    subscriptions: function (params, queryParams) {
        // Customer
        this.register('rabbit_contract', subs.subscribe('rabbit_contract', Session.get('currentBranch')));
        this.register('rabbit_office', subs.subscribe('rabbit_office', Session.get('currentBranch')));
    },
    action: function (params, queryParams) {
        Layout.main('rabbit_office');
    },
    breadcrumb: {
        params: ['customerId', 'contractId'],
        //queryParams: ['show', 'color'],
        title: 'office',
        parent: 'rabbit.contract'
    }
});
