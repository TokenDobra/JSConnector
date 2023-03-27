const viewLogin = ()=>
{
  if(purpleSDK.isLogined())
  {
    $('#' + map_form.login).hide();
    $('#' + map_form.regist).hide();
    $('#' + map_form.loginName).show();
    $('#' + map_form.logout).show();
    $('#' + map_form.loginName).text(purpleSDK.getLoginName());

  }
  else
  {
    $('#' + map_form.login).show();
    $('#' + map_form.regist).show();
    $('#' + map_form.loginName).hide();
    $('#' + map_form.logout).hide();
  }

}

const logoutAccount = async ()=>
{
    const isLogout = await purpleSDK.logout();
    viewLogin();
}
$('purpleContent').ready(function(){

  $('#' + map_form.login).attr('href', routingMap.login);
  $('#' + map_form.regist).attr('href', routingMap.regist);

  viewLogin();
  $('#' + map_form.logout).click(()=>{
     logoutAccount();
  });
  const eventElem = document.getElementById('eventPurpleSDK');


  eventElem.addEventListener('logout', function(event) {
     viewLogin();
  });



/*
  $('#' + map_form.login_button).click(()=>{
     alert('loggining')
  })
*/
})

