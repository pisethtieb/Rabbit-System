/**
 * Created by ratanak on 11/19/15.
 */
/**
 * Declare template
 */
var indexTpl = Template.rabbit_office,
    insertTpl = Template.rabbit_officeInsert,
    updateTpl = Template.rabbit_officeUpdate,
    showTpl = Template.rabbit_officeShow;

//locationAddOnTpl = Template.rabbit_locationAddOnOffice;


/**
 * Index
 */
indexTpl.onCreated(function () {
    // SEO
    Meteor.subscribe("rabbit_maintenance");
    SEO.set({
        title: 'Sale Branch Office',
        description: 'Description for this page'
    });

    // Create new  alertify
    createNewAlertify(["office"], {size: 'lg'});
    createNewAlertify(["officeShow"]);
    //createNewAlertify(["locationAddon"], {transition: 'zoom', size: 'lg'});
});

indexTpl.events({
    'click .js-insert': function (e, t) {

        alertify.office(fa("plus", "Office"), renderTemplate(insertTpl));

    },
    'click .js-update': function (e, t) {
        alertify.office(fa("pencil", "Office"), renderTemplate(updateTpl, this));
        debugger;
    },
    'click .js-remove': function (e, t) {
        var id = this._id;
        let self = this;
        var arr = [
            {collection: 'Rabbit.Collection.Maintenance', selector: {officeId: id}}

        ];
        Meteor.call('isRelationExist', arr, function (error, result) {
                if (result) {

                    alertify.message(self._id + '|' + self.name + '  is in used !');
                    return false
                } else {
                    alertify.confirm(
                        fa("remove", "Office"),
                        "Are you sure to delete [" + self._id + "] ?",
                        function () {
                            Rabbit.Collection.Office.remove(self._id, function (error) {
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
        alertify.officeShow(fa("eye", "Office"), renderTemplate(showTpl, this));

    },
    'click .maintenanceAction': function () {
        FlowRouter.go('rabbit.maintenance', {
            customerId: this._contract.customerId, contractId: this.contractId, officeId: this._id
        })
    }
});

indexTpl.helpers({
    selector: function () {
        let id = FlowRouter.getParam('contractId');
        //console.log(id);
        return {contractId: id}
    },
    contract: function () {
        let id = FlowRouter.getParam('contractId');
        let contract = Rabbit.Collection.Contract.findOne({_id: id});

        return contract;

    }

});

/*Insert*/
insertTpl.onRendered(function () {
    configOnRender();
    //auto selected on office selected"HeadOffice"
    //var contractId = FlowRouter.getParam('contractId');
    //let office = Rabbit.Collection.Office.findOne({contractId: contractId});
    //if (office == null || undefined) {
    //    $('.type').val("HO");
    //    $('.discount').val(0);
    //    $('.type').change();
    //    //$('[name=price]').val(contract.basePrice[0].headOffice);
    //} else {
    //    $('.type').val("BO");
    //    $('.discount').val(0);
    //    $('.type').change();
    //}
});
insertTpl.helpers({
    office(){
        let contractId = FlowRouter.getParam('contractId');
        return {
            contractId: contractId,
            officeDate: moment(ReactiveMethod.call("currentDate"), 'YYYY-MM-DD').format('YYYY-MM-DD'),
        }
    }
});
insertTpl.events({
    'change .type'(e, t) {
        let type = $(e.currentTarget).val();
        var contractId = FlowRouter.getParam('contractId');
        var contract = Rabbit.Collection.Contract.findOne({_id: contractId});
        let office = Rabbit.Collection.Office.findOne({contractId: contractId});
        debugger;
        if (type == 'HO' && office != null) {
            debugger;
            if (contract.productType == 'fullyFee') {
                $('.type').val("BO");
                $('.type').change();
                $('.discount').val(0);
                $('[name=price]').val(contract.basePrice[0].branch);
                $('[name=contractPrice]').val(contract.basePrice[0].branch);
            } else if (contract.productType == "monthlyFee") {
                debugger;
                $('.type').val("BO");
                $('.type').change();
                $('.discount').val(0);
                $('[name=price]').val(contract.installationFee);
                $('[name=contractPrice]').val(contract.installationFee);
            }
        } else if (type == "BO" && office == undefined) {
            debugger;
            if (contract.productType == 'fullyFee') {

                $('.type').val("HO");
                $('.type').change();
                $('.discount').val(0);
                $('[name=price]').val(contract.basePrice[0].headOffice);
                $('[name=contractPrice]').val(contract.basePrice[0].headOffice);
            } else if (contract.productType == "monthlyFee") {
                debugger
                $('.type').val("HO");
                $('.type').change();
                $('.discount').val(0);
                $('[name=price]').val(contract.installationFee + contract.trainingFee);
                $('[name=contractPrice]').val(contract.installationFee + contract.trainingFee);

            }
        } else if (type == "HO") {
            debugger;
            if (contract.productType == 'fullyFee') {
                //$('.type').val("BO");
                //$('.type').change();
                $('.discount').val(0);

                $('[name=price]').val(contract.basePrice[0].headOffice);
                $('[name=contractPrice]').val(contract.basePrice[0].headOffice);
            } else if (contract.productType == "monthlyFee") {
                debugger;
                //$('.type').val("BO");
                //$('.type').change();
                $('.discount').val(0);
                $('[name=price]').val(contract.installationFee + contract.trainingFee);
                $('[name=contractPrice]').val(contract.installationFee + contract.trainingFee);
            }
        } else if (type == "BO") {
            if (contract.productType == 'fullyFee') {
                $('.discount').val(0);
                $('[name=price]').val(contract.basePrice[0].branch);
                $('[name=contractPrice]').val(contract.basePrice[0].branch);

            } else if (contract.productType == "monthlyFee") {
                $('.discount').val(0);
                $('[name=price]').val(contract.installationFee);
                $('[name=contractPrice]').val(contract.installationFee);
            }
        }

        debugger;
    },
    'keyup .discount'(e){

        $('#price').val($('.contractPrice').val() - $('.discount').val());
    },
    'keypress .discount': function (evt) {
        var charCode = (evt.which) ? evt.which : evt.keyCode;
        if ($(evt.currentTarget).val().indexOf('.') != -1) {
            if (charCode == 46) {
                return false;
            }
        }
        return !(charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57));
    }
});
/**
 * Update
 */
updateTpl.onCreated(function () {
    this.subscribe('rabbit_office', this.data._id);
});

updateTpl.onRendered(function () {
    Meteor.setTimeout(function () {
        configOnRender();
    }, 200);
});


updateTpl.events({
    'change .type'(e, t) {
        let type = $(e.currentTarget).val();
        var contractId = FlowRouter.getParam('contractId');
        var contract = Rabbit.Collection.Contract.findOne({_id: contractId});
        //let types = Rabbit.List.getProduct(type);
        let office = Rabbit.Collection.Office.findOne({contractId: contractId});
        if (type == 'HO' && office != null) {
            $('.type').val("BO");
            $('.type').change();
            $('.discount').val(0);
            $('[name=price]').val(contract.basePrice[0].branch);
        } else if (type == 'BO' && office == null) {
            $('.type').val("HO");
            $('.type').change();
            $('.discount').val(0);
            $('[name=price]').val(contract.basePrice[0].headOffice);
            $('[name=contractPrice]').val(contract.basePrice[0].headOffice);
        } else if (type == 'BO') {
            $('.discount').val(0);
            $('[name=price]').val(contract.basePrice[0].branch);
            $('[name=contractPrice]').val(contract.basePrice[0].branch);
        } else if (type == "HO") {
            $('.discount').val(0);
            $('[name=price]').val(contract.basePrice[0].headOffice);
            $('[name=contractPrice]').val(contract.basePrice[0].headOffice);
        } else {
            $('.discount').val('');
            $('[name=price]').val("");
            $('[name=contractPrice]').val("");
        }
    },
    'keyup .discount'(e){

        $('#price').val($('.contractPrice').val() - $('.discount').val());
    },
    'keypress .discount': function (evt) {
        var charCode = (evt.which) ? evt.which : evt.keyCode;
        if ($(evt.currentTarget).val().indexOf('.') != -1) {
            if (charCode == 46) {
                return false;
            }
        }
        return !(charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57));
    }
});
//
//updateTpl.helpers({
//    data: function () {
//        var data = Rabbit.Collection.Office.findOne(this._id);
//        return data;
//    }
//});
//
///**
// * Show
// */
//showTpl.onCreated(function () {
//    this.subscribe('rabbit_office', this.data._id);
//});
//
//showTpl.helpers({
//    data: function () {
//        var data = Rabbit.Collection.Office.findOne(this._id);
//        return data;
//
//    }
//});

/**
 * Hook
 */
AutoForm.hooks({
    // Office
    rabbit_officeInsert: {
        before: {

            insert: function (doc) {
                doc.branchId = Session.get('currentBranch');
                var prefix = doc.branchId + '-';
                Meteor.call('rabbit', prefix);
                return doc;

            }

        },
        onSuccess: function (formType, result) {
            alertify.office().close();
            alertify.success('Success');
        },
        onError: function (formType, error) {
            alertify.error(error.message);
        }
    },
    rabbit_officeUpdate: {
        onSuccess: function (formType, result) {
            alertify.office().close();
            alertify.success('Success');
        },
        onError: function (formType, error) {
            alertify.error(error.message);
        }
    }
});
var configOnRender = function () {
    debugger;
    // date
    var officeDate = $('[name="officeDate"]');
    DateTimePicker.date(officeDate);
};
