var contractInvoiceTPL = Template.rabbit_contactInvoice;

contractInvoiceTPL.helpers({
    options: function () {
        // font size = null (default), bg
        // paper = a4, a5, mini
        // orientation = portrait, landscape
        return {
            //fontSize: 'bg',
            paper: 'a5',
            orientation: 'portrait'
        };
    },
    data: function () {
        // Get query params
        //FlowRouter.watchPathChange();
        var q = FlowRouter.getParam('contractId');

        var callId = 'contractInvoice' + q;
        var call = Meteor.callAsync(callId, 'contractInvoice', q);

        if (!call.ready()) {
            return false;
        }

        return call.result();
    },
    isUndefinded: function (normalValue) {
        return normalValue == null;
    }
});