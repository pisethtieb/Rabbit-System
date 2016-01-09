var paymentInvoiceTPL = Template.rabbit_paymentInvoice;

paymentInvoiceTPL.helpers({
    options: function () {
        debugger;
        // font size = null (default), bg
        // paper = a4, a5, mini
        // orientation = portrait, landscape
        return {
            fontSize: 'bg',
            paper: 'a5',
            orientation: 'portrait'
        };
    },
    data: function () {
        // Get query params
        //FlowRouter.watchPathChange();
        var q = FlowRouter.getParam('paymentId');
        debugger;
        console.log(q);

        var callId = 'paymentInvoice' + q;
        var call = Meteor.callAsync(callId, 'paymentInvoice', q);
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