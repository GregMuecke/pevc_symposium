'use strict';

/**
 * Controller that renders our index (home) page.
 */

function index (request, response) {
  var curDateTime = new Date();
  var contextData = {
    'title': 'MGT 656',
    'tagline': 'You are doomed (just kidding).',
    'events': []
  };
  response.render('index.html', contextData);
}

module.exports = {
  index: index
};
