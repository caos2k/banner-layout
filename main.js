document.addEventListener("DOMContentLoaded", function(e){

	var pckry = new Packery( '.grid', {
		itemSelector: '.grid-item',
		columnWidth: 50,
		rowHeight: 50
	});

	var typesArray = ["Connect", "Catch", "Close"];
	for (var i = 0; i < typesArray.length; i++){
		var html = '<label><input type="checkbox" name="type" class="typeCheckbox" checked id="' + typesArray[i] + '"> ' + typesArray[i] + ' </label>';
		document.querySelector(".typesCheckboxes").querySelector(".labelContainer").innerHTML += html;
	}

	var dimensionsArray = ["300x250", "970x250", "300x50", "300x100", "320x50", "320x100", "300x600", "160x600", "120x600", "320x480", "480x320", "300x150", "728x90"];
	var bannerNumber = 19;
	var bannerShowedArray = [];

	for (var j = 0; j < bannerNumber; j++){
		var randomSizePosition = Math.floor(Math.random() * dimensionsArray.length);
		var randomSize = dimensionsArray[randomSizePosition];
		bannerShowedArray.push(dimensionsArray[randomSizePosition]);

		var htmlBannerWrapper = '<div class="grid-item"><div class="wrapper"><div class="banner"></div><div class="infoBox">' + randomSize +'</div><div class="additionalInfoBox"></div></div></div>';
		document.querySelector(".grid").innerHTML += htmlBannerWrapper;
	}

	var uniqueBannerShowedArray = [...new Set(bannerShowedArray)];
	for (var l = 0; l < uniqueBannerShowedArray.length; l++){
		var htmlCheckbox = '<label><input type="checkbox" name="size" class="sizeCheckbox" checked id="' + uniqueBannerShowedArray[l] + '"> ' + uniqueBannerShowedArray[l] + ' </label>';
		document.querySelector(".sizesCheckboxes").querySelector(".labelContainer").innerHTML += htmlCheckbox;
	}

	var bannerArray = document.querySelectorAll(".grid-item");
	for (var i = 0; i < bannerArray.length; i++){

		pckry.appended(bannerArray[i]);

		var sizeText = bannerArray[i].querySelector(".infoBox").innerHTML;
		var width = Number(sizeText.split("x")[0]);
		var height = Number(sizeText.split("x")[1]);
		var closest50Width = Math.ceil((width / 50)) * 50;
		var closest50Height = Math.ceil((height / 50)) * 50;

		bannerArray[i].querySelector(".banner").style.width = width + "px";
		bannerArray[i].querySelector(".banner").style.height = height + "px";
		bannerArray[i].querySelector(".wrapper").style.height = height + 50 + "px";
		bannerArray[i].querySelector(".wrapper").style.width = closest50Width + 50 + "px";
		bannerArray[i].querySelector(".infoBox").style.width = closest50Width + 50 + "px";
		bannerArray[i].style.width = closest50Width + 50 + "px";
		bannerArray[i].style.height = closest50Height + 100 + "px";
		bannerArray[i].classList += " size_" + sizeText;

		var randomTypePosition = Math.floor(Math.random() * typesArray.length);
		var randomType = typesArray[randomTypePosition];
		bannerArray[i].classList.add(randomType);
		bannerArray[i].querySelector(".additionalInfoBox").innerHTML = randomType;
	}

	window.iso = new Isotope( '.grid', {
		masonry: {
			columnWidth: 50,
			horizontalOrder: false,
			gutter: 0
		}
	});

	pckry.layout();
	addEventListeners();

});

function filterType() {
	var toShowString = "";
	var sizeCheckBoxesArray = document.querySelectorAll(".sizeCheckbox:checked");
	var typeCheckBoxesArray = document.querySelectorAll(".typeCheckbox:checked");

	if (sizeCheckBoxesArray.length === 0){
		document.querySelector(".errorLogs").innerHTML = "At least 1 size is needed to show something!";
		document.querySelector(".grid").style.display = 'none';
	}

	else if (typeCheckBoxesArray.length === 0){
		document.querySelector(".errorLogs").innerHTML = "At least 1 type is needed to show something!";
		document.querySelector(".grid").style.display = 'none';
	}

	else{
		document.querySelector(".errorLogs").innerHTML = "";
		document.querySelector(".grid").style.display = 'block';
		for (var i = 0; i < sizeCheckBoxesArray.length; i++){
			for (var j = 0; j < typeCheckBoxesArray.length; j++){
				toShowString += ".size_" + sizeCheckBoxesArray[i].id + "." + typeCheckBoxesArray[j].id + ", ";
			}
		}

		window.iso.arrange({
			filter: toShowString.replace(/,\s*$/, "")
		});

		if(window.iso.filteredItems.length === 0){
			document.querySelector(".errorLogs").innerHTML = "No combination available for your selection!";
			document.querySelector(".grid").style.display = 'none';
		}
	}
}

function addEventListeners() {
	document.querySelectorAll('.typeCheckbox, .sizeCheckbox').forEach(item => {
		item.addEventListener('change', function() {
			filterType();
		})
	});
}