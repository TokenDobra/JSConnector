const templWork = 'work.form';
const templFund = 'fund.form';
const templFundPC = 'fund_pc.form';

const templFundWork = 'fund_work.form';
const templFundPCWork = 'fund_pc_work.form';





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


const getParamsFund = (obj, pefix) => {

   return [{ name: '${url}',
             value: ''
           },
           {name: '${avatar}',
             value: getAttribute(obj, 'Second lable');
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
           {name: '${fund_url}',
             value: 'fund?uuid=' + obj.subject_data.uuid
           },
           {
              name: '${gallery}',
              value: prefix+obj.subject_data.uuid;
           }
          ];
}


const loadGallery = async (offers) =>
{
  const formWork = await loadForm(templWork);

  const content = shuffleArray(offers).slice(0,8).reduce((cont,obj)=>cont + fillFormData(formWork, getParams(obj)), '');
  $('.works').append(content);
}


const loadFundPCGallery = async (offers, conteiner) =>
{
  const formWork = await loadForm(templFundPCWork);

  const content = offers.reverse.slice(0,3).reduce((cont,obj)=>cont + fillFormData(formWork, getParams(obj)), '');
  $('.' + conteiner).append(content);
}


const loadFundPC  = async (offers)=>
{
  const formFundPC = await loadForm(templFundPC);
  const subjects = reduceSubjects(offers);
  const prefix = 'gallery_pc_';
  subjects.map((subject)=>{
     const content = fillFormData(formFundPC, getParamsFund(subject, prefix));
     $('.funds.pc>.container').append(content);
  });
  for(let s of subjects)
     await loadFundPCGallery(s.offers, prefix + s.subject_data.uuid);
}

const loadFundGallery = async (offers) =>
{
  const formWork = await loadForm(templFundWork);

  const content = offers.reverse.reduce((cont,obj)=>cont + fillFormData(formWork, getParams(obj)), '');
  $('.' + conteiner).append(content);                                                                                        
}

const loadFund  = async (offers)=>
{
  const formFund = await loadForm(templFund);
  const subjects = reduceSubjects(offers);
  const prefix = 'gallery_';
  subjects.map((subject)=>{
     const content = fillFormData(formFund, getParamsFund(subject, prefix));
     $('.funds:not(.pc)>.container').append(content);
  });
  for(let s of subjects)
     await loadFundGallery(s.offers, prefix + s.subject_data.uuid);
}


const loadContent = async() =>
{
  const offers = await berpSDK.api.getOffers();
  if(!offers.length)
    return;

  await loadGallery(offers);
  await loadFundPC(offers);
  await loadFund(offers);

  const swiper = new Swiper('.swiper', {
        // Optional parameters
        direction: 'horizontal',
        loop: true,
        spaceBetween: 16,
  });

  $('.funds.pc .item-nft').hover(function() {
      var $this = $(this);
      var tips = $this.children('.tips');
      var name = $this.children('.bottom');
      var bg = $this.children('.bg');
      $this.toggleClass('hover');
      tips.children('.tip').toggleClass('hover');
      name.children('.name').toggleClass('hover');
      bg.toggleClass('active');
   });

/*
$('.item-nft').click(function(){
    window.location = "/nft-page";
});
*/



}

$(document).ready(function(){
   loadContent();
});
          