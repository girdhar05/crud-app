const express = require('express');
const Student = require('../models/student');
const router = express.Router();

// post request handler
router.post('/student', (req, res) => {
    const studentData = new Student(req.body);
    studentData.save()
        .then(() => {
            console.log('data saved to the database')
        })
    res.redirect('/student');
})

// get request handler
router.get('/student', (req, res) => {
    Student.find()
        .then(data => {
            console.log(data);
            res.render('student', {
                studentData: data
            });
        })
        .catch(err => {
            console.log(err);
        })
    
})

// put request handler
router.get('/student/update/:id', (req, res) => {
    Student.findById(req.params.id)
        .then(data => {
            console.log(data);
            res.render('update', {
                studentData: data
            })
        })
        .catch(err => {
            console.log(err);
        })
})

// re-saving the student data ----- update the student data
router.post('/student/update', (req, res) => {
    console.log(req.body.studentId)
    const data = {
        name: req.body.name,
        address: req.body.address,
        pincode: req.body.pincode,
        mobile: req.body.mobile,
        email: req.body.email
    }
    Student.findByIdAndUpdate(req.body.studentId, data, (result) => {
        console.log(result);
        res.redirect('/student');
    })
})

// delete request handler
router.get('/student/:id', (req, res) => {
    Student.findByIdAndDelete(req.params.id, (result) => {
        console.log(result);
        res.redirect('/student');
    })
})



module.exports = router;