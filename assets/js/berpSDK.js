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
  async pushData(api_func, data)
  {
      const url = this.getRouteApi(api_func);
      try
      {
         const response = await fetch( url, {
                                       method: 'POST',
                                       headers: {
                                                  'Content-Type': 'application/json;charset=utf-8'
                                                },
                                       body: JSON.stringify(data)
                                     });
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
  syncPushData(api_func, data)
  {
      const url = this.getRouteApi(api_func);
      var request = new XMLHttpRequest();
      request.open('POST', url, false);  // `false` makes the request synchronous
      request.send(JSON.stringify(data));
      if (request.status === 200) {
        console.log(request.responseText);
        return request.responseText;
      }
  }

  async getOffers()
  {
     const data = await this.getData('offers/list?page=-1');
     if(data === undefined)
       return [];
     return data;
  }

  async cartToOffer(email, cart)
  {
     return this.pushData('orders/createByTCart', {email: email, cart:cart});
  }

  syncCartToOffer(email, cart)
  {
      let wait = true;
      let result = undefined;
      const data = this.syncPushData('orders/createByTCart', {email: email, cart:cart});
      console.log('sync', data);
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
     