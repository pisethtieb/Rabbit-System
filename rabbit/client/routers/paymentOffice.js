var subs = new SubsManager();

rabbitRoutes.route('/payment/:customerId/:contractId', {
    name: 'rabbit.payment', label: 'paymentOffice',
    subscriptions: function (params, queryParams) {
        // Customer
        this.register('rabbit_contract', subs.subscribe('rabbit_contract'));
        this.register('rabbit_maintenance', subs.subscribe('rabbit_maintenance'));
        this.register('rabbit_office', subs.subscribe('rabbit_office'));
        this.register('rabbit_payment', subs.subscribe('rabbit_payment'));
    },
    action: function (params, queryParams) {
        Layout.main('rabbit_payment');
    },
    breadcrumb: {
        params: ['customerId', 'contractId'],
        //queryParams: ['show', 'color'],
        title: 'payment',
        parent: 'rabbit.contract'
    }
});
