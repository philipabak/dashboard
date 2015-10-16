/**
 * A model for Chart 
 */
'use strict';

var mongoose = require('mongoose');


var chartModel = function () {

	var chartSchema = mongoose.Schema({
		group_id: String,
		file_id: String,
		title: String,
		data: Array,
		created_on: Date,
		created_by: String,
		modified_on: Date,
		modified_by: String
	});

	return mongoose.model('Chart', chartSchema);
}

module.exports = new chartModel();