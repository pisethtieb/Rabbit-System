var paymentMaintenanceInvoiceTPL = Template.rabbit_paymentMaintenanceInvoice;

paymentMaintenanceInvoiceTPL.helpers({
    options: function () {
        debugger;
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
        var q = FlowRouter.getParam('paymentMaintenanceId');
        debugger;
        console.log(q);

        var callId = 'paymentMaintenanceInvoice' + q;
        var call = Meteor.callAsync(callId, 'paymentMaintenanceInvoice', q);
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