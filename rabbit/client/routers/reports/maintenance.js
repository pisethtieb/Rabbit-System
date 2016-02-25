/**
 * Browser view
 */
var subs = new SubsManager();
rabbitRoutes.route('/maintenanceReport', {
    name: 'rabbit.maintenanceReport',
    subscriptions: function (params, queryParams) {
        // Customer
        this.register('rabbit_office', subs.subscribe('rabbit_office'));
        //this.register('rabbit_contractor', subs.subscribe('rabbit_contractor'));
        //this.register('rabbit_agent', subs.subscribe('rabbit_agent'));
    },
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
