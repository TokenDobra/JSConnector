
let dataSource = {
  api:'https://api.tokendobra.ru',
  url:'https://tilda.tokendobra.ru'
}

let isLocalHost = function()
{
   return window.location.hostname == "localhost";
}
let getHostSourceName = function(source)
{
   if(isLocalHost())
     return '';
                                                       
  return source;
}
let getAssetsJs = function(source)
{
   return getHostSourceName(source) + '/assets/js/';
}        
let getAssetsCss = function(source)
{
   return getHostSourceName(source) + '/assets/css/';
}        
                                                                              
let getAssetsForms = function(source)
{
   return getHostSourceName(source) + '/assets/forms/';
}        

let schemaData = {
     tokendobra_main: {
         product: {
                    js: ['tokendobra_main.js']
                  }
    },
    TDItem: {
         product: {
                    js: ['tokendobra_item.js']
                }
    },

}
const loadForm = async (name)=>{
   const  url = getAssetsForms(getHostSourceName(dataSource.url)) + name;
   const response = await fetch(url);
   return response.text();
}
function loadingResource (tag, schema, representation, url, source)
{
   return fetch(url)             
    .then((response) => {
      return response.text();
    })
                                                 
    .then((data) => {
       tag.append(data);
       loadedJS(tag, schema, representation, source);

    }).catch((err)=>{
      console.error(err);
    });
}


function loadedSDK(tag, schema, representation)                                       
{
   if(schemaData[schema][representation].sdk === undefined)
     return;
   for(let sdk of schemaData[schema][representation].sdk)
     tag.append('<script src="' + sdk + '"></script>')
}

function loadedCSS(tag, schema, representation, source)                                       
{
   if(schemaData[schema][representation].css === undefined)
     return;
   for(let css of schemaData[schema][representation].css)
     tag.append('<link href="' + getAssetsCss(source) + css + '" rel="stylesheet">')
}
function loadedJS(tag,schema, representation, source)                                       
{
   if(schemaData[schema][representation].js === undefined)
     return;
   for(let js of schemaData[schema][representation].js)
     tag.append('<script src="' + getAssetsJs(source) + js + '"></script>')
}



function loadedAll(tag, schema, representation, source)
{
  loadedSDK(tag,schema, representation);
  loadedCSS(tag, schema, representation, source);
  if(schemaData[schema][representation].form !== undefined && schemaData[schema][representation].form !== null)
     loadingResource (tag, schema, representation, getAssetsForms(source) + schemaData[schema][representation].form, source);
  else
     loadedJS(tag, schema, representation, source);

}

function runAfterCBerpSDKLoad(fncAfter) {
    setTimeout(function () {
        var loadScript=true;
        if (typeof CBerpSDK == 'undefined') {
            if (typeof window.CBerpSDK == 'undefined') {
                /* jQuery is not loaded */
                loadScript=false;
                runAfterCBerpSDKLoad(fncAfter);
            }else{
                /* jQuery is loaded */
            }
        } else {
            /* jQuery is loaded */
        }
        if(true==loadScript) fncAfter();
    }, 500);
}

const fillParam = (form, param)=>{
   return form.replace(param.name, param.value);
}
const fillFormData = (form, params)=>{
   return params.reduce((tmpl, param)=>fillParam(tmpl, param), form);
}

const getFullName = (obj)=>
{
   return obj.first_name 
        + (obj.middle_name !== '')?' ' + obj.middle_name:'' 
        + (obj.last_name !== '')?' ' + obj.last_name:''; 
}                                                                                                               

$(document).ready(function(){

  const source = $("tokendobra").attr('source');
  $('body').append('<script src="' + getAssetsJs(dataSource.url) + 'berpSDK.js' + '"></script>');
  runAfterCBerpSDKLoad(()=>
  {
    $("tokendobra").each(function() { 
      const schema = $(this).attr('schema');
      const representation = $(this).attr('representation');
      loadedAll($(this), schema, representation, dataSource.url);
    });
  });



});
                                                                         