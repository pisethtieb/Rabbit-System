var subs = new SubsManager();

rabbitRoutes.route('/saleHeadOffice', {
    name: 'rabbit.saleHeadOffice',
    subscriptions: function (params, queryParams) {
        // Customer
        //this.register('rabbit_customer', subs.subscribe('rabbit_customer', Session.get('currentBranch')));
    },
    action: function (params, queryParams) {
        Layout.main('rabbit_saleHeadOffice');
    },
    breadcrumb: {
        //params: ['id'],
        //queryParams: ['show', 'color'],
        title: 'saleHeadOffice',
        parent: 'rabbit.home'
    }
});
