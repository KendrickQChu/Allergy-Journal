var express = require('express');
var mysql = require('./dbcon.js');
var app = express();
//var handlebars = require('express-handlebars').create({defaultLayout:'main'});

//app.engine('handlebars', handlebars.engine);
//app.set('view engine', 'handlebars');
app.set('port', 9113);
app.use(express.static('public'));


// this route returns the next reaction instance id number that should be used
app.get('/getReactionInstanceID', function(req, res, next){

  let context = {};

  mysql.pool.query("SELECT MAX(id) + 1 AS instanceID FROM `ReactionInstances` ", function(error, instanceID, fields){
    if (error) {
      next(error);
      return;
  }

  console.log("here is the id");
  console.log(instanceID);

         context.items = JSON.stringify(instanceID);
         res.send(context.items);

  });

});

// this route inserts in the database head reactions
app.get('/headReaction',function(req,res,next){
  console.log("in the reaction insert");
  console.log(req.query);
  mysql.pool.query("INSERT INTO Instance_BodyPart(`instanceType`,`instanceID`,`bodyPartID`) WITH t as (SELECT CASE WHEN ? THEN 101 ELSE 0 END as id UNION SELECT CASE WHEN ? THEN 102 ELSE 0 END as id UNION SELECT CASE WHEN ? THEN 103 ELSE 0 END as id) SELECT 'R' as instanceType, ? AS instanceID, id FROM t WHERE id > 50",
  [req.query.eyes,req.query.nose,req.query.cheeks,req.query.instanceID],
  function(err, result) {
    if(err){
      next(err);
      return;
    }  
  });

  console.log("out of reaction insert");
});

// ALL THESE BELOW NEED TO BE FIXED like the one above ^ !

app.get('/torsoReaction',function(req,res,next){
  let context = {};
  console.log(req.query);

  mysql.pool.query("INSERT INTO Instance_BodyPart(`instanceType`,`instanceID`,`bodyPartID`) WITH t as (SELECT CASE WHEN ? THEN 201 ELSE 0 END as id UNION SELECT CASE WHEN  ?  THEN 202 ELSE 0 END as id) SELECT 'R' AS instanceType, ? AS  instanceID, id FROM t WHERE id > 50",
  [req.query.abdomen,req.query.chest,req.query.instanceID],
  function(err, result) {
    if(err){
      next(err);
      return;
    }  
  });
});

app.get('/lArmReaction',function(req,res,next){
  let context = {};
  console.log(req.query);

  mysql.pool.query("INSERT INTO Instance_BodyPart(`instanceType`,`instanceID`,`bodyPartID`) WITH t as (SELECT CASE WHEN ? THEN 401 ELSE 0 END as id UNION SELECT CASE WHEN ? THEN 402 ELSE 0 END as id UNION SELECT CASE WHEN ? THEN 403 ELSE 0 END as id ) SELECT 'R' as instanceType, ? AS instanceID, id FROM t WHERE id > 50",
  [req.query.lForearm, req.query.lHand, req.query.lUpperArm,req.query.instanceID],
  function(err, result) {
    if(err){
      next(err);
      return;
    }  
  });
});

app.get('/rArmReaction',function(req,res,next){
  let context = {};
  console.log(req.query);

  mysql.pool.query("INSERT INTO Instance_BodyPart(`instanceType`,`instanceID`,`bodyPartID`) WITH t as (SELECT CASE WHEN ?  THEN 301 ELSE 0 END as id UNION SELECT CASE WHEN ? THEN 302 ELSE 0 END as id UNION SELECT CASE WHEN ? THEN 303 ELSE 0 END as id) SELECT 'R' as instanceType, ? AS instanceID, id FROM t WHERE id > 50",
  [req.query.rForearm, req.query.rHand, req.query.rUpperArm, req.query.instanceID],
  function(err, result) {
    if(err){
      next(err);
      return;
    }  
  });
});

app.get('/rLegReaction',function(req,res,next){
  let context = {};
  console.log(req.query);

  mysql.pool.query("INSERT INTO Instance_BodyPart(`instanceType`,`instanceID`,`bodyPartID`) WITH t as (SELECT CASE WHEN ? THEN 501 ELSE 0 END as id UNION SELECT CASE WHEN  ? THEN 502 ELSE 0 END as id UNION SELECT CASE WHEN  ?   THEN 503 ELSE 0 END as id) SELECT 'R' as instanceType, ? AS instanceID, id FROM t WHERE id > 50",
  [req.query.rLeg, req.query.rFoot, req.query.rThigh, req.query.instanceID],
  function(err, result) {
    if(err){
      next(err);
      return;
    }  
  });
});

app.get('/lLegReaction',function(req,res,next){
  let context = {};
  console.log(req.query);

  mysql.pool.query("INSERT INTO Instance_BodyPart(`instanceType`,`instanceID`,`bodyPartID`) WITH t as (SELECT CASE WHEN ? THEN 601 ELSE 0 END as id UNION SELECT CASE WHEN  ? THEN 602 ELSE 0 END as id UNION SELECT CASE WHEN  ?   THEN 603 ELSE 0 END as id) SELECT 'R' as instanceType, ? AS instanceID, id FROM t WHERE id > 50",
  [req.query.lLeg, req.query.lFoot, req.query.lThigh, req.query.instanceID],
  function(err, result) {
    if(err){
      next(err);
      return;
    }  
  });
});


app.get('/reactionDescription',function(req,res,next){
  console.log(req.query);

  mysql.pool.query("INSERT INTO ReactionInstances(`id`,`userID`,`dateReaction`,`locationLat`,`locationLong`,`locationDescription`,`reactionDescription`) VALUES(?,1,(SELECT CASE WHEN ? ='' THEN SYSDATE() ELSE ? END),(SELECT 29.337507 + (RAND() * 19.330503)), (SELECT -122.197853 + (RAND() * 26.719957)), ?, ?)",
  [req.query.id, req.query.dateReaction1, req.query.dateReaction2, req.query.locationDescription, req.query.reactionDescription],
  function(err, result) {
    if(err){
      next(err);
      return;
    }  
  });
});




// route to take the user to the main index page
app.use('/', function(request, response){
  response.sendfile(path.join(__dirname + '/public/docReaction.html'));
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://flip2.engr.oregonstate.edu:' + app.get('port') + '; press Ctrl-C to terminate.');
});

