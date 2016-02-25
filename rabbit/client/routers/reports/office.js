/**
 * Browser view
 */
var subs = new SubsManager();
rabbitRoutes.route('/officeReport', {
    name: 'rabbit.officeReport',
    subscriptions: function (params, queryParams) {
        // Customer
        this.register('rabbit_contract', subs.subscribe('rabbit_contract'));
        //this.register('rabbit_contractor', subs.subscribe('rabbit_contractor'));
        //this.register('rabbit_agent', subs.subscribe('rabbit_agent'));
    },
    action: function (params, queryParams) {
        Layout.main('rabbit_officeReport');
    },
    breadcrumb: {
        //params: ['id'],
        //queryParams: ['show', 'color'],
        title: 'office Report',
        parent: 'rabbit.home'
    }
});

rabbitRoutes.route('/officeReportGen', {
    name: 'rabbit.officeReportGen',
    action: function (params, queryParams) {
        Layout.report('rabbit_officeReportGen');
    }
});

/**
 * Excel
 */
//rabbitRoutes.route('/officeExcelReport', {
//    name: 'rabbit.officeExcelReport',
//    action: function (params, queryParams) {
//        Layout.main('rabbit_officeExcelReport');
//    },
//    breadcrumb: {
//        //params: ['id'],
//        //queryParams: ['show', 'color'],
//        title: 'office Excel Report',
//        parent: 'rabbit.home'
//    }
//});
