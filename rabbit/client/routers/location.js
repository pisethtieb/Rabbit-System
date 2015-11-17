var subs = new SubsManager();

rabbitRoutes.route('/location', {
    name: 'rabbit.location',
    subscriptions: function (params, queryParams) {
        //this.register('rabbit_location', subs.subscribe('rabbit_location'));
    },
    action: function (params, queryParams) {
        Layout.main('rabbit_location');
    },
    breadcrumb: {
        //params: ['id'],
        //queryParams: ['show', 'color'],
        title: 'Location',
        parent: 'rabbit.home'
    }
});
