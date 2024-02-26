require('dotenv').config();
var mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
  console.log('Database connection successful');
})
.catch((err) => {
  console.error('Database connection error');
});;

// new schema
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: Number,
  favoriteFoods : [String]
});

const Person = mongoose.model('Person', personSchema);


const createAndSavePerson = (done) => {
  const person = new Person({
    name: "John Doe",
    age: 30,
    favoriteFoods: ["Pizza", "Burgers"]
  });

  person.save((err, data) => {
    if (err) { return console.error(err);}
    console.log("Person saved successfully:", data);
    done(null, data); 
  });
};

const arrayOfPeople= [
  { name: "John", age: 30, favoriteFoods: ["Pizza", "Burgers"] },
  { name: "Jane", age: 25, favoriteFoods: ["Sushi", "Tacos"] },
  { name: "Bob", age: 40, favoriteFoods: ["Pasta", "Steak"] }
];
const createManyPeople = (arrayOfPeople, done) => {
   Person.create(arrayOfPeople, (err, data) => {
    if (err) {
      console.error(err);
      done(err);
    } else {
      console.log("People saved successfully:", data);
      done(null, data); 
    }
  });
};

const findPeopleByName = (personName, done) => {
  Person.find({name: personName},(err, data) => {
    if (err) {
      console.error(err);
      done(err);
    } else {
      console.log("Found the person:", data);
      done(null, data); 
    }
  })

};

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods:food},(err, data) => {
    if (err) {
      console.error(err);
      done(err);
    } else {
      console.log("person found successfully:", data);
      done(null, data); 
    }
  })
};

const findPersonById = (personId, done) => {
  Person.findById(personId,(err, data) => {
    if (err) {
      console.error(err);
      done(err);
    } else {
      console.log("person found successfully using id:", data);
      done(null, data); 
    }
  })
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  Person.findById(personId, (err, person) => {
    if (err) {
      console.error(err);
      return done(err);
    }
    person.favoriteFoods.push(foodToAdd);
    person.save((err, updatedPerson) => {
      if (err) {
        console.error(err);
        return done(err);
      }
      console.log("Person updated successfully:", updatedPerson);
      done(null, updatedPerson);
    });
  });


};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({name:personName},{ age:ageToSet}, { new: true }, (err, data) => {
    if (err) {
      console.error(err);
      done(err);
    } else {
      console.log("person found successfully using id:", data);
      done(null, data); 
    }
  })
};

const removeById = (personId, done) => {
  Person.findOneAndRemove({_id:personId},(err, data) => {
    if (err) {
      console.error(err);
      done(err);
    } else {
      console.log("person removed successfully using id:", data);
      done(null, data); 
    }
  })
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({name:nameToRemove}, (err, data) => {
    if (err) {
      console.error(err);
      done(err);
    } else {
      console.log("people removed successfully", data);
      done(null, data); 
    }
  })
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({ favoriteFoods: foodToSearch })
  .sort({ name: 1 }) 
  .limit(2) 
  .select({ age: 0 }) 
  .exec((err, data) => { 
    if (err) {
      console.error(err);
      return done(err);
    }
    
    console.log("People who like", foodToSearch + ":", data);
    done(null, data);
  });
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
