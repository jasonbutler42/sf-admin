var mongoose = require('mongoose');
var reportSchema = new mongoose.Schema({
	name: String,
	website: String,
	location: String,
	overallRating: Number,
	industry: String,
	minimumInvestment: String,
	offeringType: String,
	status: String,
	fundingOn: String,
	fundingURL: String,
	twelveMonthSales: String,
	valuation: String,
	seekingMin: String,
	seekingMax: String,
	stage: String,
	profile: String,
	teamRating: Number,
	teamCEO: Boolean,
	teamExperience: Boolean,
	teamWork: Boolean,
	teamGrid: String,
	teamNotes: String,
	industryRating: Number,
	industryBarriers: Boolean,
	industryGrowth: Boolean,
	industryReach: Boolean,
	industryGrid: String,
	industryNotes: String,
	competitionRating: Number,
	competitionLevel: Boolean,
	competitionMarketshare: Boolean,
	competitionFragmentation: Boolean,
	competitionNotes: String,
	differentiationRating: Number,
	differentiationProduct: Boolean,
	differentiationIP: Boolean,
	differentiationPartnerships: Boolean,
	differentiationNotes: String,
	financialsRating: Number,
	financialsStream: Boolean,
	financialsValuation: Boolean,
	financialsGrowth: Boolean,
	financialsNotes: String,
	faq: String,
	summary: String
});
mongoose.model('Report', reportSchema);