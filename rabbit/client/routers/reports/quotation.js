/**
 * Browser view
 */
rabbitRoutes.route('/quotationReport', {
    name: 'rabbit.quotationReport',
    action: function (params, queryParams) {
        Layout.main('rabbit_quotationReport');
    },
    breadcrumb: {
        //params: ['id'],
        //queryParams: ['show', 'color'],
        title: 'quotation Report',
        parent: 'rabbit.home'
    }
});

rabbitRoutes.route('/quotationReportGen', {
    name: 'rabbit.quotationReportGen',
    action: function (params, queryParams) {
        Layout.report('rabbit_quotationReportGen');
    }
});

/**
 * Excel
 */
//rabbitRoutes.route('/quotationExcelReport', {
//    name: 'rabbit.quotationExcelReport',
//    action: function (params, queryParams) {
//        Layout.main('rabbit_quotationExcelReport');
//    },
//    breadcrumb: {
//        //params: ['id'],
//        //queryParams: ['show', 'color'],
//        title: 'quotation Excel Report',
//        parent: 'rabbit.home'
//    }
//});
