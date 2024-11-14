//create web server
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const commentsPath = path.join(__dirname, 'comments.json');
app.use(bodyParser.json());
app.use(express.static('public'));
//get all comments
app.get('/comments', (req, res) => {
    fs.readFile(commentsPath, (err, data) => {
        if (err) {
            res.status(500).send('Internal Server Error');
        }
        res.send(JSON.parse(data));
    });
});
//add a new comment

app.post('/comments', (req, res) => {
    fs.readFile(commentsPath, (err, data) => {
        if (err) {
            res.status(500).send('Internal Server Error');
        }
        const comments = JSON.parse(data);
        comments.push(req.body);
        fs.writeFile(commentsPath, JSON.stringify(comments), (err) => {
            if (err) {
                res.status(500).send('Internal Server Error');
            }
            res.send('Comment added');
        });
    });
}
);
//delete a comment
app.delete('/comments/:id', (req, res) => {
    fs.readFile(commentsPath, (err, data) => {
        if (err) {
            res.status(500).send('Internal Server Error');
        }
        const comments = JSON.parse(data);
        const filteredComments = comments.filter(comment => comment.id !== req.params.id);
        fs.writeFile(commentsPath, JSON.stringify(filteredComments), (err) => {
            if (err) {
                res.status(500).send('Internal Server Error');
            }
            res.send('Comment deleted');
        });
    });
});

