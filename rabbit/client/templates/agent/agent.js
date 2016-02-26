/**
 * Declare template
 */
var indexTpl = Template.rabbit_agent,
    insertTpl = Template.rabbit_agentInsert,
    updateTpl = Template.rabbit_agentUpdate,
    showTpl = Template.rabbit_agentShow;


/**
 * Index
 */
indexTpl.onCreated(function () {
    // SEO
    SEO.set({
        title: 'agent',
        description: 'Description for this page'
    });

    // Create new  alertify
    createNewAlertify(["agent"], {size: 'sm'});
    createNewAlertify(["agentShow"]);
    createNewAlertify(["locationAddon"], {transition: 'zoom', size: 'lg'});
});

indexTpl.onRendered(function () {
    //Meteor.subscribe('rabbit_contract');
    //Meteor.subscribe('rabbit_quotation');
});

indexTpl.helpers({
    selector: function () {
        return {branchId: Session.get('currentBranch')};
    }
});

indexTpl.events({
    'click .js-insert': function (e, t) {
        alertify.agent(fa("plus", "Agent"), renderTemplate(insertTpl));
    },
    'click .js-update': function (e, t) {
        alertify.agent(fa("pencil", "Agent"), renderTemplate(updateTpl, this));
    },

    'click .js-remove': function (e, t) {
        var id = this._id;
        let self = this;
        var arr = [
            {collection: 'Rabbit.Collection.Contract', selector: {agentId: id}},
            {collection: 'Rabbit.Collection.Quotation', selector: {agentId: id}}
        ];
        Meteor.call('isRelationExist', arr, function (error, result) {
                if (result) {

                    alertify.message(self._id + '|' + self.name + '  is in used !');
                    return false
                } else {
                    alertify.confirm(
                        fa("remove", "Agent"),
                        "Are you sure to delete [" + self._id + "] ?",
                        function () {
                            Rabbit.Collection.Agent.remove(self._id, function (error) {
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


        //        let website = Rabbit.Collection.Website.findOne({customerId: self._id});
        //if (contract != null || quotation != null || website != null) {
        //    alertify.message(self._id + '|' + self.companyName + '  is in used !');
        //    return false;
        //
        //}


    },


    'click .js-show': function (e, t) {
        alertify.agentShow(fa("eye", "Agent"), renderTemplate(showTpl, this));
    }


});

/**
 * Insert
 */
insertTpl.onRendered(function () {
    configOnRender();
});


/**
 * Update
 */
updateTpl.onCreated(function () {
    //this.subscribe('rabbit_agent', this.data._id);
});

updateTpl.onRendered(function () {
    configOnRender();
});

/**
 * Show
 */
showTpl.onCreated(function () {
    //this.subscribe('rabbit_agent', this.data._id);
});


/**
 * Hook
 */
AutoForm.hooks({
    // agent
    rabbit_agentInsert: {
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
    rabbit_agentUpdate: {
        onSuccess: function (formType, result) {
            alertify.agent().close();
            alertify.success('Success');
        },
        onError: function (formType, error) {
            alertify.error(error.message);
        }
    }
});

// Config date picker
var configOnRender = function () {
    debugger;
    // date
    var dob = $('[name="dob"]');
    DateTimePicker.date(dob);
};
