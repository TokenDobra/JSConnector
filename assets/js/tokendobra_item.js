/*
${nav_class}                                                     data-swiper-slide-index  ${swier_index}   ${number_item}
1. swiper-slide-duplicate                                        5                                         6
2. swiper-slide-prev                                             0                                         1
3. swiper-slide-active                                           1                                         2
4. swiper-slide-next                                             2                                         3
5.                                                                                                         1
��������� swiper-slide-duplicate swiper-slide-duplicate-prev     0
*/

const templFund = 'fund_nft.form';
const templFundPC = 'fund_nft_pc.form';
const templFundWork = 'fund_nft_work.form';
const templFundPCWork = 'fund_nft_work_pc.form';
const templPicture = 'picture.form';
const templBuy = 'buy.form';

let nft_price = 0;
let nft_price_physic = 0;
let nft_max_quantity_physic = 0;
let nft_max_quantity = 0;

const asset = {
  offer: '',
  image: '',
  name: '',
  reg: '',
  reg_physic: '',
  price: 0,
  price_physic: 0,
  max_quantity_physic: 0,
  max_quantity: 0,
  quantity:0,
  quantity_physic: 0,
  physic:false,
}
const setAsset = (offer)=>{
  asset.offer               = offer.uuid;
  asset.image               = offer.link_address;
  asset.name                = offer.asset_data.name;
  asset.reg                 = findRegistr(offer.registrs);
  asset.reg_physic          = findRegistrPhysic(offer.registrs);
  asset.price               =  parseInt(offer.price);
  asset.price_physic        =  parseInt(offer.physic_price);
  asset.quantity            =  parseInt(offer.quantity);
  asset.max_quantity_physic =  parseInt(offer.physic_quantity);
  asset.quantity            =  1;
  asset.quantity_physic     =  0;
}

const isPhysic = (a) =>
{ 
   return a.physic;
}
const setPhysic = (physic) =>
{ 
   asset.physic = physic;
}
const setQuantity = (quantity) =>
{ 
   if(isPhysic(asset))
      asset.quantity_physic = quantity;
    asset.quantity = quantity;
}




const getPriceAsset = (a)=>
{
   if(isPhysic(a))
     return parseInt(a.price_physic);
   return parseInt(a.price);
}
const getQuantityAsset = (a)=>
{
   if(isPhysic(a))
     return parseInt(a.quantity_physic);
   return parseInt(a.quantity);
}
const getRestQuantity = (a) =>
{
   if(isPhysic(a))
     return parseInt(nft_max_quantity_physic);
   return nft_max_quantity;
}

const getRegAsset = (a)=>
{
   if(isPhysic(a))
     return parseInt(a.reg_physic);
   return parseInt(a.reg);
}
const getToken = (a)=>
{
    return buildToken(a.name, getPriceAsset(a), getQuantityAsset(a), a.image, getRegAsset(a));
}



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
           {name: '${progress}',
             value: 100*(parseInt(obj.offer_quantity) - parseInt(obj.quantity))/parseInt(obj.offer_quantity)
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

           {name: '${description}',
             value: obj.asset_data.description
           },
           {name: '${author}',
             value: getFullName(obj.asset_data.subject_specification_data.person_data)
           },
           {name: '${progress}',
             value: 100*(parseInt(obj.offer_quantity) - parseInt(obj.quantity))/parseInt(obj.offer_quantity)
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

  const content = offers.reverse().reduce((cont,obj)=>cont + fillFormData(formWork, getParams(obj)), '');
  $('.funds:not(.pc)>.container .wrapper').append(content);
}

const loadFund  = async (offers)=>
{
  const formFund = await loadForm(templFund);
  const content = fillFormData(formFund, getParamsFund(offers[0]));
  $('.funds:not(.pc)>.container').append(content);
  await loadFundGallery(offers);
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

const findRegistr = (registrs)=>
{
  const reg = registrs.find((el)=>el.resource_data.provider_data.name != 'Physically');
  if(reg == undefined)
    return '';
  return reg.uuid;
}
const findRegistrPhysic = (registrs)=>
{
  const reg = registrs.find((el)=>el.resource_data.provider_data.name == 'Physically');
  if(reg == undefined)
    return '';
  return reg.uuid;
}


const loadContent = async(offerUUID) =>
{
  const offers = await berpSDK.api.getOffers();
  if(!offers.length)
    return;
  const offer = findOffer(offers, offerUUID);

  nft_price = parseInt(offer.price);
  nft_max_quantity = parseInt(offer.quantity);
  nft_price_physic = parseInt(offer.physic_price);
  nft_max_quantity_physic = parseInt(offer.physic_quantity);
  setAsset(offer);


  await loadPicture(offer);
  await loadBuy(offer);

  await loadFundPC(offers);
  await loadFund(offers);
  postLoadingScript();


}



$(document).ready(function(){
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  let uuid = urlParams.get('uuid');
  loadContent(uuid);
});

const postLoadingScript = ()=>{
     const swiper = new Swiper('.swiper', {
            // Optional parameters
            direction: 'horizontal',
            loop: true,
            spaceBetween: 16,
      });
      let count = Number($('.item-nft:nth-child(2) .info .stats span').text());
      let width = count * 0.1;
/*
    $('.funds.pc .item-nft').hover(function() {
        var $this = $(this);
        var tips = $this.children('.tips');
        var name = $this.children('.bottom');
        $this.toggleClass('hover');
        tips.children('.tip').toggleClass('hover');
        name.children('.name').toggleClass('hover');
    });
*/
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

//      document.querySelector('.status').style.width = width + '%';

    // open pop up
    $('#open').click(function() {
        $('.pop-up').addClass('open');
        setTimeout(function() {
            $('.content').addClass('open');
        }, 100);
    });

    // open pop up
    $('header .btn-white').click(function() {
        $('.pop-up').addClass('open');
        setTimeout(function() {
            $('.content').addClass('open');
        }, 100);
    });

    // open pop up
    $('.hyper-link.pc').click(function() {
        $('.pre-nft-popup').addClass('open');
        setTimeout(function() {
            $('.content').addClass('open');
        }, 100);
    });

    $('.hyper-link.one').click(function() {
        $('.mobile-popup.first').addClass('open');
        setTimeout(function() {
            $('.content').addClass('open');
        }, 100);
    });

    $('.hyper-link.two').click(function() {
        $('.mobile-popup.second').addClass('open');
        setTimeout(function() {
            $('.content').addClass('open');
        }, 100);
    });
    // close pop up
    $('.close-popup').click(function() {
        $('.content').removeClass('open');
        setTimeout(function() {
            $('.pop-up').removeClass('open');
        }, 100);
    });
    
    $('.mobile-popup.first .link').click(function(){
        $('.mobile-popup.first .content').removeClass('open');
        $('.mobile-popup.first').removeClass('open');
        $('.mobile-popup.second').addClass('open');
        $('.mobile-popup.second .content').addClass('open');
    })
    
    $('.mobile-popup.second .link').click(function(){
        $('.mobile-popup.second .content').removeClass('open');
        $('.mobile-popup.second').removeClass('open');
        $('.mobile-popup.first').addClass('open');
        $('.mobile-popup.first .content').addClass('open');
    })
    
    // close pop up
    $('.close-popup').click(function() {
        $('.content').removeClass('open');
        setTimeout(function() {
            $('.pre-nft-popup').removeClass('open');
            $('.mobile-popup.first').removeClass('open');
            $('.mobile-popup.second').removeClass('open');
        }, 100);
    });
    
    // copy link from pop up
    $('.copy').click(function() {
        var form_text = $('.form_text');
        this.style.border = "2px solid #C5EC00";
        navigator.clipboard.writeText(form_text.text());
    })
    
    // slider cards hover effect
    $('.swiper-slide .item-nft').hover(function() {
        var $this = $(this);
        var tips = $this.children('.tips');
        $this.toggleClass('hover');
        // tips.children('.tip').toggleClass('hover');
    });
    
    // dropdown

    const dropdowns = document.querySelectorAll('.dropdown');

    var price = $('.price');
/*
    if(max_quantity_physic > 0)
    {
       const options = dropdown.querySelectorAll('.menu li');
       options.forEach(option => {
           if(option.innerText == second_option)
           {
               const parent = h1.parentNode
               option.removeChild(h1)
           }
       })
    }
*/


const setRestQuantity = ()=>{
   const q = getRestQuantity(asset);
   const el = $('#rest_quantity');
   el.text(q);
}
dropdowns.forEach(dropdown => {
    const select = dropdown.querySelector('.select');
    const caret = dropdown.querySelector('.caret');
    const menu = dropdown.querySelector('.menu');
    const options = dropdown.querySelectorAll('.menu li');
    const selected = dropdown.querySelector('.selected');
    var nft_quantity = document.getElementById('nft-quantity');
    var nft_quantity_mob = document.getElementById('nft-quantity-mob');
    const first_option = 'pre-NFT';
    const second_option = 'Оригинал';


    if(nft_max_quantity_physic != 0)
    {
       //Нет физической картины
       select.addEventListener('click', () => {
          select.classList.toggle('open');
          caret.classList.toggle('rotate');
          menu.classList.toggle('open');
       });   
    }
    options.forEach(option => {
        option.addEventListener('click', () => {
            if(selected.innerText != first_option) {
                setPhysic(false);

                selected.innerText = first_option;
                option.innerText = second_option;
                if($(window).width() < 770) {
                    var y = nft_price * Number(nft_quantity_mob.innerText);
                    price.text(y + ' ₽');    
                } else {
                    var y = nft_price * Number(nft_quantity.innerText);
                    price.text(y + ' ₽');    
                }
                setQuantity(1);
                setRestQuantity();


            } else {
                setPhysic(true);
                selected.innerText = second_option;
                option.innerText = first_option;


                
                price.text(nft_price_physic + ' ₽');    
                setQuantity(1);
                setRestQuantity();
                
                


                if($(window).width() < 770) {
                    nft_quantity_mob.innerText = '1';


//                    var y = 3000 * Number(nft_quantity_mob.innerText);
//                    price.text(y + ' ₽');    
                } else {
                    nft_quantity.innerText = '1';

//                    var y = 3000 * Number(nft_quantity.innerText);
//                    price.text(y + ' ₽');    
                }
            };
            select.classList.remove('open');
            caret.classList.remove('rotate');
            menu.classList.remove('open');
//            $('.buy .btn-black').attr("href", "#order:NFT =" + parseInt(price.text()) + ":::image=https://static.tildacdn.com/stor6437-3230-4135-b134-393363383930/61903249.png");
            options.forEach(option => {
                option.classList.remove('open');
            });
            option.classList.add('open');
        });
    });
});

$('.plus').click(function() {
    var nft_quantity = document.getElementById('nft-quantity');
    var i;
    var selected = $('.selected.pc').text();
    var selected_text = 'pre-NFT';
    i = Number(nft_quantity.innerText);


    if(selected == selected_text)
    {
      if(i < nft_max_quantity)
      {
         i++;
         nft_quantity.innerText = i;
         setQuantity(i);
         setRestQuantity();


         var x = nft_price * Number(nft_quantity.innerText);
         price.text(x + ' ₽');
      }
    }
    else
    {
       if(i < nft_max_quantity_physic)
       {
         i++;
         nft_quantity.innerText = i;
         setQuantity(i);
         setRestQuantity();

         var x = nft_price_physic * Number(nft_quantity.innerText);
         price.text(x + ' ₽');
       }
    }
//    $('.buy .btn-black').attr("href", "#order:NFT =" + parseInt(price.text()) + ":::image=https://static.tildacdn.com/stor6437-3230-4135-b134-393363383930/61903249.png");
});

$('.minus').click(function() {
    var nft_quantity = document.getElementById('nft-quantity');
    var i;
    var selected = $('.selected.pc').text();
    var selected_text = 'pre-NFT';
    i = Number(nft_quantity.innerText);
    if(i > 0) {
        if(selected == selected_text) {
            i--;
            nft_quantity.innerText = i;
            setQuantity(i);
            setRestQuantity();

            var x = nft_price * Number(nft_quantity.innerText);
            price.text(x + ' ₽');
        } else {
            i--;
            nft_quantity.innerText = i;
            setQuantity(i);
            setRestQuantity();

            var y = nft_price_physic * Number(nft_quantity.innerText);
            price.text(0 + ' ₽');
        }
    }   
//    $('.buy .btn-black').attr("href", "#order:NFT =" + parseInt(price.text()) + ":::image=https://static.tildacdn.com/stor6437-3230-4135-b134-393363383930/61903249.png");
}); 

$('.plus-mob').click(function() {
    var nft_quantity = document.getElementById('nft-quantity-mob');
    var i;
    i = Number(nft_quantity.innerText);
    var selected = $('.selected.mob').text();
    var selected_text = 'pre-NFT';
    if(selected == selected_text)
    {
      if(i < nft_max_quantity)
      {
         i++;
         nft_quantity.innerText = i;
         setQuantity(i);
         setRestQuantity();

         var x = nft_price * Number(nft_quantity.innerText);
         price.text(x + ' ₽');
      }
    }
    else
    {
       if(i < nft_max_quantity_physic)
       {
         i++;
         nft_quantity.innerText = i;
         setQuantity(i);
         setRestQuantity();

         var x = nft_price_physic * Number(nft_quantity.innerText);
         price.text(x + ' ₽');
       }
    }
//    $('.buy .btn-black').attr("href", "#order:NFT =" + parseInt(price.text()) + ":::image=https://static.tildacdn.com/stor6437-3230-4135-b134-393363383930/61903249.png");
});

$('.minus-mob').click(function() {
    var nft_quantity = document.getElementById('nft-quantity-mob');
    var i;
    var selected = $('.selected.mob').text();
    var selected_text = 'pre-NFT';
    i = Number(nft_quantity.innerText);
    if(i > 0) {
        if(selected == selected_text) {
            i--;
            nft_quantity.innerText = i;
            setQuantity(i);
            setRestQuantity();

            var x = nft_price * Number(nft_quantity.innerText);
            price.text(x + ' ₽');
        } else {
            i--;
            nft_quantity.innerText = i;
            setQuantity(i);
            setRestQuantity();

            var y = nft_price_physic * Number(nft_quantity.innerText);
            price.text(y + ' ₽');
        }
    }  
//    $('.buy .btn-black').attr("href", "#order:NFT =" + parseInt(price.text()) + ":::image=https://static.tildacdn.com/stor6437-3230-4135-b134-393363383930/61903249.png");
}); 
    
    $('.question').hover(function () {
        $('.answer').toggleClass('active'); 
    });
    
    $(document).ready(function() {
        var quantity = Number($('.sold p span').html()) * 0.1;
        document.querySelector('.bar').style.width = quantity + '%';
    })
    
    $(document).ready(function() {
        $('.item-nft').each(function(){
            var span = $(this).find('.count span').html();
            var bar = $(this).find('.bar');
            bar.css({width: Number(span) * 0.1 + '%'})
        })
    })

    $('.buy .btn-black').click(function () {
         const token = getToken(asset);
         addTokenToCart(token);


        var prod_quantity = $('.t706__product-quantity').text(); 
        var nft_quantity =  $('#nft-quantity').text();
        prod_quantity = nft_quantity;
    });

    

}
