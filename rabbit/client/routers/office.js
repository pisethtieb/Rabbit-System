var subs = new SubsManager();

rabbitRoutes.route('/office', {
    name: 'rabbit.office',
    subscriptions: function (params, queryParams) {
        // Customer
        this.register('rabbit_saleBranchOffice', subs.subscribe('rabbit_saleBranchOffice', Session.get('currentBranch')));
    },
    action: function (params, queryParams) {
        Layout.main('rabbit_office');
    },
    breadcrumb: {
        //params: ['saleHeadOfficeId'],
        //queryParams: ['show', 'color'],
        title: 'office',
        parent: 'rabbit.contract'
    }
});
