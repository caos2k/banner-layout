document.addEventListener("DOMContentLoaded", function(e){

	var bannerArray = document.querySelectorAll(".grid-item");
	var areasArray = [];

	// var colorsArray = ["red", "blue", "lightblue", "cyan", "teal", "green", "lightgreen", "lime", "yellow", "amber", "orange", "pink", "purple", "indigo", "brown"];
	var typesArray = ["TypeA", "TypeB", "TypeC", "TypeD", "TypeE"];
	for (var i = 0; i < typesArray.length; i++){
		var html = '<label><input type="checkbox" name="size" class="typeCheckbox" checked id="' + typesArray[i] + '"> ' + typesArray[i] + ' </label>';
		document.querySelector(".typesCheckboxes").innerHTML += html;
	}

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
		bannerArray[i].classList += " " + sizeText;

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


function showBanners(type) {
	window.iso.arrange({
		filter: function( itemElem ) {
			var bannerType = itemElem.querySelector('.infoBox').innerText;
			return bannerType == type ? 1 : 0;
		}
	});
}

function hideBanners(type) {
	window.iso.arrange({
		filter: function( itemElem ) {
			var bannerType = itemElem.querySelector('.additionalInfoBox').innerText;
			return bannerType == type ? 0 : 1;
		}
	});
}

function filterType() {
	var checkBoxesArray = document.querySelectorAll(".typeCheckbox");
	var toShowString = "";

	for (var i = 0; i < checkBoxesArray.length; i++){
		if(checkBoxesArray[i].checked){
			toShowString += "." + checkBoxesArray[i].id + ", ";
		}
	}

	if (toShowString.length > 0){
		window.iso.arrange({
			filter: toShowString.replace(/,\s*$/, "")
		})
	}
	else {
		window.iso.arrange({
			filter: "none"
		})
	}
}

function filterSize() {
	var checkBoxesArray = document.querySelectorAll(".typeCheckbox");
	var toShowString = "";

	for (var i = 0; i < checkBoxesArray.length; i++){
		if(checkBoxesArray[i].checked){
			toShowString += "." + checkBoxesArray[i].id + ", ";
		}
	}

	if (toShowString.length > 0){
		window.iso.arrange({
			filter: toShowString.replace(/,\s*$/, "")
		})
	}
	else {
		window.iso.arrange({
			filter: "none"
		})
	}
}

function addEventListeners() {
	document.querySelectorAll('.typeCheckbox').forEach(item => {
		item.addEventListener('change', function(event) {
			filterType();
		})
	});

	document.querySelectorAll('.typeCheckbox').forEach(item => {
		item.addEventListener('change', function(event) {
			filterSize();
		})
	});
}