/**
 * Browser view
 */
var subs = new SubsManager();
rabbitRoutes.route('/paymentOfficeBalanceReport', {
    name: 'rabbit.paymentOfficeBalanceReport',
    subscriptions: function (params, queryParams) {
        // Customer
        this.register('rabbit_contract', subs.subscribe('rabbit_contract'));
        //this.register('rabbit_contractor', subs.subscribe('rabbit_contractor'));
        //this.register('rabbit_agent', subs.subscribe('rabbit_agent'));
    },
    action: function (params, queryParams) {
        Layout.main('rabbit_paymentOfficeBalanceReport');
    },
    breadcrumb: {
        //params: ['id'],
        //queryParams: ['show', 'color'],
        title: 'paymentOfficeBalance Report',
        parent: 'rabbit.home'
    }
});

rabbitRoutes.route('/paymentOfficeBalanceReportGen', {
    name: 'rabbit.paymentOfficeBalanceReportGen',
    action: function (params, queryParams) {
        Layout.report('rabbit_paymentOfficeBalanceReportGen');
    }
});

/**
 * Excel
 */
//rabbitRoutes.route('/paymentOfficeBalanceExcelReport', {
//    name: 'rabbit.paymentOfficeBalanceExcelReport',
//    action: function (params, queryParams) {
//        Layout.main('rabbit_paymentOfficeBalanceExcelReport');
//    },
//    breadcrumb: {
//        //params: ['id'],
//        //queryParams: ['show', 'color'],
//        title: 'paymentOfficeBalance Excel Report',
//        parent: 'rabbit.home'
//    }
//});
