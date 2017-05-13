var inquirer = require('inquirer');
var fee_structure = require('./fee-structure.json');

function fee_prompt(){
	var options = [];
	for(let key in fee_structure){
		if(fee_structure.hasOwnProperty(key)){
			options.push(key)
		}
	}

	inquirer.prompt([{
		type: 'list',
		message: 'Select fee-type',
		name: 'fee_type',
		choices: options
	}]).then(function(answers){
		nationality_prompt(fee_structure[answers.fee_type]);
	});
}

function nationality_prompt(nationalities) {
	var options = [];
	for(let key in nationalities){
		if(nationalities.hasOwnProperty(key)){
			options.push(key);
		}
	}

	inquirer.prompt([{
		type: 'list',
		message: 'Select nationality',
		name: 'nationality',
		choices: options
	}]).then(function(answers){
		courses_prompt(nationalities[answers.nationality]);
	});
}

function courses_prompt(courses){
	var set = new Set();
	var options = [];

	for(let key in courses){
		if(courses.hasOwnProperty(key)){
			if(key == 'ALL_COURSES'){
				set.add('Medical').add('Dental').add('Ayurveda');
			} else {
				set.add(key);
			}
		}
	}

	options = Array.from(set);
	inquirer.prompt([{
		type: 'list',
		message: 'Select course',
		name: 'course',
		choices: options
	}]).then(function(answers){
		if(courses.hasOwnProperty(answers.course)){
			level_prompt(courses[answers.course]);
		} else {
			level_prompt(courses['ALL_COURSES']);
		}
	});
}

function level_prompt(levels){
	var set = new Set();
	var options = [];

	for(let key in levels){
		if(levels.hasOwnProperty(key)){
			if(key == 'ALL_LEVEL'){
				set.add('UG').add('PG').add('DIPLOMA').add('Ph.d');
			} else {
				set.add(key);
			}
		}
	}

	options = Array.from(set);
	inquirer.prompt([{
		type: 'list',
		message: 'Select level',
		name: 'level',
		choices: options
	}]).then(function(answers){
		if(levels.hasOwnProperty(answers.level)){
			console.log("FINAL AMOUNT: " + levels[answers.level].amount);
		} else {
			console.log("FINAL AMOUNT: " + levels['ALL_LEVEL'].amount);
		}
	});
}

fee_prompt();