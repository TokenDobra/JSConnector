const templWork = 'fund_page_work.form';
const templFund = 'fund_page.form';
const templSite = 'fund_site.form';


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
             value: 100*(parseInt(obj.offer_quantity) - parseInt(obj.quantity))/parseInt(obj.offer_quantity)
           },
           ];
}

const getParamsFund = (obj) => {

   return [{name: '${avatar}',
             value: getAttribute(obj, 'Lable')
           },
           {name: '${name}',
             value: obj.subject_data.name
           },

           {name: '${assets}',
             value: obj.count_assets
           },
           {name: '${nft}',
             value: obj.count_nft
           },
          ];
}

const loadGallery = async (offers) =>
{
  const formWork = await loadForm(templWork);

  const content = offers.reduce((cont,obj)=>cont + fillFormData(formWork, getParams(obj)), '');
  $('.nfts>.container').append(content);
}


const loadMainSite = async (subject)=>
{
  const formSite = await loadForm(templSite);
  const home_url = getAttribute(subject, 'Site');
  let domain = (new URL(url));
  const content = fillFormData(formSite, [{name:'${home_site}': value:domain.hostname}, {name:'${home_url}': value:home_url}]);

  $('.description').append(content);


}
const loadContent = async (uuid) =>
{
  const offers = await berpSDK.api.getOffers();
  if(!offers.length)
    return;

  const formFund = await loadForm(templFund);
  const subjects = reduceSubjects(offers);
  const subject =  subjects.find((s)=>s.subject_data.uuid == uuid);

  const content = fillFormData(formFund, getParamsFund(subject));
  $('.main-image>.container').append(content);
  $('.description').append(getAttribute(subject, 'Description'));
  await loadMainSite(subject);




  await loadGallery(subject.offers);
}

$(document).ready(function(){
   const queryString = window.location.search;
   const urlParams = new URLSearchParams(queryString);
   let uuid = urlParams.get('uuid');

   loadContent(uuid);
});
          