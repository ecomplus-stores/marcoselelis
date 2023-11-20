// Add your custom JavaScript for storefront pages here.
const toggleButton = document.getElementById('apx_search-trigger');
toggleButton.addEventListener('click', () => {
  const instantSearchComponent = document.querySelector('[name="InstantSearch"]');
  if (instantSearchComponent) {
    instantSearchComponent.__vue__.toggleVisibility(); // Chama o método do componente Vue
  }
});

window.setImageOnProductCard = function(el,img){
    //console.log(img)
}

window.productListColors = function(_id){
    $('.product-card[data-product-id='+ _id +']').each(function(){
        let me = $(this);
        let colors = me.find('.product-card_colors:not(.loaded)');
        let itemData = colors && colors.attr('data-product') && colors.attr('data-product') != "undefined" && JSON.parse(colors.attr('data-product'));
        
        if(itemData && itemData.variationsGrids && itemData.variationsGrids.colors){
            me.find('.product-card__info').after('<div class="product-card_colors"></div>');
            for(let i=0; i< itemData.variationsGrids.colors.length; i++){ 
                let image = '';             
                let opt = itemData.variations.find(el => el.specifications.colors.some(color => color.text == itemData.variationsGrids.colors[i]) );
                
                if(opt && opt.picture_id){                
                    image = itemData.pictures.find(el => el._id == opt.picture_id);                
                }
                
                if(opt){
                    colors.append('<button type="button" data-image="' + (image ? image.normal.url : '') + '" style="background-color:' + opt.specifications.colors[0].value + '"></button>');                
                }
            }            
            colors.addClass('loaded')
        }
    });
}

$('body').on('click', '.product-card_colors button', function(){
    let colors = $(this).closest('.product-card_colors');
    colors.find('button').removeClass('active')
    $(this).addClass('active')
    let src = $(this).attr('data-image')
    let img = $(this).closest('.product-card').find('picture img')
    let srcset = $(this).closest('.product-card').find('picture source')
    img.attr('src',src)
    srcset.attr('srcset',src)
});

if(window.innerWidth < 990){
    $('.header__search-input').keyup(function(){
        $('body .search__input').val($(this).val())[0].dispatchEvent(new Event('input'));
    });
}

window.listingImage = function(){
    $('.product-card__pictures').each(function(){
        $(this).css('--width', $(this).innerWidth() + 'px')
    })
}

document.addEventListener('DOMContentLoaded', function() {
    window.listingImage();

    $('.category-banner + .page-title').appendTo('.hero-banner.category-banner')
});

if($('#page-products').length > 0){
    $('.sticky').css('--header-vh', $('header#header').innerHeight() + 'px');

    $('body').on('click','[data-tab]',function(){
        let tab = $(this).attr('data-tab');
        $('._'+tab).toggleClass('visible')
    })
}

window.addEventListener('load', function() {
    window.listingImage();
});
$(window).resize(function(){
    window.listingImage();
});
$(window).scroll(function(){
    window.listingImage();
})


