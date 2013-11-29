// Age and Birthdate
// Hold old are you?
// "I'm four!"
// That means that the age could be anything from 4 years and 0ms to 5years minus 1ms.
// "She's 10 weeks now." That means 10 weeks and 0ms to 11 weeks less 1ms.
// "He's 3 weeks and 2 days" means 23 days and 0ms to 24 days less 1ms.
// if the days are specified, as well as months or years, it is possible to have an impossible birthdate.
// If someone is one month and 1 day old on march 31, when were they born?
// one month and one day before March 31 is Feb 30, which never exists. If they were born on Feb 28, they are 1 month and 3 days old.
// If they were born on March 1, they are 30 days old.
// They cannot be 1 month and 1 day old.
// If someone is 1 year 0 days old on feb 29 2004, they must have been born feb 29 2003, which is impossible.

var jQuery;
var $ = (function(my) {
    return my;
}(jQuery || {}));
var ko = (function(my) {
    return my;
}(ko || {}));

function dayFromDate(when, chars) {
            if (typeof chars == 'undefined')
                chars = 3;
            var days= ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
            return days[when.getDay()].substr(0, chars);
        }
        
var M$ = (function(my) {

    my.viewModel = function() {
        var self = this;
        var onDateText = '1999';
        function isLeapYear(y) {
            if ((y % 4) !== 0)
                return false;
            if (y === 2000)
                return true;
            if ((y % 100) === 0)
                return false;
            return true;
        }
        self.ageYears = ko.observable();
        self.ageMonths = ko.observable();
        self.ageWeeks = ko.observable();
        self.ageDays = ko.observable();
        self.ageY = ko.observable();
        self.ageYValid = ko.observable();
        self.ageYSet = ko.computed(function() {
            var trimmed2 = ('' + self.ageYears()).trim();
            var trimmed = trimmed2.replace(/[^0-9]/g, '');
            if ((trimmed === '') || (trimmed !== trimmed2)) {
                self.ageY(0);
                self.ageYValid(true);
                return false;
            } else {
                var y = Math.floor(trimmed);
                if (y > 130) {
                    self.ageY(y);
                    self.ageYValid(false);
                    return false;
                } else {
                    self.ageY(y);
                    self.ageYValid(true);
                    return true;
                }
            }
        });
        self.ageM = ko.observable();
        self.ageMValid = ko.observable();
        self.ageMSet = ko.computed(function() {
            var trimmed2 = ('' + self.ageMonths()).trim();
            var trimmed = trimmed2.replace(/[^0-9]/g, '');
            if ((trimmed === '') || (trimmed !== trimmed2)) {
                self.ageM(0);
                self.ageMValid(true);
                return false;
            } else {
                var y = Math.floor(trimmed);
                if (self.ageY() === 0) {
                    if (y > 60) {
                        self.ageM(0);
                        self.ageMValid(false);
                        return false;
                    }
                } else {
                    if (y > 11) {
                        self.ageM(0);
                        self.ageMValid(false);
                        return false;
                    }
                }
                self.ageM(y);
                self.ageMValid(true);
                return true;
            }
        });
        self.ageW = ko.observable();
        self.ageWValid = ko.observable();
        self.ageWSet = ko.computed(function() {
            var trimmed2 = ('' + self.ageWeeks()).trim();
            var trimmed = trimmed2.replace(/[^0-9]/g, '');
            if ((trimmed === '') || (trimmed !== trimmed2)) {
                self.ageW(0);
                self.ageWValid(true);
                return false;
            } else {
                var y = Math.floor(trimmed);
                if (self.ageM() !== 0)
                    if (y > 4) {
                        self.ageW(0);
                        self.ageWValid(false);
                        return false;
                    }
                if (self.ageY() !== 0)
                    if (y > 51) {
                        self.ageW(0);
                        self.ageWValid(false);
                        return false;
                    }
                if (y > 156) {
                    self.ageW(0);
                    self.ageWValid(false);
                    return false;
                }
                self.ageW(y);
                self.ageMValid(true);
                return true;
            }
        });
        self.ageD = ko.observable();
        self.ageDValid = ko.observable();
        self.ageDSet = ko.computed(function() {
            var trimmed2 = ('' + self.ageDays()).trim();
            var trimmed = trimmed2.replace(/[^0-9]/g, '');
            if ((trimmed === '') || (trimmed !== trimmed2)) {
                self.ageD(0);
                self.ageDValid(true);
                return false;
            } else {
                var y = Math.floor(trimmed);
                if ((self.ageW() !== 0) && (y > 6)) {
                    self.ageD(0);
                    self.ageDValid(false);
                    return false;
                }
                if ((self.ageM() !== 0) && (y > 31)) {
                    self.ageD(0);
                    self.ageDValid(false);
                    return false;
                }
                if (self.ageD() > 366) {
                    self.ageD(0);
                    self.ageDValid(false);
                    return false;
                }
                self.ageD(y);
                self.ageDValid(true);
                return true;
            }
        });
        self.ageValid = ko.computed(function() {
            return self.ageYValid() && self.ageMValid() && self.ageWValid() && self.ageDValid();
        });
        self.ageSet = ko.computed(function() {
            return self.ageValid() && (self.ageYSet() || self.ageMSet() || self.ageWSet() || self.ageDSet());
        });


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
                console.log('year2: ' + y);
                if ((y > 2100) || (y <= 1752)) {
                    self.onDate1YMin(1752);
                    self.onDate1YMax(2100);
                    return false;
                } else {
                    self.onDate1YMin(y);
                    self.onDate1YMax(y);
                    console.log('year: ' + y);
                    return true;
                }
            }
        });
        self.onDate1YValid = ko.computed(function() {
            return self.onDate1YSet();
        });
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
        
        self.onDate1Min = ko.computed(function() {
            return new Date(self.onDate1YMin(), self.onDate1MMin() - 1, self.onDate1DMin());
        });
        self.onDate1Max = ko.computed(function() {
            return new Date(self.onDate1YMax(), self.onDate1MMax() - 1, self.onDate1DMax(), 23, 59, 59, 999);
        });
        self.onDate1DayMin = ko.computed(function(){
            return dayFromDate(self.onDate1Min());
        });
        self.onDate1DayMax = ko.computed(function(){
            return dayFromDate(self.onDate1Max());
        });
        self.onDate1Valid = ko.computed(function() {
            return self.onDate1YValid();
        });

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
        self.earliestBirthDate = ko.computed({
            read: function() {
                // do it this way round so that we know whether the day-of-month exists in the month
                // that we're trying to set, when we set the month.
                var d = new Date(self.onDate1Min());
                if (self.ageDSet())
                    d = new Date(d.setDate(d.getDate() - self.ageD() - 1));
                offset = (self.ageDSet()) ? 0 : 1;
                if (self.ageWSet())
                    d = new Date(d.setDate(d.getDate() - (self.ageW() + offset) * 7));
                offset = (self.ageWSet() || self.ageDSet()) ? 0 : 1;
                if (self.ageMSet())
                    d = new Date(d.setMonth(d.getMonth() - self.ageM() - offset));
                var offset = (self.ageMSet() || self.ageWSet() || self.ageDSet()) ? 0 : 1;
                if (self.ageYSet())
                    d = new Date(d.setFullYear(d.getFullYear() - self.ageY() - offset));
                if (self.ageSet())
                    d = new Date(d.setDate(d.getDate() + 1));
                return d;
            }
        });
        self.latestBirthDate = ko.computed({
            read: function() {
                // do it this way round so that we know whether the day-of-month exists in the month
                // that we're trying to set, when we set the month.
                var d = new Date(self.onDate1Max());
                if (self.ageDSet())
                    d = new Date(d.setDate(d.getDate() - self.ageD()));
                if (self.ageWSet())
                    d = new Date(d.setDate(d.getDate() - self.ageW() * 7));
                if (self.ageYSet()) // have to do this before month is set or leap year fails
                    d = new Date(d.setFullYear(d.getFullYear() - self.ageY()));
                if (self.ageMSet()) {
                    // This copes with strange javascript setMonth
                    // If the date is Jul 31 and I set the month to Jun
                    // the the date comes out Jul 1 instead of Jun 30
                    // which is not what we want for birthdays
                    var monthSoFar = d.getMonth(); // 0..11
                    var targetMonth = (monthSoFar + 72 - self.ageM()) % 12; // max months is 60, this is always +ve
                    // how to compute days in month when do not know year?
                    // make an approximation to find the year first, then do it properly
                    var daysInMonths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]; // jan is month 0
                    var e = new Date(d);
                    console.log("e: "+e);
                    e = new Date(e.setMonth(e.getMonth() - self.ageM()));
                    console.log('target year'+e.getFullYear());
                    if (isLeapYear(e.getFullYear()))
                        daysInMonths[1] = 29; // february
                    // do it properly
                    var daysInTargetMonth = daysInMonths[targetMonth];
                    if (d.getDate() > daysInTargetMonth) {
                        d.setDate(daysInTargetMonth);
                        console.log("Setting date to "+daysInTargetMonth);
                    }
                    console.log('Setting month to'+(d.getMonth() - self.ageM())+': '+d.getMonth()+': '+self.ageM());
                    d = new Date(d.setMonth(d.getMonth() - self.ageM()));
                    console.log('date d is now'+d);
                }
                return d;
            }
        });
        self.earliestBirthDateString = ko.computed({
            read: function() {
                return self.earliestBirthDate();
            }
        });
        self.latestBirthDateString = ko.computed({
            read: function() {
                return self.latestBirthDate().toString();
            }
        });
    };
    return my;
}(M$ || {}));

$(document).ready(function() {
    ko.applyBindings(new M$.viewModel());
    console.log('Hello!');
});