
var db = {};

db._dbpath = '../assets/det2feel.json';

db._data = undefined;

db._load = function () {
  	if (!db._data) {
  		db._data = require(db._dbpath);
  	}
}

db._save = function () {
  fs.writeFileSync(db._dbpath, JSON.stringify(db._data));
}

db.init = function () {
  db._load();
}

db.getFeelingList = function () {
  return db._data.feelings;
}

db.getDetectionList = function () {
  var detectionList = [];
  
  for (var detection in db._data.detections) {
    if (db._data.detections.hasOwnProperty(detection)) {
      detectionList.push(detection);
    }
  }

  return detectionList;
}

db.getIncompleteDetectionList = function () {
  var detectionList = [];
  
  for (var detection in db._data.detections) {
    if (db._data.detections.hasOwnProperty(detection)) {
      for (var i=0; i<db._data.feelings.length; ++i) {
        var feeling = db._data.feelings[i];
        if (!db._data.detections[detection].hasOwnProperty(feeling)) {
          detectionList.push(detection);
          break;
        }
      }
    }
  }

  return detectionList;
}

db.getFeelingValues = function (detection) {
  return db._data.detections[detection];
}

db.getIncompleteFeelingList = function (detection) {
  var feelingList = [];

  for (var i=0; i<db._data.feelings.length; ++i) {
    var feeling = db._data.feelings[i];
    if (!db._data.detections[detection].hasOwnProperty(feeling)) {
      feelingList.push(feeling);
    }
  }

  return feelingList;
}

db.updateFeelingValue = function (detection, feeling, val) {
  db._data.detections[detection][feeling] = val;
  var sum = 0;
  db._save();
  return db.getFeelingValues(detection);
}


class D2F {
	testDetections (detectionList) {
		db.init();

	  	var feelingValues = {};
	  	var feelingList = db.getFeelingList();
	  	for (var i=0; i<feelingList.length; ++i) {
	    	var feeling = feelingList[i];
	    	feelingValues[feeling] = 0;
	    	for (var j=0; j<detectionList.length; ++j) {
	      		var detection = detectionList[j];
	      		feelingValues[feeling] += db.getFeelingValues(detection)[feeling];
	    	}
	  	}
	  	return feelingValues;
	}


	getPetFeelingKeyword (detectionList, petFeelings=null) {
		if (petFeelings === null) {
			petFeelings = {
				"depraved": 0,
				"fresh": 4,
				"people": 0,
				"animal": 5,
				"city": 2,
				"countryside": 5
			};
		}

		var feelingValues = D2F.testDetections(detectionList);

		// normalization and difference
		var feelingList = db.getFeelingList();
		var sum_pet = 0;
		var sum_feel = 0;
		var diff = 0;
		for (var i=0; i<feelingList.length; ++i) {
			var feeling = feelingList[i];
			sum_pet += petFeelings[feeling];
			sum_feel += feelingValues[feeling];
		}
		for (var i=0; i<feelingList.length; ++i) {
			var feeling = feelingList[i];
			petFeelings[feeling] = petFeelings[feeling] / sum_pet;
			feelingValues[feeling] = feelingValues[feeling] / sum_feel;
			diff += Math.abs(petFeelings[feeling] - feelingValues[feeling]);
		}
		
		// output feeling keywords
		var keyword = 'boring';
		if (diff < 0.35) {
			keyword = 'nice';
		} else if (diff < 0.55) {
			keyword = 'like';
		} else if (diff < 0.7) {
			keyword = 'boring';
		} else if (diff < 0.85) {
			keyword = 'bad';
		} else {
			keyword = 'sucks';
		}

		return keyword;
	}

}


