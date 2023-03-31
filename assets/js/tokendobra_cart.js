const buildToken = (name, price, quantity, img, uuid)=>
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
            "part_uids":[uuid],
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
   window.tcart.total += token.quantity;
   if(window.tcart.products == undefined)
     window.tcart.products = [];
   window.tcart.products.push(token);
   tcart__saveLocalObj();
   tcart__updateTotalProductsinCartObj();
   tcart__reDrawCartIcon();
   tcart__updateProductsPrice();
}
const getRecID = ()=>
{
   if(window.tcart.products == undefined || window.tcart.products.length == 0)
     return 1;
   return window.tcart.products[0].recid + 1;
}


window.myAfterSendedFunction = function (form) {
    if (!form) return;
    if (form instanceof jQuery) {
      form = form.get(0);
    }

    /* ����� ������ (Lead ID) */
    var leadId = form.tildaTranId;
    var orderId = form.tildaOrderId;

    /* ��� ���� ������ */
    var obj = {};
    var inputs = form.elements;
    Array.prototype.forEach.call(inputs, function (input) {
      obj[input.name] = input.value;
    });
    console.log('form', form);
    alert('Wait');
    /* ����� ����� �������� ��� �������� ������ � ������ �����, �������� � ���� ������ ��� ���������� ������ � cookie */
  };

  if (document.readyState !== 'loading') {
    us_eventFromCartToPayment();
  } else {
    document.addEventListener('DOMContentLoaded', us_eventFromCartToPayment);
  }

  function us_eventFromCartToPayment() {
    var forms = document.querySelectorAll('.js-form-proccess');
    Array.prototype.forEach.call(forms, function (form) {
      form.addEventListener('tildaform:aftersuccess', function () {
        window.myAfterSendedFunction(form);
      });
    });
  }

$(document).ready(function(){
//   loadContent();
//  const token = buildToken('nft test', 1000, 5, 'https://wallpapershome.ru/images/pages/pic_v/21485.jpg', 'hjhjh__jkjkk-hhhh543');
//  addTokenToCart(token);
});
          