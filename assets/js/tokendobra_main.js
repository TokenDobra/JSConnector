const templWork = 'work.form';
const templFund = 'fund.form';
const templFundPC = 'fund_pc.form';

const templFundWork = 'fund_work.form';
const templFundPCWork = 'fund_pc_work.form';






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
const getParamsFund = (obj) => {

   return [{ name: '${url}',
             value: ''
           },
           {name: '${avatar}',
             value: 'https://github.com/jamb17/token-dobra/blob/main/avatar.png?raw=true'
           },
           {name: '${name}',
             value: obj['subject_data.name']
           },

           {name: '${assets}',
             value: 12
           },
           {name: '${nft}',
             value: obj.offer_quantity
           },
           {name: '${fund_url}',
             value: obj.offer_quantity
           },
          ];
}
const loadGallery = async (offers) =>
{
  const formWork = await loadForm(templWork);

  const content = offers.reduce((cont,obj)=>cont + fillFormData(formWork, getParams(obj)), '');
  $('.works').append(content);
}

const loadFundPCGallery = async (offers) =>
{
  const formWork = await loadForm(templFundPCWork);

  const content = offers.slice(0,4).reduce((cont,obj)=>cont + fillFormData(formWork, getParams(obj)), '');
  $('.funds.pc>.container .wrapper').append(content);
}



const loadFundPC  = async (offers)=>
{
  const formFundPC = await loadForm(templFundPC);
  const content = fillFormData(formFundPC, getParamsFund(offers[0]));
  $('.funds.pc>.container').append(content);
  await loadFundPCGallery(offers);
}

const loadFundGallery = async (offers) =>
{
  const formWork = await loadForm(templFundWork);

  const content = offers.slice(0,4).reduce((cont,obj)=>cont + fillFormData(formWork, getParams(obj)), '');
  $('.funds:not(.pc)>.container .wrapper').append(content);
}

const loadFund  = async (offers)=>
{
  const formFund = await loadForm(templFund);
  const content = fillFormData(formFund, getParamsFund(offers[0]));
  $('.funds:not(.pc)>.container').append(content);
  await loadFundGallery(offers);
}


const loadContent = async() =>
{
  const offers = await berpSDK.api.getOffers();
  if(!offers.length)
    return;

//  await loadGallery(offers);
  await loadFundPC(offers);
  await loadFund(offers);


}

$(document).ready(function(){
   loadContent();
});
          