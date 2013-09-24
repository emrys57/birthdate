/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
var $ = (function(my) {
    return my;
}(jQuery || {}));
var ko = (function(my) {
    return my;
}(ko || {}));
var M$ = (function(my) {

    my.viewModel = function() {
        var self = this;
        var onDateText = '1999';
        self.ageYears = ko.observable();
        self.ageMonths = ko.observable();
        self.ageWeeks = ko.observable();
        self.ageDays = ko.observable();

        self.onDate1Year = ko.observable('');
        self.onDate1Month = ko.observable();
        self.onDate1Day = ko.observable();

        self.onDate1Y = ko.observable();

        self.onDate1YSet = ko.computed(function() {
            var trimmed = (''+self.onDate1Year()).trim();
            trimmed = trimmed.replace(/[^0-9]/g, '');
            console.log('trimmed:', trimmed);
            if (trimmed === '') {
                self.onDate1Y(0);
                return false;
            } else {
                var y = Math.floor(trimmed);
                if ((y > 2100) || (y <= 1752)) {
                    self.onDate1Y(0);
                    return false;
                } else {
                    self.onDate1Y(y);
                    console.log('year:', y);
                    return true;
                }
            }
        });
        self.onDate1YSetReadout = ko.computed(function(){
            return self.onDate1YSet()? 'Set!': 'Unset.';
        });
        self.onEarliestDate = ko.computed({
            read: function() {

            }
        });
        self.birthdate = ko.computed({
            read: function() {
                return self.onDate1Y() - self.ageYears();
            }
        });
    };
    return my;
}(M$ || {}));

$(document).ready(function() {
    ko.applyBindings(new M$.viewModel());
    console.log('Hello!');
});