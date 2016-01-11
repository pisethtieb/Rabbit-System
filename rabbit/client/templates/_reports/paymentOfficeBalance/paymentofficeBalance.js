/**
 * Declare template
 */
var formTpl = Template.rabbit_paymentOfficeBalanceReport,
    genTpl = Template.rabbit_paymentOfficeBalanceReportGen;

/**
 * Form
 */
formTpl.onRendered(function () {
    var name = $('[name="date"]');
    DateTimePicker.date(name);
});
/**
 * Generate
 */
genTpl.helpers({
    options: function () {
        // font size = null (default), bg
        // paper = a4, a5, mini
        // orientation = portrait, landscape
        return {
            fontSize: 'bg',
            paper: 'a4',
            orientation: 'landscape'
        };
    },
    data: function () {
        // Get query params
        //FlowRouter.watchPathChange();
        var q = FlowRouter.current().queryParams;

        // Use Fetcher
        Fetcher.setDefault("data", false);
        Fetcher.retrieve('data', 'rabbit_paymentOfficeBalanceReport', q);

        return Fetcher.get('data');
    }
});