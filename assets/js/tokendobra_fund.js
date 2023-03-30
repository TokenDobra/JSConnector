const templWork = 'fund_page_work.form';




const getParams = (obj)=>{
    return [{name: '${url_work}',
             value: dataSource.item_page + obj.uuid
           },
           {name: '${image_asset}',
             value: obj.link_address
           },
           {name: '${asset_name}',
             value: obj.asset_data.name
           },
           {name: '${asset_price}',
             value: obj.price
           },
           {name: '${current_quantity}',
             value: obj.quantity
           },
           {name: '${quantity}',
             value: obj.offer_quantity
           },
           {name: '${author}',
             value: getFullName(obj.asset_data.subject_specification_data.person_data)
           },
           {name: '${sale_quantity}',
             value: parseInt(obj.offer_quantity) - parseInt(obj.quantity)
           },
           {name: '${progress}',
             value: 10//100*(parseInt(obj.offer_quantity) - parseInt(obj.quantity))/parseInt(obj.offer_quantity)
           },
           ];
}
const loadGallery = async (offers) =>
{
  const formWork = await loadForm(templWork);

  const content = offers.reduce((cont,obj)=>cont + fillFormData(formWork, getParams(obj)), '');
  $('.nfts>.container').append(content);
}



const loadContent = async() =>
{
  const offers = await berpSDK.api.getOffers();
  if(!offers.length)
    return;

  await loadGallery(offers);
}

$(document).ready(function(){
   loadContent();
});
          