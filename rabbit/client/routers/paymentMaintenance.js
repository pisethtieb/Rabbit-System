var subs = new SubsManager();

rabbitRoutes.route('/paymentMaintenance/:customerId/:contractId', {
    name: 'rabbit.paymentMaintenance',
    subscriptions: function (params, queryParams) {
        // Customer
        this.register('rabbit_contract', subs.subscribe('rabbit_contract'));
        this.register('rabbit_maintenance', subs.subscribe('rabbit_maintenance'));
        this.register('rabbit_paymentMaintenance', subs.subscribe('rabbit_paymentMaintenance'));
    },
    action: function (params, queryParams) {
        Layout.main('rabbit_paymentMaintenance');
    },
    breadcrumb: {
        params: ['customerId', 'contractId'],
        //queryParams: ['show', 'color'],
        title: 'paymentMaintenance',
        parent: 'rabbit.contract'
    }
});
