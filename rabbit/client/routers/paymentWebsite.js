var subs = new SubsManager();

rabbitRoutes.route('/paymentWebsite/:customerId/:websiteId', {
    name: 'rabbit.paymentWebsite',
    subscriptions: function (params, queryParams) {
        // Customer
        //this.register('rabbit_website', subs.subscribe('rabbit_website', Session.get('currentBranch')));
    },
    action: function (params, queryParams) {
        Layout.main('rabbit_paymentWebsite');
    },
    breadcrumb: {
        params: ['customerId', 'contractId'],
        //queryParams: ['show', 'color'],
        title: 'paymentWebsite',
        parent: 'rabbit.website'
    }
});
