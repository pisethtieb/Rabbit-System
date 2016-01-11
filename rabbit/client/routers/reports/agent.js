/**
 * Browser view
 */
rabbitRoutes.route('/agentReport', {
    name: 'rabbit.agentReport',
    action: function (params, queryParams) {
        Layout.main('rabbit_agentReport');
    },
    breadcrumb: {
        //params: ['id'],
        //queryParams: ['show', 'color'],
        title: 'agent Report',
        parent: 'rabbit.home'
    }
});

rabbitRoutes.route('/agentReportGen', {
    name: 'rabbit.agentReportGen',
    action: function (params, queryParams) {
        Layout.report('rabbit_agentReportGen');
    }
});

/**
 * Excel
 */
//rabbitRoutes.route('/agentExcelReport', {
//    name: 'rabbit.agentExcelReport',
//    action: function (params, queryParams) {
//        Layout.main('rabbit_agentExcelReport');
//    },
//    breadcrumb: {
//        //params: ['id'],
//        //queryParams: ['show', 'color'],
//        title: 'agent Excel Report',
//        parent: 'rabbit.home'
//    }
//});
