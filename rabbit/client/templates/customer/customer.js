/**
 * Declare template
 */
var indexTpl = Template.rabbit_customer,
    insertTpl = Template.rabbit_customerInsert,
    updateTpl = Template.rabbit_customerUpdate,
    showTpl = Template.rabbit_customerShow;

//locationAddOnTpl = Template.rabbit_locationAddOnCustomer;


/**
 * Index
 */
indexTpl.onCreated(function () {
    // SEO
    SEO.set({
        title: 'Customer',
        description: 'Description for this page'
    });

    // Create new  alertify
    createNewAlertify(["customer"], {size: 'lg'});
    createNewAlertify(["customerShow"], {size: 'lg'});
    createNewAlertify(["locationAddon"], {transition: 'zoom', size: 'lg'});
});

indexTpl.onRendered(function () {
    //
});

indexTpl.helpers({
    selector: function () {
        return {branchId: Session.get('currentBranch')};
    }
});

indexTpl.events({
    'click .js-insert': function (e, t) {
        alertify.customer(fa("plus", "Customer"), renderTemplate(insertTpl));
    },
    'click .js-update': function (e, t) {
        alertify.customer(fa("pencil", "Customer"), renderTemplate(updateTpl, this));
    },
    'click .js-remove': function (e, t) {
        var self = this;

        alertify.confirm(
            fa("remove", "Customer"),
            "Are you sure to delete [" + self._id + "]?",
            function () {
                Rabbit.Collection.Customer.remove(self._id, function (error) {
                    if (error) {
                        alertify.error(error.message);
                    } else {
                        alertify.success("Success");
                    }
                });
            },
            null
        );
    },
    'click .js-show': function (e, t) {
        alertify.customerShow(fa("eye", "Customer"), renderTemplate(showTpl, this));
    },
    'click .contractAction': function () {
        FlowRouter.go('rabbit.contract', {
            customerId: this._id
        })

    }
    //'dblclick tbody > tr': function (event) {
    //    var dataTable = $(event.target)
    //        .closest('table')
    //        .DataTable();
    //    var rowData = dataTable.row(event.currentTarget)
    //        .data();
    //
    //    FlowRouter.go('rabbit.order', {customerId: rowData._id});
    //}
});

/**
 * Insert
 */
insertTpl.onRendered(function () {
    toWords();
    configOnRender();
});


/**
 * Update
 */
updateTpl.onCreated(function () {
    this.subscribe('rabbit_customer', this.data._id);
});

updateTpl.onRendered(function () {
    configOnRender();
});

updateTpl.helpers({
    data: function () {
        var data = Rabbit.Collection.Customer.findOne(this._id);
        return data;
    }
});


/**
 * Show
 */
showTpl.onCreated(function () {
    this.subscribe('rabbit_customer', this.data._id);
});

showTpl.helpers({
    data: function () {
        var data = Rabbit.Collection.Customer.findOne(this._id);
        return data;

    },
    contactPerson: function () {
        var str = "<table class='table table-bordered'><thead>" +
            "<tr>" +
            "<th>Name</th>" +
            "<th>Gender</th>" +
            "<th>Position</th>" +
            "<th>Telephone</th>" +
            "</tr>" +
            "</thead><tbody>";
        this.contactPerson.forEach(function (o) {
            str += '<tr>' +
                '<td>' + o.name + '</td>' +
                '<td>' + o.gender + '</td>' +
                '<td>' + o.position + '</td>' +
                '<td>' + o.tel + '</td>' +
                '</tr>'
        });
        str += "</tbody></table>";
        return new Spacebars.SafeString(str);
    }
});


/**
 * Hook
 */
AutoForm.hooks({
    // Customer
    rabbit_customerInsert: {
        before: {
            insert: function (doc) {
                doc.branchId = Session.get('currentBranch');
                var prefix = doc.branchId + '-';
                Meteor.call('rabbit', prefix);
                return doc;
            }
        },
        onSuccess: function (formType, result) {
            alertify.success('Success');
        },
        onError: function (formType, error) {
            alertify.error(error.message);
        }
    },
    rabbit_customerUpdate: {
        onSuccess: function (formType, result) {
            alertify.customer().close();
            alertify.success('Success');
        },
        onError: function (formType, error) {
            alertify.error(error.message);
        }
    }
});

// Config date picker
var configOnRender = function () {
    // date
    var dob = $('[name="dob"]');
    DateTimePicker.date(dob);
};


var a = ['', 'មួយ ', 'ពីរ', 'បី', 'បួន ', 'ប្រាំ ', 'ប្រាំមួយ ', 'ប្រាំពីរ', 'ប្រាំបី ', 'ប្រាំបួន '];
//, 'eleven ', 'twelve ', 'thirteen ', 'fourteen ', 'fifteen ', 'sixteen ', 'seventeen ', 'eighteen ', 'nineteen '];
var b = ['', 'ដប់ ', 'ម្ភៃ', 'សាមសិប', 'សៃសិប', 'ហាសិប', 'ហុកសិប', 'ចិតសិប', 'ប៉ែតសិប', 'កៅសិប'];

function toWords(num) {
    debugger;
    if ((num = num.toString()).length > 9) return 'overflow';
    n = ('000000000' + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
    if (!n) return;
    var str = '';
    str += (n[1] != 0) ? (a[Number(n[1])] || b[n[1][0]] + ' ' + a[n[1][1]]) + 'សែន ' : '';
    str += (n[2] != 0) ? (a[Number(n[2])] || b[n[2][0]] + ' ' + a[n[2][1]]) + 'មឺុន  ' : '';
    str += (n[3] != 0) ? (a[Number(n[3])] || b[n[3][0]] + ' ' + a[n[3][1]]) + 'ពាន់ ' : '';
    str += (n[4] != 0) ? (a[Number(n[4])] || b[n[4][0]] + ' ' + a[n[4][1]]) + 'រយ ' : '';
    str += (n[5] != 0) ? ((str != '') ? '' : '') + (a[Number(n[5])] || b[n[5][0]] + ' ' + a[n[5][1]]) + ' ' : '';
    return str;
}
