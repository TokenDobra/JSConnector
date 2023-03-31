const buildToken = (name, price, quantity, img, gen_uid)=>
{
   return { "name":  name,
            "price": price,
            "img": img,
            "recid": getRecID(),
            "lid":"",
            "pack_label":"",
            "pack_m":"",
            "pack_x":"",
            "pack_y":"",
            "pack_z":"",
            "part_uids":[""],
            "gen_uid":"",
            "url":"https://tokendobra.ru/nft-page",
            "quantity":quantity,
            "amount":quantity*price,
            "ts":Date.now() 
          }
}                   
const addTokenToCart = (token)=>
{
   window.tcart.amount += token.amount;
   window.tcart.prodamount += token.amount;
   window.tcart.total += quantity;
   if(window.tcart.products == undefined)
     window.tcart.products = [];
   window.tcart.products.push(token);
   tcart__saveLocalObj();
   tcart__updateTotalProductsinCartObj();
   tcart__reDrawCartIcon();
}
const getRecID = ()=>
{
   if(window.tcart.products == undefined || window.tcart.products.length == 0)
     return 1;
   return window.tcart.products[0].recid + 1;
}

$(document).ready(function(){
//   loadContent();
  const token = buildToken = ('nft test', 1000, 5, 'https://wallpapershome.ru/images/pages/pic_v/21485.jpg', 'hjhjh__jkjkk-hhhh543');

  console.log('tcart', window.tcart); 
  addTokenToCart(token);
  window.tcart.products = [];
  window.tcart.prodamount = 0;
  window.tcart.amount = 0;
  window.tcart.total = 0;
  console.log('tcart', window.tcart); 
});
          