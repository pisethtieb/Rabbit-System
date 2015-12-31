/**
 * Browser view
 */
rabbitRoutes.route('/paymentMaintenanceReport', {
    name: 'rabbit.paymentMaintenanceReport',
    action: function (params, queryParams) {
        Layout.main('rabbit_paymentMaintenanceReport');
    },
    breadcrumb: {
        //params: ['id'],
        //queryParams: ['show', 'color'],
        title: 'paymentMaintenance Report',
        parent: 'rabbit.home'
    }
});

rabbitRoutes.route('/paymentMaintenanceReportGen', {
    name: 'rabbit.paymentMaintenanceReportGen',
    action: function (params, queryParams) {
        Layout.report('rabbit_paymentMaintenanceReportGen');
    }
});

/**
 * Excel
 */
//rabbitRoutes.route('/paymentMaintenanceExcelReport', {
//    name: 'rabbit.paymentMaintenanceExcelReport',
//    action: function (params, queryParams) {
//        Layout.main('rabbit_paymentMaintenanceExcelReport');
//    },
//    breadcrumb: {
//        //params: ['id'],
//        //queryParams: ['show', 'color'],
//        title: 'paymentMaintenance Excel Report',
//        parent: 'rabbit.home'
//    }
//});
