const express = require('express')
const mongoose = require("mongoose")
const config = require("config")
const app = express()
app.use(express.json())

/* Connect too the dataBase */

mongoose.connect(config.get("MONGO_URI"), { useNewUrlParser: true, useUnifiedTopology: true }),
    () => console.log("mongoose is connected")
/* Create Schema */

var Schema = mongoose.Schema;

var userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    age: Number,
    favoriteFoods: [String]
});

/* Setup User */ 

let User = mongoose.model('User', userSchema);

/* Create and save the user function  */

const createAndSaveUser = () =>{
   let u = new User({
     name: "Imen",
     age: 54,
     favoriteFoods: ['Citron', 'Ananas']
   });
 
   u.save((err, data) => {
     if (err)
       return console.log(err);
     return console.log(data);
   });
 }; 

/* Find User Function */
const findUser = function (food, userName) {

    let query1 = User.find({ name: userName })
    query1.exec(function (err, data) {
        if (err) return console.log(err)
        return console.log(data);
    });

    let query2 = User.findOne({ favoriteFoods: food })
    query2.exec(function (err, data) {
        if (err) return console.log(err)
        return console.log(data);
    });

    let query3 = User.findById({ _id: '60df9bd69caabb0680a9a69c' })
    query3.exec(function (err, data) {
        if (err) return console.log(err)
        return console.log(data);
    });

}
/* Find and update */
const findUserAndUpdate = function(personName, done) {
    let ageToSet = 20;
    User.findOneAndUpdate({name : personName } , {$set: {age: ageToSet}} ,{ new: true }, (err , data) => {
        if(err) console.log(err); 
        console.log(data);
    });
  
  };

/* Find and delete */
 
const findUserAndDelete= function(id){

    let query=User.findOneAndDelete({_id : id})
      query.exec(function(err,data){
          if(err) return console.log(err)
          return console.log(data)
      });
}



/* Remove with name */

const findUserAndRemove= function(userName){
    let query = User.deleteMany({name: userName})
      query.exec(function(err,data){
          if(err) return console.log(err)
          return console.log(data)
      })
}


/* Chain search query */

const chainQuery = function(){
    var foodToSearch = "Banana";
    var food = {favoriteFoods : foodToSearch};
    User.find(food).sort({name: 1}).limit(2).select({age: 0}).exec((err, data) => {
      (err) ? console.log(err) : console.log(data); 
    })
  };

/* Export Functions */

module.exports =search= {
    //createAndSaveUser,
    findUser,
    findUserAndUpdate,
    findUserAndDelete,
    findUserAndRemove,
    chainQuery

 }
