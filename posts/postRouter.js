const express = require('express');
const postDB = require('./postDb.js')

const router = express.Router();

router.get('/', (req, res) => {
    postDB.get()
    .then(result => {
        res.status(200).json(result)})
    .catch(error => {
        res.status(500).json({ error: "The post information could not be retrieved." })
    })
});

router.get('/:id',validatePostId, (req, res) => {
    const {id} = req.params

    postDB.getById(id)
    .then(result => {
        res.status(200).json(result)})
    .catch(error => {
        res.status(500).json({ error: "The post information could not be retrieved." })
    })
});

router.delete('/:id',validatePostId,  (req, res) => {
    const id = req.params.id
        
    postDB.remove(id)
    .then(result => {
            res.status(200).json({message: 'post deleted succesfully'})
})
.catch(error => {
    res.status(500).json({ error: "The post could not be removed" })
})
});

router.put('/:id', validatePostId, (req, res) => {
    const id = req.params.id
    const changes = req.body;

    postDB.update(id, changes)
    .then(updated => {
            res.status(200).json(updated)
    })
    .catch(error => {
        res.status(500).json({ error: "The user information could not be modified." })
})
});

// custom middleware

function validatePostId(req, res, next) {
    const {id} = req.params

    postDB.getById(id)
    .then(postid => {
        if(postid){
            req.post = req.body
        }else{
            res.status(400).json({ message: "invalid post id" })
        }
    })

    next()
};

module.exports = router;