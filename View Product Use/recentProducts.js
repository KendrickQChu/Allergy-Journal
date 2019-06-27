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
    mysql.pool.query('SELECT p.productName, dateUsed, locationDescription, CAST(GROUP_CONCAT(DISTINCT bp.subBodyPart SEPARATOR ", ") AS varchar(150)) AS affectedArea FROM ProdUseInstances pu JOIN Products p on p.id = pu.prodID JOIN (SELECT instanceID,bodyPartID FROM Instance_BodyPart WHERE instanceType = "P") ib on ib.instanceID = pu.id JOIN BodyParts bp  on ib.bodyPartID = bp.id WHERE pu.dateUsed > DATE_ADD(NOW(),INTERVAL -7 DAY) AND pu.userID = 1 GROUP BY pu.id', function(err, rows, fields) {
        if(err) {
            next(err);
            return;
        }
        context.results = rows;
        res.render('recentProducts', context);
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