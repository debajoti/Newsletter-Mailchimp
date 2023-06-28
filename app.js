const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const { log } = require("console");

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
 
app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html")
})

app.post("/",function(req,res){
    var firstName = req.body.fname;
    var lastName = req.body.lname;
    var email = req.body.email;

    var data ={
        members:[
            {
                email_address : email,
                status : "subscribed",
                merge_fields : {
                    FNAME : firstName,
                    LNAME : lastName,
                }
            }
        ]
    };

    const jsonData = JSON.stringify(data);

    const url = "https://us21.api.mailchimp.com/3.0/lists/230b21e84c"

    const options = {
        method: "POST",
        auth: "Newsletter:ef46d58d548b2656faa0bd3321fadfb7-us21"
    }

    const request = https.request(url, options, function(response){

        if(response.statusCode === 200){
            res.sendFile(__dirname + "/success.html");
        }else{
            res.sendFile(__dirname + "/failure.html");
        }
    })

    request.write(jsonData);
    request.end();
});

app.post("/failure", function(req, res){
    res.redirect("/");
});

app.listen(3000, function(){
    console.log("Server is running on port 3000");
})

//api key
// 568c04353d37f0ddb19ddac60923d933-us21
// audienc id - 230b21e84c