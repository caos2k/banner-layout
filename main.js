document.addEventListener("DOMContentLoaded", function(e){

	var bannerArray = document.querySelectorAll(".grid-item");

	for (var i = 0; i < bannerArray.length; i++){

		console.log(bannerArray[i]);

		var sizeText = bannerArray[i].querySelector(".infoBox").innerHTML;
		console.log(sizeText);

		var width = Number(sizeText.split("x")[0]);
		console.log("width: ", width);

		var height = Number(sizeText.split("x")[1]);
		console.log("height: ", height);

		var closest50Width = Math.ceil((width / 50)) * 50;
		console.log("closest50Width: ", closest50Width);

		var closest50Height = Math.ceil((height / 50)) * 50;
		console.log("closest50Height: ", closest50Height);

		bannerArray[i].querySelector(".infoBox").style.width = width + "px";

		bannerArray[i].querySelector(".banner").style.width = width + "px";
		bannerArray[i].querySelector(".banner").style.height = height + "px";

		bannerArray[i].querySelector(".wrapper").style.width = width + "px";
		bannerArray[i].querySelector(".wrapper").style.height = height + 50 + "px";

		bannerArray[i].style.width = closest50Width + 50 + "px";
		bannerArray[i].style.height = closest50Height + 100 + "px";
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