const Login = class
{

   constructor() {
      this.login = $('#' + map_form.login).val();
      this.password = $('#' + map_form.password).val();
      if( this.login ==  undefined || this.login ==  null || this.login ==  '')
        this.login = null;
      if( this.password ==  undefined || this.password ==  null || this.password ==  '')
        this.password = null;

   }
   validationLogin()
   {
     return (this.login !== null);
   }

   validationPassword()
   {
     return (this.password !== null);
   }
}

const loginAccount = async (login)=>
{
     const loginData = await purpleSDK.login(login.login, login.password);
     if(!loginData.ok)
     {
       alert(loginData.error);
       return;
     }
     window.location.href = routingMap.main;

}

$('purpleContent').ready(function(){
  $('#' + map_form.login_button).click(()=>{
     const login = new Login();

     if(!login.validationLogin())
     {
       alert('Не задан логин');
       return;
     }
     if(!login.validationPassword())
     {
       alert('Не задан пароль');
       return;
     }
     loginAccount(login);
//     alert('loggining')
  })
})

