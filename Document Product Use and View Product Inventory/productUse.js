var express = require('express');
var mysql = require('./dbcon.js');
var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 9114);
app.use(express.static('public'));

// function to get and use proper product use instance
app.get('/getProductInstanceID', function(req, res, next){

  let context = {};

  mysql.pool.query("SELECT MAX(id) + 1 AS instID FROM ProdUseInstances", function(error, instanceID, fields){
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



app.get('/headUse',function(req,res,next){
  let context = {};
  console.log(req.query);
  mysql.pool.query("INSERT INTO Instance_BodyPart(`instanceType`,`instanceID`,`bodyPartID`) WITH t as (SELECT CASE WHEN ? THEN 101 ELSE 0 END as id UNION SELECT CASE WHEN ? THEN 102 ELSE 0 END as id UNION SELECT CASE WHEN ? THEN 103 ELSE 0 END as id) SELECT 'P' as instanceType, ? AS instanceID, id FROM t WHERE id > 50",
  [req.query.eyes,req.query.nose,req.query.cheeks,req.query.instanceID],
  function(err, result) {
    if(err){
      next(err);
      return;
    }  
  });
});

app.get('/torsoUse',function(req,res,next){
  let context = {};
  console.log(req.query);

  mysql.pool.query("INSERT INTO Instance_BodyPart(`instanceType`,`instanceID`,`bodyPartID`) WITH t as (SELECT CASE WHEN ? THEN 201 ELSE 0 END as id UNION SELECT CASE WHEN  ?  THEN 202 ELSE 0 END as id) SELECT 'P' AS instanceType, ? AS  instanceID, id FROM t WHERE id > 50",
  [req.query.abdomen,req.query.chest,req.query.instanceID],
  function(err, result) {
    if(err){
      next(err);
      return;
    }  
  });
});

app.get('/lArmUse',function(req,res,next){
  let context = {};
  mysql.pool.query("INSERT INTO Instance_BodyPart(`instanceType`,`instanceID`,`bodyPartID`) WITH t as (SELECT CASE WHEN ? THEN 401 ELSE 0 END as id UNION SELECT CASE WHEN ? THEN 402 ELSE 0 END as id UNION SELECT CASE WHEN ? THEN 403 ELSE 0 END as id ) SELECT 'P' as instanceType, ? AS instanceID, id FROM t WHERE id > 50",
  [req.query.lForearm, req.query.lHand, req.query.lUpperArm,req.query.instanceID],
  function(err, result) {
    if(err){
      next(err);
      return;
    }  
  });
});

app.get('/rArmUse',function(req,res,next){
  let context = {};
  console.log(req.query);

  mysql.pool.query("INSERT INTO Instance_BodyPart(`instanceType`,`instanceID`,`bodyPartID`) WITH t as (SELECT CASE WHEN ?  THEN 301 ELSE 0 END as id UNION SELECT CASE WHEN ? THEN 302 ELSE 0 END as id UNION SELECT CASE WHEN ? THEN 303 ELSE 0 END as id) SELECT 'P' as instanceType, ? AS instanceID, id FROM t WHERE id > 50",
  [req.query.rForearm, req.query.rHand, req.query.rUpperArm, req.query.instanceID],
  function(err, result) {
    if(err){
      next(err);
      return;
    }  
  });
});

app.get('/rLegUse',function(req,res,next){
  let context = {};
  console.log(req.query);

  mysql.pool.query("INSERT INTO Instance_BodyPart(`instanceType`,`instanceID`,`bodyPartID`) WITH t as (SELECT CASE WHEN ? THEN 501 ELSE 0 END as id UNION SELECT CASE WHEN  ? THEN 502 ELSE 0 END as id UNION SELECT CASE WHEN  ?   THEN 503 ELSE 0 END as id) SELECT 'P' as instanceType, ? AS instanceID, id FROM t WHERE id > 50",
  [req.query.rLeg, req.query.rFoot, req.query.rThigh, req.query.instanceID],
  function(err, result) {
    if(err){
      next(err);
      return;
    }  
  });
});

app.get('/lLegUse',function(req,res,next){
  console.log(req.query);

  mysql.pool.query("INSERT INTO Instance_BodyPart(`instanceType`,`instanceID`,`bodyPartID`) WITH t as (SELECT CASE WHEN ? THEN 601 ELSE 0 END as id UNION SELECT CASE WHEN  ? THEN 602 ELSE 0 END as id UNION SELECT CASE WHEN  ?   THEN 603 ELSE 0 END as id) SELECT 'P' as instanceType, ? AS instanceID, id FROM t WHERE id > 50",
  [req.query.lLeg, req.query.lFoot, req.query.lThigh, req.query.instanceID],
  function(err, result) {
    if(err){
      next(err);
      return;
    }  
  });
});

// insert into productUseInstance table
app.get('/productUseDescription',function(req,res,next){
  console.log(req.query);

  mysql.pool.query("INSERT INTO ProdUseInstances(`id`,`userID`,`prodID`,`dateUsed`,`locationLat`,`locationLong`,`locationDescription`) VALUES(?,1,?,(SELECT CASE WHEN ? = '' THEN DATE(NOW()) ELSE ? END),(SELECT 29.337507 + (RAND() * 19.330503)), (SELECT -122.197853 + (RAND() * 26.719957)), ?)",
  [req.query.id, req.query.prodID, req.query.dateUsed1, req.query.dateUsed2, req.query.locationDescription],
  function(err, result) {
    if(err){
      next(err);
      return;
    }  
  });
});





// route to get the products in the inventory
app.get('/prodInventory', function(req,res,next){

  mysql.pool.query("SELECT productName, barcode FROM Products p WHERE p.id IN (SELECT prodID FROM ProdUseInstances WHERE userID = 1)", function(error, product, fields){
    if (error) {
      next(error);
      return;
    }

    console.log("here is the product");
    console.log(product);

    console.log(product);
    res.render('products', {
        title: 'Products in Database',
        product: product
    });

  });
});

// route to the products for the dropdown menu
app.get('/getProductDropdown', function(req,res,next){

  let context = {};
  mysql.pool.query("SELECT id, productName FROM Products", function(error, product, fields){
    if (error) {
      next(error);
      return;
    }

    let data = [];
        for (let x in product){
            let productData = {'id': product[x].id, 'productName': product[x].productName};
            data.push(productData);
        }
        context.items = JSON.stringify(data);
        res.send(context.items);
  });
});

// route to take the user to the main index page
app.use('/', function(request, response){
  response.sendfile(path.join(__dirname + '/public/productBody.html'));
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://flip2.engr.oregonstate.edu:' + app.get('port') + '; press Ctrl-C to terminate.');
});














