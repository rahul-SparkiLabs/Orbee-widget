var viewer;
var imageObjectExterior;
var imageObjectInterior;
var imagesTabExterior = [];
var imagesTabInterior = [];
var imagesSmallExterior = [];
var imagesMediumExterior = [];
var imagesLargeExterior = [];
var imagesThumbsExterior = [];
var imagesSmallInterior = [];
var imagesMediumInterior = [];
var imagesLargeInterior = []; 
var imagesThumbsInterior = [];
var imagesTabThumbsExterior = [];
var imagesTabThumbsInterior = [];
var imgId;
var viewer360;

/* function loaded at the start */
$(function(){
	
	grabParams();
	/* tabs function on click for tabs*/
	$('#desc div:not(:first)').hide();
	
	$('#tabs li').click(function(event){
		
		$("#myDiv1").hide();
		var id = $(event.target).index();
		console.log("clicked"+id);
		$('.active').removeClass('active');
		$(event.target).addClass('active');
		$('#desc div').hide().eq(id).show();
		/* if id=1 means image table and else(id=0 means 360 player) */
		if(id == 1){
			/* if there are no elements in the player add elements*/
			if ($('.pgwSlideshow').find('ul').length == 0)
				imageCarousel();
			$('.banner1').hide();
			$('.banner').hide();
			$('#myDiv').hide();
			$('.slides').show();
			$('.pgwSlideshow').show();
			$('.ps-current').show();
			$('.ps-list').show();
			$('.logo').show();
		}else{
			$('#myDiv').show();
			$('.banner1').show();
			$('.banner').show();
			$('.logo').show();
		}
	
	})
	console.log("tabs created");
	 /*       $(document).ready(
            function(){
                $('.slide-current .elt-1 img').click(
                    function( event ){
                        var scale = 150/100;
                        var pos = $(this).offset();
                        var clickX = event.pageX - pos.left;
                        var clickY = event.pageY - pos.top;
                        var container = $(this).parent().get(0);

                        $(this).css({
                                        width: this.width*scale, 
                                        height: this.height*scale
                                    });

                        container.scrollLeft = ($(container).width() / -2 ) + clickX * scale;
                        container.scrollTop = ($(container).height() / -2 ) + clickY * scale;
                    }
                );
            }
        ); */
		
});

	$(document).function
	/* function to Grab the parameter(key) in the url*/
	function grabParams(){
		
		var vars = [], hash;
		/* get the key in the url*/
		var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
		
		for(var i = 0; i < hashes.length; i++)
		{
			hash = hashes[i].split('');
			vars.push(hash[0]);
			vars[hash[0]] = hash[1];
		}

		console.log("Vars are "+vars);
		console.log("Hash is "+hash);
		console.log("Hashes are "+hashes);
		grabJsonExterior(hash);
		grabJsonInterior(hash);

	};

	/* function to parse the json for exterior*/
	function grabJsonExterior(key){
		
		$.getJSON('https://www.orbee360.com/demo/'+key+'/exterior').done(function(data) {
			console.log(data);
			imageObjectExterior = data;
			createImageElementExterior();
		});

	};

	/*function to parse the json for interior*/
	function grabJsonInterior(key){

		$.getJSON('https://www.orbee360.com/demo/'+key+'/interior').done(function(data) {
			console.log(data);
			imageObjectInterior = data;
			createImageElementInterior();
		});
	
	};

	/* function to add all url of images for exterior 360 viewer and exterior images into respective arrays*/
	function createImageElementExterior(){
		/* Exterior 360 images*/
		for (var i = 0; i<imageObjectExterior.media.exterior360.images.length;i++){
			if(imageObjectExterior.media.exterior360.images[i].imageId == "sprite" ){
				continue;
			}
			imagesThumbsExterior.push(imageObjectExterior.media.exterior360.images[i].thumbs.info.url);
		}
	
		for (var i = 0; i<imageObjectExterior.media.exterior360.images.length;i++){
			if(imageObjectExterior.media.exterior360.images[i].imageId == "sprite"){
				continue;
			}
			imagesSmallExterior.push(imageObjectExterior.media.exterior360.images[i].small.info.url);
		}
		
		for (var i = 0; i<imageObjectExterior.media.exterior360.images.length;i++){
			if(imageObjectExterior.media.exterior360.images[i].imageId == "sprite"){
				continue;
			}
			imagesMediumExterior.push(imageObjectExterior.media.exterior360.images[i].medium.info.url);
		}
		
		for (var i = 0; i<imageObjectExterior.media.exterior360.images.length;i++){
			if(imageObjectExterior.media.exterior360.images[i].imageId == "sprite"){
				continue;
			}
			imagesLargeExterior.push(imageObjectExterior.media.exterior360.images[i].large.info.url);
		}

		/*Exterior Images for Images Tab*/
		for(var i=0; i< imageObjectExterior.media.exteriorImages.images.length ; i++){
			console.log("Inside exterior images tabs"+i);
			imagesTabExterior.push(imageObjectExterior.media.exteriorImages.images[i].small.info.url);
		}
		
		for (var i = 0; i<imageObjectExterior.media.exteriorImages.images.length;i++){
			console.log("Inside exterior images tabs"+i);
			if(imageObjectExterior.media.exteriorImages.images[i].imageId == "sprite" ){
				continue;
				}
			imagesTabThumbsExterior.push(imageObjectExterior.media.exteriorImages.images[i].thumbs.info.url);
		}
		/* Call the exterior function to load images for the first time*/
		exterior();		
	};


	/* function to add all url of images for interior 360 viewer into respective arrays*/
	function createImageElementInterior(){
		/* Interior 360 images*/
		for (var i = 0; i<imageObjectInterior.media.interior360.images.length;i++){
			if(imageObjectInterior.media.interior360.images[i].imageId == "sprite" ){
				continue;
			}
			imagesThumbsInterior.push(imageObjectInterior.media.interior360.images[i].thumbs.info.url);
		}

		for (var i = 0; i<imageObjectInterior.media.interior360.images.length;i++){
			if(imageObjectInterior.media.interior360.images[i].imageId == "sprite"){
				continue;
			}
			imagesSmallInterior.push(imageObjectInterior.media.interior360.images[i].small.info.url);
		}

		for (var i = 0; i<imageObjectInterior.media.interior360.images.length;i++){
			if(imageObjectInterior.media.interior360.images[i].imageId == "sprite"){
				continue;
			}
			imagesMediumInterior.push(imageObjectInterior.media.interior360.images[i].medium.info.url);
		}

		for (var i = 0; i<imageObjectInterior.media.interior360.images.length;i++){
			if(imageObjectInterior.media.interior360.images[i].imageId == "sprite"){
				continue;
			}
			imagesLargeInterior.push(imageObjectInterior.media.interior360.images[i].large.info.url);
		}

		/*Interior Images for Images Tab*/
		for(var i=0; i< imageObjectInterior.media.interiorImages.images.length ; i++){

			imagesTabInterior.push(imageObjectInterior.media.interiorImages.images[i].small.info.url);
		}

		for (var i = 0; i<imageObjectInterior.media.interiorImages.images.length;i++){
			if(imageObjectInterior.media.interiorImages.images[i].imageId == "sprite" ){
				continue;
			}
			imagesTabThumbsInterior.push(imageObjectInterior.media.interiorImages.images[i].thumbs.info.url);
		}
		
	};

	/* function to load play exterior 360 viewer on click of exterior button*/ 
	function exterior(){

		$("#myDiv1").hide();			
		
		for(var i = 0; i<imagesSmallExterior.length; i++){
			console.log("imagesSmallExterior["+i+"]:::"+imagesSmallExterior[i]);
			console.log("imagesLargeExterior["+i+"]:::"+imagesLargeExterior[i]);
			console.log("imagesThumbsExterior["+i+"]:::"+imagesThumbsExterior[i]);
			$("#new").append('<ul id="'+i+'"><li data-small-image-path="'+imagesSmallExterior[i]+'"></li> <li data-large-image-path ="'+imagesMediumExterior[i]+'"></li> <li data-navigator-image-path ="'+imagesThumbsExterior[i]+'"></li> </ul> ');
		}
		
		$("#myDiv").show();
		
		setupGrid();
		$(".banner").show();
		$(".banner1").show();
	};

	/* function to load play interior 360 viewer on click of interior button*/ 
	function interior(){

		console.log("In interior");
		$("#myDiv").hide();
		console.log("Is it reaching here");
		console.log("length:::"+imagesSmallInterior.length);
		
		for(var i = 0; i < imagesSmallInterior.length; i++){
			console.log("imagesSmallInterior["+i+"]:::"+imagesSmallInterior[i]);
			console.log("imagesLargeInterior["+i+"]:::"+imagesLargeInterior[i]);
			console.log("imagesThumbsInterior["+i+"]:::"+imagesThumbsInterior[i]);
			$("#viewerPlaylistAndSkin1").find("#new1").append('<ul id="'+i+'"><li data-small-image-path="'+imagesSmallInterior[i]+'"></li> <li data-large-image-path ="'+imagesMediumInterior[i]+'"></li> <li data-navigator-image-path ="'+imagesThumbsInterior[i]+'"></li> </ul> ');
		}
		
		$("#myDiv1").show();
		setupGrid1();
	};

	function imageCarousel(){

		console.log("imageCarousel::: length:::"+imagesTabExterior.length);
		console.log("imageCarousel::: length:::"+imagesTabInterior.length);



		for(var i=0; i<imagesTabInterior.length; i++){
			$('.pgwSlideshow').append('<li><img src='+imagesTabThumbsInterior[i]+' data-large-src='+imagesTabInterior[i]+'  style="width:80px; height:60px;"></li>');
		}

		for(var j=0; j<imagesTabExterior.length; j++){
			$('.pgwSlideshow').append('<li><img src='+imagesTabThumbsExterior[j]+' data-large-src='+imagesTabExterior[j]+' style="width:80px; height:60px;""></li>');
		}
		$('.pgwSlideshow').pgwSlideshow({
			adaptiveHeight: true,
			verticalCentering: true
		});

		var myElements = document.querySelectorAll(".ps-list ul");
 
		for (var i = 0; i < myElements.length; i++) {
    		myElements[i].style.maxHeight = 100;
		}



	}

	/* function to setup exterior viewer 360 -easy360*/
	function setupGrid(){
		
		viewer =  new FWDViewer({
			//----main----//
			divHolderId:"myDiv",
			playListAndSkinId:"viewerPlaylistAndSkin",
			displayType:"responsive",
			preloaderText:"Loading 3D object:",
			startDraggingMode:"rotate",
			showLargeImageVersionOnZoom:"yes",
			useEntireScreenFor3dObject:"no",
			addCorrectionForWebKit:"yes",
			addDragAndSpinSupport:"yes",
			startAtImage:0,
			imageWidth:800,
			imageHeight:600,
			zoomFactor:4,
			dragRotationSpeed:.7,
			dragAndSpinSpeed:.6,
			buttonsRotationSpeed:300,
			slideShowDelay:300,
			backgroundColor:"#333333",
			preloaderFontColor:"#585858",
			preloaderBackgroundColor:"#333333",
			//----lightbox-----//
			lightBoxWidth:800,
			lightBoxHeight:600,
			lightBoxBackgroundOpacity:.8,
			lightBoxBackgroundColor:"#333333",
		//----controller----//
			buttons:"rotate, pan, roteteleft, rotateright, scrollbar, play, info, link, fullscreen",
			buttonsToolTips:"Rotate, Move/Pan, Rotate left, Rotate right, Zoom level: , Play/Pause, Info, Custom link, Full screen/Normal screen",
			controllerPosition:"bottom",
			inverseNextAndPrevRotation:"yes",
			addKeyboardSupport:"yes",
			slideShowAutoPlay:"no",
			startSpaceBetweenButtons:10,
			spaceBetweenButtons:10,
			startSpaceForScrollBarButtons:20,
			startSpaceForScrollBar:6,
			hideControllerDelay:3,
			controllerMaxWidth:900,
			controllerBackgroundOpacity:1,
			controllerOffsetY:0,
			scrollBarOffsetX:0,
			scrollBarHandlerToolTipOffsetY:4,
			zoomInAndOutToolTipOffsetY:-4,
			buttonsToolTipOffsetY:0,
			link:"http://www.google.com",
			buttonToolTipFontColor:"#585858",
			//----navigator----//
			showNavigator:"yes",
			navigatorPosition:"topright",
			navigatorOffsetX:6,
			navigatorOffsetY:6,
			navigatorHandlerColor:"#FF0000",
			navigatorBorderColor:"#AAAAAA",
			//----info window----//
			infoWindowBackgroundOpacity:.6,
			infoWindowBackgroundColor:"#FFFFFF",
			infoWindowScrollBarColor:"#585858",
			//----markers-----//
			showMarkersInfo:"no",
			markerToolTipOffsetY:2,
			toolTipWindowMaxWidth:500,
			//----context menu----//
			showScriptDeveloper:"yes",
			contextMenuLabels:"Rotate, Move/Pan, Rotate left, Rotate right, Zoom in/Zoom out, Play/Pause, Info, Custom link, Full screen/Normal screen",
			contextMenuBackgroundColor:"#d1cfcf",
			contextMenuBorderColor:"#8f8d8d",
			contextMenuSpacerColor:"#acacac",
			contextMenuItemNormalColor:"#585858",
			contextMenuItemSelectedColor:"#FFFFFF",
			contextMenuItemDisabledColor:"#b7b4b4"
		});

		
		$(".banner").show();
		$(".banner1").show();
		console.log("Ending setupGrid");

	}

	/* function to setup interior viewer 360 -easy360*/
	function setupGrid1(){
		
		viewer =  new FWDViewer({
			//----main----//
			divHolderId:"myDiv1",
			playListAndSkinId:"viewerPlaylistAndSkin1",
			displayType:"responsive",
			preloaderText:"Loading 3D object:",
			startDraggingMode:"rotate",
			showLargeImageVersionOnZoom:"yes",
			useEntireScreenFor3dObject:"no",
			addCorrectionForWebKit:"yes",
			addDragAndSpinSupport:"yes",
			startAtImage:0,
			imageWidth:800,
			imageHeight:600,
			zoomFactor:4,
			dragRotationSpeed:.7,
			dragAndSpinSpeed:.6,
			buttonsRotationSpeed:300,
			slideShowDelay:300,
			backgroundColor:"#333333",
			preloaderFontColor:"#585858",
			preloaderBackgroundColor:"#333333",
			//----lightbox-----//
			lightBoxWidth:800,
			lightBoxHeight:600,
			lightBoxBackgroundOpacity:.8,
			lightBoxBackgroundColor:"#333333",
			//----controller----//
			buttons:"rotate, pan, roteteleft, rotateright, scrollbar, play, info, link, fullscreen",
			buttonsToolTips:"Rotate, Move/Pan, Rotate left, Rotate right, Zoom level: , Play/Pause, Info, Custom link, Full screen/Normal screen",
			controllerPosition:"bottom",
			inverseNextAndPrevRotation:"yes",
			addKeyboardSupport:"yes",
			slideShowAutoPlay:"no",
			startSpaceBetweenButtons:10,
			spaceBetweenButtons:10,
			startSpaceForScrollBarButtons:20,
			startSpaceForScrollBar:6,
			hideControllerDelay:3,
			controllerMaxWidth:900,
			controllerBackgroundOpacity:1,
			controllerOffsetY:0,
			scrollBarOffsetX:0,
			scrollBarHandlerToolTipOffsetY:4,
			zoomInAndOutToolTipOffsetY:-4,
			buttonsToolTipOffsetY:0,
			link:"http://www.google.com",
			buttonToolTipFontColor:"#585858",
			//----navigator----//
			showNavigator:"yes",
			navigatorPosition:"topright",
			navigatorOffsetX:6,
			navigatorOffsetY:6,
			navigatorHandlerColor:"#FF0000",
			navigatorBorderColor:"#AAAAAA",
			//----info window----//
			infoWindowBackgroundOpacity:.6,
			infoWindowBackgroundColor:"#FFFFFF",
			infoWindowScrollBarColor:"#585858",
			//----markers-----//
			showMarkersInfo:"no",
			markerToolTipOffsetY:2,
			toolTipWindowMaxWidth:500,
			//----context menu----//
			showScriptDeveloper:"no",
			contextMenuLabels:"Rotate, Move/Pan, Rotate left, Rotate right, Zoom in/Zoom out, Play/Pause, Info, Custom link, Full screen/Normal screen",
			contextMenuBackgroundColor:"#d1cfcf",
			contextMenuBorderColor:"#8f8d8d",
			contextMenuSpacerColor:"#acacac",
			contextMenuItemNormalColor:"#585858",
			contextMenuItemSelectedColor:"#FFFFFF",
			contextMenuItemDisabledColor:"#b7b4b4"
		});

		$(".banner").show();
		$(".banner1").show();

	}


	/*Can be used later with respective functions currently not in use*/
	function pan(e){

		if(e.preventDefault) e.preventDefault();
		viewer.pan();

	}

	function rotate(e){

		if(e.preventDefault) e.preventDefault();
		viewer.rotate();

	}

	function rotateLeft(e){

		if(e.preventDefault) e.preventDefault();
		viewer.rotateLeft();

	}

	function rotateRight(e){

		if(e.preventDefault) e.preventDefault();
		viewer.rotateRight();

	}

	function zoomOut(e){

		if(e.preventDefault) e.preventDefault();
		viewer.zoomOut();

	}

	function zoomIn(e){

		if(e.preventDefault) e.preventDefault();
		viewer.zoomIn();

	}

	function play(e){

		if(e.preventDefault) e.preventDefault();
		viewer.play();

	}

	function pause(e){

		if(e.preventDefault) e.preventDefault();
		viewer.pause();

	}

	function info(e){

		if(e.preventDefault) e.preventDefault();
		viewer.info();

	}

	function fullScreen(e){

		if(e.preventDefault) e.preventDefault();
		viewer.fullScreen();

	}

	function normalScreen(e){

		if(e.preventDefault) e.preventDefault();
		viewer.normalScreen();

	}


