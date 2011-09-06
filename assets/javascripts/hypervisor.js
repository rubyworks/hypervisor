var documentation;

//
String.prototype.escapeHTML = function () {
  return(                                                                 
    this.replace(/\&/g,'&amp;').                                
         replace(/\>/g,'&gt;').
         replace(/\</g,'&lt;').
         replace(/\"/g,'&quot;')
  );                                          
};

function toggleBox(boxId, key) {
  data = documentation[key];
  type = data['!'];
  $('#infobox').append($('#template-' + type + '-info').jqote(data));
  //boxId = boxId.replace(/[.,?!\s]/g, "_"); 
  $('.box').hide();
  $(boxId).toggle();
  $(boxId).find('pre code').each(function(i, e){hljs.highlightBlock(e, '  ')});
};

// TODO: better way please
function cleanId(anId) {
  anId = anId.replace(/\</g, "-lt-");
  anId = anId.replace(/\>/g, "-gt-");
  anId = anId.replace(/\=/g, "-eq-");
  anId = anId.replace(/\?/g, "-qu-");
  anId = anId.replace(/\!/g, "-ex-");
  anId = anId.replace(/\~/g, "-tl-");
  anId = anId.replace(/\[/g, "-bra-");
  anId = anId.replace(/\]/g, "-ket-");
  anId = anId.replace(/\#/g, "-hsh-");
  anId = anId.replace(/\./g, "-dot-");
  anId = anId.replace(/\:/g, "-cl-");
  anId = anId.replace(/[/]/g, "-sl-");
  //anId = anId.replace(/\W+/g, "_");
  return(anId);
};

//
function sortObj(arr){
  // Setup Arrays
  var sortedKeys = new Array();
  var sortedObj = {};
  // Separate keys and sort them
  for (var i in arr){
    sortedKeys.push(i);
  }
  sortedKeys.sort();
  // Reconstruct sorted obj based on keys
  for (var i in sortedKeys){
    sortedObj[sortedKeys[i]] = arr[sortedKeys[i]];
  }
  return sortedObj;
};

//
function compareNames(a, b){
  if (a.name < b.name) {return -1}
  if (a.name > b.name) {return 1}
  return 0;
};

//
function showRaw(){
  $.getJSON('doc.json', function(data) {
    $('.box').hide();
    $('#raw').show();
    $('#raw').append(recursive_parse(data));
  });
};

//
function recursive_parse(data) {
  var html = '<ul>';
  for (var k in data) {
    if (data[k] instanceof Object) {
      html = html + '<li>' + k + ' ' + recursive_parse(data[k]);
    } else {
      html = html + '<li>' + k + ' <code>' + ('' + data[k]).escapeHTML() + '</code>';
    }
    html = html + '</li>';
  }
  html = html + '</ul>';
  return html;
};

function clickABCTab(letter) {
  $("input#search-input").val(letter).trigger('keyup');
};

function getUrlVars()
{
  var vars = [], hash;
  var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
  for(var i = 0; i < hashes.length; i++)
  {
    hash = hashes[i].split('=');
    vars.push(hash[0]);
    vars[hash[0]] = hash[1];
  }
  return vars;
}

