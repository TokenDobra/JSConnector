const templWork = 'work.form';

const getParams = (obj)=>{
    return [{name: '${url_work}',
             value: ''
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
           ];
}
const loadGallery = async () =>
{
  const formWork = await loadForm(templWork);

  const offers = await berpSDK.api.getOffers();
  const content = offers.reduce((cont,obj)=>cont + fillFormData(formWork, getParams(obj)), '');
  $('.works').append(content);
}

$(document).ready(function(){
   loadGallery();
   $('.funds.pc>.container').append('Фонды');
   $('.funds:not(.pc)>.container').append('Мобильная');


});
          