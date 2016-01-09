/**
 * Browser view
 */
rabbitRoutes.route('/paymentReport', {
    name: 'rabbit.paymentReport',
    action: function (params, queryParams) {
        Layout.main('rabbit_paymentReport');
    },
    breadcrumb: {
        //params: ['id'],
        //queryParams: ['show', 'color'],
        title: 'payment Report',
        parent: 'rabbit.home'
    }
});

rabbitRoutes.route('/paymentReportGen', {
    name: 'rabbit.paymentReportGen',
    action: function (params, queryParams) {
        Layout.report('rabbit_paymentReportGen');
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
//        title: 'payment Excel Report',
//        parent: 'rabbit.home'
//    }
//});
