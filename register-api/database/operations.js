'use strict'
var db = require('./connection');
var _ = require('lodash');
var Promise = require('promise');
const fs = require('fs');

module.exports = {
    setDatabase: async () => {
        return new Promise(function (resolve, reject) {
            fs.readFile('./database/schema.sql', (error, data) => {
                if (error) throw error;
                console.log("\x1b[33m%s\x1b[0m", 'CREATING SCHEMA');
                db.pool.getConnection((err, connection) => {
                    if (err) {
                        console.log('Error' + JSON.stringify(err));
                        reject(err);
                        connection.release();
                    } else {
                        connection.query(data.toString('ascii'), (err, response) => {
                            if (err) throw err;
                            resolve(response);
                        });
                        connection.release();
                    }
                });

            });
        });
    },
    saveUserCredentials: async (credentials) => {
        return new Promise(function (resolve, reject) {
            db.pool.getConnection((err, connection) => {
                if (err) {
                    reject(err);
                    connection.release();
                } else {
                    connection.query(`INSERT INTO USER_DETAILS (USERNAME, PASSWORD) VALUES (${connection.escape(credentials.username)},${connection.escape(credentials.password)})`, (err, res) => {
                        connection.release();
                        if (err) {
                            reject(err);
                        }
                        resolve(res);
                    })
                }
            })
        })
    },
    saveUserDetails: async (details) => {
        return new Promise(function (resolve, reject) {
            db.pool.getConnection((err, connection) => {
                if (err) {
                    reject(err);
                    connection.release();
                } else {
                    connection.query(`UPDATE USER_DETAILS SET FIRSTNAME=${connection.escape(details.firstname)},LASTNAME=${connection.escape(details.lastname)},EMAIL=${connection.escape(details.email)} WHERE ID=${connection.escape(details.id)}`, (err, res) => {
                        connection.release();
                        if (err) {
                            reject(err);
                        }
                        resolve(res);
                    })
                }
            })
        })
    }
}