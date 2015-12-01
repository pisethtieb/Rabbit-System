var subs = new SubsManager();

rabbitRoutes.route('/contract', {
    name: 'rabbit.contract',
    subscriptions: function (params, queryParams) {
        // Customer
        this.register('rabbit_office', subs.subscribe('rabbit_office', Session.get('currentBranch')));
    },
    action: function (params, queryParams) {
        Layout.main('rabbit_contract');
    },
    breadcrumb: {
        //params: ['id'],
        //queryParams: ['show', 'color'],
        title: 'contract',
        parent: 'rabbit.home'
    }
});
