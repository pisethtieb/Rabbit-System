/**
 * Browser view
 */
rabbitRoutes.route('/officeReport', {
    name: 'rabbit.officeReport',
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
