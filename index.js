const { response } = require('express');
const express = require('express');
const { request } = require('http');
var app = express();
const mysql = require('mysql');

var dbConnection = mysql.createConnection({ host: 'localhost', user: 'root', password: '', database: 'test'});

dbConnection.connect((error) => {
    if(!error)
      console.log('...');
    else 
      console.log('db connection failed');
});

app.listen(3000, console.log('node working'));

// home page route
app.get('/',(request,response) => {
    response.send("<h1>Home Page</h1>");
});

// show student list (read)
app.get('/students', (request, response) => {
    dbConnection.query("SELECT * FROM `student`", (error, rows) => {
        if(!error)
          response.send(rows);
        else
          console.log('the query is wrong');  
    });
});

// add new student (create | insert)
app.post('/student', (request, response) => {
    dbConnection.query("INSERT INTO `student` VALUES(NULL, 'mauro','engenier','europe')", (error) => {
        if(!error)
          response.send('a new student added into database successfully');
        else
          console.log('the query is wrong');  
    });
});

// update 
app.put('/update/:id', (request, response) => {
    dbConnection.query("UPDATE `student` SET name='uzma' WHERE id=?",[request.params.id], (error)=>{
        if(!error)
            response.send('Data updated successfully');
        else
           console.log('the query is wrong');    
    });
});

// delete (and by use this route finish crud(create, read, update, delete) operation)
app.delete('/delete/:id', (request, response) => {
    dbConnection.query("DELETE FROM `student` WHERE id=?",[request.params.id], (error) =>{
        if(!error)
           response.send('Deleted one row from student table');
        else
           console.log('the query is wrong');   
    });
});