var subs = new SubsManager();

rabbitRoutes.route('/paymentOffice/:customerId/:contractId', {
    name: 'rabbit.paymentOffice',
    subscriptions: function (params, queryParams) {
        // Customer
        this.register('rabbit_contract', subs.subscribe('rabbit_contract'));
        this.register('rabbit_maintenance', subs.subscribe('rabbit_maintenance'));
        this.register('rabbit_office', subs.subscribe('rabbit_office'));
        this.register('rabbit_paymentOffice', subs.subscribe('rabbit_paymentOffice'));
    },
    action: function (params, queryParams) {
        Layout.main('rabbit_paymentOffice');
    },
    breadcrumb: {
        params: ['customerId', 'contractId'],
        //queryParams: ['show', 'color'],
        title: 'paymentOffice',
        parent: 'rabbit.contract'
    }
});
