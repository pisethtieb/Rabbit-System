var subs = new SubsManager();

rabbitRoutes.route('/service/:customerId/:websiteId', {
    name: 'rabbit.service',
    subscriptions: function (params, queryParams) {
        // Customer
        this.register('rabbit_website', subs.subscribe('rabbit_website', Session.get('currentBranch')));
    },
    action: function (params, queryParams) {
        Layout.main('rabbit_service');
    },
    breadcrumb: {
        params: ['customerId', 'contractId'],
        //queryParams: ['show', 'color'],
        title: 'service',
        parent: 'rabbit.website'
    }
});
