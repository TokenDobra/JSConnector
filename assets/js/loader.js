
let dataSource = {
  api:'https://api.tokendobra.ru',
  url:'https://tilda.tokendobra.ru',
  item_page: './nft-page?uuid='
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
                    sdk:['https://cdn.jsdelivr.net/npm/swiper@8/swiper-bundle.min.js'],
                    js: ['tokendobra_main.js']
                  }
    },
    tokendobra_item: {
         product: {
                    sdk:['https://cdn.jsdelivr.net/npm/swiper@8/swiper-bundle.min.js'],
                    js: ['tokendobra_item.js']
                }
    },
    tokendobra_fund: {
         product: {
                    js: ['tokendobra_fund.js']
                }
    },
    tokendobra_cart: {
         product: {
                    js: ['tokendobra_cart.js']
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
   const result = form.replace(param.name, param.value);
   return result.indexOf(param.name) < 0?result:fillParam(result, param);
}
const fillFormData = (form, params)=>{
   return params.reduce((tmpl, param)=>fillParam(tmpl, param), form);
}

const getFullName = (obj)=>
{
   const name =  obj.first_name;
   if(obj.middle_name !== '')
     name += ' ' + obj.middle_name;
   if(obj.last_name !== '')
     name += ' ' + obj.last_name;
   return name;

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
                                                                         