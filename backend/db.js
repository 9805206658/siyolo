const mysql=require('mysql');
const db=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'siyolo'
});
db.connect((err)=>
{
    if(err)
        {
            throw err;
        }
        console.log('mysql connected..........');
})
module.exports=db;