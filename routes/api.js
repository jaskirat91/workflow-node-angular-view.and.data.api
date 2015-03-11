/////////////////////////////////////////////////////////////////////////////////
// Copyright (c) Autodesk, Inc. All rights reserved
// Written by Philippe Leefsma 2014 - ADN/Developer Technical Services
//
// Permission to use, copy, modify, and distribute this software in
// object code form for any purpose and without fee is hereby granted,
// provided that the above copyright notice appears in all copies and
// that both that copyright notice and the limited warranty and
// restricted rights notice below appear in all supporting
// documentation.
//
// AUTODESK PROVIDES THIS PROGRAM "AS IS" AND WITH ALL FAULTS.
// AUTODESK SPECIFICALLY DISCLAIMS ANY IMPLIED WARRANTY OF
// MERCHANTABILITY OR FITNESS FOR A PARTICULAR USE.  AUTODESK, INC.
// DOES NOT WARRANT THAT THE OPERATION OF THE PROGRAM WILL BE
// UNINTERRUPTED OR ERROR FREE.
/////////////////////////////////////////////////////////////////////////////////
var credentials = require('../credentials');
var credentialsStg = require('../credentials-stg');

var express = require('express');
var request = require('request');

var router = express.Router();

///////////////////////////////////////////////////////////////////////////////
// Generates access token (production)
//
///////////////////////////////////////////////////////////////////////////////
router.get('/token', function (req, res) {

    var params = {
        client_id: credentials.ClientId,
        client_secret: credentials.ClientSecret,
        grant_type: 'client_credentials'
    }

    request.post(
        credentials.BaseUrl + '/authentication/v1/authenticate',
        { form: params },

        function (error, response, body) {

            if (!error && response.statusCode == 200) {

                res.send(body);
            }
        });
});

///////////////////////////////////////////////////////////////////////////////
// Generates access token (staging)
//
///////////////////////////////////////////////////////////////////////////////
router.get('/tokenstg', function (req, res) {

    var params = {
        client_id: credentialsStg.ClientId,
        client_secret: credentialsStg.ClientSecret,
        grant_type: 'client_credentials'
    }

    request.post(
        credentialsStg.BaseUrl + '/authentication/v1/authenticate',
        { form: params },

        function (error, response, body) {

            if (!error && response.statusCode == 200) {

                res.send(body);
            }
        });
});


var models = {};

models['id1'] = {
    id: 'id1',
    urn: "dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6YWRuLTE3LjA3LjIwMTQtMTAuNTYuMTYvRW5naW5lLmR3Zg==",
    name: 'Project 1',
    subheading: 'Subheading1',
    description: 'A thermic engine'
};

models['id2'] = {
    id: 'id2',
    urn: "dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6YWRuLXZpZXdlci1nYWxsZXJ5LzgzNjMtZjBiNy0yMDFmLTM1OTktZDlhZi5zdHA=",
    name: 'Project 2',
    subheading: 'V8 Engine',
    description: 'A v8 Engine'
};

models['id3'] = {
    id: 'id3',
    urn: "dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6YWRuLXZpZXdlci1nYWxsZXJ5L2YzNmQtOTA5ZS1jNjIzLTMxOGEtZmUxNC5TVEVQ",
    name: 'Project 3',
    subheading: 'Plane engine',
    description: 'A plane engine'
};

models['id4'] = {
    id: 'id4',
    urn: "dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6YWRuLTAxLjAzLjIwMTUtMDAuMjEuMjcvU3RvY2tiZXR0LmR3Zw==",
    name: 'Project 4',
    subheading: 'Drawing',
    description: 'Multiple viewables'
};

models['id5'] = {
    id: 'id5',
    urn: "dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6YWRuLTAxLjAzLjIwMTUtMDAuMjEuMjcvcmV2aXRfYmFzaWMucnZ0",
    name: 'Project 5',
    subheading: 'Revit',
    description: 'Multiple viewables'
};


router.get('/models', function (req, res) {

    var response = {
        models: []
    };

    for (var id in models) {

        response.models.push(models[id]);
    }

    res.status(200);
    res.send(response);
});

router.get('/model/:id', function (req, res) {

    var id = req.params.id;

    var response = {
        model: models[id]
    };

    res.status(200);
    res.send(response);
});

module.exports = router;
