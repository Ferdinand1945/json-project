$(document).ready(function () {
  //$('#get-data').click(function () {
  var showData = $('#show-data');

  $.getJSON('json/input.json', function (data) {
    console.log(data);

    var articles = data.articles.map(function (articles) {
      return '<div class="img"><img src="'+ articles.image +'"></div>'
      
      +'<div class="col-1">' + '<h1 class="title-with-line--red">'+ articles.title+'</h1>' 
      
      + '<div class="date">' + articles.date +'</div>' + '</div>'
      + '<br> '
      + '<div class="col-2">' + '<p>' + articles.teaser + '</p>' + '</div>'
      + '<br> '
      + '<button class="read-more">Läs mer ></button>';
    });

    showData.empty();

    if (articles.length) {
      var content = '<li>' + articles.join('</li><li>') + '</li>';
      var list = $('<ul />').html(content);
      showData.append(list);
    }
  });

  showData.text('Loading the JSON file.');
  // });
});
