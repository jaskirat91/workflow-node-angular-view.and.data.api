///////////////////////////////////////////////////////////////////////////
// Copyright (c) Autodesk, Inc. All rights reserved
// Written by Philippe Leefsma 2015 - ADN/Developer Technical Services
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
///////////////////////////////////////////////////////////////////////////
'use strict';

//////////////////////////////////////////////////////////////////////////
//
//
///////////////////////////////////////////////////////////////////////////
angular.module('Autodesk.ADN.AngularView.View.Home',
    [
        'ngRoute',
        'Autodesk.ADN.Toolkit.ViewData.Service.ViewData'
    ])

    ///////////////////////////////////////////////////////////////////////
    //
    //
    ///////////////////////////////////////////////////////////////////////
    .config(['$routeProvider',

        function($routeProvider) {

            $routeProvider.when('/home', {
                templateUrl: './ui/views/home/home.html',
                controller: 'Autodesk.ADN.AngularView.View.Home.Controller'
            });
        }])

    ///////////////////////////////////////////////////////////////////////////
    //
    //
    ///////////////////////////////////////////////////////////////////////////
    .controller('Autodesk.ADN.AngularView.View.Home.Controller',

        function($scope, $http, viewDataService) {

            $scope.$parent.activeView = 'home';

            $scope.items = [];

            ///////////////////////////////////////////////////////////////////
            //
            //
            ///////////////////////////////////////////////////////////////////
            function loadItems() {

                $http.get($scope.API_URL + 'models').success(function(response){

                    response.models.forEach(function(model) {

                        var fileId = viewDataService.client.fromBase64(
                            model.urn);

                        // set as default
                        model.thumbnail = "resources/img/adsk/adsk-128x128-32.png";

                        $scope.items.push(model);

                        viewDataService.client.getThumbnailAsync (
                            fileId,
                            function(data) {
                                model.thumbnail =
                                    "data:image/png;base64," + data;
                            });
                    })
                });
            }

            ///////////////////////////////////////////////////////////////////
            //
            //
            ///////////////////////////////////////////////////////////////////
            viewDataService.client.onInitialized(function() {

                loadItems();
            });
    });

