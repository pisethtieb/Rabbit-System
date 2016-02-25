/**
 * Browser view
 */
var subs = new SubsManager();
rabbitRoutes.route('/quotationReport', {
    name: 'rabbit.quotationReport',
    subscriptions: function (params, queryParams) {
        // Customer
        this.register('rabbit_product', subs.subscribe('rabbit_product'));
        //this.register('rabbit_contractor', subs.subscribe('rabbit_contractor'));
        //this.register('rabbit_agent', subs.subscribe('rabbit_agent'));
    },
    action: function (params, queryParams) {
        Layout.main('rabbit_quotationReport');
    },
    breadcrumb: {
        //params: ['id'],
        //queryParams: ['show', 'color'],
        title: 'quotation Report',
        parent: 'rabbit.home'
    }
});

rabbitRoutes.route('/quotationReportGen', {
    name: 'rabbit.quotationReportGen',
    action: function (params, queryParams) {
        Layout.report('rabbit_quotationReportGen');
    }
});

/**
 * Excel
 */
//rabbitRoutes.route('/quotationExcelReport', {
//    name: 'rabbit.quotationExcelReport',
//    action: function (params, queryParams) {
//        Layout.main('rabbit_quotationExcelReport');
//    },
//    breadcrumb: {
//        //params: ['id'],
//        //queryParams: ['show', 'color'],
//        title: 'quotation Excel Report',
//        parent: 'rabbit.home'
//    }
//});
