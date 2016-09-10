//Taken from NYT website
//https://developer.nytimes.com/article_search_v2.json#/Console/GET/articlesearch.json

// Built by LucyBot. www.lucybot.com

function searchResults() {
  var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
  url += '?' + $.param({
    'q': "ufc"
  });

  $.ajax({url: url, method: 'GET',}).done(function(result) {
      console.log(result);
    }).fail(function(err) {
      throw err;
  });
}


// Process Form Submittal
$('#submit').on('click', function() {
  alert("clicked");
  return false;
});