/*
${nav_class}                                                     data-swiper-slide-index  ${swier_index}   ${number_item}
1. swiper-slide-duplicate                                        5                                         6
2. swiper-slide-prev                                             0                                         1
3. swiper-slide-active                                           1                                         2
4. swiper-slide-next                                             2                                         3
5.                                                                                                         1
Последняя swiper-slide-duplicate swiper-slide-duplicate-prev     0
*/

const templFund = 'fund_nft.form';
const templFundPC = 'fund_nft_pc.form';
const templFundWork = 'fund_nft_work.form';
const templFundPCWork = 'fund_nft_work_pc.form';
const templPicture = 'picture.form';
const templBuy = 'buy.form';

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
           {name: '${sale_quantity}',
             value: parseInt(obj.offer_quantity) - parseInt(obj.quantity)
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
             value: 'fund'
           },
          ];
}
const getParamsPicture = (obj) => {
    return [{name: '${image_asset}',
             value: obj.link_address
           },
           ];

}

const getParamsBuy = (obj)=>{
    return [{name: '${url_work}',
             value: dataSource.item_page + obj.uuid
           },
           {name: '${image_asset}',
             value: obj.link_address
           },
           {name: '${fund_name}',
             value: obj['subject_data.name']
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
           {name: '${rest_quantity}',
             value: obj.quantity
           },
           {name: '${sale_quantity}',
             value: parseInt(obj.offer_quantity) - parseInt(obj.quantity)
           },


           {name: '${author}',
             value: getFullName(obj.asset_data.subject_specification_data.person_data)
           },
           ];
}



const loadFundPCGallery = async (offers) =>
{
  const formWork = await loadForm(templFundPCWork);

  const content = offers.reverse().slice(0,4).reduce((cont,obj)=>cont + fillFormData(formWork, getParams(obj)), '');
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

  const content = offers.reverse().slice(0,4).reduce((cont,obj)=>cont + fillFormData(formWork, getParams(obj)), '');
  $('.funds:not(.pc)>.container .wrapper').append(content);
}

const loadFund  = async (offers)=>
{
  const formFund = await loadForm(templFund);
  const content = fillFormData(formFund, getParamsFund(offers[0]));
  $('.funds:not(.pc)>.container').append(content);
//  await loadFundGallery(offers);
}

const loadPicture  = async (offer)=>
{
  const formPicture = await loadForm(templPicture);
  const content = fillFormData(formPicture, getParamsPicture(offer));
  $('.picture').append(content);
}

const loadBuy  = async (offer)=>
{
  const formBuy = await loadForm(templBuy);
  const content = fillFormData(formBuy, getParamsBuy(offer));
  $('.buy>.container').append(content);
}


const findOffer = (offers, offerUUID)=>
{
   return offers.find(element => element.uuid == offerUUID);
}

const loadContent = async(offerUUID) =>
{
  const offers = await berpSDK.api.getOffers();
  if(!offers.length)
    return;
  const offer = findOffer(offers, offerUUID);
  await loadPicture(offer);
  await loadBuy(offer);

  await loadFundPC(offers);
  await loadFund(offers);
}



$(document).ready(function(){
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  let uuid = urlParams.get('uuid');
  loadContent(uuid);
});