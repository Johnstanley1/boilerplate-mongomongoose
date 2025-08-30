require('dotenv').config();
const mongoose = require('mongoose');
const validator = require('validator');


mongoose.connect(process.env.MONGO_URI, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
});

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: { type: Number },
  countryOfOrigin: { type: String },
  favoriteFoods: { type: [String] }
});

let Person = mongoose.model('Person', personSchema);

const createAndSavePerson = (done) => {
  let person = new Person({
    name: "John",
    age: 30,
    countryOfOrigin: 'Nigeria',
    favoriteFoods: ["pizza", "salad"]
  });

  person.save().then((data)=>{
    return done(null, data);
  }).catch((err)=>{
    return done(err);
  });
  
  
};

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople).then((data)=>{
    return done(null, data);
  }).catch((err)=>{
    return done(err);
  })
 
};

const findPeopleByName = (personName, done) => {
  Person.find({name: personName}).then((data)=>{
    return done(null, data);
  }).catch((err)=>{
    return done(err);
  })
  
};

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: food}).then((data)=>{
    return done(null, data);
  }).catch((err)=>{
    return done(err);
  })
  
};

const findPersonById = (personId, done) => {
  Person.findById({_id: personId}).then((data)=>{
    return done(null, data);
  }).catch((err)=>{
    return done(err);
  })
  
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  Person.findById({_id: personId}, function(err, person){
    if (err) {
      return done(err);
    }
    else if (person){
      person.favoriteFoods.push(foodToAdd)
    }
    else {
      return done(null, null);
    }

    person.save().then((data)=>{
      return done(null, data);
    }).catch((err)=>{
      return done(err);
    })
  })
  
  //WebGLQuery
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  Person.findOneAndUpdate(
    {name: personName},
    {age: ageToSet},
    {new: true},
    function(err, data){
      if(err){
        done(err);
        return;
      }
      console.log(data);
      done(null, data);
    }
  )

};

const removeById = (personId, done) => {

  Person.findByIdAndRemove({_id: personId}).then((data)=>{
    return done(null, data)
  }).catch((err)=>{
    done(err);
  })
  
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  Person.remove({name: nameToRemove}).then((data)=>{
    return done(null, data)
  }).catch((err)=>{
    return done(err);
  })

};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  Person.find({favoriteFoods: foodToSearch})
  .sort({name: 1})
  .limit(2)
  .select({age: 0})
  .exec((err, data)=>{
    if(err){
      return done(err)
    }else{
      return done(null, data)
    }
  })
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
