///////////////////////////////////////////////////////////////////////////
// Copyright © 2014 Esri. All Rights Reserved.
//
// Licensed under the Apache License Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
///////////////////////////////////////////////////////////////////////////

define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'jimu/BaseWidget',
    'dojo/_base/html',
    'dojo/dom-construct'
  ],
  function(
    declare,
    lang,
    BaseWidget,
    html,
    domConstruct) {
    var clazz = declare([BaseWidget], {

      name: 'MapLoader',
      baseClass: 'jimu-widget-maploader',

      startup: function() {		
		this.inherited(arguments);

        this.loading = domConstruct.create("div",{"className":"loader LocateButton", innerHTML:'<img title="Chargement des données..." src="'+this.folderUrl+'/css/loading.gif" />'});
        html.place(this.loading, this.domNode);
		esri.hide(this.loading);
		
		this.showLoading = lang.hitch(this, this.showLoading);
		this.hideLoading = lang.hitch(this, this.hideLoading);
		
		this.startListening();
      },
	  startListening:function(){		 
		 this.map.on("update-start", this.showLoading);
	     this.map.on("update-end", this.hideLoading);
	  },
	  showLoading: function() {
		// console.log(" -> show loading");
		esri.show(this.loading);
		// this.map.disableMapNavigation();
		// this.map.hideZoomSlider();
	  },

	  hideLoading:function() {
		// console.log(" -> hide loading");
		esri.hide(this.loading);
		// this.map.enableMapNavigation();
		// this.map.showZoomSlider();
	  }

    });
    return clazz;
  });