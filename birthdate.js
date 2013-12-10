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
    var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
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
        self.showModel = ko.observable(false);
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
            var a = new Date(Date.UTC(self.onDate1YMin(), self.onDate1MMin() - 1, self.onDate1DMin()));
//            console.log('sod1m:', self.onDate1YMin(), self.onDate1MMin() - 1, self.onDate1DMin(), a.toUTCString());
            return a;
        });
        self.onDate1Max = ko.computed(function() {
            return new Date(Date.UTC(self.onDate1YMax(), self.onDate1MMax() - 1, self.onDate1DMax(), 23, 59, 59, 999));
        });
        self.onDate1DayMin = ko.computed(function() {
            return dayFromDate(self.onDate1Min());
        });
        self.onDate1DayMax = ko.computed(function() {
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
        function setVars(d) { // put some simple variables Math.flooro a date object so we can change them easily without date trying to second-guess us
            d.y = d.getUTCFullYear();
            d.m = d.getUTCMonth();
            d.w = 0; // there isn't a week function :-)
            d.d = d.getUTCDate();
        }
        // compute an object that gives the calendar distance in time between early date ed and later date ld.
        // The result is given in terms of {y, m, w, d}
        // but the unts can be specified by units {y, m, w, d}
        // the options being {d} {w d}, {m w d} {y m w d} {y d} {y w d} {m d} {y m d} - actually, anything as long as it includes d!
        // calendarDistance between 2003-2-28 and 2004-3-29 is {1, 1, 0, 1}
        function calendarDistance(ed, ld, units2) {
            var units = {y: ko.unwrap(units2.y), m: ko.unwrap(units2.m), w: ko.unwrap(units2.w), d: ko.unwrap(units2.d)};
            ed.setUTCHours(0, 0, 0, 0); // make sure ed is at midnight of this day, whatever the time in the date is, UTC
            ld.setUTCHours(0, 0, 0, 0); // make sure ld is at midnight, ditto
            ld.setUTCHours(5); // move ld forward to 1am to avoid any issue with leap seconds
            setVars(ed);
            setVars(ld);
            var dy = 0;
            var dm = 0;
            var dw = 0;
            var dd = 0;
            
            var ad = null;
            var bd = null;
            var cd = null;
            var fd = null;
            var gd = null;

            if (units.y) { // want year readout
                dy = ld.y - ed.y;
                ed.y = ld.y; // so the date represented by ed.{ymwd) may not be real now
            }
            if (units.m) { // want month readout
                if (units.y) {
                    dm = ld.m - ed.m;
                    if (dm < 0) { // say, ed is 2003/11 and ld is 2004/3
                        dm += 12;
                        dy--;
                    }
                } else { // no units.y, need 18 months
                    dm = ld.m - ed.m + (ld.y - ed.y) * 12;
                }
            }
            if (units.d) {
                if (units.m) {
                    dd = ld.d - ed.d;
                    if (dd < 0) { // say, ld is 2004-3-13 and ed is 2004-2-22
                        // Done like this because we naturally work back from later date, then move forward a month, then count back in days.
                        ad = new Date(ed);
                        ad.setUTCDate(1); // ad is 00:00 on the day the month started
                        bd = new Date(ad);
                        bd = new Date(bd.setUTCMonth(bd.getUTCMonth() + 1)); // 00:00 on the day the next month starts
                        bd = new Date(bd.setUTCHours(5)); // 1am to avoid any leap second issue
                        var daysInMonth = Math.floor((bd.getTime() - ad.getTime()) / 86400000);
                        dd += daysInMonth;
                        dm--;
                        if (dm < 0) {
                            dm += 12;
                            dy--;
                        }
                    } else {
                    }
                } else if (units.y) {
                    cd = new Date(Date.UTC(ed.getUTCFullYear(), ld.getUTCMonth(), ld.getUTCDate(), 5, 0, 0)); // adjusts date if needed, 2003-2-29 becomes 2003-3-1
                    
                    dd = Math.floor((cd.getTime() - ed.getTime()) / 86400000);
                    // the above computation applies if ed is 2003-2-28 and ld is 2004-2-29.
                    // the adjusted date ad is 2003-3-1
                    // and subtracting ed from that gives dd=1, which is correct.
                    
                    // if ed is 2003-2-28 and ld is 2004-3-1, we also get dd=1, which is also correct!
                    
                    // But, if ed=2003-3-1 and ld=2004-2-29, we get dy = 1, dd=0, which is wrong.
                    // That's why there is a specific check for that one condition in this next clause.
                    // And here also, I have to adjust dd to account for the extra day that isn't otherwise counted.
                    if ((dd < 0) || ((dd==0)&&((ld.getUTCMonth()==1)&& (ld.getUTCDate()==29) && (cd.getUTCDate() != 29)))) {
                        dy--;
                        fd = new Date(Date.UTC(ed.getUTCFullYear() + 1, ld.getUTCMonth(), ld.getUTCDate(), 0, 5, 0, 0)); // adjusts date if needed, 2003-2-29 becomes 2003-3-1
                        
                        dd = Math.floor((fd.getTime() - ed.getTime()) / 86400000);
                        if ((ld.getUTCMonth()==1)&& (ld.getUTCDate()==29) && (fd.getUTCDate() != 29))
                        dd--;
                    
                    }
                } else {
                    dd = Math.floor((ld.getTime() - ed.getTime()) / 86400000);
                }

            }
            if (units.w) { // just convert the day difference to weeks and days
                dw = Math.floor(dd / 7);
                dd = dd - dw * 7;
            }

            var result = {y: dy, m: dm, w: dw, d: dd};
            var units1 = ''+(units.y?'y':'-')+(units.m?'m':'-')+(units.w?'w':'-')+(units.d?'d':'-');
            var result1 = ''+result.y+'-'+result.m+'-'+result.w+'-'+result.d;
            console.log ('calendarDistance:', result1, ed.toUTCString(), ld.toUTCString(), units1, ad,bd,cd,fd,gd);
            return result;
        }

        function isPositiveInteger(s) {
            if (s == '')
                return false;
            var t = s.replace(/[0-9]/g, ''); // delete all digits
            if (t != '')
                return false;
            return true;
        }
        function EUnits(name) {
            var model = this;
            model.name = name;
            model.y = ko.observable(false);
            model.m = ko.observable(false);
            model.w = ko.observable(false);
            model.d = ko.observable(true);
        }
        function EDiff(name, ed, ld, units) {
            var model = this;
            model.name = name;
            model.d = ko.computed(function() {
                var a = calendarDistance(ed.date2(), ld.date2(), units);
//                console.log("EDiff1: ", units.y(), units.m(), units.w(), units.d());
//                console.log("EDiff2: ", a.y, a.m, a.w, a.d);
                return a;
            });
        }
        function EDate(name) {
            var model = this;
            model.name = name;
            model.y = ko.observable('');
            model.m = ko.observable('');
            model.d = ko.observable('');
            model.date2 = ko.observable(new Date());
            model.problems = ko.observable();
            model.valid = ko.computed(function() {
                model.problems('');
                if (!isPositiveInteger(model.y()) || !isPositiveInteger(model.m()) || !isPositiveInteger(model.d())) {
                    model.problems('integer');
                    return false;
                }
                if (model.y() <= 1752) { // Julian calendar, cannot cope!
                    model.problems('julian');
                    return false;
                }
                if ((model.m() < 1) || (model.m() > 12)) {
                    model.problems('month');
                    return false;
                }
                if ((model.d() < 1) || (model.d() > 31)) {
                    model.problems('day');
                    return false;
                }
                var ay = model.y();
                var am = model.m() - 1;
                var adate = model.d();
                var adu = Date.UTC(ay, am, adate, 0, 0, 0, 0);
                var ad = new Date(adu); // is that UTC?
//                console.log("EDate2:", ay, am, adate, adu, ad, ad.getUTCMonth(), ad.toUTCString());
                model.date2(ad);
//                console.log("EDate3:", ad.toUTCString());
                if (ad.getUTCFullYear() != model.y()) {
                    model.problems('y ' + ad.toUTCString());
                    return false;
                }
                if (ad.getUTCMonth() != (model.m() - 1)) {
                    model.problems('m ' + ad.toUTCString());//+ ' ad.getUTCMonth:'+ad.getUTCMonth()+' (model.m() - 1):'+(model.m() - 1));
                    return false;
                }
                if (ad.getUTCDate() != model.d()) {
                    model.problems('d ' + ad.toUTCString());
                    return false;
                }
                return true;
            });
        }
        self.units = new EUnits('Units');
        self.dates = ko.observableArray();
        self.dates.push(new EDate('earlier'));
        self.dates.push(new EDate('later'));
        self.diff = new EDiff('Difference', self.dates()[0], self.dates()[1], self.units);
        self.earliestBirthdateImpossible = ko.observable(false);
        self.earliestBirthDate = ko.computed({
            read: function() {
                // This has proved exceptionally confusing and tricky.
                // Every straightforward approach so far has failed.
                // I have to make a fair guess at the date, then grope my way towards it a day at a time.
                var d = new Date(self.onDate1Min());
//                console.log('sebd:', 'min:'+self.onDate1Min().toUTCString());
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

                var units = {y: self.ageYSet(), m: self.ageMSet(), w: self.ageWSet(), d: true}; // can only ever have d true
                d = new Date(d.setDate(d.getDate() + 10)); // definitely forward of the actual date.
                if (d.getTime() > self.onDate1Min().getTime()) // have birth later than earliest, cannot happen!
                    d = new Date(self.onDate1Min());
                // compare diff with required age
                var earliestAcceptableDate = null;
                var e = new Date(d);
                if (!self.ageYSet() && !self.ageMSet() && !self.ageWSet() && !self.ageDSet())
                    return e;
                for (; ; ) {
                    var diff = calendarDistance(d, self.onDate1Min(), units); // distance in required units, with mandatory days
                    console.log('diff:', (self.ageYSet()?diff.y:' ')+','+(self.ageMSet()?diff.m:' ')+','+(self.ageWSet()?diff.w:' ')+','+diff.d, self.onDate1Min().toUTCString());
                    var moveBack = false;
                    var overshot = false;
                    if ((self.ageYSet()) && (diff.y < self.ageY())) { // years difference is too small, move birthdate backwards
                        moveBack = true;
                    } else if ((self.ageYSet()) && (diff.y > self.ageY())) { // years difference is too large, we have overshot
                        overshot = true;
                    } else  // years, either way, are acceptable
                    if ((self.ageMSet()) && (diff.m < self.ageM())) { // month difference is too small, move birthdate backwards
                        moveBack = true;
                    } else if ((self.ageMSet()) && (diff.m > self.ageM())) { // month difference is too large
                        overshot = true;
                    } else if ((self.ageWSet()) && (diff.w < self.ageW())) { // week difference is too small, move birthdate backwards
                        moveBack = true;
                    } else if ((self.ageWSet()) && (diff.w > self.ageW())) { // week difference is too large
                        overshot = true;
                    } else if ((self.ageDSet()) && (diff.d < self.ageD())) { // day difference is too small, move birthdate backwards
                        moveBack = true;
                    } else if ((self.ageDSet()) && (diff.d > self.ageD())) { // day difference is too large
                        overshot = true;
                    }
                    if (!moveBack && !overshot) {
                        earliestAcceptableDate = new Date(d);
                        console.log('acceptable:', d.toUTCString(), 'min1:'+self.onDate1Min().toUTCString());
                    }
                    if (overshot) {
                        console.log('overshot:', d.toUTCString(), 'min2:'+self.onDate1Min().toUTCString());
                        break;
                    }
                    d = new Date(d.setDate(d.getDate() - 1));
                    console.log('moving back to ', d.toUTCString(), 'min3:'+self.onDate1Min().toUTCString());
                }
                self.earliestBirthdateImpossible(!earliestAcceptableDate);
                if (self.earliestBirthdateImpossible())
                    return e;
                console.log('earliestAcceptableDate', earliestAcceptableDate.toUTCString());
                return earliestAcceptableDate;
            }
        });
        
        // For latest birthdate, try same approach as earliest
        // compute a date somewhere in the region.
        // Move back 10 days to be sure we're beofre the latest date
        // Move forward one day at a time and pick the latest acceptable date
        self.latestBirthdateImpossible = ko.observable(false);
        self.latestBirthDate = ko.computed({
            read: function() {
                // do it this way round so that we know whether the day-of-month exists in the month
                // that we're trying to set, when we set the month.
                var d = new Date(self.onDate1Max());
                if (self.ageDSet())
                    d = new Date(d.setUTCDate(d.getUTCDate() - self.ageD()));
                if (self.ageWSet())
                    d = new Date(d.setUTCDate(d.getUTCDate() - self.ageW() * 7));
                if (self.ageYSet()) // have to do this before month is set or leap year fails
                    d = new Date(d.setUTCFullYear(d.getUTCFullYear() - self.ageY()));
                if (self.ageMSet()) {
                    d = new Date(d.setUTCMonth(d.getUTCMonth() -self.ageM()));
                }
                // d is now an approximation to the latest birthdate.
                d = new Date(d.setUTCDate(d.getUTCDate() - 10)); // move back 10 days so we are before latest birthdate
                var units = {y: self.ageYSet(), m: self.ageMSet(), w: self.ageWSet(), d: true};
                
                var latestAcceptableDate = null;
                if (!self.ageYSet() && !self.ageMSet() && !self.ageWSet() && !self.ageDSet())
                    return new Date(self.onDate1Max());

                for (; ; ) {
                    var diff = calendarDistance(d, self.onDate1Max(), units); // distance in required units, with mandatory days
                    console.log('diff:', (self.ageYSet()?diff.y:' ')+','+(self.ageMSet()?diff.m:' ')+','+(self.ageWSet()?diff.w:' ')+','+diff.d, self.onDate1Max().toUTCString());
                    var moveForward = false;
                    var overshot = false;
                    
                    if ((self.ageYSet()) && (diff.y > self.ageY())) { // years difference is too large, move birthdate forwards
                        moveForward = true;
                    } else if ((self.ageYSet()) && (diff.y < self.ageY())) { // years difference is too small, we have overshot
                        overshot = true;
                    } else  // years, either way, are acceptable
                    if ((self.ageMSet()) && (diff.m > self.ageM())) { // month difference is too large, move birthdate forwards
                        moveForward = true;
                    } else if ((self.ageMSet()) && (diff.m < self.ageM())) { // month difference is too small
                        overshot = true;
                    } else if ((self.ageWSet()) && (diff.w > self.ageW())) { // week difference is too large, move birthdate forwards
                        moveForward = true;
                    } else if ((self.ageWSet()) && (diff.w < self.ageW())) { // week difference is too small
                        overshot = true;
                    } else if ((self.ageDSet()) && (diff.d > self.ageD())) { // day difference is too large, move birthdate forwards
                        moveForward = true;
                    } else if ((self.ageDSet()) && (diff.d < self.ageD())) { // day difference is too small
                        overshot = true;
                    }
                    
                    if (!moveForward && !overshot) {
                        latestAcceptableDate = new Date(d);
                        console.log('acceptable:', d.toUTCString(), 'max1:'+self.onDate1Max().toUTCString());
                    }
                    if (overshot) {
                        console.log('overshot:', d.toUTCString(), 'max2:'+self.onDate1Max().toUTCString());
                        break;
                    }
                    d = new Date(d.setUTCDate(d.getUTCDate() + 1));
                    console.log('moving forward to ', d.toUTCString(), 'max3:'+self.onDate1Max().toUTCString());
                }
                
                self.latestBirthdateImpossible(!latestAcceptableDate);
                if (self.latestBirthdateImpossible())
                    return new Date(self.onDate1Max());
                console.log('latestAcceptableDate', latestAcceptableDate.toUTCString());
                return latestAcceptableDate;
            }
        });
        self.birthdateInvalid = ko.computed(function() {
            return !self.onDate1Valid() || (self.latestBirthDate().getTime() < self.earliestBirthDate().getTime());
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