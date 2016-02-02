/**
 * Created by user on 12/9/2015.
 */

rabbitRoutes.route('/website/invoice/:paymentWebsiteId', {
    name: 'rabbit.paymentWebsiteId',
    action: function (params, queryParams) {
        Layout.report('rabbit_paymentWebsiteInvoice');
    }
});