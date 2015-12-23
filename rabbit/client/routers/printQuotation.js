/**
 * Created by user on 12/9/2015.
 */

rabbitRoutes.route('/quotation/printQuotation/:quotationId', {
    name: 'rabbit.quotationId',
    action: function (params, queryParams) {
        Layout.report('rabbit_printQuotation');
    }
});