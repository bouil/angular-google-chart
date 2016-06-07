/* global angular */
/* eslint-env jasmine */
/*
 Due to the nature of this service,
 this is more of an E2E test than
 a unit test
*/
describe('googleChartApiPromise factory', function() {
    var googleChartApiPromise;

    beforeEach(module('googlechart'));

    describe('default configuration', function() {
        beforeEach(inject(function(_googleChartApiPromise_) {
            googleChartApiPromise = _googleChartApiPromise_;
        }));

        it('should return a promise', function() {
            expect(googleChartApiPromise).toBeDefined();
            expect(googleChartApiPromise.then).toBeFunction();
            expect(googleChartApiPromise.catch).toBeFunction();
            expect(googleChartApiPromise.finally).toBeFunction();
        });

        it('should load the google api', function(done) {

            googleChartApiPromise.then(function($google) {
                expect($google).toBeDefined();
                expect(google).toBe($google);
                done();
            }).catch(function() {
                /*
                The promise shouldn't fail to load, but if it does then
                we should end the test with a fail.
                */
                expect(true).toBe(false);
                done();
            });
        });
    });

    describe('gstatic configuration', function() {
        var config, chartApiPromise;
        beforeEach(inject(function(googleChartApiConfig) {
            config = googleChartApiConfig;
        }));

        it('should load google api with charts if gstatic config is set', function(done) {
            config.useNewLoader = true;

            injectChartApiPromise();

            verifyChartApiPromise(function($google) {
                expect($google.charts).toBeDefined();
            }, done);
        });

        function injectChartApiPromise() {
            inject(function(googleChartApiPromise) {
                chartApiPromise = googleChartApiPromise;
            });
        }

        function verifyChartApiPromise(googleFn, done) {
            chartApiPromise.then(function($google) {
                googleFn($google);
                done();
            }).catch(function(error) {
                console.log(error);
                expect(true).toBe(false);
                done();
            });
        }

        afterEach(function() {
            config.useNewLoader = false;
        });
    });
});
