var dao = require('../dao/index.js');
var async = require('async');

exports.login = function (req, res) {
	var uid = req.body.id;
	var upw = req.body.pw;


	async.waterfall([
		function (nextCallback) {
			dao.login(uid, upw, nextCallback);
		}
	], function (error, result) {
		if (error) {
			console.log(error);
		}
		else if(result.length == 0){	
			res.send('<script>alert("id or passwd is wrong");</script>');
		}	
		else{
			res.render("./main.html");
		}
});
}


exports.signup = function (req, res) {
	var uid = req.body.id;
	var upw = req.body.pw;
	var uemail = req.body.email;
	var unickname = req.body.nickname;

	dao.signup(uid, upw, uemail, unickname, function (error, result) {
		if (error) {
			console.log(error);
			res.json({
				RESULT: "0"
			});
		} else {
			res.json({
				RESULT: "1"
			})
		}
	});
};


exports.getUserProfile = function (req, res) {
	var uid = req.param('id');

	dao.getUserProfile(uid, function (result) {
		var count = 0;
		var list = [];

		res.json({

			memlist: list
		});

	});
};
