/**
 * Pizza delivery prompt example
 * run example by writing `node pizza.js` in your console
 */

'use strict';
var inquirer = require('inquirer');
//var Api1 = require('insane-openbazaar-api');
var rp = require('request-promise');




console.log('OpenBazaar 1 to 2 migrator');

var questions = [
  {
    type: 'input',
    name: 'openbazaar1address',
      message: 'What\'s the IP address/hostname of your openbazaar 1 server?',
      default: 'localhost'
  },
    {
	type: 'input',
	name: 'openbazaar1port',
	message: 'What\'s the PORT of your openbazaar 1 server?',
	default: 18469
    },
    {
	type: 'list',
	name: 'openbazaar1proto',
	message: "What protocol should I use to communicate with your openbazaar server?",
	choices: ['http', 'https'],
	default: 'https'
    },
    {
	type: 'input',
	name: 'openbazaar1apiversion',
	message: "What openbazaar api version should I use?",
	default: 'v1'
    },
  {
    type: 'list',
    name: 'destination',
    message: 'Where should we put your openbazaar1 listings?',
    choices: ['Local (backup only)', 'OpenBazaar2 Server (migration)'],
    filter: function (val) {
      return val.toLowerCase();
    }
  },
  {
      type: 'input',
      name: 'openbazaar2address',
      message: 'What\'s the IP address of your openbazaar 2 server?',
      when: function (answers) {
	  return answers.destination === 'openbazaar2 server (migration)';
      },
      default: 'localhost'
  }
];




inquirer.prompt(questions).then(function (answers) {
    console.log('\nOrder receipt:');
    console.log(JSON.stringify(answers, null, '  '));


    var request_options = {
	uri: {
	    protocol: answers.openbazaar1proto + ':',
	    hostname: answers.openbazaar1address,
	    pathname: '/api/' + answers.openbazaar1apiversion + '/' + 'get_listings',
	    port: answers.openbazaar1port,
	},
	headers: {
	    'User-Agent': 'OpenBazaar2 Migrator (https://github.com/insanity54/openbazaar2-migrator)'
	},
	json: false,
	rejectUnauthorized: false
    };
    
    return rp
	.get(request_options)
	.then(function($) {
	    console.log($)
	});
}).then(function(idk) {

    console.log('i d k');
    console.log(idk);
}).catch(function(err) {
    console.log(err);
});
