/**
 * Declare template
 */
var formTpl = Template.rabbit_customerReport,
    genTpl = Template.rabbit_customerReportGen;

/**
 * Form
 */
formTpl.onRendered(function () {
    var name = $('[name="date"]');
    DateTimePicker.dateRange(name);
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
            //fontSize: 'bg',
            paper: 'a4',
            orientation: 'portrait'
        };
    },
    data: function () {
        // Get query params
        //FlowRouter.watchPathChange();
        var q = FlowRouter.current().queryParams;

        // Use Fetcher
        Fetcher.setDefault("data", false);
        Fetcher.retrieve('data', 'rabbit_customerReport', q);

        return Fetcher.get('data');
    }
});