/**
 * Created by user on 12/9/2015.
 */

rabbitRoutes.route('/website/invoice/:websiteId', {
    name: 'rabbit.websiteId',
    action: function (params, queryParams) {
        Layout.report('rabbit_websiteInvoice');
    }
});