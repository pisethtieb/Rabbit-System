var subs = new SubsManager();

rabbitRoutes.route('/maintenance/:officeId', {
    name: 'rabbit.maintenance',
    subscriptions: function (params, queryParams) {
        // Customer.
        this.register('rabbit_maintenance', subs.subscribe('rabbit_maintenance', Session.get('currentBranch')));

    },
    action: function (params, queryParams) {
        Layout.main('rabbit_maintenance');
    },
    breadcrumb: {
        params: ['office'],
        //queryParams: ['show', 'color'],
        title: 'maintenance',
        parent: 'rabbit.office'
    }
});
