/**
 * Browser view
 */
rabbitRoutes.route('/paymentOfficeBalanceReport', {
    name: 'rabbit.paymentOfficeBalanceReport',
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
