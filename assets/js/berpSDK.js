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
//         console.log(result);
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
//         console.log(result);
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
const shuffleArray = (array) => 
{
    const copyArray = array.map((obj)=>obj);
    for (let i = copyArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copyArray[i], copyArray[j]] = [copyArray[j], copyArray[i]];
    }
    return copyArray;
}
const findSubjectIndex = (subjects, uuid)=>
{
   let index = -1;
   for(let i=0; i < subjects.length;i++)
   {
      if(subjects[i].subject_data.uuid == uuid)
      {
         index = i;
         break;
      }
   }
   return index;
}
const reduceSubjects = (offers)=>{
   return offers.reduce((subjects, offer)=>{
     let index = findSubjectIndex(subjects, offer.subject_data.uuid);
     if(index == -1)
     {
        subjects.push({
           subject_data: offer.subject_data,
           count_assets: 0,
           count_nft: 0,
           offers: [],
        });
        index = subjects.length - 1;
     }
     subjects[index].count_assets++;
     subjects[index].count_nft += parseInt(offer.offer_quantity);
     subjects[index].offers.push(offer);
     return subjects;

   }, []).sort((a, b) => parseInt(a.subject_data.order) > parseInt(b.subject_data.order)?1:-1);

}
const getAttribute = (obj, name)=>
{

   const attr = obj.subject_data.attributes.find((a)=>a.attribute_data.name == name);
   if(attr === undefined)
     return '';
   if(attr.text_value !== undefined &&  attr.text_value !== null && attr.text_value !== '')
     return attr.text_value;
   if(attr.string_value !== undefined &&  attr.string_value !== null && attr.string_value !== '')
   {
     if(attr.attribute_data.type_value != "media")
       return attr.string_value;
     return dataSource.api + '/files/' + attr.string_value;
   }
   return '';
}
$(document).ready(function(){
  berpSDK = new CBerpSDK(dataSource.api);
})  
     