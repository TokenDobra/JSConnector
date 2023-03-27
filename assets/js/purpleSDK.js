let purpleSDK = null;

const CPurpleStore = class
{

  constructor(prefix)
  {
    this.loginDataName = prefix + '_loginData';
  }
  saveLogin(loginData)
  {
     localStorage.setItem(this.loginDataName, JSON.stringify(loginData));

  }
  getLogin()
  {
     const strLoginData = localStorage.getItem(this.loginDataName);
     if(strLoginData === undefined || strLoginData === null)
       return null;
     return JSON.parse(strLoginData);
  }

  removeLogin()
  {
    localStorage.removeItem(this.loginDataName);
  }
} 
const CPurpleAPI = class
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

  async logout()
  {
     const access_token = this.getAccessToken();
     if(access_token === null)
     {
        this.store.removeLogin();
        return true;
     }
     const dataLog  = JSON.stringify({token: access_token});
     const responseLogin = await fetch(this.getRouteApi('auth/logout'), {
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
     this.store.removeLogin();
     return loginData.ok;

  }
  isLoginDataCorrect(loginData)
  {
     if(loginData === undefined || loginData === null )
        return false;
     return true;
  }
  getAccessToken()
  {
     const loginData = this.store.getLogin();
     if(!this.isLoginDataCorrect(loginData))
       return null;
     return loginData.access_token; 
  }
  getRefreshToken()
  {
     const loginData = this.store.getLogin();
     if(!this.isLoginDataCorrect(loginData))
       return null;
     return loginData.refresh_token; 
  }
  getLoginName()
  {
     const loginData = this.store.getLogin();
     if(!this.isLoginDataCorrect(loginData))
       return null;
     return loginData.login; 
  }
  getAccountUUID()
  {
     const loginData = this.store.getLogin();
     if(!this.isLoginDataCorrect(loginData))
       return null;
     return loginData.uuid; 
  }
  isLogined()
  {
     const access_token = this.getAccessToken();
     return (access_token !== null)
  }

}

const CPurpleSDK = class
{

  constructor(api_host) {
     this.store = new CPurpleStore('purpleStore');
     this.api = new CPurpleAPI(api_host, this.store);
  }
  emmit(eventName,data)
  {
     const event = new CustomEvent(eventName, data); // (2)
     const elem = document.getElementById('eventPurpleSDK');
     elem.dispatchEvent(event);
  }
  async login(login, password)
  {
     const res = await this.api.login(login, password);
     this.emmit('login');
     return res;
  }
  async signup(login, password, confirm_password)
  {
     const res = await this.api.signup(login, password, confirm_password);
     this.emmit('login');
     return res;
  }
  async logout()
  {
     const res = await this.api.logout();
     this.emmit('logout');
     return res;
  }

  isLogined()
  {
    return this.api.isLogined();
  }

  getLoginName()
  {
    return this.api.getLoginName();
  }
}

$(document).ready(function(){
  $('body').append('<purpleEvent id="eventPurpleSDK"></purpleEvent>');
  purpleSDK = new CPurpleSDK(dataSource.api);
})  
     