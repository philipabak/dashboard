/**
 * A model for Dashboard 
 */
'use strict';

var mongoose = require('mongoose');


var dashboardModel = function () {

	var dashboardSchema = mongoose.Schema({
		group_id: String,
		chart_id: Array,
		title: String,
		data: Array,
		created_on: Date,
		created_by: String,
		modified_on: Date,
		modified_by: String
	});

	return mongoose.model('Dashboard', dashboardSchema);
}

module.exports = new dashboardModel();