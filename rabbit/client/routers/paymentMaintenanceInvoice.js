/**
 * Created by user on 12/9/2015.
 */

rabbitRoutes.route('/paymentMaintenance/print/invoice/:paymentMaintenanceId', {
    name: 'rabbit.paymentMaintenanceId',
    action: function (params, queryParams) {
        Layout.report('rabbit_paymentMaintenanceInvoice');
    }
});