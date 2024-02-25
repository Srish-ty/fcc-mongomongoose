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
  done(null /*, data*/);
};

const findOneByFood = (food, done) => {
  done(null /*, data*/);
};

const findPersonById = (personId, done) => {
  done(null /*, data*/);
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  done(null /*, data*/);
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  done(null /*, data*/);
};

const removeById = (personId, done) => {
  done(null /*, data*/);
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  done(null /*, data*/);
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  done(null /*, data*/);
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
