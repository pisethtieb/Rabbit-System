var subs = new SubsManager();

rabbitRoutes.route('/saleBranchOffice/:saleHeadOfficeId', {
    name: 'rabbit.saleBranchOffice',
    subscriptions: function (params, queryParams) {
        // Customer
        this.register('rabbit_saleBranchOffice', subs.subscribe('rabbit_saleBranchOffice', Session.get('currentBranch')));
    },
    action: function (params, queryParams) {
        Layout.main('rabbit_saleBranchOffice');
    },
    breadcrumb: {
        params: ['saleHeadOfficeId'],
        //queryParams: ['show', 'color'],
        title: 'saleBranchOffice',
        parent: 'rabbit.saleHeadOffice'
    }
});
