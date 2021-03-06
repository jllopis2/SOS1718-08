var express = require("express");
var bodyParser = require("body-parser");
//var DataStore = require("nedb");



var port = (process.env.PORT || 1607);
var BASE_API_PATH = "/api/v1";
//var dbCrimes = __dirname+"/contacts.db";//base de datos crimes (JOSE ENRIQUE)

var app = express();

app.use(bodyParser.json());
app.use("/",express.static(__dirname+"/public"));

//Sección ayuda recurso crimes (JOSE ENRIQUE)
app.get(BASE_API_PATH+"/helpcrimes",(req,res)=>{
    res.redirect("https://documenter.getpostman.com/view/3950150/collection/RVnZgdc1");
});


var crimes = [
        { "province": "almería", "year": 2007, "gender" : "male", "onecrime" : 7.01, "twocrime" : 1.48, "threecrime" : 0.35, "morethreecrime" : 0.15 },
        { "province": "málaga", "year": 2007, "gender" : "female", "onecrime" : 0.48, "twocrime" : 0.05, "threecrime" : 0.00, "morethreecrime" : 0.00 },
        { "province": "sevilla", "year": 2020, "gender" : "male", "onecrime" : 5.52, "twocrime" : 1.52, "threecrime" : 0.51, "morethreecrime" : 0.33  }
    ];
    
    
    
    
    
    
    //######################################################JOSE ENRIQUE############################################################//
   /* var db = new DataStore({//base de datos
     filename: dbFileName,
     autoload: true
    });
    
    db.find({},(err,contacts)=>{
        if(err){
            console.error(" Error accesing DB");
            process.exit(1);
        }
        if(contacts.length==0){
            console.log("Empty DB");
            db.insert(initialContacts);
        }else{
            console.log("DB initialized with "+contacts.length+" contacts");
        }
    });*/
    
    app.get(BASE_API_PATH+"/crimes-an",(req,res)=>{
        console.log(Date() + " - GET / crimes-an");
        res.send(crimes);
    });
    
    app.post(BASE_API_PATH+"/crimes-an",(req,res)=>{
        console.log(Date() + " - POST / crimes-an");
        var crime = req.body;
        crimes.push(crime);
        res.sendStatus(201);
    });
    
    //n
    app.put(BASE_API_PATH+"/crimes-an",(req,res)=>{
        console.log(Date() + " - PUT / crimes-an");
        res.sendStatus(405);
    });
    //n
    app.delete(BASE_API_PATH+"/crimes-an",(req,res)=>{
        console.log(Date() + " - DELETE / crimes-an");
        crimes = [];
        res.sendStatus(200);
    });
    
    //n a recurso concreto
    app.get(BASE_API_PATH+"/crimes-an/:province",(req,res)=>{
        var province = req.params.province;
        console.log(Date() + " - GET /crimes-an/"+province);
        
        res.send(crimes.filter((c)=>{
            return (c.province==province);
        })[0]);//el [0] es para devolver solo el primer elemento, aunque debería haber solo uno
    });
    //n a recurso concreto
    app.delete(BASE_API_PATH+"/crimes-an/:province",(req,res)=>{
        var province = req.params.province;
        console.log(Date() + " - DELETE /crimes-an/"+province);
       
        crimes = crimes.filter((c)=>{
         return (c.province!=province);    
        });
        
        res.sendStatus(200);
    });
    //n a recurso concreto
    app.post(BASE_API_PATH+"/crimes-an/:province",(req,res)=>{
        var province = req.params.province
        console.log(Date() + " - POST / crimes-an" + province);
        res.sendStatus(405);
    });
    //n a recurso concreto
    app.put(BASE_API_PATH+"/crimes-an/:province",(req,res)=>{
        var province = req.params.province;
        var crime = req.body;
        console.log(Date() + " - PUT /crimes-an/"+province);
        
       if(province != crime.province){
           res.sendStatus(409);
           console.warn(Date()+ " -Hacking attempt!");
           return;
       }
       
       crimes = crimes.map((c)=>{
           if(c.province == crime.province)
            return crime;
           else
            return c;
       });
       res.sendStatus(200);
    });
    //###########################################################################################################################//
    
    
    
    
    app.listen(port,()=>{
        console.log("Server ready on port" +port+"!");
    }).on("error",(e)=>{
        console.log("Server NOT READY:"+e);
    });
    
    console.log("Server setting up..");