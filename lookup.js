const pg = require ('pg');
const settings = require ('./settings');

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

const args = process.argv.slice(2);
const name = args[0];
console.log(name);

//Take result of query and formats it as shown in exercise.
function getString(obj) {

  let string = `- ${obj.id}: ${obj.first_name} ${obj.last_name}, born ${obj.birthdate}`
  return string;
}

//Responsible for printing out everything.
function printOutput(rowcount, output){
  console.log(`Found ${rowcount} person(s) with name ${name}`);
  console.log(output);
}

client.connect(function(err) {
  if (err) {
    console.log ("Error Connecting to DB")
    return;
  };

  console.log("Searching ...");

  const query = `SELECT * FROM famous_people WHERE first_name = '${name}' OR last_name = '${name}';`

  client.query(query, function(err, result){
    if (err) {
      console.log("NOPE");
    }
    printOutput(result.rowCount, getString(result.rows[0]));
    client.end();
  })

});