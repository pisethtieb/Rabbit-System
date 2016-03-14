Meteor.methods({
    printQuotation: function (quotationId) {
        var data = {
            title: {},
            header: {},
            content: [],
            footer: {},
            custom: {},
            payment: []
        };
        //var exchange = Cpanel.Collection.Exchange.findOne({}, {sort: {dateTime: -1}});
        //fx.base = exchange.base;
        //fx.rates = exchange.rates;
        /****** Title *****/
        data.title = Cpanel.Collection.Company.findOne();
        let quotation = Rabbit.Collection.Quotation.findOne(quotationId);
        data.product = quotation._product;
        data.customer = quotation._customer;
        data.contractor = quotation._contractor;

        var a = ['', 'មួយ ', 'ពីរ', 'បី', 'បួន ', 'ប្រាំ ', 'ប្រាំមួយ ', 'ប្រាំពីរ', 'ប្រាំបី ', 'ប្រាំបួន '];
//, 'eleven ', 'twelve ', 'thirteen ', 'fourteen ', 'fifteen ', 'sixteen ', 'seventeen ', 'eighteen ', 'nineteen '];
        var b = ['', 'ដប់ ', 'ម្ភៃ', 'សាមសិប', 'សៃសិប', 'ហាសិប', 'ហុកសិប', 'ចិតសិប', 'ប៉ែតសិប', 'កៅសិប'];

        function toWords(num) {
            debugger;
            if ((num = num.toString()).length > 9) return 'overflow';
            n = ('000000000' + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
            if (!n) return;
            var str = '';
            str += (n[1] != 0) ? (a[Number(n[1])] || b[n[1][0]] + a[n[1][1]]) + 'សែន' : '';
            str += (n[2] != 0) ? (a[Number(n[2])] || b[n[2][0]] + a[n[2][1]]) + 'មឺុន ' : '';
            str += (n[3] != 0) ? (a[Number(n[3])] || b[n[3][0]] + a[n[3][1]]) + 'ពាន់' : '';
            str += (n[4] != 0) ? (a[Number(n[4])] || b[n[4][0]] + a[n[4][1]]) + 'រយ' : '';
            str += (n[5] != 0) ? ((str != '') ? '' : '') + (a[Number(n[5])] || b[n[5][0]] + a[n[5][1]]) + "" : '';
            return (str);
        }

        if (quotation.type == "fullyFee") {
            data.types = 'hello';

            data.product.priceHead = quotation.basePrice[0].headOffice;
            data.product.priceBrand = quotation.basePrice[0].branch;
            data.product.maintenancePriceHead = quotation.maintenancePrice[0].headOffice;
            data.product.maintenancePriceBrand = quotation.maintenancePrice[0].branch;
        } else {
            data.type = 'hello';
            data.product.priceHead = quotation.monthlyFee[0].headOffice;
            data.product.priceBrand = quotation.monthlyFee[0].branch;
            data.product.totalHead = quotation.installationFee+quotation.trainingFee;
            data.product.installationFee = quotation.installationFee;
            data.product.trainingFee = quotation.trainingFee;
            //data.product. = quotation.maintenancePrice[0].branch;
        }


        return data

    }
});