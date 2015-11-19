/**
 * Declare template
 */
var indexTpl = Template.rabbit_saleHeadOffice,
    insertTpl = Template.rabbit_saleHeadOfficeInsert,
    updateTpl = Template.rabbit_saleHeadOfficeUpdate,
    showTpl = Template.rabbit_saleHeadOfficeShow;

//locationAddOnTpl = Template.rabbit_locationAddOnSaleHeadOffice;


/**
 * Index
 */
indexTpl.onCreated(function () {
    // SEO
    SEO.set({
        title: 'SaleHeadOffice',
        description: 'Description for this page'
    });

    // Create new  alertify
    createNewAlertify(["saleHeadOffice"], {size: 'lg'});
    createNewAlertify(["saleHeadOfficeShow"]);
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
        alertify.saleHeadOffice(fa("plus", "SaleHeadOffice"), renderTemplate(insertTpl));
    },
    'click .js-update': function (e, t) {
        alertify.saleHeadOffice(fa("pencil", "SaleHeadOffice"), renderTemplate(updateTpl, this));
    },
    'click .js-remove': function (e, t) {
        var self = this;

        alertify.confirm(
            fa("remove", "SaleHeadOffice"),
            "Are you sure to delete [" + self._id + "]?",
            function () {
                Rabbit.Collection.SaleHeadOffice.remove(self._id, function (error) {
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
    'click #branch'(){
        FlowRouter.go('rabbit.saleBranchOffice',{
            saleHeadOfficeId: this._id
        })
    },
    'click .js-show': function (e, t) {
        alertify.saleHeadOfficeShow(fa("eye", "SaleHeadOffice"), renderTemplate(showTpl, this));
    }


    //'dblclick tbody > tr': function (event) {
    //    var dataTable = $(event.target)
    //        .closest('table')
    //        .DataTable();
    //    var rowData = dataTable.row(event.currentTarget)
    //        .data();
    //
    //    FlowRouter.go('rabbit.order', {saleHeadOfficeId: rowData._id});
    //}
});

/**
 * Insert
 */
insertTpl.onCreated(function (){
    Meteor.subscribe('rabbit_customer');

});
insertTpl.onRendered(function () {
    configOnRender();
});

insertTpl.helpers({

});

insertTpl.events({
    'change .productId'(e, t) {
        let productId = $('.productId').val();
        let product = Rabbit.List.getProduct(productId);
        $('[name=headBasePrice]').val(product.basePrice[0].headOffice);
        $('[name=headMaintainPrice]').val(product.maintenancePrice[0].headOffice);
        $('[name=totalPrice]').val(product.maintenancePrice[0].headOffice + product.basePrice[0].headOffice);
    },
    'keyup [name=headBasePrice]'(){

        $('[name=totalPrice]').val(parseFloat($('[name=headBasePrice]').val()) + parseFloat($('[name=headMaintainPrice]').val()));

    },
    'keyup [name=headMaintainPrice]'(){

        $('[name=totalPrice]').val(parseFloat($('[name=headBasePrice]').val()) + parseFloat($('[name=headMaintainPrice]').val()));

    }
});

/**
 * Update
 */
updateTpl.onCreated(function () {
    this.subscribe('rabbit_saleHeadOffice', this.data._id);
});

updateTpl.onRendered(function () {
    configOnRender();
});

updateTpl.helpers({
    data: function () {
        var data = Rabbit.Collection.SaleHeadOffice.findOne(this._id);
        return data;
    }
});


/**
 * Show
 */
showTpl.onCreated(function () {
    this.subscribe('rabbit_saleHeadOffice', this.data._id);
});

showTpl.helpers({
    data: function () {
        var data = Rabbit.Collection.SaleHeadOffice.findOne(this._id);
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
    // SaleHeadOffice
    rabbit_saleHeadOfficeInsert: {
        before: {
            insert: function (doc) {
                var prefix = Session.get('currentBranch') + '-';
                doc._id = idGenerator.genWithPrefix(Rabbit.Collection.SaleHeadOffice, prefix, 6);
                doc.branchId = Session.get('currentBranch');
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
    rabbit_saleHeadOfficeUpdate: {
        onSuccess: function (formType, result) {
            alertify.saleHeadOffice().close();
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
    var saleDate = $('[name="saleDate"]');
    DateTimePicker.date(saleDate);
};
