const settings = require('./settings');
const knex = require('knex')({
  client : 'pg',
  connection: {
    host :     settings.hostname,
    user :     settings.user,
    password : settings.password,
    database : settings.database
  }
});

console.log("Connected to Database");

let args = process.argv.slice(2);
const first = args[0]
const last = args[1]
const date = args[2]

knex('famous_people').insert({
  first_name : first,
  last_name : last,
  birthdate: date
}).asCallback(function(err, rows) {

  if(err) {
    console.log("Cannot add to DB")
    return;
  }
  console.log(rows);
})

knex.destroy();