//Taken from NYT website
//https://developer.nytimes.com/article_search_v2.json#/Console/GET/articlesearch.json
function searchResults(searchTerm, recordsToReturn, startDate) {
  var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json?";
  url += "q=" + searchTerm;
  // var startingDate = "?begin_date=" + startDate;
  var beginningDate = "&?begin_date=18000101";
  if (startDate.length == 8) {
     beginningDate =  "&?begin_date=" + startDate;
  }

  url += beginningDate;  
  // ?end_date=YYYYMMDD
  url += "&api-key=56de0714f810449bba3bab87764788e9";
  console.log(url);

  $.ajax({url: url, method: 'GET',}).done(function(result) {

    $('#resultDiv').html("");
    console.log(result);

    if (result.length < recordsToReturn) {
      recordsToReturn = result.length;
    }



    for (i =0; i < recordsToReturn; i++) {

      var mainDiv = $('<div>');
      mainDiv.addClass('panel panel-info')

        var secondDiv = $('<div>');
        secondDiv.addClass('panel-heading');
        
        var header = $('<h3>');
        header.addClass('panel-title');
        header.text("(result: " + parseInt(i + 1) + ") " + result.response.docs[i].headline.main);

        secondDiv.append(header);

      var summary = $('<div>');
      summary.addClass('panel-body');

      var p = $('<p>');
      var a = $('<a>');
      var p_date = $('<p>');

      p_date.text("Date of publication: " + result.response.docs[i].pub_date);
      a.attr('href', result.response.docs[i].web_url);
      a.attr('target', 'new');
      a.text(result.response.docs[i].snippet);
      p.append(a);
      p.append(p_date);

      summary.append(p);

      secondDiv.append(summary);
      mainDiv.append(secondDiv);
      
      $('#resultDiv').append(mainDiv);
    }
    }).fail(function(err) {
      throw err;
  });
}


// Process Form Submittal
$('#submit').on('click', function() {
  console.log(searchTerm);
  var submittedString = $("#searchTerm").val();

  numberOfRecords = exampleSelect1.options.selectedIndex;

  if (numberOfRecords == 0) {
    numberOfRecords = 1 ;
  } else if (numberOfRecords == 1) {
    numberOfRecords = 5;
  } else {
    numberOfRecords = 10;
  }

  var startDate = $('#exampleInputPassword1').val();
  searchResults(submittedString, numberOfRecords, startDate);
  return false;
});