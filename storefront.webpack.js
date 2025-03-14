const path = require('path')

module.exports = () => ({
  resolve: {
    alias: {
      './base-config': path.resolve(__dirname, 'template/js/netlify-cms/base-config'),
      './html/ProductCard.html': path.resolve(__dirname, 'template/js/custom-js/html/ProductCard.html'),   
      './js/ProductCard.js': path.resolve(__dirname, 'template/js/custom-js/html/ProductCard.js'),   
      './html/ProductGallery.html': path.resolve(__dirname, 'template/js/custom-js/html/ProductGallery.html'),   
      './js/ProductGallery.js': path.resolve(__dirname, 'template/js/custom-js/html/ProductGallery.js'),   
    //   './scss/ProductGallery.scss': path.resolve(__dirname, 'template/js/custom-js/html/ProductGallery.scss'),   
      './html/TheProduct.html': path.resolve(__dirname, 'template/js/custom-js/html/TheProduct.html'),   
      './js/TheProduct.js': path.resolve(__dirname, 'template/js/custom-js/html/TheProduct.js'),   
      './html/TheProduct.html': path.resolve(__dirname, 'template/js/custom-js/html/TheProduct.html'),   
      './js/TheProduct.js': path.resolve(__dirname, 'template/js/custom-js/html/TheProduct.js'),   
      './html/SearchEngine.html': path.resolve(__dirname, 'template/js/custom-js/html/SearchEngine.html'),   
      './js/SearchEngine.js': path.resolve(__dirname, 'template/js/custom-js/html/SearchEngine.js'),   
      './html/InstantSearch.html': path.resolve(__dirname, 'template/js/custom-js/html/InstantSearch.html'),   
      './js/InstantSearch.js': path.resolve(__dirname, 'template/js/custom-js/html/InstantSearch.js'),   
       './html/APrices.html': path.resolve(__dirname, 'template/js/custom-js/html/APrices.html'),   
       './html/CartItem.html': path.resolve(__dirname, 'template/js/custom-js/html/CartItem.html'),   
       './js/CartItem.js': path.resolve(__dirname, 'template/js/custom-js/html/CartItem.js'),   
       './html/TheCart.html': path.resolve(__dirname, 'template/js/custom-js/html/TheCart.html'),   
    //   './html/EcSummary.html': path.resolve(__dirname, 'template/js/custom-js/html/EcSummary.html'),  
    //   './html/QuantitySelector.html': path.resolve(__dirname, 'template/js/custom-js/html/QuantitySelector.html'),   
    //   './js/QuantitySelector.js': path.resolve(__dirname, 'template/js/custom-js/html/QuantitySelector.js'),   
       './html/CartQuickview.html': path.resolve(__dirname, 'template/js/custom-js/html/CartQuickview.html'),   
       './helpers/favorite-products': path.resolve(__dirname, 'template/js/custom-js/html/favorite-products.js'),   
      './helpers/favorite-products.js': path.resolve(__dirname, 'template/js/custom-js/html/favorite-products.js'),   
      '@ecomplus/storefront-components/src/js/helpers/favorite-products': path.resolve(__dirname, 'template/js/custom-js/html/favorite-products.js'), 
    }
  }
})
