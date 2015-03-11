///////////////////////////////////////////////////////////////////////////////
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
///////////////////////////////////////////////////////////////////////////////
'use strict';

///////////////////////////////////////////////////////////////////////////////
//
//
///////////////////////////////////////////////////////////////////////////////
var AdnViewerApp = angular.module('Autodesk.ADN.AngularView.Main',
    [
        'ngRoute',
        'ui.bootstrap',
        'ui.layout',
        'mgcrea.ngStrap',     //AngularStrap
        'ngMdIcons',
        'Autodesk.ADN.AngularView.View.Home',
        'Autodesk.ADN.AngularView.View.Viewer',
        'Autodesk.ADN.Toolkit.UI.Directive.SpinningImg',
        'Autodesk.ADN.AngularView.Navbar.AppNavbar',
        'Autodesk.ADN.Toolkit.ViewData.Service.ViewData'
    ])

    ///////////////////////////////////////////////////////////////////////////
    //
    //
    ///////////////////////////////////////////////////////////////////////////
    .controller('Autodesk.ADN.AngularView.Main.Controller', function($scope) {

        $scope.activeView = '';

        $scope.staging = false;

        $scope.showNavbar = true;

        $scope.API_URL =  "http://" + window.location.host +
            '/node/angular-view/api/';
    })

    ///////////////////////////////////////////////////////////////////////////
    //
    //
    ///////////////////////////////////////////////////////////////////////////
    .config(function ($routeProvider, viewDataServiceProvider)
    {
        $routeProvider.otherwise({redirectTo: '/home'});

        viewDataServiceProvider.setTokenUrl("http://" +
            window.location.host + '/node/angular-view/api/token');
    });

