/**
 * Browser view
 */
rabbitRoutes.route('/customerReport', {
    name: 'rabbit.customerReport',
    action: function (params, queryParams) {
        Layout.main('rabbit_customerReport');
    },
    breadcrumb: {
        //params: ['id'],
        //queryParams: ['show', 'color'],
        title: 'Customer Report',
        parent: 'rabbit.home'
    }
});

rabbitRoutes.route('/customerReportGen', {
    name: 'rabbit.customerReportGen',
    action: function (params, queryParams) {
        Layout.report('rabbit_customerReportGen');
    }
});

/**
 * Excel
 */
rabbitRoutes.route('/customerExcelReport', {
    name: 'rabbit.customerExcelReport',
    action: function (params, queryParams) {
        Layout.main('rabbit_customerExcelReport');
    },
    breadcrumb: {
        //params: ['id'],
        //queryParams: ['show', 'color'],
        title: 'Customer Excel Report',
        parent: 'rabbit.home'
    }
});
