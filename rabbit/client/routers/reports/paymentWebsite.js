/**
 * Browser view
 */
var subs = new SubsManager();
rabbitRoutes.route('/paymentWebsiteReport', {
    name: 'rabbit.paymentWebsiteReport',
    subscriptions: function (params, queryParams) {
        // Customer
        this.register('rabbit_website', subs.subscribe('rabbit_website'));

    },
    action: function (params, queryParams) {
        Layout.main('rabbit_paymentWebsiteReport');
    },
    breadcrumb: {
        //params: ['id'],
        //queryParams: ['show', 'color'],
        title: 'paymentWebsite Report',
        parent: 'rabbit.home'
    }
});

rabbitRoutes.route('/paymentWebsiteReportGen', {
    name: 'rabbit.paymentWebsiteReportGen',
    action: function (params, queryParams) {
        Layout.report('rabbit_paymentWebsiteReportGen');
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
//        title: 'paymentWebsite Excel Report',
//        parent: 'rabbit.home'
//    }
//});
