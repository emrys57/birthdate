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
        function isLeapYear(y) {
            if ((y % 4) != 0)
                return false;
            if (y == 2000)
                return true;
            if ((y % 100) == 0)
                return false;
            return true;
        }
        self.ageYears = ko.observable();
        self.ageMonths = ko.observable();
        self.ageWeeks = ko.observable();
        self.ageDays = ko.observable();

        self.onDate1Year = ko.observable('');
        self.onDate1Month = ko.observable('');
        self.onDate1Day = ko.observable('');

        self.onDate1YMin = ko.observable();
        self.onDate1YMax = ko.observable();
        
        
        self.onDate1MMin = ko.observable();
        self.onDate1MMax = ko.observable();
        self.onDate1MValid = ko.observable(true);

        self.onDate1YSet = ko.computed(function() {
            var trimmed2 = ('' + self.onDate1Year()).trim();
            var trimmed = trimmed2.replace(/[^0-9]/g, '');
            if ((trimmed === '') || (trimmed !== trimmed2)) {
                self.onDate1YMin(1752);
                self.onDate1YMax(2100);
                return false;
            } else {
                var y = Math.floor(trimmed);
                    console.log('year2: '+y);
                if ((y > 2100) || (y <= 1752)) {
                    self.onDate1YMin(1752);
                    self.onDate1YMax(2100);
                    return false;
                } else {
                    self.onDate1YMin(y);
                    self.onDate1YMax(y);
                    console.log('year: '+y);
                    return true;
                }
            }
        });
        self.onDate1YValid = ko.computed(function(){return self.onDate1YSet(); });
        self.onDate1YSetReadout = ko.computed(function() {
            return self.onDate1YSet() ? 'Set!' : 'Unset.';
        });
        self.onDate1MSet = ko.computed(function() {
            var trimmed2 = ('' + self.onDate1Month()).trim();
            if (trimmed2 === '') {
                self.onDate1MValid(true);
                self.onDate1MMin(1);
                self.onDate1MMax(12);
                return false;
            }
            var trimmed3 = trimmed2.toLowerCase();
            var trimmed4 = trimmed3.replace(/[^0-9a-z]/g, '');
            if (trimmed3 !== trimmed4) { // there is some weird character
                self.onDate1MValid(false);
                self.onDate1MMin(1);
                self.onDate1MMax(12);
                return false;
            }
            var c = trimmed4.charAt(0);
            if (c >= 'a') { // it's a string
                var month = trimmed4;//.substr(0,3);
                var months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec',
                    'january', 'february', 'march', 'april', 'may', 'june',
                    'july', 'august', 'september', 'october', 'november', 'december'];
                for (var i = 0; i < months.length; i++)
                    if (month === months[i]) {
                        var md = (i % 12) + 1;
                        self.onDate1MValid(true);
                        self.onDate1MMin(i + 1);
                        self.onDate1MMax(i + 1);
                        return true;
                    }
                self.onDate1MValid(false);
                self.onDate1MMin(1);
                self.onDate1MMax(12);
                return false;
            }
            var md = Math.floor(trimmed4);
            if ((md === 0) || (md > 12)) {
                self.onDate1MValid(false);
                self.onDate1MMin(1);
                self.onDate1MMax(12);
                return false;
            }
            self.onDate1MValid(true);
            self.onDate1MMin(md);
            self.onDate1MMax(md);
            return true;
        });
        self.onDate1Min = ko.observable();
        self.onDate1Max = ko.observable();
        self.onDate1DMin = ko.observable();
        self.onDate1DMax = ko.observable();
        self.onDate1DValid = ko.observable(true);
        self.onDate1DSet = ko.computed(function() {
            var daysInMonth = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
            if (self.onDate1YSet() && isLeapYear(self.onDate1YMax()))
                daysInMonth[2] = 29;
            var trimmed2 = ('' + self.onDate1Day()).trim();
            var trimmed3 = trimmed2.replace(/[^0-9]/g, '');
            if (trimmed2 !== trimmed3) {
                self.onDate1DValid(false);
                console.log('D1');
                self.onDate1Dmin = 1;
                self.onDate1Dmax(self.onDate1MSet() ? daysInMonth[self.onDate1MMax()] : 31); // valid for Dec
                return false;
            }
            if (trimmed3 === '') {
                self.onDate1DValid(true);
                console.log('D3');
                self.onDate1DMin(1);
                self.onDate1DMax(self.onDate1MSet() ? daysInMonth[self.onDate1MMax()] : 31); // valid for Dec 
                return false;
            }
            var dd = Math.floor(trimmed3);

            if ((dd === 0) || (!self.onDate1MSet()) || (dd > daysInMonth[self.onDate1MMin()])) {
                self.onDate1DValid(false);
                console.log('D2');
                self.onDate1DMin(1);
                self.onDate1DMax(self.onDate1MSet() ? daysInMonth[self.onDate1MMax()] : 31); // valid for Dec 
                return false;
            }
            self.onDate1DValid(true);
            console.log('D4');
            self.onDate1DMin(dd);
            self.onDate1DMax(dd);
            return true;
        });
        self.onDate1Min = ko.computed(function(){
            return new Date(self.onDate1YMin(), self.onDate1MMin()-1, self.onDate1DMin());
        });
        self.onDate1Max = ko.computed(function(){
            return new Date(self.onDate1YMax(), self.onDate1MMax()-1, self.onDate1DMax(), 23, 59, 59, 999);
        });
        self.onDate1Valid = ko.computed(function(){ return self.onDate1YValid(); });

        self.onEarliestDate = ko.computed({
            read: function() {
                return self.onDate1Valid() ? self.onDate1Min().toString() : 'Invalid';
            }
        });
        self.onLatestDate = ko.computed({
            read: function() {
                return self.onDate1Valid() ? self.onDate1Max().toString() : 'Invalid';
            }
        });
        self.birthdate = ko.computed({
            read: function() {
                return self.onDate1YMin() - self.ageYears();
            }
        });
    };
    return my;
}(M$ || {}));

$(document).ready(function() {
    ko.applyBindings(new M$.viewModel());
    console.log('Hello!');
});