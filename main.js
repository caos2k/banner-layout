document.addEventListener("DOMContentLoaded", function(e){

	var bannerArray = document.querySelectorAll(".grid-item");
	var colorsArray = ["red", "blue", "lightblue", "cyan", "teal", "green", "lightgreen", "lime", "yellow", "amber", "orange", "pink", "purple", "indigo", "brown"];

	var areasArray = [];

	for (var i = 0; i < bannerArray.length; i++){
		var randomPosition = Math.floor(Math.random() * colorsArray.length);
		var randomColor = colorsArray[randomPosition];
		// colorsArray.splice(randomPosition, 1);
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
		// bannerArray[i].classList.add("white");
		// bannerArray[i].classList.add(randomColor);

		var horizontalBlocks = bannerArray[i].offsetWidth / 50;
		var verticalBlocks = bannerArray[i].offsetHeight / 50;
		var area = horizontalBlocks * verticalBlocks;
		bannerArray[i].querySelector(".infoBox").innerHTML = "<strong>" + sizeText + "</strong>"
			// + "<br/><strong>Blocks:</strong> " + horizontalBlocks + "x" + verticalBlocks + " &#10687; <strong>Area:</strong> " + area;

		var object = {
			element: bannerArray[i],
			area: area
		};

		areasArray.push(object);
	}

	areasArray.sort(function(a, b) {
		return a.area === b.area
			? 0
			: (a.area > b.area ? 1 : -1);
	});
	console.log(areasArray);
	for (i = 0; i < areasArray.length; ++i) {
		document.querySelector(".grid").appendChild(areasArray[i].element);
	}

	var msnry = new Masonry( '.grid', {
		columnWidth: 50,
		itemSelector: '.grid-item',
		horizontalOrder: false,
		gutter: 0,
		// fitWidth: true
	});
	console.log("masonry: ", msnry);

});