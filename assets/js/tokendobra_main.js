const templGallery = 'gallery.form';
const loadGallery = async () =>
{
  const gallery = await loadForm(templGallery);
  $('.works').append(gallery);

}

$(document).ready(function(){
   loadGallery();
   $('.funds.pc>.container').append('Фонды');
   $('.funds:not(.pc)>.container').append('Мобильная');


});
          