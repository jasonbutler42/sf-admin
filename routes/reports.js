var express = require('express'),
	router = express.Router(),
	mongoose = require('mongoose'),
	bodyParser = require('body-parser'),
	methodOverride = require('method-override');

router.use(bodyParser.urlencoded({extended: true}));

router.use(methodOverride(function(req, res) {
	if (req.body && typeof req.body === 'object' && '_method' in req.body) {
		var method = req.body._method
		delete req.body._method
		return method
	}
}))

router.route('/')
	// GET all reports
	.get(function(req,res,next) {
		// retrieve all reports from Mongo
		mongoose.model('Report').find({}, function (err, reports) {
			if (err) {
				return console.error(err);
			} else {
				// respond to HTML and JSON
				res.format({
					html: function() {
						res.render('reports/index', {
							title: 'All Reports',
							"reports" : reports
						});
					},
					json: function() {
						res.json(reports);
					}
				});
			}
		});
	})
	// POST a new report
	.post(function(req,res) {
		// Get values from POST request. Done through forms or REST; relies on "name" attribute for forms
		var name = req.body.name;
		var website = req.body.website;
		var location = req.body.location;
		var overallRating = req.body.overallRating;
		var industry = req.body.industry;
		var minimumInvestment = req.body.minimumInvestment;
		var offeringType = req.body.offeringType;
		var status = req.body.status;
		var fundingOn = req.body.fundingOn;
		var fundingURL = req.body.fundingURL;
		var twelveMonthSales = req.body.twelveMonthSales;
		var valuation = req.body.valuation;
		var seekingMin = req.body.seekingMin;
		var seekingMax = req.body.seekingMax;
		var stage = req.body.stage;
		var profile = req.body.profile;
		var teamRating = req.body.teamRating;
		var teamCEO = req.body.teamCEO;
		var teamExperience = req.body.teamExperience;
		var teamWork = req.body.teamWork;
		var teamGrid = req.body.teamGrid;
		var teamNotes = req.body.teamNotes;
		var industryRating = req.body.industryRating;
		var industryBarriers = req.body.industryBarriers;
		var industryGrowth = req.body.industryGrowth;
		var industryReach = req.body.industryReach;
		var industryGrid = req.body.industryGrid;
		var industryNotes = req.body.industryNotes;
		var competitionRating = req.body.competitionRating;
		var competitionLevel = req.body.competitionLevel;
		var competitionMarketshare = req.body.competitionMarketshare;
		var competitionFragmentation = req.body.competitionFragmentation;
		var competitionNotes = req.body.competitionNotes;
		var differentiationRating = req.body.differentiationRating;
		var differentiationProduct = req.body.differentiationProduct;
		var differentiationIP = req.body.differentiationIP;
		var differentiationPartnerships = req.body.differentiationPartnerships;
		var differentiationNotes = req.body.differentiationNotes;
		var financialsRating = req.body.financialsRating;
		var financialsStream = req.body.financialsStream;
		var financialsValuation = req.body.financialsValuation;
		var financialsGrowth = req.body.financialsGrowth;
		var financialsNotes = req.body.financialsNotes;
		var faq = req.body.faq;
		var summary = req.body.summary;
		// call the create function for mongo
		mongoose.model('Report').create({
			name : name,
			website : website,
			location : location,
			overallRating : overallRating,
			industry : industry,
			minimumInvestment : minimumInvestment,
			offeringType : offeringType,
			status : status,
			fundingOn : fundingOn,
			fundingURL : fundingURL,
			twelveMonthSales : twelveMonthSales,
			valuation : valuation,
			seekingMin : seekingMin,
			seekingMax : seekingMax,
			stage : stage,
			profile : profile,
			teamRating : teamRating,
			teamCEO : teamCEO,
			teamExperience : teamExperience,
			teamWork : teamWork,
			teamGrid : teamGrid,
			teamNotes : teamNotes,
			industryRating : industryRating,
			industryBarriers : industryBarriers,
			industryGrowth : industryGrowth,
			industryReach : industryReach,
			industryGrid : industryGrid,
			industryNotes : industryNotes,
			competitionRating : competitionRating,
			competitionLevel : competitionLevel,
			competitionMarketshare : competitionMarketshare,
			competitionFragmentation : competitionFragmentation,
			competitionNotes : competitionNotes,
			differentiationRating : differentiationRating,
			differentiationProduct : differentiationProduct,
			differentiationIP : differentiationIP,
			differentiationPartnerships : differentiationPartnerships,
			differentiationNotes : differentiationNotes,
			financialsRating : financialsRating,
			financialsStream : financialsStream,
			financialsValuation : financialsValuation,
			financialsGrowth : financialsGrowth,
			financialsNotes : financialsNotes,
			faq : faq,
			summary : summary
		}, function (err, report) {
			if (err) {
				res.send("Maaaan, I don't know WHAT happened... Something with the database, I guess...");
			} else {
				// Success and report is created
				console.log('POST creating new report: ' + report);
				res.format({
					html: function() {
						res.location("reports");
						res.redirect("/reports");
					},
					json: function() {
						res.json(report);
					}
				});
			}
		})
	});

// GET new report page
router.get('/new', function(req, res) {
	res.render('reports/new', {title: 'Create New Report'});
});

// route middleare to validate :id
router.param('id', function(req, res, next, id) {
    console.log('validating ' + id + ' exists');
    //find the ID in the Database
    mongoose.model('Report').findById(id, function (err, report) {
        //if it isn't found, we are going to repond with 404
        if (err) {
            console.log(id + ' was not found');
            res.status(404)
            var err = new Error('Not Found, bruh');
            err.status = 404;
            res.format({
                html: function(){
                    next(err);
                 },
                json: function(){
                       res.json({message : err.status  + ' ' + err});
                 }
            });
        //if it is found we continue on
        } else {
            //uncomment this next line if you want to see every JSON document response for every GET/PUT/DELETE call
            //console.log(report);
            // once validation is done save the new item in the req
            req.id = id;
            // go to the next thing
            next(); 
        } 
    });
});

router.route('/:id')
  .get(function(req, res) {
    mongoose.model('Report').findById(req.id, function (err, report) {
      if (err) {
        console.log('GET Error: There was a problem retrieving: ' + err);
      } else {
        console.log('GET Retrieving ID: ' + report._id);
        res.format({
          html: function(){
              res.render('reports/show', {
                "report" : report
              });
          },
          json: function(){
              res.json(report);
          }
        });
      }
    });
  });

  router.route('/:id/edit')
		//GET the individual report by Mongo ID
		.get(function(req, res) {
		    //search for the report within Mongo
		    mongoose.model('Report').findById(req.id, function (err, report) {
		        if (err) {
		            console.log('GET Error: There was a problem retrieving: ' + err);
		        } else {
		            //Return the report
		            console.log('GET Retrieving ID: ' + report._id);
		            res.format({
		                //HTML response will render the 'edit.jade' template
		                html: function(){
		                       res.render('reports/edit', {
		                          title: 'Report' + report._id,
		                          "report" : report
		                      });
		                 },
		                 //JSON response will return the JSON output
		                json: function(){
		                       res.json(report);
		                 }
		            });
		        }
		    });
		})
		//PUT to update a report by ID
		.put(function(req, res) {
		    // Get our REST or form values. These rely on the "name" attributesvar name = req.body.name;
			var name = req.body.name;
			var website = req.body.website;
			var location = req.body.location;
			var overallRating = req.body.overallRating;
			var industry = req.body.industry;
			var minimumInvestment = req.body.minimumInvestment;
			var offeringType = req.body.offeringType;
			var status = req.body.status;
			var fundingOn = req.body.fundingOn;
			var fundingURL = req.body.fundingURL;
			var twelveMonthSales = req.body.twelveMonthSales;
			var valuation = req.body.valuation;
			var seekingMin = req.body.seekingMin;
			var seekingMax = req.body.seekingMax;
			var stage = req.body.stage;
			var profile = req.body.profile;
			var teamRating = req.body.teamRating;
			var teamCEO = req.body.teamCEO;
			var teamExperience = req.body.teamExperience;
			var teamWork = req.body.teamWork;
			var teamGrid = req.body.teamGrid;
			var teamNotes = req.body.teamNotes;
			var industryRating = req.body.industryRating;
			var industryBarriers = req.body.industryBarriers;
			var industryGrowth = req.body.industryGrowth;
			var industryReach = req.body.industryReach;
			var industryGrid = req.body.industryGrid;
			var industryNotes = req.body.industryNotes;
			var competitionRating = req.body.competitionRating;
			var competitionLevel = req.body.competitionLevel;
			var competitionMarketshare = req.body.competitionMarketshare;
			var competitionFragmentation = req.body.competitionFragmentation;
			var competitionNotes = req.body.competitionNotes;
			var differentiationRating = req.body.differentiationRating;
			var differentiationProduct = req.body.differentiationProduct;
			var differentiationIP = req.body.differentiationIP;
			var differentiationPartnerships = req.body.differentiationPartnerships;
			var differentiationNotes = req.body.differentiationNotes;
			var financialsRating = req.body.financialsRating;
			var financialsStream = req.body.financialsStream;
			var financialsValuation = req.body.financialsValuation;
			var financialsGrowth = req.body.financialsGrowth;
			var financialsNotes = req.body.financialsNotes;
			var faq = req.body.faq;
			var summary = req.body.summary;

	    //find the document by ID
	    mongoose.model('Report').findById(req.id, function (err, report) {
	        //update it
	        report.update({
						name : name,
						website : website,
						location : location,
						overallRating : overallRating,
						industry : industry,
						minimumInvestment : minimumInvestment,
						offeringType : offeringType,
						status : status,
						fundingOn : fundingOn,
						fundingURL : fundingURL,
						twelveMonthSales : twelveMonthSales,
						valuation : valuation,
						seekingMin : seekingMin,
						seekingMax : seekingMax,
						stage : stage,
						profile : profile,
						teamRating : teamRating,
						teamCEO : teamCEO,
						teamExperience : teamExperience,
						teamWork : teamWork,
						teamGrid : teamGrid,
						teamNotes : teamNotes,
						industryRating : industryRating,
						industryBarriers : industryBarriers,
						industryGrowth : industryGrowth,
						industryReach : industryReach,
						industryGrid : industryGrid,
						industryNotes : industryNotes,
						competitionRating : competitionRating,
						competitionLevel : competitionLevel,
						competitionMarketshare : competitionMarketshare,
						competitionFragmentation : competitionFragmentation,
						competitionNotes : competitionNotes,
						differentiationRating : differentiationRating,
						differentiationProduct : differentiationProduct,
						differentiationIP : differentiationIP,
						differentiationPartnerships : differentiationPartnerships,
						differentiationNotes : differentiationNotes,
						financialsRating : financialsRating,
						financialsStream : financialsStream,
						financialsValuation : financialsValuation,
						financialsGrowth : financialsGrowth,
						financialsNotes : financialsNotes,
						faq : faq,
						summary : summary
	        }, function (err, reportID) {
	          if (err) {
	              res.send("There was a problem updating the information to the database: " + err);
	          } 
	          else {
	                  //HTML responds by going back to the page or you can be fancy and create a new view that shows a success page.
	                  res.format({
	                      html: function(){
	                           res.redirect("/reports/" + report._id + "/edit");
	                     },
	                     //JSON responds showing the updated values
	                    json: function(){
	                           res.json(report);
	                     }
	                  });
	           }
	        })
	    });
	})
	//DELETE a Report by ID
	.delete(function (req, res){
	    //find report by ID
	    mongoose.model('Report').findById(req.id, function (err, report) {
	        if (err) {
	            return console.error(err);
	        } else {
	            //remove it from Mongo
	            report.remove(function (err, report) {
	                if (err) {
	                    return console.error(err);
	                } else {
	                    //Returning success messages saying it was deleted
	                    console.log('DELETE removing ID: ' + report._id);
	                    res.format({
	                        //HTML returns us back to the main page, or you can create a success page
	                          html: function(){
	                               res.redirect("/reports");
	                         },
	                         //JSON returns the item with the message that is has been deleted
	                        json: function(){
	                               res.json({message : 'deleted',
	                                   item : report
	                               });
	                         }
	                      });
	                }
	            });
	        }
	    });
	});

module.exports = router;