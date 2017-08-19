fs = require('fs')

var count = 0;
var dict1 = {};
var dict2 = {};
var file3 = "";
/*This is tthe method that will be exported
file1 and file2 are the input files
file3 is the file you wish to write to
the method asynchronously reads a file*/
function compareFile(file1, file2, results) {
	file3= results;
	count = 0;
	fs.readFile('file1.txt', 'utf8', function (err,data) {
  		if (err) {
    	return console.log(err);
  	}	
  		dict1 = doWordCount(data);
  		count++;
  		testCount();
	});

	fs.readFile('file2.txt', 'utf8', function (err,data) {
  		if (err) {
    	return console.log(err);
  	}	
  		dict2 = doWordCount(data);
		count++;
  		testCount();
	});

}
/*This counts the words in the string
returns a dictionary*/
function doWordCount(str) {
	var wordCounts = { };
	var words = str.split(/\b/);

	for(var i = 0; i < words.length; i++)
	    wordCounts["_" + words[i]] = (wordCounts["_" + words[i]] || 0) + 1;
	return wordCounts;
}
/*makes sure that both the files have been
 parsed then runs the rest of the methods*/
function testCount(dict) {
	if (count == 2) {
		var finalDict = calcDicts();
		var finalString = processDicts(finalDict);
		printString(finalString);

	}
}
/*calculated the diffrence between word counts
positive means that the word occured that many more times
in file 1. negative means that it occured more in file 2*/
function calcDicts() {
	key1 = Object.keys(dict1);
	key2 = Object.keys(dict2);
	dict3 = {}
	for (var x in key2) { 
		var word = key2[x];
		if(key1.indexOf(word) >= 0) { //test to see if key already exisits
			dict3[word] = dict1[word] - dict2[word];
		}

	}
	return dict3;
}
/*this proceeses the list of values so that it looks*/
function processDicts(inDict) {
	var items = Object.keys(inDict).map(function(key) {
	    return [key, inDict[key]];
	});
	items.sort(function(first, second) {
	    return second[1] - first[1];
	});
	var fStr = "";
	for (var x in items) { 
		if (/[a-z0-9]/.test(items[x])) {
			fStr += items[x][0].substr(1) + "\t--\t" + items[x][1] + "\n";
		}
	}
	return fStr;
}

function printString(str) {

	fs.writeFile(file3, str, function(err) {
	    if(err) {
	        return console.log(err);
	    }

	    	console.log("The file was saved");
	}); 
}






compareFile("file1.txt","file2.txt", "file3.txt");
