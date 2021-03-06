var quotationInvoiceTPL = Template.rabbit_printQuotation;

quotationInvoiceTPL.helpers({
    options: function () {
        // font size = null (default), bg
        // paper = a4, a5, mini
        // orientation = portrait, landscape
        return {
            fontSize: 'bg',
            paper: 'a4',
            orientation: 'portrait'
        };
    },
    data: function () {
        // Get query params
        //FlowRouter.watchPathChange();
        var q = FlowRouter.getParam('quotationId');

        var callId = 'printQuotation' + q;
        var call = Meteor.callAsync(callId, 'printQuotation', q);
        debugger;
        if (!call.ready()) {
            return false;
        }

        return call.result();
    }
    //isUndefinded: function (normalValue) {
    //    return normalValue == null;
    //}
});