
const loadContent = async() =>
{
  const offers = await berpSDK.api.getOffers();
  if(!offers.length)
    return;

  await loadGallery(offers);
}

$(document).ready(function(){
//   loadContent();

console.log('Tilda', Tilda); 
});
          