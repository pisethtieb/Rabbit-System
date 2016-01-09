/**
 * Browser view
 */
rabbitRoutes.route('/maintenanceReport', {
    name: 'rabbit.maintenanceReport',
    action: function (params, queryParams) {
        Layout.main('rabbit_maintenanceReport');
    },
    breadcrumb: {
        //params: ['id'],
        //queryParams: ['show', 'color'],
        title: 'maintenance Report',
        parent: 'rabbit.home'
    }
});

rabbitRoutes.route('/maintenanceReportGen', {
    name: 'rabbit.maintenanceReportGen',
    action: function (params, queryParams) {
        Layout.report('rabbit_maintenanceReportGen');
    }
});

/**
 * Excel
 */
//rabbitRoutes.route('/maintenanceExcelReport', {
//    name: 'rabbit.maintenanceExcelReport',
//    action: function (params, queryParams) {
//        Layout.main('rabbit_maintenanceExcelReport');
//    },
//    breadcrumb: {
//        //params: ['id'],
//        //queryParams: ['show', 'color'],
//        title: 'maintenance Excel Report',
//        parent: 'rabbit.home'
//    }
//});
