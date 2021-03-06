/**
 * Created by Mathijs on 2-1-2016.
 * c
 */
//modules
var express = require('express');
var router = express.Router();
var sql= require("../database/sql");
var hash=require("node_hash");
//getters
router.get('/', function(req, res) {
    sess= req.session;
    res.render('index');

});
router.get('/news', function(req, res) {
    if(req.session.username!=null){
        res.render('news',{
            username:req.session.username
    });
    }
    else{
           return res.redirect('/');
        }
});
router.get('/available', function(req, res) {
    sql.jobsQuery(function(result){
    res.render('available',{
        availableJobs: result
        });
    });
});
router.get('/jobsinarea', function(req, res) {
    res.render('jobsinarea');
});

router.get('/myProfile', function(req, res) {
    console.log(req.session.username)
    if(req.session.username!=null){
        sql.profileQuery(req.session.username, function(result){
            res.render('myProfile',{
                username:result[0].Username,
                firstName:result[0].First_name,
                lastName:result[0].Last_name,
                dateOfBirth:result[0].Date_of_birth.toLocaleString()
            });

        });

    }
    else{
        return res.redirect('/');
    }
});
router.get('/register', function(req, res) {
    res.render('register');
});
router.get('/createJob', function(req, res) {

        res.render('createJob',{
                 }
    );
});
//post
router.post('/', function(req, res){
    var user = req.body.username;
    var hashedPassword = hash.sha256(req.body.password);
    sql.loginQuery(user, function(result){
        if(result.length>0 && hashedPassword == result[0].Password){
            req.session.username=user;
            console.log('succes');
            res.render('news',{

                username: user
            });
        }else{
            console.log('wrongpass');
        };

    });
});
router.post('/register', function(req,res){

});

module.exports = router;