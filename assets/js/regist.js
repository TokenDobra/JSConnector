
const SignUp = class
{

   constructor() {
      this.login = $('#' + map_form.login).val();
      this.password = $('#' + map_form.password).val();
      this.confirm_password = $('#' + map_form.confirm_password).val();
      if( this.login ==  undefined || this.login ==  null || this.login ==  '')
        this.login = null;
      if( this.password ==  undefined || this.password ==  null || this.password ==  '')
        this.password = null;
      if( this.confirm_password ==  undefined || this.confirm_password ==  null || this.confirm_password ==  '')
        this.confirm_password = null;
      if( this.confirm_password !=  this.password)
        this.confirm_password = null;

   }
   validationLogin()
   {
     return (this.login !== null);
   }

   validationPassword()
   {
     return (this.password !== null);
   }
   validationConfirm()
   {
     return (this.confirm_password !== null);
   }
}


const signupAccount = async (signUp)=>
{
     const loginData = await purpleSDK.signup(signUp.login, signUp.password, signUp.confirm_password);
     if(!loginData.ok)
     {
       alert(loginData.error);
       return;
     }
     window.location.href = routingMap.main;

}



$('purpleContent').ready(function(){
  $('#' + map_form.regist_button).click(()=>{
     const signUp = new SignUp();

     if(!signUp.validationLogin())
     {
       alert('Не задан логин');
       return;
     }
     if(!signUp.validationPassword())
     {
       alert('Не задан пароль');
       return;
     }
     if(!signUp.validationConfirm())
     {
       alert('Пароль не подтвержен');
       return;
     }             
     signupAccount(signUp);
  })
})

