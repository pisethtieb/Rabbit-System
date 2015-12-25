/**
 * Declare template
 */
var indexTpl = Template.rabbit_contractor,
    insertTpl = Template.rabbit_contractorInsert,
    updateTpl = Template.rabbit_contractorUpdate,
    showTpl = Template.rabbit_contractorShow;

//locationAddOnTpl = Template.rabbit_locationAddOnContractor;


/**
 * Index
 */
indexTpl.onCreated(function () {
    // SEO
    SEO.set({
        title: 'Contractor',
        description: 'Description for this page'
    });

    // Create new  alertify
    createNewAlertify(["contractor"], {size: 'lg'});
    createNewAlertify(["contractorShow"], {size: 'lg'});
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
        alertify.contractor(fa("plus", "Contractor"), renderTemplate(insertTpl));
    },
    'click .js-update': function (e, t) {
        alertify.contractor(fa("pencil", "Contractor"), renderTemplate(updateTpl, this));
    },
    'click .js-remove': function (e, t) {
        var self = this;

        alertify.confirm(
            fa("remove", "Contractor"),
            "Are you sure to delete [" + self._id + "]?",
            function () {
                Rabbit.Collection.Contractor.remove(self._id, function (error) {
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
        alertify.contractorShow(fa("eye", "Contractor"), renderTemplate(showTpl, this));
    },
    'click .contractAction': function () {
        FlowRouter.go('rabbit.contract', {
            contractorId: this._id
        })

    }
    //'dblclick tbody > tr': function (event) {
    //    var dataTable = $(event.target)
    //        .closest('table')
    //        .DataTable();
    //    var rowData = dataTable.row(event.currentTarget)
    //        .data();
    //
    //    FlowRouter.go('rabbit.order', {contractorId: rowData._id});
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
    this.subscribe('rabbit_contractor', this.data._id);
});

updateTpl.onRendered(function () {
    configOnRender();
});

updateTpl.helpers({
    data: function () {
        var data = Rabbit.Collection.Contractor.findOne(this._id);
        return data;
    }
});


/**
 * Show
 */
showTpl.onCreated(function () {
    this.subscribe('rabbit_contractor', this.data._id);
});

showTpl.helpers({
    data: function () {
        var data = Rabbit.Collection.Contractor.findOne(this._id);
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
    // Contractor
    rabbit_contractorInsert: {
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
    rabbit_contractorUpdate: {
        onSuccess: function (formType, result) {
            alertify.contractor().close();
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


