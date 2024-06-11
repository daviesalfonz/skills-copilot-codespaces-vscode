//create web server
const express = require('express');
const app = express();
const port = 3000;
const fs = require('fs');
const bodyParser = require('body-parser');
const path = require('path');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//get all comments
app.get('/comments', (req, res) => {
    fs.readFile('./comments.json', (err, data) => {
        if (err) {
            console.log('Error reading file');
            return res.status(500).send('Error reading file');
        }
        let comments = JSON.parse(data);
        res.send(comments);
    });
});

//get comments by id
app.get('/comments/:id', (req, res) => {
    fs.readFile('./comments.json', (err, data) => {
        if (err) {
            console.log('Error reading file');
            return res.status(500).send('Error reading file');
        }

        let comments = JSON.parse(data);
        let comment = comments.find(comment => comment.id == req.params.id);
        if (!comment) {
            res.status(404).send('Comment not found');
        }
        res.send(comment);
    });
});

//add comment
app.post('/comments', (req, res) => {
    fs.readFile('./comments.json', (err, data) => {
        if (err) {
            console.log('Error reading file');
            return res.status(500).send('Error reading file');
        }
        let comments = JSON.parse(data);
        let newComment = {
            id: comments.length + 1,
            name: req.body.name,
            comment: req.body.comment
        };
        comments.push(newComment);
        fs.writeFile('./comments.json', JSON.stringify(comments), (err) => {
            if (err) {
                console.log('Error writing file');
                return res.status(500).send('Error writing file');
            }
            res.send(newComment);
        });
    });
});

//update comment
app.put('/comments/:id', (req, res) => {
    fs.readFile('./comments.json', (err, data) => {
        if (err) {
            console.log('Error reading file');
            return res.status(500).send('Error reading file');
        }
        let comments = JSON.parse(data);
        let comment = comments.find(comment => comment.id == req.params.id);
        if (!comment) {
            res