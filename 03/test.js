

var fs = require("fs");

function do_something(filename, callback) {
    fs.openFile("testing.json", function (err, fileHandle) {
        if (err) {
            callback(err, null);
        } else {
            fs.readContents(fileHandle, function (err, contents) {
                if (err) {
                    callback(err,null);
                } else {
                    fs.closeFile(fileHandle, function (err) {
                        if (err) {
                            callback(err, null);
                        } else {
                            callback(null, contents);
                        }
                    });
                }
            });
        }
    });
}


var fs = require("fs");

function do_something(filename, callback) {
    fs.openFile("testing.json", function (err, fileHandle) {
        if (err) {
            callback(err, null);
        } else {
            // process the file here., get "contents"
            callback(null, contents);
        }
    });
}


function do_something(filename, callback) {
    async.waterfall([
        function (cb) {
            fs.openFile("testing.json", cb);
        },
        function (fileHandle, cb) {
            fs.readContents(fileHandle, cb);
        },
        function (contents, cb) {
            fs.closeFile(fileHandle, function (err) {
                callback(err, contents);
            });
        }
    ], function (err, final_results) {
        callback(err, final_results);
    });
}


var
