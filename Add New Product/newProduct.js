let express = require('express');
let app = express();
let handlebars = require('express-handlebars').create({defaultLayout:'main'});
let bodyParser = require('body-parser');

let mysql = require('mysql');
let pool = mysql.createPool({
    connectionLimit : 10,
    host            : 'classmysql.engr.oregonstate.edu',
    user            : 'cs361_mcfarkar',
    password        : 'Allergens!',
    database        : 'cs361_mcfarkar'
});

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 5883);
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json())

function getProduct(res, pool, context, complete){
    pool.query("SELECT id, productName FROM Products", function(error, results, fields){
        if(error){
            res.write(JSON.stringify(error));
            res.end();
        }
        context.products  = results;
        complete();
    });
}

app.get('/', function(req, res){
    var callbackCount = 0;
    var context = {};
    //var mysql = req.app.get('mysql');
    getProduct(res, pool, context, complete);
    function complete(){
        callbackCount++;
        if(callbackCount >= 1){
            res.render('newProduct', context);
        }

    }
});

app.post('/', function(req, res){
    console.log(req.body.product);
    //var mysql = req.app.get('mysql');
    var sql = "INSERT INTO user_products (user_id, product_id) VALUES (1,?)";
    var inserts = [req.body.product];
    sql = pool.query(sql,inserts,function(error, results, fields){
        if(error){
            console.log(JSON.stringify(error))
            res.write(JSON.stringify(error));
            res.end();
        }else{
            res.redirect('/');
        }
    });
});

// app.get('/newProduct', (req, res, next) => {
//     let context = {};
//     if (req.query.submit)
//     {
//         pool.query("INSERT INTO `Products` (`barcode`, `productName`) VALUES (?, ?)", [req.query.barcodeNumber, req.query.productName], (err, result) => {
//             if(err){
//                 next(err);
//                 return;
//             }
//             context.success = true;
//             res.render('newProduct', context);
//         });
//     }
//     else
//     {
//         res.render('newProduct');
//     }
// });

app.use((req,res) => {
    res.status(404);
    res.render('404');
}); 

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500);
    res.render('500');
});

app.listen(app.get('port'), () => {
    console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
