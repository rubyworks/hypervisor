// rdoc convertor
var rundown = new Rundown.converter();  /* TODO: support other formats */

// @todo handle this.format
Handlebars.registerHelper('render_comment', function(comment) {
  var ret = rundown.makeHtml(this.comment);
  return new Handlebars.SafeString(ret);
});

// @todo handle format
Handlebars.registerHelper('render', function(text) {
  var ret = rundown.makeHtml(text);
  return new Handlebars.SafeString(ret);
});

// The #doc block helper looks up each documentation object
// in the given context array and renders the template.
Handlebars.registerHelper('doc', function(context, options) {
  var ret = "";
  var sub;

  for(var i=0, j=context.length; i<j; i++) {
    doc = documentation[context[i]];
    if(doc != null) {
      ret = ret + options.fn(doc);
    } else {
      sub = {id:null, name: context[i], path: context[i]};
      ret = ret + options.fn(sub);
    };
  };

  return ret;
});

//
Handlebars.registerHelper('letters', function(block) {
  var abc = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  var ret = "";

  for (i=0;i<=25;i++) {
    sub = {letter: '' + abc[i]};
    ret = ret + block(sub);
  };

  return(ret);
});

// Register `detail` partial.
Handlebars.registerPartial("detail", Handlebars.templates.detail);

