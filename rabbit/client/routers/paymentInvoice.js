/**
 * Created by user on 12/9/2015.
 */

rabbitRoutes.route('/payment/print/invoice/:paymentId', {
    name: 'rabbit.paymentId',
    action: function (params, queryParams) {
        Layout.report('rabbit_paymentInvoice');
    }
});