var subs = new SubsManager();

rabbitRoutes.route('/maintenance/:officeId', {
    name: 'rabbit.maintenance',
    subscriptions: function (params, queryParams) {
        // Customer
        },
    action: function (params, queryParams) {
        Layout.main('rabbit_maintenance');
    },
    breadcrumb: {
        params: ['officeId'],
        //queryParams: ['show', 'color'],
        title: 'Maintenance',
        parent: 'rabbit.maintenance'
    }
});
