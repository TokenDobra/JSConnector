
const viewButton = ()=>
{
  if(purpleSDK.isLogined())
  {
    $('#' + map_form_addbutton.addbutton).show();
  }
  else
  {
    $('#' + map_form_addbutton.addbutton).hide();
  }

}

$('purpleAddbutton').ready(function(){
  viewButton();
  $('#' + map_form_addbutton.addbutton).click(()=>{
      window.location.href = routingMap.newart;
  })
  const eventElem = document.getElementById('eventPurpleSDK');


  eventElem.addEventListener('logout', function(event) {
     viewButton();
  });

})

