var mongoose = require('mongoose'),
 db = mongoose.createConnection('localhost', 'euro2012');
db.on('error', console.error.bind(console, 'connection error:'));

var onErr = function(err,callback){
 mongoose.connection.close();
 callback(err);
};

exports.teamlist = function(gname,callback){
 db.once('open', function(){
  var teamSchema = new mongoose.Schema({
   country: String,
   GroupName: String
  });
  var Team = db.model('Team', teamSchema)
  Team.find({'GroupName':gname}, function (err, teams) {
   if(err){
    onErr(err,callback);
   }else{
    mongoose.connection.close();
    console.log(teams);
    callback("",teams);
   }
  })// end Team.find
 });// end db.once open
};

