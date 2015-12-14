## This is a draft for a website for the Yale School of Management 2016 Private Equity and Venture Capital Symposium

The application is based off a template created by Technext Limited and runs an express.js web framework for Node.js aplication.
Nunjucks is available but not used. 

## What we're using

This application relies on a number of open source projects.
Obviously, it is a [node.js](http://nodejs.org/) application.
We are using the following components, which are built for node
applications and written by people that have made them open 
source.

* [express.js](http://expressjs.com/): Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.
* [nunjucks](http://mozilla.github.io/nunjucks/): A templating language for JavaScript. This allows us to say there is a certain default page and every other page should like just like it, maybe changing just small parts.
* [morgan](https://github.com/expressjs/morgan): HTTP request logger middleware for node.js, written by the people who write Express. This allows us to print pretty logging statements while the application is handling requests.
* [validator](https://github.com/chriso/validator.js): A library of string validators and sanitizers. This helps us ensure that parameters sent to our application by users are valid.
* [body-parser](https://github.com/expressjs/body-parser): Node.js body parsing middleware by the people who write Express.