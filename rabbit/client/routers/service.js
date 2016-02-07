var subs = new SubsManager();

rabbitRoutes.route('/service/:customerId/:websiteId', {
    name: 'rabbit.service',
    subscriptions: function (params, queryParams) {
        // Customer
        Meteor.subscribe('rabbit_paymentWebsite');
        this.register('rabbit_paymentWebsite', subs.subscribe('rabbit_paymentWebsite', Session.get('currentBranch')));
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
