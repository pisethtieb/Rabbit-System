Meteor.methods({
  rabbit_paymentWebsiteReport: function(params) {
    var data = {
      title: {},
      header: {},
      content: [{}],
      footer: {}
    };
    //exchange = Cpanel.Collection.Exchange.findOne(exchangeId);
    date = s.words(params.date, ' To '),
      fDate = date[0],
      newDate = new Date(date[1]);
    var tDate = new Date(newDate.getFullYear(), newDate.getMonth(),
      newDate.getDate() + 1);
    tDate = moment(tDate).format('YYYY-MM-DD');
    //var date = s.words(params.date, ' To ');
    //var fDate = moment(date[0], 'YYYY-MM-DD').toDate();
    //var tDate = moment(date[1], 'YYYY-MM-DD').add(1, 'days').toDate();
    //****** Title *****/
    data.title = Cpanel.Collection.Company.findOne();

    /****** Header *****/
    data.header = params;

    /****** Content *****/
    var content = [];
    var selector = {};
    selector.paymentWebsiteDate = {
      $gte: fDate,
      $lte: tDate
    };
    //
    if (!_.isEmpty(params.branch)) {
      //selector.branchId = params.branch;
    }
    if (!_.isEmpty(params.contractId)) {
      selector.contractId = params.contractId
    }
    var index = 1;
    let total = 0;
    let totalBuidPrice = 0,
      totalBuildPaid = 0,
      totalBuildDue

    var paymentWebsite = Rabbit.Collection.PaymentWebsite.find(selector);
    paymentWebsite.forEach(function(obj) {
      obj.domainNamePrice = obj.domainNamePrice == null ? 0 : obj.domainNamePrice;
      obj.domainNamePaid = obj.domainNamePaid == null ? 0 : obj.domainNamePaid;
      obj.domainNameDue = obj.domainNameDue == null ? 0 : obj.domainNameDue;
      obj.hostingPrice = obj.hostingPrice == null ? 0 : obj.hostingPrice;
      obj.hostingPaid = obj.hostingPaid == null ? 0 : obj.hostingPaid;
      obj.hostingDue = obj.hostingDue == null ? 0 : obj.hostingDue;
      obj.maintenancePrice = obj.maintenancePrice == null ? 0 : obj.maintenancePrice;
      obj.maintenancePaid = obj.maintenancePaid == null ? 0 : obj.maintenancePaid;
      obj.miantenanceDue = obj.miantenanceDue == null ? 0 : obj.miantenanceDue;
      obj.buildPrice = obj.buildPrice == null ? 0 : obj.buildPrice;
      obj.buildPaid = obj.buildPaid == null ? 0 : obj.buildPaid;
      obj.buildDue = obj.buildDue == null ? 0 : obj.buildDue;
      totalBuidPrice += obj.buildPrice;
      totalBuildDue += obj.buildDue;
      totalBuildPaid += obj.buildPaid;

      index++;
      obj.index = index;
      data.content.push(obj)
    });
console.log(totalBuidPrice);
    if (content.length > 0) {
      // data.content = content;
      data.footer.totalBuidPrice = totalBuidPrice;
      data.footer.totalBuildPaid = totalBuildPaid;
      data.footer.totalBuildDue = totalBuildDue;
    }
    if (params.branch == '') {
      params.branch = 'All'
    }

    if (params.contractId == '') {
      params.contractId = 'All'
    }
    /****** Header *****/
    data.header = params;


    return data
  }
});
