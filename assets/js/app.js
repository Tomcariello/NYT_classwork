//Taken from NYT website
//https://developer.nytimes.com/article_search_v2.json#/Console/GET/articlesearch.json

// Built by LucyBot. www.lucybot.com

function searchResults(searchTerm) {
  var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json?";
  url += searchTerm;
  // ?begin_date=YYYYMMDD
  // ?end_date=YYYYMMDD

  $.ajax({url: url, method: 'GET',}).done(function(result) {

    for (i =1; i < 6; i++) {

      var mainDiv = $('<div>');
      mainDiv.addClass('panel panel-info')

        var secondDiv = $('<div>');
        secondDiv.addClass('panel-heading');
        
        var header = $('<h3>');
        header.addClass('panel-title');
        header.text("result: " + i);

        secondDiv.append(header);

      var summary = $('<div>');
      summary.addClass('panel-body');

      var p = $('<p>');
      var a = $('<a>');
      var p_date = $('<p>');

      p_date.text(result.response.docs[i].pub_date);
      a.attr('href', result.response.docs[i].web_url);
      a.text(result.response.docs[i].snippet);
      p.append(a);
      p.append(p_date);

      summary.append(p);

      secondDiv.append(summary);
      mainDiv.append(secondDiv);

      $('#resultDiv').append(mainDiv);
      console.log("Panel written: " + i);
    }
    }).fail(function(err) {
      throw err;
  });
}


// Process Form Submittal
$('#submit').on('click', function() {
  console.log(searchTerm);
  var submittedString = $("#searchTerm").val();
  // var submittedStartDate = $("#startDate").val();
  // var submittedEndDate = $("#endDate").val();
  // var recordsRequested = $("#records").val();
  // alert("clicked " + submittedString);
  searchResults("submittedString");
  return false;
});