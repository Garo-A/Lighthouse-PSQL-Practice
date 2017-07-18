const settings = require ('./settings');
const knex = require('knex')({
  client: 'pg',
  connection: {
    host :      settings.hostname,
    user :      settings.user,
    password :  settings.password,
    database :  settings.database
  }
});

const args = process.argv.slice(2);
const name = args[0];
console.log('name');


function getString(obj) {

  let string = `- ${obj.id}: ${obj.first_name} ${obj.last_name}, born ${obj.birthdate.toISOString().substring(0,10)}`
  return string;
}

// //Responsible for printing out everything.
// function printOutput(rowcount, output){
//   console.log(`Found ${rowcount} person(s) with name ${name}`);
//   console.log(output);
// }


knex.select('*').from('famous_people').where('first_name', name).orWhere('last_name',name)
.asCallback(function (err, rows){
  if (err) {
    console.log('Cannot get data');
    return;
  }
  console.log(`Found ${rows.length} person(s) with name ${name}`)
  for (let i = 0; i < rows.length; i++){
    console.log(getString(rows[i]));
  }
})
knex.destroy();