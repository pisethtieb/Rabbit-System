/**
 * Created by user on 12/9/2015.
 */

rabbitRoutes.route('/product/print/:productId', {
    name: 'rabbit.productId',
    action: function (params, queryParams) {
        Layout.report('rabbit_printProductFeature');
    }
});