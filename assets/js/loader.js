let  tagTest = null;

let dataSource = {
  url: '',
  api:''
}
let routingMap = {
   main: ''
  ,login: ''
  ,regist: ''
  ,newart: ''
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
     purple: {
         local: {
                  js: ['head_map_local.js', 'head.js']
                  ,form: ['head.html']      
                }
    },
     purpleHome: {
         local: {
                  form: ['home.html']      
                }
    },

     purpleLogin: {
         local: {
                  js: ['login_map_local.js', 'login.js']
                 ,form: ['login.html']      

                }
    },
     purpleRegist: {
         local: {
                  js: ['regist_map_local.js', 'regist.js']
                 ,form: ['regist.html']      

                }
    },
     purpleAddbutton: {
         local: {
                  js: ['addbutton_map_local.js', 'addbutton.js']
                 ,form: ['addbutton.html']      

                }
    },
     purpleNewAsset: {
         local: {
                  js: ['newasset.js']
                 ,form: ['newasset.html']      

                }
    },
     purpleNewAssetUpload: {
         local: {
                  js: ['newassetupload.js']
                 ,form: ['newassetupload.html']      
                 ,css:  ['newassetupload.css']

                }
    },





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


function runAfterCPurpleSDKLoad(fncAfter) {
    setTimeout(function () {
        var loadScript=true;
        if (typeof CPurpleSDK == 'undefined') {
            if (typeof window.CPurpleSDK == 'undefined') {
                /* jQuery is not loaded */
                loadScript=false;
                runAfterCPurpleSDKLoad();
            }else{
                /* jQuery is loaded */
            }
        } else {
            /* jQuery is loaded */
        }
        if(true==loadScript) fncAfter();
    }, 500);
}


$(document).ready(function(){

  routingMap.main = $("purpleRoute").attr('main');
  routingMap.login = $("purpleRoute").attr('login');
  routingMap.regist = $("purpleRoute").attr('regist');
  routingMap.newart = $("purpleRoute").attr('newart');


  $('body').append('<script src="https://unpkg.com/axios/dist/axios.min.js"></script>');
  const source = $("purple").attr('source');
  dataSource.api = $("purple").attr('api');

  $('body').append('<script src="' + getAssetsJs(source) + 'purpleSDK.js' + '"></script>');
  runAfterCPurpleSDKLoad(()=>
  {
    $("purple").each(function() { 
      const schema = $(this).attr('schema');
      const representation = $(this).attr('representation');
      dataSource.url = $(this).attr('source');
      loadedAll($(this), schema, representation, dataSource.url);
    });
  });


/*
  routingMap.main = tagTest.attr('main');
  routingMap.next = tagTest.attr('next');
  routingMap.result = tagTest.attr('result');
  routingMap.skintestresult = tagTest.attr('skintestresult');
*/

});
