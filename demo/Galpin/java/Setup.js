var viewer;
var imageObjectExterior;
var imageObjectInterior;
var imagesTab = [];
var imagesSmallExterior = [];
var imagesMediumExterior = [];
var imagesLargeExterior = [];
var imagesThumbsExterior = [];
var imagesSmallInterior = [];
var imagesMediumInterior = [];
var imagesLargeInterior = []; 
var imagesThumbsInterior = [];
var imagesTabThumbs = [];
var imgId;
var viewer360;

FWDUtils.onReady(function(){
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
	if(id == 1)
		$('#myDiv').hide();
	else
		$('#myDiv').show();
	})
	console.log("tabs created");
			
});
	/* function to Grab the parameter(key) in the url*/
	function grabParams(){
		var vars = [], hash;
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
	
		$.getJSON('http://www.orbee360.com/demo/'+key+'/exterior').done(function(data) {
		
			console.log(data);
			imageObjectExterior = data;
			createImageElementExterior();
			assignEventHandler();
		});
	};

	/*function to parse the json for interior*/
	function grabJsonInterior(key){

		$.getJSON('http://www.orbee360.com/demo/'+key+'/interior').done(function(data) {
		
			console.log(data);
			imageObjectInterior = data;
			createImageElementInterior();
			assignEventHandler();
		});
	};

	/* function to add all url of images for exterior 360 viewer into respective arrays*/
	function createImageElementExterior(){
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

		exterior();
		loadImages();
		

			
	};

	/* function to add all url of images for interior 360 viewer into respective arrays*/
	function createImageElementInterior(){

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

		loadImages();
		
	};

	
	/* function to load play exterior 360 viewer on click of exterior button*/ 
	function exterior(){

		$("#myDiv1").hide();			
		for(var i = 0; i<imagesSmallExterior.length; i++){
							
			console.log("imagesSmallExterior["+i+"]:::"+imagesSmallExterior[i]);
			console.log("imagesLargeExterior["+i+"]:::"+imagesLargeExterior[i]);
			console.log("imagesThumbsExterior["+i+"]:::"+imagesThumbsExterior[i]);
			$("#new").append('<ul id="'+i+'"><li data-small-image-path="'+imagesSmallExterior[i]+'"></li> <li data-large-image-path ="'+imagesLargeExterior[i]+'"></li> <li data-navigator-image-path ="'+imagesThumbsExterior[i]+'"></li> </ul> ');
			
		}
		$("#myDiv").show();
		setupGrid();
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
			$("#viewerPlaylistAndSkin1").find("#new1").append('<ul id="'+i+'"><li data-small-image-path="'+imagesSmallInterior[i]+'"></li> <li data-large-image-path ="'+imagesLargeInterior[i]+'"></li> <li data-navigator-image-path ="'+imagesThumbsInterior[i]+'"></li> </ul> ');
				
		}
		$("#myDiv1").show();
		setupGrid1();
		

	};

	/* function to load all exterior and interior images for image widget*/ 
	function loadImages(){
		
		for(var i=0; i< imageObjectExterior.media.exterior360.images.length ; i++){

			imagesTab.push(imageObjectExterior.media.exterior360.images[i].small.info.url);
		}
		for(var i=0; i< imageObjectInterior.media.interior360.images.length ; i++){

			imagesTab.push(imageObjectInterior.media.interior360.images[i].small.info.url);
		}
		for (var i = 0; i<imageObjectExterior.media.exterior360.images.length;i++){
			if(imageObjectExterior.media.exterior360.images[i].imageId == "sprite" ){
				continue;
				}
			imagesTabThumbs.push(imageObjectExterior.media.exterior360.images[i].thumbs.info.url);
		}
		for (var i = 0; i<imageObjectInterior.media.interior360.images.length;i++){
			if(imageObjectInterior.media.interior360.images[i].imageId == "sprite" ){
				continue;
			}
			imagesTabThumbs.push(imageObjectInterior.media.interior360.images[i].thumbs.info.url);
		}

		//createImageCarousel();
		createCarousel();
	
	}

	/* function to create carousel with all thumbs images*/
	function createCarousel(){
		for (imgId = 0; imgId<imagesTabThumbs.length;imgId++){
			$('#thumbs-container').append('<img src='+imagesTabThumbs[imgId]+' class="inner-thumbs imageThumb-'+imgId+'" height="60" width="55"/>');
		}
		console.log("all thumbs images loaded");
		$('#imageContainer').append('<img src='+imagesTab[0]+' style = "position:absolute; display: block; overflow: hidden; left: 75px; top: 20px; padding: 0px; max-width: none; max-height: none; border: none; line-height: 1; backface-visibility:hidden; -webkit-backface-visibility:hidden; -webkit-user-select: none; visibility: visible; background-color:transparent;width: 650px; height: 450px"; align:center;>');
		// settings for slick carousel
			$(".slick-container").slick({
				infinite: true,
				speed: 300,
				slidesToShow: 6,
				slidesToScroll: 4
		});
			console.log("Created carousel");
	};

	/* function to assign event handler for thumbs container to load repective image on click of the respective thumbs image*/
	function assignEventHandler(){
		$(".inner-thumbs").each(function(imgId){
			console.log("img id :::"+imgId);
			$(this).click(function(){
		    	$('#imageContainer').append('<img src='+imagesTab[imgId-6]+' style = "position:absolute; display: block; overflow: hidden; left: 75px; top: 20px; padding: 0px; max-width: none; max-height: none; border: none; line-height: 1; backface-visibility:hidden; -webkit-backface-visibility:hidden; -webkit-user-select: none; visibility: visible; background-color:transparent;width: 650px; height: 450px"; align:center;>');
			});
		});		
	};

	/* function to setup exterior viewer 360*/
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
			imageWidth:650,
			imageHeight:450,
			zoomFactor:4,
			dragRotationSpeed:.7,
			dragAndSpinSpeed:.6,
			buttonsRotationSpeed:300,
			slideShowDelay:300,
			backgroundColor:"#000000",
			preloaderFontColor:"#585858",
			preloaderBackgroundColor:"#FFFFFF",
			//----lightbox-----//
			lightBoxWidth:800,
			lightBoxHeight:550,
			lightBoxBackgroundOpacity:.8,
			lightBoxBackgroundColor:"#000000",
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
	}

	/* function to setup interior viewer 360*/
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
			imageWidth:650,
			imageHeight:450,
			zoomFactor:4,
			dragRotationSpeed:.7,
			dragAndSpinSpeed:.6,
			buttonsRotationSpeed:300,
			slideShowDelay:300,
			backgroundColor:"#000000",
			preloaderFontColor:"#585858",
			preloaderBackgroundColor:"#FFFFFF",
			//----lightbox-----//
			lightBoxWidth:800,
			lightBoxHeight:550,
			lightBoxBackgroundOpacity:.8,
			lightBoxBackgroundColor:"#000000",
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
	}

		//####################################//
		/* Add button events to call API methods*/
		//####################################//
		/*function addButtonsEvents(){
			//If the device dosen't touch support and is not windows8 mobile!
			if(!FWDUtils.isMobile || FWDUtils.hasPointerEvent){
				document.getElementById("pan").addEventListener("mousedown", pan);
				document.getElementById("rotate").addEventListener("mousedown", rotate);
				document.getElementById("rotateLeft").addEventListener("mousedown", rotateLeft);
				document.getElementById("rotateRight").addEventListener("mousedown", rotateRight);
				document.getElementById("zoomOut").addEventListener("mousedown", zoomOut);
				document.getElementById("zoomIn").addEventListener("mousedown", zoomIn);
				document.getElementById("play").addEventListener("mousedown", play);
				document.getElementById("pause").addEventListener("mousedown", pause);
				document.getElementById("info").addEventListener("mousedown", info);
				document.getElementById("fullScreen").addEventListener("mousedown", fullScreen);
				document.getElementById("normalScreen").addEventListener("mousedown", normalScreen);
			}else{//if device is PC, MAC or other mice device...
				document.getElementById("pan").addEventListener("touchstart", pan);
				document.getElementById("rotate").addEventListener("touchstart", rotate);
				document.getElementById("rotateLeft").addEventListener("touchstart", rotateLeft);
				document.getElementById("rotateRight").addEventListener("touchstart", rotateRight);
				document.getElementById("zoomOut").addEventListener("touchstart", zoomOut);
				document.getElementById("zoomIn").addEventListener("touchstart", zoomIn);
				document.getElementById("play").addEventListener("touchstart", play);
				document.getElementById("pause").addEventListener("touchstart", pause);
				document.getElementById("info").addEventListener("touchstart", info);
				document.getElementById("fullScreen").addEventListener("touchstart", fullScreen);
				document.getElementById("normalScreen").addEventListener("touchstart", normalScreen);
			}
		}*/

		//API//
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


