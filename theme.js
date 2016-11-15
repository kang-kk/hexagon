var colors = require('colors');
var async = require('async');
try {
    var git = require('simple-git')('./themes');
} catch (err) {
    console.log();
    console.log('⚠️ Please move to your projects home directory'.red);
    process.exit();
}
var fs = require('fs');
var path = require('path');

function getDirectories(srcpath) {
  return fs.readdirSync(srcpath).filter(function(file) {
    return fs.statSync(path.join(srcpath, file)).isDirectory();
  });
}

var add = function(params) {
    var tFlag = params.indexOf('-t');
    params.splice(tFlag, 1);
    for (i = 0; i < params.length; i++) {
        var repo = params[i];
        var slash = repo.indexOf('/');
        var dirName = repo.substring(slash + 1, repo.length);
        var requestHeader = "https://github.com/"
        var root = './themes/'
        var dir = root + dirName;

        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }
        async.series([
            git.clone(requestHeader + params[i], dirName),
            console.log('👍 Success! Make sure to add   ' + dirName.underline + ' to theme in your _config.yml')
        ]);

    }
};

var list = function() {
    var themePath = process.cwd() + '/themes';
    var themes = getDirectories(themePath);

    for (var i = 0; i < themes.length; i++){
        console.log(themes[i]);
    }
    

};

exports.list = list;
exports.add = add;