/**
 * Created by Mathijs on 2-1-2016.
 * c
 */
/**
 * modules
 * @type {exports|module.exports}
 */
var mysql      = require('mysql');

/**
 * Stores several variables with necesarry data needed to intereact with SQL database
 */
var pool = mysql.createPool({
    host     : '62.84.240.162',
    user     : 'potv170480_joost',
    password : 'vechtkip',
    database : 'potv170480_refugenius'
});
var sqlData = function(){
var loginQuery = function(input,callback) {

    pool.getConnection(function (err, connection) {
        if (!err)
            var sql = 'SELECT `Password` FROM `User` WHERE `Username` ='+ '\''+ input + '\'';
        sql = mysql.format(sql);
        connection.query(sql, function (err, rows) {
            if (!err)
                connection.release();
            callback(rows);
        });
    });
};

var profileQuery = function(input, callback){

    pool.getConnection(function (err, connection) {
        if (!err)
            var sql = 'SELECT * FROM `User` WHERE `Username` ='+ '\''+ input + '\'';
        sql = mysql.format(sql);
        connection.query(sql, function (err, rows) {
            if (!err)
                connection.release();
            callback(rows);
        });
    });
};

var jobsQuery=function(callback){
    pool.getConnection(function(err, connection){
        if(!err)
            var sql = 'SELECT * FROM `Jobs`';
        sql = mysql.format(sql);
        connection.query(sql, function (err, rows) {
            if (!err)
                connection.release();
            callback(rows);
        });
    })
}
    return{
        loginQuery:loginQuery,
        profileQuery: profileQuery,
        jobsQuery:jobsQuery

    };
}();

module.exports = sqlData;