
$(document).ready(function(){
//   loadContent();

  console.log('tcart', window.tcart); 
  window.tcart.products = [];
  window.tcart.prodamount = 0;
  window.tcart.amount = 0;
  window.tcart.total = 0;
  tcart__saveLocalObj();
  tcart__updateTotalProductsinCartObj();
  tcart__reDrawCartIcon();
  console.log('tcart', window.tcart); 
});
          