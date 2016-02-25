/**
 * Browser view
 */
var subs = new SubsManager();
rabbitRoutes.route('/renewServiceReport', {
    name: 'rabbit.renewServiceReport',
    subscriptions: function (params, queryParams) {
        // Customer
        this.register('rabbit_website', subs.subscribe('rabbit_website'));

    },
    action: function (params, queryParams) {
        Layout.main('rabbit_renewServiceReport');
    },
    breadcrumb: {
        //params: ['id'],
        //queryParams: ['show', 'color'],
        title: 'renewService Report',
        parent: 'rabbit.home'
    }
});

rabbitRoutes.route('/renewServiceReportGen', {
    name: 'rabbit.renewServiceReportGen',
    action: function (params, queryParams) {
        Layout.report('rabbit_renewServiceReportGen');
    }
});

/**
 * Excel
 */
rabbitRoutes.route('/renewServiceExcelReport', {
    name: 'rabbit.renewServiceExcelReport',
    action: function (params, queryParams) {
        Layout.main('rabbit_renewServiceExcelReport');
    },
    breadcrumb: {
        //params: ['id'],
        //queryParams: ['show', 'color'],
        title: 'renewService Excel Report',
        parent: 'rabbit.home'
    }
});
