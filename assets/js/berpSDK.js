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
  async getData(api_func)
  {
      const url = this.getRouteApi(api_func);
      try
      {
         const response = await fetch(url);
         const result = await response.json();
         console.log(result);
         if(!result.ok)
         {
            console.log('resualt error on: ' + url, result.error);
            return;
         }
         return result.data;
      }
      catch(err)
      {
         console.log('catch on: ' + url, err.message);
      }
  }
  async getOffers()
  {
     const data = await this.getData('offers/list?page=-1');
     if(data === undefined)
       return [];
     return data;
  }
}

const CBerpSDK = class
{

  constructor(api_host) {
     this.api = new CBerpAPI(api_host, this.store);
  }
}

$(document).ready(function(){
  berpSDK = new CBerpSDK(dataSource.api);
})  
     