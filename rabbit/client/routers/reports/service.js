/**
 * Browser view
 */
var subs = new SubsManager();
rabbitRoutes.route('/serviceReport', {
    name: 'rabbit.serviceReport',
    subscriptions: function (params, queryParams) {
        // Customer
        this.register('rabbit_website', subs.subscribe('rabbit_website'));

    },
    action: function (params, queryParams) {
        Layout.main('rabbit_serviceReport');
    },
    breadcrumb: {
        //params: ['id'],
        //queryParams: ['show', 'color'],
        title: 'service Report',
        parent: 'rabbit.home'
    }
});

rabbitRoutes.route('/serviceReportGen', {
    name: 'rabbit.serviceReportGen',
    action: function (params, queryParams) {
        Layout.report('rabbit_serviceReportGen');
    }
});

/**
 * Excel
 */
//rabbitRoutes.route('/serviceExcelReport', {
//    name: 'rabbit.serviceExcelReport',
//    action: function (params, queryParams) {
//        Layout.main('rabbit_serviceExcelReport');
//    },
//    breadcrumb: {
//        //params: ['id'],
//        //queryParams: ['show', 'color'],
//        title: 'service Excel Report',
//        parent: 'rabbit.home'
//    }
//});
