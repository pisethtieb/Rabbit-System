/**
 * Browser view
 */
var subs = new SubsManager();
rabbitRoutes.route('/paymentOfficeReport', {
    name: 'rabbit.paymentOfficeReport',
    subscriptions: function (params, queryParams) {
        // Customer
        this.register('rabbit_contract', subs.subscribe('rabbit_contract'));
        //this.register('rabbit_contractor', subs.subscribe('rabbit_contractor'));
        //this.register('rabbit_agent', subs.subscribe('rabbit_agent'));
    },
    action: function (params, queryParams) {
        Layout.main('rabbit_paymentOfficeReport');
    },
    breadcrumb: {
        //params: ['id'],
        //queryParams: ['show', 'color'],
        title: 'paymentOffice Report',
        parent: 'rabbit.home'
    }
});

rabbitRoutes.route('/paymentOfficeReportGen', {
    name: 'rabbit.paymentOfficeReportGen',
    action: function (params, queryParams) {
        Layout.report('rabbit_paymentOfficeReportGen');
    }
});

/**
 * Excel
 */
//rabbitRoutes.route('/paymentExcelReport', {
//    name: 'rabbit.paymentExcelReport',
//    action: function (params, queryParams) {
//        Layout.main('rabbit_paymentExcelReport');
//    },
//    breadcrumb: {
//        //params: ['id'],
//        //queryParams: ['show', 'color'],
//        title: 'paymentOffice Excel Report',
//        parent: 'rabbit.home'
//    }
//});
