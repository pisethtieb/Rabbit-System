/**
 * Browser view
 */
var subs = new SubsManager();
rabbitRoutes.route('/agentReport', {
    name: 'rabbit.agentReport',
    subscriptions: function (params, queryParams) {
        // agent
        this.register('rabbit_agent', subs.subscribe('rabbit_agent'));

    },
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
