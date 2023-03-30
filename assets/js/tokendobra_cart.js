
const loadContent = async() =>
{
  const offers = await berpSDK.api.getOffers();
  if(!offers.length)
    return;

}

$(document).ready(function(){
//   loadContent();
console.log('tcart', window.tcart); 
});
          