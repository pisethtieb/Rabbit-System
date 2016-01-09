var contractInvoiceTPL = Template.rabbit_printContract;

contractInvoiceTPL.helpers({
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
        var q = FlowRouter.getParam('contractId');

        var callId = 'printContract' + q;
        var call = Meteor.callAsync(callId, 'printContract', q);
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