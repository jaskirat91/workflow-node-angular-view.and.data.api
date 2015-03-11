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
angular.module('Autodesk.ADN.AngularView.View.Viewer',
    [
        'ngRoute',
        'ui-layout-events',
        'treeControl',
        'Autodesk.ADN.Toolkit.Viewer.Directive.Viewer',
        'Autodesk.ADN.AngularView.Navbar.ViewerNavbar',
        'Autodesk.ADN.AngularView.Control.Treeview'
    ])

    ///////////////////////////////////////////////////////////////////////
    //
    //
    ///////////////////////////////////////////////////////////////////////
    .config(['$routeProvider',

        function($routeProvider) {

            $routeProvider.when('/viewer', {
                templateUrl: './ui/views/viewer/viewer.html',
                controller: 'Autodesk.ADN.AngularView.View.Viewer.Controller'
            });
        }])

    ///////////////////////////////////////////////////////////////////////////
    //
    //
    ///////////////////////////////////////////////////////////////////////////
    .controller('Autodesk.ADN.AngularView.View.Viewer.Controller',

        function($scope, $http, $timeout) {

            ///////////////////////////////////////////////////////////////////
            //
            //
            ///////////////////////////////////////////////////////////////////
            function loadFromId(id) {

                if(id.length) {

                    $http.get($scope.API_URL + 'model/' + id)

                        .success(function(response) {

                            $scope.docUrn = response.model.urn;
                        });
                }
            }

            ///////////////////////////////////////////////////////////////////
            //
            //
            ///////////////////////////////////////////////////////////////////
            function initializeView() {

                $scope.tokenUrl = $scope.API_URL +
                    ($scope.staging ? 'tokenstg' : 'token');

                $scope.onGeometryLoaded = function (event) {

                    resize($scope.viewerLayoutMode);

                    $scope.$broadcast('viewer.geometry-loaded', {
                        viewer: event.target
                    });
                }

                $scope.onViewablePath= function(pathInfoCollection) {

                    $scope.$broadcast('viewer.viewable-path-loaded', {
                        pathInfoCollection: pathInfoCollection
                    });

                    if(pathInfoCollection.path3d.length > 0) {

                        $scope.selectedPath.push(
                            pathInfoCollection.path3d[0].path);

                        return;
                    }

                    if(pathInfoCollection.path2d.length > 0) {

                        $scope.selectedPath.push(
                            pathInfoCollection.path2d[0].path);

                        return;
                    }
                }

                $scope.onViewerInitialized = function (viewer) {

                    $scope.viewers.push(viewer);

                    $timeout(function(){

                        resize($scope.viewerLayoutMode);

                    }, 1000);

                    viewer.addEventListener(
                        Autodesk.Viewing.GEOMETRY_LOADED_EVENT,
                        $scope.onGeometryLoaded);
                }

                ///////////////////////////////////////////////////////////////////
                //
                //
                ///////////////////////////////////////////////////////////////////
                function resize(mode) {

                    var height = $('#viewer-container').height() - 50;

                    var width = $('#viewer-container').width();

                    var nb = $scope.selectedPath.length;

                    switch(mode) {

                        case 'VIEWER_LAYOUT_MODE_ROW_FITTED':

                                $scope.viewerConfig.height = height / nb + 'px';

                                $scope.viewerConfig.width = width + 'px';

                                $scope.viewerConfig.splitterHeight =
                                    $scope.viewerConfig.splitterSize + 'px';

                                $scope.viewerConfig.splitterWidth = width + 'px';

                            break;

                        case 'VIEWER_LAYOUT_MODE_ROW':

                            $scope.viewerConfig.height = height + 'px';

                            $scope.viewerConfig.width = width - 15 + 'px';

                            $scope.viewerConfig.splitterHeight =
                                $scope.viewerConfig.splitterSize + 'px';

                            $scope.viewerConfig.splitterWidth = width + 'px';

                            break;

                        case 'VIEWER_LAYOUT_MODE_COLUMN_FITTED':

                            $scope.viewerConfig.height = height + 'px';

                            $scope.viewerConfig.width = width / nb +
                                (1/nb - 1) * $scope.viewerConfig.splitterSize + 'px';

                            $scope.viewerConfig.splitterHeight = height + 'px';

                            $scope.viewerConfig.splitterWidth =
                                $scope.viewerConfig.splitterSize + 'px';

                            break;
                    }

                    $scope.viewers.forEach(function (viewer) {

                        viewer.resize();
                    })
                }

                ///////////////////////////////////////////////////////////////////
                //
                //
                ///////////////////////////////////////////////////////////////////
                $scope.$on('ui.layout.resize', function (event, data) {

                    resize($scope.viewerLayoutMode);
                });

                ///////////////////////////////////////////////////////////////////
                //
                //
                ///////////////////////////////////////////////////////////////////
                $scope.$on('viewer.viewable-path-selected',

                    function (event, data) {

                        $scope.selectedPath = data.selectedItems;
                    });

                ///////////////////////////////////////////////////////////////////
                //
                //
                ///////////////////////////////////////////////////////////////////
                $scope.$on('viewer.layout-mode-changed',

                    function (event, data) {

                        $scope.viewerLayoutMode = data.selectedLayoutMode;

                        resize($scope.viewerLayoutMode);
                    });
            }

            ///////////////////////////////////////////////////////////////////////
            //
            //
            ///////////////////////////////////////////////////////////////////////
            $scope.$parent.activeView = 'viewer';

            $scope.viewerContainerConfig = {

                environment: 'AutodeskProduction'
                //environment: 'AutodeskStaging'
            }

            $scope.viewerConfig = {

                viewerType: 'GuiViewer3D',
                //viewerType: 'Viewer3D'

                width: '100%',
                height: '100px',
                splitterSize: 2,
                splitterWidth: '2px',
                splitterHeight: '2px'
            }

            $scope.viewerLayoutMode = 'VIEWER_LAYOUT_MODE_ROW_FITTED';

            $scope.selectedPath = [];

            $scope.viewers = [];

            initializeView();

            loadFromId(Autodesk.Viewing.Private.getParameterByName("id"));
        });