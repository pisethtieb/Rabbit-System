/**
 * Declare template
 */
var formTpl = Template.rabbit_customerExcelReport;

/**
 * Form
 */
formTpl.onRendered(function () {
    var name = $('[name="date"]');
    DateTimePicker.dateRange(name);
});

/**
 * Hook
 */
AutoForm.hooks({
    rabbit_customerExcelReport: {
        onSubmit: function (insertDoc, updateDoc, currentDoc) {

            console.log(insertDoc);

            Meteor.call('rabbit_customerExcel', insertDoc, function (err, fileUrl) {

                console.log(fileUrl);

                var link = document.createElement("a");
                link.download = 'Customer.xlsx';
                link.href = fileUrl;
                link.click();
            });

            return false;

        }
    }
});
