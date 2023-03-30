<script src="https://cdn.jsdelivr.net/npm/swiper@8/swiper-bundle.min.js"></script>
<script>
    const swiper = new Swiper('.swiper', {
        // Optional parameters
        direction: 'horizontal',
        loop: true,
        spaceBetween: 16,
    });
</script>
<script>

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

$('.item-nft').click(function(){
    window.location = "/nft-page";
});
</script>