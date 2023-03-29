let berpSDK = null;

const CBerpAPI = class
{
  constructor(api_host, store) {
     this.api_version = 'v.1.0.0';
     this.api_host = api_host;
     this.store = store;
  }
  getRouteApi(pathApiFunction)
  {
     return this.api_host + '/' + this.api_version + '/api/' + pathApiFunction;
  }
  async getOrganizations()
  {
  }
  async getAssets()
  {
  }

  async login(login, password)
  {
     const dataLog  = JSON.stringify({login: login, password: password});
//     const loginForm = new FormData();                                                                  
//     loginForm.append( "json",  dataLog);
         
     const responseLogin = await fetch(this.getRouteApi('auth/login'), {
                                        headers: {
                                           'Content-Type': 'application/json',
                                           'Access-Control-Allow-Origin' : '*',
                                           'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                                           },
                                                  method: "POST",
                                                  body: dataLog
                                         }
                                       );

     const loginData = await responseLogin.json();
     this.store.saveLogin(loginData);
     console.log('loginData', loginData);
     return loginData;

  }
  async signup(login, password, confirm_password)
  {
     const dataLog  = JSON.stringify({login: login, password: password, confirm_password: confirm_password});
//     const loginForm = new FormData();                                                                  
//     loginForm.append( "json",  dataLog);
         
     const responseLogin = await fetch(this.getRouteApi('auth/signup'), {
                                        headers: {
                                           'Content-Type': 'application/json',
                                           'Access-Control-Allow-Origin' : '*',
                                           'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                                           },
                                                  method: "POST",
                                                  body: dataLog
                                         }
                                       );

     const loginData = await responseLogin.json();
     this.store.saveLogin(loginData);


     console.log('loginData', loginData);
     return loginData;
  }

}

const CBerpSDK = class
{

  constructor(api_host) {
     this.api = new CBerpAPI(api_host, this.store);
  }
  emmit(eventName,data)
  {
     const event = new CustomEvent(eventName, data); // (2)
     const elem = document.getElementById('eventBerpSDK');
     elem.dispatchEvent(event);
  }
}

$(document).ready(function(){
  $('body').append('<berpEvent id="eventBerpSDK"></berpEvent>');
  berpSDK = new CBerpSDK(dataSource.api);
})  
     