/**
 * A model for Group 
 */
'use strict';

var mongoose = require('mongoose');


var groupModel = function () {

	var groupSchema = mongoose.Schema({
		user_id: Array,
		data: String,
		created_on: Date,
		created_by: String,
		modified_on: Date,
		modified_by: String
	});

	return mongoose.model('Group', groupSchema);
}

module.exports = new groupModel();