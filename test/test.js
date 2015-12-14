/*jshint expr: true*/
'use strict';

// Set the NODE_ENV environment variable to testing
process.env.NODE_ENV = 'testing';

var assert = require('assert');
var app = require('../app.js');
var Browser = require('zombie');
var async = require('async');
var chai = require('chai');
var expect = chai.expect;
var _ = require('lodash');
var request = require('request');
var jsdom = require('jsdom');

var HOST;
var PORT;
var SITE;

var testedEventUrls = ['/events/0', '/events/1', '/events/2'];

function setSite (testBlock) {
  // Do this once to set up HOST, PORT, SITE correctly
  // so that we can run mocha programmatically and pass
  // in these parameters. This is ghetto hack by Jensen
  // so that we can grade student projects using this
  // same code. In the course code, we'll have to set
  // mocha.ctx, which is the `parent` here.
  HOST = testBlock.parent.ctx.HOST || process.env.HOST || 'localhost';
  if (testBlock.parent.ctx.PORT === '') {
    PORT = '';
  }else{
    PORT = testBlock.parent.ctx.PORT || 3005;
  };
  SITE = 'http://' + HOST + ':' + PORT;
}

describe('The site, on all pages',function(){

  // See note above. Ghetto hack.
  setSite(this);

  before(function(done){
    this.port = PORT;
    this.server = app.listen(this.port, done);
    var testedUrls = _.union(['/', '/about', '/events/new'], testedEventUrls);

    // Runs a `testFunc` against a `url`. `testFunc`
    // should take a zombie browser as its sole parameter. 
    var createPageTestFunction = function(testFunc) {
      return function(url, callback){
        var browser = new Browser({site: SITE});
        browser.visit(url, function(){
          if (!browser.success) {
            return callback(null, true);
          }
          // expect(browser.query('footer a[href="/about"]')).to.be.ok
          return callback(null, testFunc(browser)); 
        });        
      };
    };

    // `testFunc` should take the a URL
    this.testPages = function(testFunc, done){
      async.mapSeries(testedUrls, createPageTestFunction(testFunc), done);
    };

    this.queryIsOk = function(selector, message){
      return function(browser){
        assert.ok(browser.query(selector), message + ' on page at ' + browser.location.pathname);
      }
    };
  });

  it('should be using Boostrap CSS', function(done){
    this.testPages(this.queryIsOk('head link[href*="bootstrap"]', 'Expected Bootstrap CSS'), done);
  });

  after(function(done){
    this.server.close(done);
  });
});

describe('The home page',function(){
  before(function(done){
    this.port = PORT;
    this.browser = new Browser({site: SITE});
    this.server = app.listen(this.port, done);
  });

  before(function(done){
    this.browser.visit(SITE, done);
  });

  it('should be up and running', function(){
    assert.ok(this.browser.success, 'Home page not found at ' + this.browser.location.pathname);
  });

  after(function(done){
    this.server.close(done);
  });
});
