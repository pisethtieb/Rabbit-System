var websiteInvoiceTPL = Template.rabbit_websiteInvoice;

websiteInvoiceTPL.helpers({
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
        var q = FlowRouter.getParam('websiteId');
        debugger;
        console.log(q);

        var callId = 'websiteInvoice' + q;
        var call = Meteor.callAsync(callId, 'websiteInvoice', q);
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