/**
 * Browser view
 */
rabbitRoutes.route('/contractReport', {
    name: 'rabbit.contractReport',
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
