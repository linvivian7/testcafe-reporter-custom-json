export default function() {
  return {
    noColors: true,
    currentFixture: null,

    report: {
      passed: 0,
      total: 0,
      failedFixtures: []
    },

    reportTaskStart(startTime, userAgents, testCount) {
      this.report.startTime = startTime;
      this.report.total = testCount;
    },

    reportFixtureStart(name, path) {
      this.currentFixture = { name, path, tests: [] };
      this.report.failedFixtures.push(this.currentFixture);
    },

    reportTestDone(name, testRunInfo) {
      var errs = testRunInfo.errs.map(err => this.formatError(err));

      if (errs.length > 0) {
        this.currentFixture.tests.push({
          name
        });
      }
    },

    reportTaskDone(endTime, passed) {
      this.report.passed = passed;
      this.report.endTime = endTime;
      this.report.duration = (
        (endTime - this.report.startTime) /
        60000
      ).toFixed(2);
      this.report.failedFixtures = this.report.failedFixtures.filter(
        ({ tests }) => tests.length > 0
      );

      this.write(JSON.stringify(this.report, null, 2));
    }
  };
}
