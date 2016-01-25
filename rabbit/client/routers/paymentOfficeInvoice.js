/**
 * Created by user on 12/9/2015.
 */

rabbitRoutes.route('/paymentOffice/print/invoice/:paymentOfficeId', {
    name: 'rabbit.paymentOfficeId',
    action: function (params, queryParams) {
        Layout.report('rabbit_paymentOfficeInvoice');
    }
});