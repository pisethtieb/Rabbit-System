/**
 * Browser view
 */
var subs = new SubsManager();
rabbitRoutes.route('/contractReport', {
    name: 'rabbit.contractReport',
    subscriptions: function (params, queryParams) {
        // Customer
        this.register('rabbit_customer', subs.subscribe('rabbit_customer'));
        //this.register('rabbit_contractor', subs.subscribe('rabbit_contractor'));
        //this.register('rabbit_agent', subs.subscribe('rabbit_agent'));
    },
    action: function (params, queryParams) {
        Layout.main('rabbit_contractReport');
    },
    breadcrumb: {
        //params: ['id'],
        //queryParams: ['show', 'color'],
        title: 'contract Report',
        parent: 'rabbit.home'
    }
});

rabbitRoutes.route('/contractReportGen', {
    name: 'rabbit.contractReportGen',
    action: function (params, queryParams) {
        Layout.report('rabbit_contractReportGen');
    }
});

/**
 * Excel
 */
//rabbitRoutes.route('/contractExcelReport', {
//    name: 'rabbit.contractExcelReport',
//    action: function (params, queryParams) {
//        Layout.main('rabbit_contractExcelReport');
//    },
//    breadcrumb: {
//        //params: ['id'],
//        //queryParams: ['show', 'color'],
//        title: 'contract Excel Report',
//        parent: 'rabbit.home'
//    }
//});
