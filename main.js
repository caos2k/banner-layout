document.addEventListener("DOMContentLoaded", function(e){

	// var colorsArray = ["red", "blue", "lightblue", "cyan", "teal", "green", "lightgreen", "lime", "yellow", "amber", "orange", "pink", "purple", "indigo", "brown"];

	var typesArray = ["Awareness", "Interest", "Consideration", "Engagement", "Conversion"];
	for (var i = 0; i < typesArray.length; i++){
		var html = '<label><input type="checkbox" name="type" class="typeCheckbox" checked id="' + typesArray[i] + '"> ' + typesArray[i] + ' </label>';
		document.querySelector(".typesCheckboxes").querySelector(".labelContainer").innerHTML += html;
	}

	var dimensionsArray = ["300x250", "970x250", "300x50", "300x100", "320x50", "320x100", "300x600", "160x600", "120x600", "320x480", "480x320", "300x150", "728x90"];
	var bannerNumber = 11;
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
	var areasArray = [];
	for (var i = 0; i < bannerArray.length; i++){
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

		// var randomColorPosition = Math.floor(Math.random() * colorsArray.length);
		// var randomColor = colorsArray[randomColorPosition];
		// colorsArray.splice(randomColorPosition, 1);
	 	// bannerArray[i].classList.add("white");
		// bannerArray[i].classList.add(randomColor);

		var randomTypePosition = Math.floor(Math.random() * typesArray.length);
		var randomType = typesArray[randomTypePosition];
		bannerArray[i].classList.add(randomType);

		var horizontalBlocks = bannerArray[i].offsetWidth / 50;
		var verticalBlocks = bannerArray[i].offsetHeight / 50;
		var area = horizontalBlocks * verticalBlocks;
		bannerArray[i].querySelector(".additionalInfoBox").innerHTML = randomType;
		// bannerArray[i].querySelector(".additionalInfoBox").innerHTML = area + " blocks - " + randomType;
			// + "<br/><strong>Blocks:</strong> " + horizontalBlocks + "x" + verticalBlocks + " &#10687; <strong>Area:</strong> " + area;

		var object = {
			element: bannerArray[i],
			area: area
		};

		areasArray.push(object);
	}

	// areasArray.sort(function(a, b) {
	// 	return a.area === b.area
	// 		? 0
	// 		: (a.area > b.area ? 1 : -1);
	// });
	//
	// for (i = 0; i < areasArray.length; ++i) {
	// 	document.querySelector(".grid").appendChild(areasArray[i].element);
	// }

	// var msnry = new Masonry( '.grid', {
	// 	columnWidth: 50,
	// 	itemSelector: '.grid-item',
	// 	horizontalOrder: false,
	// 	gutter: 0
	// });

	window.iso = new Isotope( '.grid', {
		itemSelector: '.grid-item',
		masonry: {
			columnWidth: 50,
			horizontalOrder: false,
			gutter: 0
		}
	});

	addEventListeners();

});

function filterType() {
	var toShowString = "";
	var typeCheckBoxesArray = document.querySelectorAll(".typeCheckbox:checked");
	var sizeCheckBoxesArray = document.querySelectorAll(".sizeCheckbox:checked");

	for (var i = 0; i < sizeCheckBoxesArray.length; i++){
		for (var j = 0; j < typeCheckBoxesArray.length; j++){
			toShowString += ".size_" + sizeCheckBoxesArray[i].id + "." + typeCheckBoxesArray[j].id + ", ";
		}
	}

	window.iso.arrange({
		filter: toShowString.replace(/,\s*$/, "")
	})
}

function addEventListeners() {
	document.querySelectorAll('.typeCheckbox, .sizeCheckbox').forEach(item => {
		item.addEventListener('change', function() {
			filterType();
		})
	});
}