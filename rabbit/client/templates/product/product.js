/**
 * Declare template
 */
var indexTpl = Template.rabbit_product,
    insertTpl = Template.rabbit_productInsert,
    updateTpl = Template.rabbit_productUpdate,
    showTpl = Template.rabbit_productShow;

//locationAddOnTpl = Template.rabbit_locationAddOnProduct;


/**
 * Index
 */
indexTpl.onCreated(function () {
    // SEO
    SEO.set({
        title: 'Product',
        description: 'Description for this page'
    });

    // Create new  alertify
    createNewAlertify(["product"], {size: 'lg'});
    createNewAlertify(["productShow"], {size: 'lg'});
    createNewAlertify(["locationAddon"], {transition: 'zoom', size: 'lg'});
});

indexTpl.onRendered(function () {
    //Meteor.subscribe("rabbit_contract");
    //Meteor.subscribe("rabbit_quotation");
});

indexTpl.helpers({
    selector: function () {
        return {branchId: Session.get('currentBranch')};
    }
});

indexTpl.events({
    'click .js-insert': function (e, t) {
        alertify.product(fa("plus", "Product"), renderTemplate(insertTpl));
    },
    'click .js-update': function (e, t) {
        alertify.product(fa("pencil", "Product"), renderTemplate(updateTpl, this));
    },
    'click .js-remove': function (e, t) {
        var id = this._id;
        let self = this;
        var arr = [
            {collection: 'Rabbit.Collection.Contract', selector: {productId: id}},
            {collection: 'Rabbit.Collection.Quotation', selector: {productId: id}}
        ];
        Meteor.call('isRelationExist', arr, function (error, result) {
                if (result) {

                    alertify.message(self._id + '|' + self.name + '  is in used !');
                    return false
                } else {
                    alertify.confirm(
                        fa("remove", "Product"),
                        "Are you sure to delete [" + self._id + "] ?",
                        function () {
                            Rabbit.Collection.Product.remove(self._id, function (error) {
                                if (error) {
                                    alertify.error(error.message);
                                } else {
                                    alertify.success("Success");
                                }
                            });
                        },
                        null
                    );
                }
            }
        );
    },
    'click .js-show': function (e, t) {
        alertify.productShow(fa("eye", "Product"), renderTemplate(showTpl, this));
    }
});

/**
 * Insert
 */
insertTpl.onRendered(function () {
    configOnRender();
});
insertTpl.events({
    'keypress #basePriceHeadOffice,#basePriceBranch,#MaintenaceHeadOffice,#MaintenaceBranch,#monthlyFeeHeadOffice,#monthlyFeeBranch,.trainingFee,.installationFee': function (evt) {
        var charCode = (evt.which) ? evt.which : evt.keyCode;
        if ($(evt.currentTarget).val().indexOf('.') != -1) {
            if (charCode == 46) {
                return false;
            }
        }
        return !(charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57));
    },
});


/**
 * Update
 */
updateTpl.onCreated(function () {
    this.subscribe('rabbit_product', this.data._id);
});
updateTpl.onRendered(function () {
    Meteor.setTimeout(function () {
        configOnRender();
    }, 200);
});
updateTpl.events({

    'keypress #basePriceHeadOffice,#basePriceBranch,#MaintenaceHeadOffice,#MaintenaceBranch,#monthlyFeeHeadOffice,#monthlyFeeBranch,.trainingFee,.installationFee': function (evt) {
        var charCode = (evt.which) ? evt.which : evt.keyCode;
        if ($(evt.currentTarget).val().indexOf('.') != -1) {
            if (charCode == 46) {
                return false;
            }
        }
        return !(charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57));
    }

});

updateTpl.helpers({
    data: function () {
        var data = Rabbit.Collection.Product.findOne(this._id);
        return data;
    }
});


/**
 * Show
 */
showTpl.onCreated(function () {
    this.subscribe('rabbit_product', this.data._id);
});

showTpl.helpers({
    data: function () {
        var data = Rabbit.Collection.Product.findOne(this._id);
        return data;

    },
    base: function () {
        var str = "<table class='table table-bordered'><thead>" +
            "<tr>" +
            "<th>Head Office</th>" +
            "<th>Branch</th>" +
            "</tr>" +
            "</thead><tbody>";
        this.basePrice.forEach(function (o) {
            str += '<tr>' +
                '<td>' + o.headOffice + '</td>' +
                '<td>' + o.branch + '</td>' +
                '</tr>'
        });
        str += "</tbody></table>";
        return new Spacebars.SafeString(str);
    },
    maintenance: function () {
        var str = "<table class='table table-bordered'><thead>" +
            "<tr>" +
            "<th>Head Office</th>" +
            "<th>Branch</th>" +
            "</tr>" +
            "</thead><tbody>";
        this.maintenancePrice.forEach(function (o) {
            str += '<tr>' +
                '<td>' + o.headOffice + '</td>' +
                '<td>' + o.branch + '</td>' +
                '</tr>'
        });
        str += "</tbody></table>";
        return new Spacebars.SafeString(str);
    },
    monthlyFee: function () {
        var str = "<table class='table table-bordered'><thead>" +
            "<tr>" +
            "<th>Head Office</th>" +
            "<th>Branch</th>" +
            "</tr>" +
            "</thead><tbody>";
        this.monthlyFee.forEach(function (o) {
            str += '<tr>' +
                '<td>' + o.headOffice + '</td>' +
                '<td>' + o.branch + '</td>' +
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
    // Product
    rabbit_productInsert: {
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
    rabbit_productUpdate: {
        onSuccess: function (formType, result) {
            alertify.product().close();
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
