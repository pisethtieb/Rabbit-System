/**
 * Browser view
 */
rabbitRoutes.route('/paymentOfficeReport', {
    name: 'rabbit.paymentOfficeReport',
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
