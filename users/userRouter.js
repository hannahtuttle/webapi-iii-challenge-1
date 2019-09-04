const express = require('express');
const usersDB = require('./userDb.js')
//const postDB = require('../posts/postDb.js')

const router = express.Router();


router.post('/', (req, res) => {
    const newUser = req.body
    usersDB.insert(newUser)
    .then(result => {
        res.status(201).json(result)
    })
    .catch(error => {
        res.status(500).json({ error: "There was an error while saving the user to the database" })
    })

});

router.post('/:id/posts', (req, res) => {
    // const newPost = req.body
    // console.log(req.body)

    // usersDB.insert()
    // .then(result => {
    //     res.status(201).json(result)
    // })
    // .catch(error => {
    //     res.status(500).json({ error: "There was an error while saving the user to the database" })
    // })

});

router.get('/', (req, res) => {
    usersDB.get()
    .then(result => {
        res.status(200).json(result)})
    .catch(error => {
        res.status(500).json({ error: "The users information could not be retrieved." })
    })
});

router.get('/:id', (req, res) => {
    const {id} = req.params

    usersDB.getById(id)
    .then(result => {
        res.status(200).json(result)})
    .catch(error => {
        res.status(500).json({ error: "The users information could not be retrieved." })
    })

});

router.get('/:id/posts', (req, res) => {

    const id = req.params.id


        usersDB.getUserPosts(id)
        .then(com => {
            console.log('com in get', com)
            if(com.length >= 1){
                res.status(201).json(com)
               } else{
               res.status(404).json({ message: "The user with the specified ID does not exist." })    
               }
    })
    .catch(errer => 
        res.status(500).json({ error: "The posts information could not be retrieved." }))

});

router.delete('/:id', (req, res) => {
    const id = req.params.id
        
    usersDB.remove(id)
    .then(result => {
        if(result){
            res.status(200).json({message: 'user deleted succesfully'})
        }else{
            res.status(404).json({ message: "The user with the specified ID does not exist." })     
    }
})
.catch(error => {
    res.status(500).json({ error: "The user could not be removed" })
})

});

router.put('/:id', (req, res) => {
    const id = req.params.id
    const changes = req.body;

    usersDB.update(id, changes)
    .then(updated => {
        if(updated){
            res.status(200).json(updated)
        }
        else{
           res.status(404).json({ message: "The user with the specified ID does not exist." })
       }
    })
    .catch(error => {
        res.status(500).json({ error: "The user information could not be modified." })
})
    
});

//custom middleware

function validateUserId(req, res, next) {
    const {id} = req.params.id
    // if(){
    //     req.user = req.body
    // }


};

function validateUser(req, res, next) {

};

function validatePost(req, res, next) {

};

module.exports = router;
