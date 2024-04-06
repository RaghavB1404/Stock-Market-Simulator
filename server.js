///////////////////////////////////////////////////////////////////////////////////////////
// Server.js - This is the main and single monolith function                             //
// that handles:                                                                         //
//      1. custoemr registration                                                         //
//      2. custoemr login                                                                //
//      3. random simulation of stock exchange for 4 stocks                              //
//      4. handling of buy and sell stocks                                               //
//      5. graphically displaying profit and loss statements                             //
//          per company wise                                                             //
//          per realised and unrealised values                                           //
//          Also overall for both realised and unrealised values                         //
//      6. This sub-routine also handles feedback capture                                //
//      7. static page rendering like About, Contact are taken care in reactJs itself    //
///////////////////////////////////////////////////////////////////////////////////////////      

const express = require('express')
const session = require('express-session');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const fs = require('fs');
const cheerio = require('cheerio');
const cors = require('cors');
const { MongoClient } = require('mongodb');

const app = express()

// Connection URI for MongoDB
const uri = 'mongodb://localhost:27017';
const dbName = 'stockdb';
const collectionName = 'portfolio_collection'; 

const pdata = [
    // realized profit/loss
    [
      {
        P: { name: "Profit", data: [0, 0, 0, 0] },
        L: { name: "Loss", data: [0, 0, 0, 0] },
      },
    ],
  
    // unrealized profit/loss
    [
      {
        P: { name: "Profit", data: [0, 0, 0, 0] },
        L: { name: "Loss", data: [0, 0, 0, 0] },
      },
    ],
  
    // Overall Realised Profit and Loss
    [
        {
          OP: { name: "Overall Profit", data: [0] },
          OL: { name: "Overall Loss", data: [0] },
        },
    ],

    // Overall UnRealised Profit and Loss
    [
        {
          OP: { name: "Overall Profit", data: [0] },
          OL: { name: "Overall Loss", data: [0] },
        },
    ],
  ];

Gusers = [
    {uname:"admin",pwd:"admin123"},
    {uname:"Santosha",pwd:"Santosha123"},
    {uname:"Raghav",pwd:"Raghav123"},
    {uname:"Praveen",pwd:"Praveen123"}
]

bkup_users = [
    {uname:"admin",pwd:"admin123"},
    {uname:"Santosha",pwd:"Santosha123"},
    {uname:"Raghav",pwd:"Raghav123"},
    {uname:"Praveen",pwd:"Praveen123"}
]

portfolio = [
    {cname: 1, qty:100, buyprice:100, sellprice: 0},
    {cname: 2, qty:100, buyprice:100, sellprice: 0},
    {cname: 1, qty:100, buyprice:100, sellprice: 0},
    {cname: 3, qty:100, buyprice:100, sellprice: 0},
    {cname: 1, qty:100, buyprice:100, sellprice: 0},
    {cname: 2, qty:100, buyprice:100, sellprice: 0},
    {cname: 1, qty:100, buyprice:100, sellprice: 0},
    {cname: 4, qty:100, buyprice:100, sellprice: 0},
]

bkup_port = [
    {cname: 1, qty:100, buyprice:100, sellprice: 0},
    {cname: 2, qty:100, buyprice:100, sellprice: 0},
    {cname: 1, qty:100, buyprice:100, sellprice: 0},
    {cname: 3, qty:100, buyprice:100, sellprice: 0},
    {cname: 1, qty:100, buyprice:100, sellprice: 0},
    {cname: 2, qty:100, buyprice:100, sellprice: 0},
    {cname: 1, qty:100, buyprice:100, sellprice: 0},
    {cname: 4, qty:100, buyprice:100, sellprice: 0},
]

portfolio_for_graph = [
    {cname: 1, qty:100, buyprice:100, sellprice: 0},
    {cname: 2, qty:100, buyprice:100, sellprice: 0},
    {cname: 1, qty:100, buyprice:100, sellprice: 0},
    {cname: 3, qty:100, buyprice:100, sellprice: 0},
    {cname: 1, qty:100, buyprice:100, sellprice: 0},
    {cname: 2, qty:100, buyprice:100, sellprice: 0},
    {cname: 1, qty:100, buyprice:100, sellprice: 0},
    {cname: 4, qty:100, buyprice:100, sellprice: 0},
    {cname: 1, qty:11, buyprice:100, sellprice: 12},
    {cname: 2, qty:110, buyprice:100, sellprice: 13},
    {cname: 1, qty:122, buyprice:100, sellprice: 400},
    {cname: 3, qty:31, buyprice:100, sellprice: 38},
]

// current stock value - This is the stock value based on stock market simulation
// rv => running value
csv = [
    {cname: 1, rv: 110},
    {cname: 2, rv: 120},
    {cname: 3, rv: 130},
    {cname: 4, rv: 140},
]

// Following two structures are very useful for debugging via REST
// So, let us keep it.
unrealised = [
    {cname: 1, aqty: 0, abv: 0,asv: 0, apl:0},
    {cname: 2, aqty: 0, abv: 0,asv: 0, apl:0},
    {cname: 3, aqty: 0, abv: 0,asv: 0, apl:0},
    {cname: 4, aqty: 0, abv: 0,asv: 0, apl:0}
]

realised = [
    {cname: 1, aqty: 0, abv: 0,asv: 0, apl:0},
    {cname: 2, aqty: 0, abv: 0,asv: 0, apl:0},
    {cname: 3, aqty: 0, abv: 0,asv: 0, apl:0},
    {cname: 4, aqty: 0, abv: 0,asv: 0, apl:0}
]

// Use EJS
app.set('view engine', 'ejs');
app.set('views', 'public')

// Use the cookie-parser middleware
app.use(cookieParser());

// Serve static files from the "public" directory
app.use(express.static('public'));

// Following app.use is for REST API testing
app.use(express.json())

// Use the body-parser middleware to parse form data
app.use(bodyParser.urlencoded({ extended: false }));

//Form submit will be blocked otherwise
app.use(cors());

// When a person types in the base html page. Here in this case
// http://192.168.1.211:3000, following code gets executed
app.get('/', (req, res) => {
    console.log("Reached root method!")
    // res.sendFile(__dirname + '/public/index.html');
});

/////////////////////////////////////////////////////
// When a person clicks "Singup" button in index.html
// following code get invoked
/////////////////////////////////////////////////////
app.post('/SignupProcess',(req,res) => {
    console.log("Reached SignupProcess method!");
    const user = Gusers.find(user => user.uname  == req.body.Uname)

    const uname = req.body.Uname;
    const pwd1 = req.body.Upwd1;
    const pwd2 = req.body.Upwd2;

    console.log(uname);
    console.log(pwd1);
    console.log(pwd2);

    // Failed login with reason and type
    let failureResponse = { success: false };

    // If any of the 3 fields is null
    if(!uname || !pwd1 || !pwd2) {
        console.log("Fields are not completely filled");
        failureResponse = { ...failureResponse, reason: 'All fields needs to be filled up', type: 'fields' };
        res.status(401).json(failureResponse);
        return;
    }
    // if user already exists
    if(user) {
        console.log(user.uname);
        console.log(user.pwd);
        console.log("User already exists");
        failureResponse = { ...failureResponse, reason: 'User already exists', type: 'username' };
        res.status(401).json(failureResponse);
        return;
    }
    // if pwd1 and pwd2 are not same
    if(pwd1 !== pwd2) {
        console.log("Both passwords are not same");
        failureResponse = { ...failureResponse, reason: 'Passwords are not matching', type: 'passwords' };
        res.status(401).json(failureResponse);
        return;
    }

    // Now, you have a valid new user with both pwd1 and pwd2 matching.
    // add a element in to the GUser
    // clear the cookie if any
    // redirect to Login.html page
    Gusers.push({ uname: uname, pwd: pwd1});

    res.clearCookie('user');
    res.status(200).json({ message: 'Signup Ok!' });
    // res.redirect("/login");
});

///////////////////////
// Handle login Process
///////////////////////
app.post('/LoginProcess',(req,res) => {
    console.log("Reached LoginProcess method!");
    const user = Gusers.find(user => user.uname  == req.body.Uname)
    
    console.log(req.body.Uname);
    console.log(req.body.Upwd);
    
    // Failed login with reason and type
    let failureResponse = { success: false };

    // If already logged in, we will have user in the cookie.
    const cuser = req.cookies.user;
    if (cuser) {
        console.log("Already logged in")
        res.status(500).send()
        return
    } 

    if(user == null) {
        console.log("No user with name!");
        failureResponse = { ...failureResponse, reason: 'Invalid username', type: 'username' };
        res.status(401).json(failureResponse);
    }

    try {
        console.log(user.uname)
        console.log(user.pwd)

        if (req.body.Upwd == user.pwd) {
            res.cookie('user', req.body.Uname, { Salary: 9000000, httpOnly: true });
            // render dashboard page
            res.status(200).json({ message: 'Login successful' });
        } else {
            console.log("Password is wrong for the user: ${req.body.Uname}");
            failureResponse = { ...failureResponse, reason: 'Invalid password', type: 'password' };
            res.status(401).json(failureResponse);
        }
    } catch {
        console.log("I am here!!")
        res.status(500).send()
    }
});

// When User fillup the login page, and submits the form, 
// following code gets executed

// Route to set a cookie
app.get('/setcookie', (req, res) => {
    res.cookie('user', 'John Doe', { maxAge: 900000, httpOnly: true });
    res.send('Cookie has been set.');
});

// Route to read a cookie
app.get('/getcookie', (req, res) => {
    const user = req.cookies.user;
    if (user) {
        res.send(`Welcome back, ${user}!`);
    } else {
        res.send('No cookie found.');
    }
});

// Route to clear a cookie
app.get('/clearcookie', (req, res) => {
    res.clearCookie('user');
    res.send('Cookie has been cleared.');
});

//////////
// MongoDB
//////////
// MongoDB - Update the json object, portfolio
async function updateData() {
    const client = new MongoClient(uri);

    try {
        await client.connect();
        console.log('Connected to the database');

        const database = client.db(dbName);
        const collection = database.collection(collectionName);
        // Find one document in the collection
        const document = await collection.findOne();
        if (!document) {
            // This should not happen as at least bkup_port should have been checked into db
        } else {
            console.log('updateData(): Collection is not empty.');
            result = await collection.findOneAndUpdate(
                {}, // An empty filter matches the first document in the collection
                { $set: { portfolio: JSON.stringify(portfolio) } },
                { returnDocument: 'after' } // Return the updated document
            );
        
            // Retrieve the updated document
            const portfolio_in_db = await collection.findOne();
            const portfolio_in_db_array_format = {...portfolio_in_db}
            console.log('updateData(): Updated document:', portfolio_in_db_array_format);
        }
    } finally {
        await client.close();
    }
}

app.post('/Buy',(req,res) => {
    const comp = parseInt(req.body.comp_select);
    const qty = parseInt(req.body.qty);
    const buyp = parseInt(req.body.buy_price);

    // let result1 = "",result2 = "",result3 = "";
    // let dynamicString1 ="", dynamicString2 ="", dynamicString3 = "";
    let failureResponse = { success: false };
    let successResponse = { success: false};

    console.log("In Buy");
    if (![1, 2, 3, 4].includes(comp)) {
        console.log("Enter a valid company");
        failureResponse = { ...failureResponse, reason: 'Invalid Company', type: 'fields' };
        res.status(401).json(failureResponse);
        return;
    }
    
    // Qty error conditions
    if (isNaN(qty) || qty < 1 || qty > 10000) {
        console.log("Invalid Quantity");
        failureResponse = { ...failureResponse, reason: 'Enter valid quantity (1-10000)', type: 'fields' };
        res.status(401).json(failureResponse);
        return;
    }

    // Buy Price
    if (isNaN(buyp) || buyp < 1 || buyp > 10000) {
        console.log("Invalid Buy Price");
        failureResponse = { ...failureResponse, reason: 'Enter right buy price', type: 'fields' };
        res.status(401).json(failureResponse);
        return;
    }

    if((qty> 0 && buyp == 0) || (qty == 0 && buyp > 0) || (qty == 0 && buyp == 0) ){
        console.log("Incomplete Fields");
        failureResponse = { ...failureResponse, reason: 'Enter both quantity and Buy Price', type: 'fields' };
        res.status(401).json(failureResponse);
        return;
    }
    
    successResponse = { ...successResponse, reason: `Bought ${qty} stocks of comp ${comp} for a price of ${buyp}`, type: 'fields' };
    res.status(200).json(successResponse);

    portfolio.push({cname:comp,qty:qty,buyprice:buyp,sellprice:0});
    console.log("Company : ", comp)
    console.log("Quantity: ", qty)
    console.log("Buy Price: ", buyp)

    // dynamicString1 = "";
    // result1 = "Bought stocks of "+comp +" with quantity "+qty +" for "+buyp
    // res.render('BuySell', { dynamicString1,dynamicString2,dynamicString3,result1,result2,result3 });
    // successResponse = { ...successResponse, reason: `Bought ${qty} stocks of comp ${comp} for a price of ${buyp}`, type: 'fields' };

    updateData();
    return;
})

app.post('/GetQuote',(req,res) => {
    const comp = parseInt(req.body.comp_select);
    let dynamicString1 = "",dynamicString2 = "",dynamicString3 = "";
    let result1 = "",result2 = "",result3 = "";
    console.log("In Get Quote");
    if (![1, 2, 3, 4].includes(comp)) {
        console.log("Invalid company");
        // TBD: Fix the error to render all strings
        dynamicString2 = '*Enter a valid company';
        res.render('BuySell', { dynamicString1,dynamicString2,dynamicString3,result1,result2,result3 });
        return;
    }
    result2 = "stock price of "+comp +"is 100Rs";

    res.render('BuySell', { dynamicString1,dynamicString2,dynamicString3,result1,result2,result3 });    

    console.log("Company: ",comp)
})

function sellqty(res, comp, qty, sellp) {
    let resqty = qty,newqty = 0;
    
    for(var i = 0; i < portfolio.length; i++) {
        if (portfolio[i].cname == comp && portfolio[i].sellprice == 0) {
            if(portfolio[i].qty <= resqty) {
                portfolio[i].sellprice = sellp;
                resqty = resqty - portfolio[i].qty;
            } else { // DB.qty > restqty.
                // Since we have enough stocks, let us sell, resqty. By adding a record
                portfolio.push({cname:comp, qty:resqty, buyprice:portfolio[i].buyprice, sellprice:sellp});

                // Let us update the existing record with the stocks that are remaining after above sell
                newqty = portfolio[i].qty - resqty;
                portfolio[i].qty = newqty; //record1

                resqty = 0;
            }
        } else {
            // if company name not same or that record is already sold => skip that record
        }

        // if resqty == 0 implies the entire sale transaction is done. So let us come out of for loop.
        if(resqty == 0) {
            break;
        }
    }
    return;
}

function  UpdateRealised (comp) {
    var i = comp - 1;
    var j = 0;
    var occurance = 0, temp_avbp = 0, temp_avsp = 0;
    var temp_aqty = 0, temp_abv = 0, temp_asv = 0, temp_apl = 0;
    var overall_profit = 0; overall_loss = 0;

    // console.log("== Comp : ", comp);
    for (j = 0; j < portfolio.length; j++) {
        
        if ((portfolio[j].sellprice != 0) && (portfolio[j].cname === comp)) {
            occurance = occurance + 1;
            // first we will add all buy values here and then we will take average
            // once we are out of the for loop
            temp_avbp += portfolio[j].buyprice;
            temp_avsp += portfolio[j].sellprice;
            temp_aqty += portfolio[j].qty;
        }
    }

    // total quantity * average buy price is what is invested on that stock
    temp_avbp = temp_avbp/occurance;
    temp_avsp = temp_avsp/occurance;
    temp_asv = temp_avsp * temp_aqty;
    temp_abv = temp_avbp * temp_aqty;

    // profit or loss will be substracting buy value from sell value 
    temp_apl = temp_asv - temp_abv;

    //DEBUG: Let us console_log every thing 
    // console.log("occurance = ", occurance);
    // console.log("temp_avbp = ", temp_avbp);
    // console.log("temp_avsp = ", temp_avsp);
    // console.log("temp_asv = ", temp_asv);
    // console.log("temp_abv = ", temp_abv);
    // console.log("temp_apl = ", temp_apl);

    // let us update all these details into unrealised
    realised[i].aqty = temp_aqty;
    realised[i].abv = temp_avbp;
    realised[i].asv = temp_asv;
    realised[i].apl = temp_apl;

    // let us update pdata also so that we can be real-time

    if (temp_apl >= 0) {
        pdata[0][0].P.data[i] = temp_apl
        pdata[0][0].L.data[i] = 0
    } else {
        pdata[0][0].L.data[i] = temp_apl
        pdata[0][0].P.data[i] = 0
    }

    // Let us update the overall realised profit loss
    for (i=0; i<pdata[0][0].P.data.length; i++) {
        overall_profit += pdata[0][0].P.data[i];
    }

    for (i=0; i<pdata[0][0].L.data.length; i++) {
        overall_loss += pdata[0][0].L.data[i];
    }

    pdata[2][0].OP.data[0] = overall_profit;
    pdata[2][0].OL.data[0] = overall_loss;
}

app.post('/Sell',(req,res) => {
    const comp = parseInt(req.body.comp_select);
    const qty = parseInt(req.body.qty);
    const sellp = parseInt(req.body.sell_price);
    var whatwehave = 0,oktosell = 0;
    // let result1 = "", result2 = "", result3 = "Sold Stocks";
    // let dynamicString1 = "", dynamicString2 = "", dynamicString3 = "";

    let failureResponse = { success: false };
    let successResponse = { success: false};

    console.log("In Sell");
    if (![1, 2, 3, 4].includes(comp)) {
        console.log("Enter a valid company");
        failureResponse = { ...failureResponse, reason: 'Invalid Company', type: 'fields' };
        res.status(401).json(failureResponse);
        return;
    }

    // Qty error conditions
    if (isNaN(qty) || qty < 1 || qty > 10000) {
        console.log("Invalid Quantity");
        failureResponse = { ...failureResponse, reason: 'Enter valid quantity (1-10000)', type: 'fields' };
        res.status(401).json(failureResponse);
        return;
    }

    // Buy Price
    if (isNaN(sellp) || sellp < 1 || sellp > 10000) {
         console.log("Invalid Sell Price");
        failureResponse = { ...failureResponse, reason: 'Enter right sell price', type: 'fields' };
        res.status(401).json(failureResponse);
        return;
    }

    if((qty > 0 && sellp == 0) || (qty == 0 && sellp > 0) || (qty == 0 && sellp == 0)) {
        console.log("Incomplete Fields");
        failureResponse = { ...failureResponse, reason: 'Enter both quantity and Sell Price', type: 'fields' };
        res.status(401).json(failureResponse);
        return;
    }
    successResponse = { ...successResponse, reason: `Sold ${qty} stocks of comp ${comp} for a price of ${sellp}`, type: 'fields' };
    res.status(200).json(successResponse);

    console.log("Company : ", comp)
    console.log("Quantity: ", qty)
    console.log("Sell Price: ", sellp)

    for(var i = 0;i < portfolio.length;i++) {
        if(portfolio[i].cname == comp) {
            // portfolio[i].sellprice = sellp;
            whatwehave = whatwehave + parseInt(portfolio[i].qty);
            if (whatwehave >= qty) { 
                break;
            }
        }
    }

    if (whatwehave >= qty) {
        console.log("What we have is more or equal: ",whatwehave);
        sellqty(res, comp, qty, sellp);
        // let us update realised and pdata
        UpdateRealised(comp);

        //Let us checkin portfolio into MongoDB
        updateData();
    } else {
        console.log("What we have is less than sell_qty_asked: ",whatwehave);
        result3 = "*Not enough stocks to sell";
        successResponse = { ...successResponse, reason: `${result3}}`, type: 'fields' };
        res.status(400).json(result3);
    }
    
    return;
})

/////////////////////////////////////////////////////////////
// To Render the portfolio in reactJS, send the data in the
// following structured format
/////////////////////////////////////////////////////////////
//This method should return a json object so that reactjs can render the graph
app.get('/portfolio',(req,res) => {

    var rel_loss = [0,0,0,0];
    var unrel_loss = [0,0,0,0];
    var tre_loss = [0];
    var ture_loss = [0];
    var i;

    // Graph generation doesn't take negative values
    // in the next 4 for loops, we will covert all looses into positives
    // but the data is rendered in reactjs as part of loss section
    // in red color
    for (i=0; i<pdata[0][0].L.data.length; i++) {
        rel_loss[i] = pdata[0][0].L.data[i] * -1;
    }

    for (i=0; i<pdata[1][0].L.data.length; i++) {
        unrel_loss[i] = pdata[1][0].L.data[i] * -1;
    }

    for (i=0; i<pdata[2][0].OL.data.length; i++) {
        tre_loss[i] = pdata[2][0].OL.data[i] * -1;
    }

    for (i=0; i<pdata[1][0].L.data.length; i++) {
        ture_loss[i] = pdata[3][0].OL.data[i] * -1;
    }

    // Derive the data to be sent from pdata so that
    // graph rendering on reactjs is easier
    const data = [
        // realized profit/loss
        [
          { name: "Profit", data: pdata[0][0].P.data},
          { name: "Loss", data: rel_loss},
        ],
      
        // unrealized profit/loss
        [
            { name: "Profit", data: pdata[1][0].P.data},
            { name: "Loss", data: unrel_loss},
        ],

        // overall realized profit/loss
        [
            { name: "Overall Profit", data: pdata[2][0].OP.data},
            { name: "Overall Loss", data: tre_loss},
        ],

        // overall unrealized profit/loss
        [
            { name: "Overall Profit", data: pdata[3][0].OP.data},
            { name: "Overall Loss", data: ture_loss},
        ],
      ];

    res.json(data);
});

///////////////////
// Start of the Day
///////////////////
// Execute a function once after 2 seconds
// this will be triggered in the beginning and will setup
// portfolio from MongoDB and make things ready for execution
setTimeout(async () => {
    var i = 0;

    const client = new MongoClient(uri);

    console.log('Stock market is now open.');

    try {
        await client.connect();
        console.log('Connected to the database');

        const database = client.db(dbName);
        const collection = database.collection(collectionName);

        // Find one document in the collection
        const document = await collection.findOne();

        if (!document) {
            console.log('Collection is empty.');
            // Insert the JSON object into MongoDB
            const insertResult = await collection.insertOne({ ...bkup_port }); // Make sure bkup_port is an object
            console.log(`Inserted document id: ${insertResult.insertedId}`);

            // Retrieve the inserted document
            const retrievedDocument = await collection.findOne({}, { projection: { _id: 0 } });
            const portfolio_from_db = [...Object.values(portfolio_from_db)];
            console.log('SOD: Retrieved document:', portfolio_from_db);
        } else {
            console.log('Collection is not empty.');
        
            // Retrieve the updated document
            const portfolio_from_db = await collection.findOne({}, { projection: { _id: 0 } });
            portfolio = [...Object.values(portfolio_from_db)];
            for (i=1; i<5; i++) {
                UpdateRealised(i)
            }  
            console.log("SOD: Fresh Portfolio from DB: ", portfolio);
        }
    } finally {
        // Close the MongoDB connection
        await client.close();
        console.log('Connection closed');
    }
}, 2000);

// unrealised stock value of a given company keeps changing
// let us keep a track of it at regular intervals
function ComputUnrealisedStockValue() {
    var i = 0, j = 0;
    var occurance, temp_avbp, temp_aqty, temp_abv, temp_asv, temp_apl;
    var overall_profit = 0, overall_loss = 0;

    // console.log("Computing Unrealised stock value")

    // i == company we are choosing now
    // first findout how many times a given company has records in portfolio
    for (i = 0; i < unrealised.length; i++) {
        occurance = 0;
        temp_avbp = 0;
        temp_aqty = 0
        temp_abv = 0;
        temp_asv = 0;
        temp_apl = 0;

        // in the whole portfolio, there are lot of records for each of the company
        // we need to sniff through all those records of "i" (given company) and generate 
        // unrealiased profit loss
        // DEBUG
        // console.log("ComputUnrealisedStockValue:", portfolio);
        // console.log("portfolio.length:", portfolio.length);

        for (j = 0; j < portfolio.length; j++) {
            //#DEBUG
            // console.log("i sellprice: ", j, portfolio[j].sellprice)
            // console.log("cname, i+1", portfolio[j].cname, (i+1))
            if ((portfolio[j].sellprice === 0) && (portfolio[j].cname === (i + 1))) {
                // console.log("Inside if condition")
                occurance = occurance + 1;
                // first we will add all buy values here and then we will take average
                // once we are out of the for loop
                temp_avbp += portfolio[i].buyprice;
                temp_aqty += portfolio[i].qty;
            }
        }

        if (occurance === 0) {
            continue;
        }

        // total quantity * average buy price is what is invested on that stock
        temp_avbp = temp_avbp/occurance;
        temp_abv = temp_avbp * temp_aqty;
        // current stock value * total quantity will be aggregate sell value -> of course, this is unrealised
        temp_asv = csv[i].rv * temp_aqty;

        if (isNaN(temp_asv)) {
            console.log("temp_aqty and csv of i are", temp_aqty, csv[i].rv, i)
        }

        // profit or loss will be substracting buy value from sell value 
        temp_apl = temp_asv - temp_abv;
        
        // DEBUG#1
        // console.log("comp, Occurance, temp_avbp, temp_aqty : ", i, occurance, temp_avbp, temp_aqty);
        // console.log("temp_abv, temp_asv, temp_apl", temp_abv, temp_asv, temp_apl);

        // let us update all these details into unrealised
        unrealised[i].aqty = temp_aqty;
        unrealised[i].abv = temp_avbp;
        unrealised[i].asv = csv[i].rv;
        unrealised[i].apl = temp_apl;

        // let us update pdata also so that we can be real-time

        if (temp_apl >= 0) {
            pdata[1][0].P.data[i] = temp_apl
            pdata[1][0].L.data[i] = 0
        } else {
            pdata[1][0].L.data[i] = temp_apl
            pdata[1][0].P.data[i] = 0
        }
    }

    // Let us update the overall unrealised profit loss
    for (i=0; i<pdata[1][0].P.data.length; i++) {
        overall_profit += pdata[1][0].P.data[i];
    }

    for (i=0; i<pdata[0][0].L.data.length; i++) {
        overall_loss += pdata[1][0].L.data[i];
    }

    pdata[3][0].OP.data[0] = overall_profit;
    pdata[3][0].OL.data[0] = overall_loss;

}

//
// Simulate a live stock exchange
//
// Execute a function every 5 seconds after the initial 2 second delay
const interval = setInterval(() => {
    var i = 0;
    let randomNum1 = 0,randomNum2 = 0;

    for (i = 0; i < csv.length; i++) {
        // Generate a random number between 0 and 5 (inclusive)
        randomNum1 = Math.floor(Math.random() * 6) + 1;
        // Generate a random number between -1 and 1
        randomNum2 = Math.floor((Math.random() * 3) - 1);
        //DEBUG#2
        // console.log("randomNum1: ",randomNum1);
        // console.log("randomNum2: ",randomNum2);
        if (randomNum2 == 0) {
            continue;
        } else if (randomNum2 == -1) {
            csv[i].rv = csv[i].rv - randomNum1;
        } else if (randomNum2 > 0) {
            csv[i].rv = csv[i].rv + randomNum1;
        }

        // if the stock goes negative, put it back to book value
        if (csv[i].rv <= 0 || isNaN(csv[i].rv)) {
            csv[i].rv = 100;
        }
    }

    ComputUnrealisedStockValue();

    // console.log('New stock quotes are updated.');
}, 5000);

// To stop the interval after a certain number of executions, you can use clearInterval.
// For example, to stop after 5 seconds:
setTimeout(() => {
    clearInterval(interval);
    console.log('Stock market is now closed');
}, 30*60*1000);


// ==== Following code is only REST API ====

// If a restful invokation happens, following methods will be invoked
app.use(bodyParser.urlencoded({extended:true}));
app.use (session({
   secret: 'your-secret-key',
   resave: false,
   saveUninitialized: true
}));

app.get('/portfolio1',(req,res) => {
    res.json(portfolio);
});

// Give Current Stock Values in the stock market
app.get('/csv',(req,res) => {
    res.json(csv);
});

// Give Current Stock Values in the stock market
app.get('/pdata',(req,res) => {
    res.json(pdata);
});

//sold stocks is called realised profit loss
app.get('/realised',(req,res) => {
    res.json(realised);
})

app.get('/unrealised',(req,res) => {
    res.json(unrealised);
})

async function updateData_graph_type_data(req, res) {
    const client = new MongoClient(uri);

    try {
        await client.connect();
        console.log('Connected to the database');

        const database = client.db(dbName);
        const collection = database.collection(collectionName);
        // Find one document in the collection
        const document = await collection.findOne();
        if (!document) {
            // This should not happen as at least bkup_port should have been checked into db
        } else {
            console.log('updateData_graph_type_data(): Collection is not empty.');
            result = await collection.findOneAndUpdate(
                {}, // An empty filter matches the first document in the collection
                { $set: { portfolio: JSON.stringify(portfolio_for_graph) } },
                { returnDocument: 'after' } // Return the updated document
            );
        
            // Retrieve the updated document
            const portfolio_in_db = await collection.findOne();
            const new_portfolio = {...portfolio_in_db}
            res.json(new_portfolio)
        }
    } finally {
        await client.close();
    }
}

app.get('/resetdb', (req, res) => {
    var i = 0;

    // First make the existing arrays NULL
    portfolio.splice(0,portfolio.length);
    Gusers.splice(0,Gusers.length);

    // Now copy the bkup data to the DB
    updateData_graph_type_data(req, res)
    portfolio = [...portfolio_for_graph];
    updateData()
    for (i=1; i<5; i++) {
        UpdateRealised(i)
    }  

    console.log("New Portfolio: ", portfolio);

   Gusers = [...bkup_users];
});

app.get('/users',(req,res) => {
    res.json(Gusers)
})

app.get('/dashboard',(req,res) => {
    if (req.session.username) {
        res.send('Welcome , $(req.session.username)')
    }
    //res.json(Gusers)
})

// Find the ipaddress dynamically and run the application

const execSync = require('child_process').execSync;
// ip_addr1 = execSync('/Users/santoshapullagura/Desktop/StockP/find_port.sh', { encoding: 'utf-8' });  // the default is 'buffer'
// ip_addr = ip_addr1.slice(0, -1);
const ip_addr = "127.0.0.1"
const port = 3001;

console.log('LOG: IP Address is: ', ip_addr, " Port is: ", port);

app.listen(port, ip_addr)

// To start mongodb
// goto: /Users/santoshapullagura/Desktop/Stock-Portfolio-Manager
// and execute "mongod --dbpath ./data/db"