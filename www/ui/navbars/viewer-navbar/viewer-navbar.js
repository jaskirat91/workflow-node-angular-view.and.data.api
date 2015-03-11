/**
 * Created by leefsmp on 2/27/15.
 */

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
angular.module('Autodesk.ADN.AngularView.Navbar.ViewerNavbar',
    [
        'mgcrea.ngStrap.tooltip',
        'mgcrea.ngStrap.helpers.parseOptions'
    ])

    ///////////////////////////////////////////////////////////////////////////
    //
    //
    ///////////////////////////////////////////////////////////////////////////
    .controller('Autodesk.ADN.AngularView.Navbar.ViewerNavbar.Controller',

        function($scope, $sce) {

            $scope.items = [];

            $scope.selectedItems = [];

            $scope.modes = [{
                value: 'VIEWER_LAYOUT_MODE_ROW_FITTED',
                label: $sce.trustAsHtml('Layout Mode: Row - Fitted')
            },
            {
                value: 'VIEWER_LAYOUT_MODE_ROW',
                label: $sce.trustAsHtml('Layout Mode: Row')
            },
            {
                value: 'VIEWER_LAYOUT_MODE_COLUMN',
                label: $sce.trustAsHtml('Layout Mode: Column')
            }];

            $scope.selectedLayoutMode = $scope.modes[0].value;

            ///////////////////////////////////////////////////////////////////
            //
            //
            ///////////////////////////////////////////////////////////////////
            $scope.$watch('selectedLayoutMode', function() {

                $scope.$emit(
                    'viewer.layout-mode-changed',
                    { selectedLayoutMode: $scope.selectedLayoutMode});
            });

            ///////////////////////////////////////////////////////////////////
            //
            //
            ///////////////////////////////////////////////////////////////////
            $scope.$watch('selectedItems', function() {

                $scope.$emit(
                    'viewer.viewable-path-selected',
                    { selectedItems: $scope.selectedItems});
            });

            ///////////////////////////////////////////////////////////////////
            //
            //
            ///////////////////////////////////////////////////////////////////
            $scope.$on('viewer.viewable-path-loaded', function (event, data) {

                var idx2d = 1;

                data.pathCollection.path2d.forEach(function(path2d) {

                    $scope.items.push({
                        value: path2d,
                        label: $sce.trustAsHtml('Path 2d : ' + idx2d++)
                    });
                });

                var idx3d = 1;

                data.pathCollection.path3d.forEach(function(path3d) {

                    $scope.items.push({
                        value: path3d,
                        label: $sce.trustAsHtml('Path 3d : ' + idx3d++)
                    });
                });
            });

            ///////////////////////////////////////////////////////////////////
            //
            //
            ///////////////////////////////////////////////////////////////////
    });





