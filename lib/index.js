"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports["default"] = function () {
    return {
        noColors: true,
        currentFixture: null,

        report: {
            passed: 0,
            total: 0,
            failedFixtures: []
        },

        reportTaskStart: function reportTaskStart(startTime, userAgents, testCount) {
            this.report.total = testCount;
        },

        reportFixtureStart: function reportFixtureStart(name, path) {
            this.currentFixture = { name: name, path: path, tests: [] };
            this.report.failedFixtures.push(this.currentFixture);
        },

        reportTestDone: function reportTestDone(name, testRunInfo) {
            var _this = this;

            var errs = testRunInfo.errs.map(function (err) {
                return _this.formatError(err);
            });

            if (errs.length > 0) {
                this.currentFixture.tests.push({
                    name: name,
                    errs: errs
                });
            }
        },

        reportTaskDone: function reportTaskDone(endTime, passed) {
            this.report.passed = passed;
            this.report.failedFixtures = this.report.failedFixtures.filter(function (_ref) {
                var tests = _ref.tests;
                return tests.length > 0;
            });

            this.write(JSON.stringify(this.report, null, 2));
        }
    };
};

module.exports = exports["default"];