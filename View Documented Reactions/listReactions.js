var express = require('express');
var mysql = require('./dbcon.js');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
app.use(express.static('public'));

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', process.argv[2]);

app.get('/', function(req, res, next) {
    var context = {};
    mysql.pool.query('SELECT dateReaction, locationDescription, CAST(GROUP_CONCAT(DISTINCT bp.subBodyPart SEPARATOR ", ") AS varchar(150)) AS reactionArea FROM ReactionInstances r JOIN (SELECT instanceID,bodyPartID FROM Instance_BodyPart WHERE instanceType = "R") ib on ib.instanceID = r.id JOIN BodyParts bp on ib.bodyPartID = bp.id WHERE r.userID = 1 GROUP BY r.id', function(err, rows, fields) {
        if(err) {
            next(err);
            return;
        }
        context.results = rows;
        res.render('listReactions', context);
    });
});

app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});