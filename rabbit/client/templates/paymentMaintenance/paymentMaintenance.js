/**
 * Created by ratanak on 11/19/15.
 */
Rabbit.ListState = new ReactiveObj();
/**
 * Declare template
 */
var indexTpl = Template.rabbit_paymentMaintenance,
    insertTpl = Template.rabbit_paymentMaintenanceInsert,
    updateTpl = Template.rabbit_paymentMaintenanceUpdate,
    showTpl = Template.rabbit_paymentMaintenanceShow;

//locationAddOnTpl = Template.rabbit_locationAddOnPaymentMaintenance;


/**
 * Index
 */
indexTpl.onCreated(function () {
    // SEO
    SEO.set({
        title: 'Sale Branch PaymentMaintenance',
        description: 'Description for this page'
    });

    // Create new  alertify
    createNewAlertify(["paymentMaintenance"], {size: 'lg'});
    createNewAlertify(["paymentMaintenanceShow"], {size: 'lg'});
    //createNewAlertify(["locationAddon"], {transition: 'zoom', size: 'lg'});
});

indexTpl.events({

    'click .btn-link': function (e, t) {
        var self = this;
        checkLastPaymentMaintenance(self);
    },
    'click .js-insert': function (e, t) {
        alertify.paymentMaintenance(fa("plus", "Payment Maintenance"), renderTemplate(insertTpl));
    },
    'click .js-update': function (e, t) {
        alertify.paymentMaintenance(fa("pencil", "Payment Maintenance"), renderTemplate(updateTpl, this));
    },
    'click .js-remove': function (e, t) {
        var self = this;

        alertify.confirm(
            fa("remove", "Payment Maintenance"),
            "Are you sure to delete [" + self._id + "] ?",
            function () {
                Rabbit.Collection.PaymentMaintenance.remove(self._id, function (error) {
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
        alertify.paymentMaintenanceShow(fa("eye", "Payment Maintenance"), renderTemplate(showTpl, this));

    },
    'click .maintenanceAction': function () {
        FlowRouter.go('rabbit.maintenance', {
            customerId: this._contract.customerId, contractId: this.contractId, paymentMaintenanceId: this._id
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
insertTpl.helpers({

    contract(){
        var contractId = FlowRouter.getParam('contractId');
        var maintenance = ReactiveMethod.call('getMaintenanceWithContract', contractId);
        maintenance.contractId = contractId;
        maintenance.customerId = FlowRouter.getParam('customerId');
        maintenance.paymentMaintenanceDate = moment(ReactiveMethod.call("currentDate"), 'YYYY-MM-DD').format('YYYY-MM-DD');
        return maintenance;
    }
});
insertTpl.onRendered(function () {
    configOnRender();
    $('#officeMaintenance').attr('disabled', "disabled");
    $('.btnAdd').attr('disabled', "disabled");
});
insertTpl.events({
    'click .btnRemove': function (e) {

        setTimeout(function () {
            var enable = true;
            $('.amount').each(function () {
                var amount = $(this).val() == "" ? 0 : parseFloat($(this).val());
                if (amount == 0) {
                    enable = false;
                    return false;
                }
                enable = true;
            });
            if (enable) {
                $('.btnAdd').attr('disabled', false);
            } else {
                $('.btnAdd').attr('disabled', true);
            }
        }, 300);
    },
    'keyup .discount': function (e, t) {

        var thisObj = $(e.currentTarget);
        thisObj.parents('div.item-list').find('.paidAmount').val('');
        var price = thisObj.parents('div.item-list').find('.price').val();
        var discount = thisObj.parents('div.item-list').find('.discount').val();
        let dueAmount = price - discount;
        thisObj.parents('div.item-list').find('.dueAmount').val(dueAmount);
        if (parseFloat(price) < parseFloat(discount)) {
            thisObj.parents('div.item-list').find('.dueAmount').val(price);
            thisObj.parents('div.item-list').find('.discount').val('');
        }
    },
    'keyup .paidAmount': function (e, t) {
        var thisObj = $(e.currentTarget);
        var price = thisObj.parents('div.item-list').find('.price').val();
        var paid = thisObj.parents('div.item-list').find('.paidAmount').val();
        var discount = thisObj.parents('div.item-list').find('.discount').val();
        if (discount > 0) {
            let disAmount = (price - discount);
            let subAmount = disAmount - paid;
            thisObj.parents('div.item-list').find('.dueAmount').val(subAmount);
            if (disAmount < paid) {
                thisObj.parents('div.item-list').find('.paidAmount').val('');
                thisObj.parents('div.item-list').find('.dueAmount').val(subAmount);
            }
        } else if (discount == 0 || discount == null) {
            let dueAmount = parseFloat(price) - parseFloat(paid);
            debugger;
            thisObj.parents('div.item-list').find('.dueAmount').val(dueAmount);
            if (parseFloat(price) < parseFloat(paid)) {
                thisObj.parents('div.item-list').find('.paidAmount').val('');
                thisObj.parents('div.item-list').find('.dueAmount').val(price);
            }

        } else {
            thisObj.parents('div.item-list').find('.dueAmount').val(price);

        }

    },
    'keypress .paidAmount,.discount,.dueAmount,.price': function (evt) {
        var charCode = (evt.which) ? evt.which : evt.keyCode;
        if ($(evt.currentTarget).val().indexOf('.') != -1) {
            if (charCode == 46) {
                return false;
            }
        }
        return !(charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57));
    },
    //'keypress .paidAmount'(e){
    //    var thisObj = $(e.currentTarget);
    //    var paid = thisObj.parents('div.item-list').find('.paidAmount').val();
    //    if (paid == 0) {
    //        thisObj.parents('div.item-list').find('.paidAmount').val('');
    //    }
    //},
    'click .btnAdd': function (e) {
        setTimeout(function () {
            $('.btnAdd').attr('disabled', 'disabled');
        }, 300);
        var thisObj = $(e.currentTarget);
        var officeId = thisObj.parents('div.item-list').find('.officeId').val();
        var price = thisObj.parents('div.item-list').find('.price').val();
        setTimeout(function () {
            if (officeId != "" && price != 0) {
                $('.btnAdd').attr('disabled', false);
            } else {
                $('.btnAdd').attr('disabled', true);
            }
        }, 300);
    },
    'change .maintenanceId': function (e) {
        var thisObje = $(e.currentTarget);
        var maintenanceId = $(e.currentTarget).val();
        if (maintenanceId == '') {
            thisObje.parents('div.item-list').find('.officeId').val('');
            thisObje.parents('div.item-list').find('.office').val('');
            thisObje.parents('div.item-list').find('.price').val('');
            thisObje.parents('div.item-list').find('.paidAmount').val('');
            thisObje.parents('div.item-list').find('.dueAmount').val('');

        }
        debugger;
        var maintenance = Rabbit.Collection.Maintenance.findOne({_id: maintenanceId});
        Rabbit.Collection.Maintenance.find(maintenanceId).forEach(function (obj) {
            var paymentMaintenance = Rabbit.Collection.PaymentMaintenance.findOne({
                    'maintenance.maintenanceId': obj._id
                },
                {
                    sort: {
                        _id: -1
                    }
                });
            console.log(paymentMaintenance);
            debugger;
            if (paymentMaintenance != null) {
                debugger;
                paymentMaintenance.maintenance.forEach(function (payObj) {
                    debugger;
                    if (obj._id == payObj.maintenanceId && payObj.dueAmount > 0) {
                        thisObje.parents('div.item-list').find('.maintenance').val(maintenance.type);
                        thisObje.parents('div.item-list').find('.price').val(payObj.dueAmount);
                        thisObje.parents('div.item-list').find('.paidAmount').val(0);
                        thisObje.parents('div.item-list').find('.dueAmount').val(payObj.dueAmount);
                    }
                })
            } else if (paymentMaintenance == null) {
                debugger;
                thisObje.parents('div.item-list').find('.maintenance').val(maintenance.type);
                thisObje.parents('div.item-list').find('.price').val(maintenance.price);
                thisObje.parents('div.item-list').find('.paidAmount').val(0);
                thisObje.parents('div.item-list').find('.dueAmount').val(maintenance.price);
            }
        });
        var num = 0;
        $('.maintenanceId').each(function () {
            if (maintenanceId == $(this).val()) {
                num += 1;
            }
        });
        if (num > 1) {

            thisObje.parents('div.item-list').find('.maintenanceId').val('');
            thisObje.parents('div.item-list').find('.maintenance').val('');
            thisObje.parents('div.item-list').find('.price').val('');
            thisObje.parents('div.item-list').find('.paidAmount').val('');
            thisObje.parents('div.item-list').find('.dueAmount').val('');
            setTimeout(function () {
                $('.btnAdd').attr('disabled', 'disabled');

            }, 100);
            debugger;
        }
        if (maintenanceId) {
            $('.btnAdd').removeAttr('disabled');
        } else {
            $('.btnAdd').attr('disabled', "disabled");
        }


    }
});
updateTpl.events({
  'click .btnRemove': function (e) {

      setTimeout(function () {
          var enable = true;
          $('.amount').each(function () {
              var amount = $(this).val() == "" ? 0 : parseFloat($(this).val());
              if (amount == 0) {
                  enable = false;
                  return false;
              }
              enable = true;
          });
          if (enable) {
              $('.btnAdd').attr('disabled', false);
          } else {
              $('.btnAdd').attr('disabled', true);
          }
      }, 300);
  },
  'keyup .discount': function (e, t) {

      var thisObj = $(e.currentTarget);
      thisObj.parents('div.item-list').find('.paidAmount').val('');
      var price = thisObj.parents('div.item-list').find('.price').val();
      var discount = thisObj.parents('div.item-list').find('.discount').val();
      let dueAmount = price - discount;
      thisObj.parents('div.item-list').find('.dueAmount').val(dueAmount);
      if (parseFloat(price) < parseFloat(discount)) {
          thisObj.parents('div.item-list').find('.dueAmount').val(price);
          thisObj.parents('div.item-list').find('.discount').val('');
      }
  },
  'keyup .paidAmount': function (e, t) {
      var thisObj = $(e.currentTarget);
      var price = thisObj.parents('div.item-list').find('.price').val();
      var paid = thisObj.parents('div.item-list').find('.paidAmount').val();
      var discount = thisObj.parents('div.item-list').find('.discount').val();
      if (discount > 0) {
          let disAmount = (price - discount);
          let subAmount = disAmount - paid;
          thisObj.parents('div.item-list').find('.dueAmount').val(subAmount);
          if (disAmount < paid) {
              thisObj.parents('div.item-list').find('.paidAmount').val('');
              thisObj.parents('div.item-list').find('.dueAmount').val(subAmount);
          }
      } else if (discount == 0 || discount == null) {
          let dueAmount = parseFloat(price) - parseFloat(paid);
          debugger;
          thisObj.parents('div.item-list').find('.dueAmount').val(dueAmount);
          if (parseFloat(price) < parseFloat(paid)) {
              thisObj.parents('div.item-list').find('.paidAmount').val('');
              thisObj.parents('div.item-list').find('.dueAmount').val(price);
          }

      } else {
          thisObj.parents('div.item-list').find('.dueAmount').val(price);

      }

  },
  'keypress .paidAmount,.discount,.dueAmount,.price': function (evt) {
      var charCode = (evt.which) ? evt.which : evt.keyCode;
      if ($(evt.currentTarget).val().indexOf('.') != -1) {
          if (charCode == 46) {
              return false;
          }
      }
      return !(charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57));
  },
  //'keypress .paidAmount'(e){
  //    var thisObj = $(e.currentTarget);
  //    var paid = thisObj.parents('div.item-list').find('.paidAmount').val();
  //    if (paid == 0) {
  //        thisObj.parents('div.item-list').find('.paidAmount').val('');
  //    }
  //},
  'click .btnAdd': function (e) {
      setTimeout(function () {
          $('.btnAdd').attr('disabled', 'disabled');
      }, 300);
      var thisObj = $(e.currentTarget);
      var officeId = thisObj.parents('div.item-list').find('.officeId').val();
      var price = thisObj.parents('div.item-list').find('.price').val();
      setTimeout(function () {
          if (officeId != "" && price != 0) {
              $('.btnAdd').attr('disabled', false);
          } else {
              $('.btnAdd').attr('disabled', true);
          }
      }, 300);
  },
  'change .maintenanceId': function (e) {
      var thisObje = $(e.currentTarget);
      var maintenanceId = $(e.currentTarget).val();
      if (maintenanceId == '') {
          thisObje.parents('div.item-list').find('.officeId').val('');
          thisObje.parents('div.item-list').find('.office').val('');
          thisObje.parents('div.item-list').find('.price').val('');
          thisObje.parents('div.item-list').find('.paidAmount').val('');
          thisObje.parents('div.item-list').find('.dueAmount').val('');

      }
      debugger;
      var maintenance = Rabbit.Collection.Maintenance.findOne({_id: maintenanceId});
      Rabbit.Collection.Maintenance.find(maintenanceId).forEach(function (obj) {
          var paymentMaintenance = Rabbit.Collection.PaymentMaintenance.findOne({
                  'maintenance.maintenanceId': obj._id
              },
              {
                  sort: {
                      _id: -1
                  }
              });
          console.log(paymentMaintenance);
          debugger;
          if (paymentMaintenance != null) {
              debugger;
              paymentMaintenance.maintenance.forEach(function (payObj) {
                  debugger;
                  if (obj._id == payObj.maintenanceId && payObj.dueAmount > 0) {
                      thisObje.parents('div.item-list').find('.maintenance').val(maintenance.type);
                      thisObje.parents('div.item-list').find('.price').val(payObj.dueAmount);
                      thisObje.parents('div.item-list').find('.paidAmount').val(0);
                      thisObje.parents('div.item-list').find('.dueAmount').val(payObj.dueAmount);
                  }
              })
          } else if (paymentMaintenance == null) {
              debugger;
              thisObje.parents('div.item-list').find('.maintenance').val(maintenance.type);
              thisObje.parents('div.item-list').find('.price').val(maintenance.price);
              thisObje.parents('div.item-list').find('.paidAmount').val(0);
              thisObje.parents('div.item-list').find('.dueAmount').val(maintenance.price);
          }
      });
      var num = 0;
      $('.maintenanceId').each(function () {
          if (maintenanceId == $(this).val()) {
              num += 1;
          }
      });
      if (num > 1) {

          thisObje.parents('div.item-list').find('.maintenanceId').val('');
          thisObje.parents('div.item-list').find('.maintenance').val('');
          thisObje.parents('div.item-list').find('.price').val('');
          thisObje.parents('div.item-list').find('.paidAmount').val('');
          thisObje.parents('div.item-list').find('.dueAmount').val('');
          setTimeout(function () {
              $('.btnAdd').attr('disabled', 'disabled');

          }, 100);
          debugger;
      }
      if (maintenanceId) {
          $('.btnAdd').removeAttr('disabled');
      } else {
          $('.btnAdd').attr('disabled', "disabled");
      }


  }
  });
//show
showTpl.helpers({

    maintenance: function () {
        var str = "<table class='table table-bordered'><thead>" +
            "<tr>" +
            "<th>Maintenance ID</th>" +
            "<th>Office Type</th>" +
            "<th>Price</th>" +
            "<th>Discount</th>" +
            "<th>Paid Amount</th>" +
            "<th>Due Amount</th>" +
            "</tr>" +
            "</thead><tbody>";
        this.maintenance.forEach(function (o) {
            str += '<tr>' +
                '<td>' + o.maintenanceId + '</td>' +
                '<td>' + o.maintenance + '</td>' +
                '<td>' + o.price + '</td>' +
                '<td>' + o.discount + '</td>' +
                '<td>' + o.paidAmount + '</td>' +
                '<td>' + o.dueAmount + '</td>' +
                '</tr>'
        });
        str += "</tbody></table>";
        return new Spacebars.SafeString(str);
    }
});

/**
 * Update
 */
updateTpl.onCreated(function () {
    this.subscribe('rabbit_paymentMaintenance', this.data._id);
});

updateTpl.onRendered(function () {
    Meteor.setTimeout(function () {
        configOnRender();
    }, 200);
});
/**
 * Hook
 */
AutoForm.hooks({
    // PaymentMaintenance
    rabbit_paymentMaintenanceInsert: {
        before: {

            insert: function (doc) {
                doc.branchId = Session.get('currentBranch');
                var prefix = doc.branchId + '-';
                Meteor.call('rabbit', prefix);
                return doc;
            }
        },
        onSuccess: function (formType, result) {
            alertify.paymentMaintenance().close();
            alertify.success('Success');
        },
        onError: function (formType, error) {
            alertify.error(error.message);
        }
    },
    rabbit_paymentMaintenanceUpdate: {
        onSuccess: function (formType, result) {
            alertify.paymentMaintenance().close();
            alertify.success('Success');
        },
        onError: function (formType, error) {
            alertify.error(error.message);
        }
    }
});
var configOnRender = function () {
    // date
    var dob = $('[name="paymentMaintenanceDate"]');
    DateTimePicker.date(dob);
};

function checkLastPaymentMaintenance(self) {


    let checkingLastPaymentMaintenanceForOffice = Rabbit.Collection.PaymentMaintenance.findOne({contractId: self.contractId}, {sort: {_id: -1}})._id;

    if (checkingLastPaymentMaintenanceForOffice == self._id) {
        debugger;
        $('.updatePaymentMaintenance').show();
        $('.removePaymentMaintenance').show();
    } else {
        debugger;
        $('.updatePaymentMaintenance').hide();
        $('.removePaymentMaintenance').hide();
    }
    //let checkingLastPaymentMaintenanceForMaintenance = Rabbit.Collection.PaymentMaintenance.findOne({maintenanceId: paymentMaintenance.maintenanceId}, {sort: {_id: -1}})._id;
    //
    //if (checkingLastPaymentMaintenanceForMaintenance == self._id) {
    //
    //    $('.updatePaymentMaintenance').show();
    //    $('.removePaymentMaintenance').show();
    //} else {
    //    $('.updatePaymentMaintenance').hide();
    //    $('.removePaymentMaintenance').hide();
    //}

}
