$.ajax({
	url: "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pubmed&term=Alzheimer's&retmode=json&retmax=3",
	method: "GET"
}).done(function(response){
	var id1 = response.esearchresult.idlist[0];
	var id2 = response.esearchresult.idlist[1];
	var id3 = response.esearchresult.idlist[2];

	getSummary(id1);
	getSummary(id2);
	getSummary(id3);


	function getSummary(id){
		var getSummaryUrl = "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=pubmed&retmode=json&rettype=abstract&id=" + id + "I"	

		$.ajax({
			url: getSummaryUrl,
			method: "GET"
		}).done(function(response){
			var title = response.result[id].title;
			var date = response.result[id].pubdate;
			var journal = response.result[id].source;
			var articleUrl = "https://www.ncbi.nlm.nih.gov/pubmed/" + id

			passText();

			function passText(){
				addPubMedChild("<a href=\"" + articleUrl + "\">" + "<h3>" + title + "</h3>" +"</a>")
			}

			addPubMedChild(title)
			addPubMedChild(date)
			addPubMedChild(journal)

			function addPubMedChild(text){
				var newDiv = $("<div>")
				newDiv.html(text);
				$("#pubmed-table").append(newDiv);
			}
		});
	}
});


//NY Times API
var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
url += '?' + $.param({
	'api-key': "fda6d04d9d0a44a68eac5eaf44250817",
	'q': "\"Alzheimer's Research\" Health Disease \"Caregiver\"",
	'sort': "newest"
});
$.ajax({
	url: url,
	method: 'GET',
}).done(function(result) {
	passText();
	function passText(){
		for (var i = 0; i < 3; i++){
			addNYTimesChild("<a href=\"" + result.response.docs[i].web_url + "\">" + "<h3>" + result.response.docs[i].headline.main + "</h3>" +"</a>");
			addNYTimesChild(result.response.docs[i].pub_date.slice(0,10));
			addNYTimesChild("<p>" + result.response.docs[i].snippet + "</p>");
		}
	}
	function addNYTimesChild(text){
		var newDiv = $("<div>");
		newDiv.html(text);
		$("#nytimes-table").append(newDiv);
	}
}).fail(function(err) {
	throw err;
});



$(window).resize(function () {
	var windowWidth = $(window).width();

	if (windowWidth <= 500) {
		var target = $("h1");
		target.css({"font-size": "200%","transition": "0.3s"});
	} else if (windowWidth <= 700) {
		var target = $("h1");
		target.css({"font-size": "300%","transition": "0.5s"});
	} else if (windowWidth <= 900) {
		var target = $("h1");
		target.css({"font-size": "400%","transition": "0.5s"});
	} else if (windowWidth <= 1220) {
		var target = $("h1");
		target.css({"font-size": "500%","transition": "0.5s"});
		// var featuredVideo = $("iframe");
		// var featuredContent = $(".featuredArtist")
		// featuredVideo.css({"display":"block"});
		// featuredContent.css({"display":"block"});
	} else {
		var target = $("h1");
		target.css({"font-size": "700%","transition": "1s"});
	}
});

$(window).ready(function () {
	var windowWidth = $(window).width();
	if (windowWidth <= 500) {
		var target = $("h1");
		target.css({"font-size": "200%"});
	} else if (windowWidth <= 700) {
		var target = $("h1");
		target.css({"font-size": "300%"});
	} else if (windowWidth <= 900) {
		var target = $("h1");
		target.css({"font-size": "400%"});
	} else if (windowWidth <= 1220) {
		var target = $("h1");
		target.css({"font-size": "500%"});
	} else {
		var target = $("h1");
		target.css({"font-size": "700%"});
	}
});