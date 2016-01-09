/**
 * Created by user on 12/9/2015.
 */

rabbitRoutes.route('/contract/printContract/:contractId', {
    name: 'rabbit.contractId',
    action: function (params, queryParams) {
        Layout.report('rabbit_printContract');
    }
});