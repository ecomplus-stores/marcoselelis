import {
  i19addToFavorites,
  i19buy,
  i19close,
  i19days,
  i19discountOf,
  i19endsIn,
  i19freeShippingFrom,
  i19loadProductErrorMsg,
  i19offer,
  i19only,
  i19outOfStock,
  i19paymentOptions,
  i19perUnit,
  i19productionDeadline,
  i19removeFromFavorites,
  i19retry,
  i19selectVariationMsg,
  i19unavailable,
  i19units,
  i19unitsInStock,
  i19workingDays
} from '@ecomplus/i18n'

import {
  i18n,
  randomObjectId as genRandomObjectId,
  name as getName,
  inStock as checkInStock,
  onPromotion as checkOnPromotion,
  price as getPrice,
  img as getImg,
  variationsGrids as getVariationsGrids,
  specTextValue as getSpecTextValue,
  specValueByText as getSpecValueByText,
  formatMoney,
  $ecomConfig
} from '@ecomplus/utils'

import { store, modules } from '@ecomplus/client'
import EcomSearch from '@ecomplus/search-engine'
import ecomCart from '@ecomplus/shopping-cart'
import { isMobile } from '@ecomplus/storefront-twbs'
import lozad from 'lozad'
import sortApps from '@ecomplus/storefront-components/src/js//helpers/sort-apps'
import addIdleCallback from '@ecomplus/storefront-components/src/js//helpers/add-idle-callback'
import scrollToElement from '@ecomplus/storefront-components/src/js//helpers/scroll-to-element'
import { Portal } from '@linusborg/vue-simple-portal'
import ALink from '@ecomplus/storefront-components/src/ALink.vue'
import AAlert from '@ecomplus/storefront-components/src/AAlert.vue'
import APicture from '@ecomplus/storefront-components/src/APicture.vue'
import APrices from '@ecomplus/storefront-components/src/APrices.vue'
import AShare from '@ecomplus/storefront-components/src/AShare.vue'
import ProductVariations from '@ecomplus/storefront-components/src/ProductVariations.vue'
import ProductGallery from '@ecomplus/storefront-components/src/ProductGallery.vue'
import QuantitySelector from '@ecomplus/storefront-components/src/QuantitySelector.vue'
import ShippingCalculator from '@ecomplus/storefront-components/src/ShippingCalculator.vue'
import PaymentOption from '@ecomplus/storefront-components/src/PaymentOption.vue'
import ecomPassport from '@ecomplus/passport-client'
import { toggleFavorite, checkFavorite } from '@ecomplus/storefront-components/src/js/helpers/favorite-products'

const storefront = (typeof window === 'object' && window.storefront) || {}
const getContextBody = () => (storefront.context && storefront.context.body) || {}
const getContextId = () => getContextBody()._id

const sanitizeProductBody = body => {
  const product = Object.assign({}, body)
  delete product.body_html
  delete product.body_text
  delete product.specifications
  delete product.inventory_records
  delete product.price_change_records
  return product
}

export default {
  name: 'TheProduct',

  components: {
    Portal,
    ALink,
    AAlert,
    APicture,
    APrices,
    AShare,
    ProductVariations,
    ProductGallery,
    QuantitySelector,
    ShippingCalculator,
    PaymentOption
  },

  props: {
    productId: {
      type: String,
      default () {
        return getContextId()
      }
    },
    product: Object,
    headingTag: {
      type: String,
      default: 'h1'
    },
    buyText: String,
    galleryColClassName: {
      type: String,
      default: 'col-12 col-md-6'
    },
    hasPromotionTimer: Boolean,
    hasStickyBuyButton: {
      type: Boolean,
      default: true
    },
    hasQuantitySelector: Boolean,
    canAddToCart: {
      type: Boolean,
      default: true
    },
    hasBuyButton: {
      type: Boolean,
      default: true
    },
    lowQuantityToWarn: {
      type: Number,
      default: 12
    },
    maxVariationOptionsBtns: Number,
    isQuickview: Boolean,
    paymentAppsSort: {
      type: Array,
      default () {
        return window.ecomPaymentApps || []
      }
    },
    quoteLink: String,
    isSSR: Boolean,
    ecomPassport: {
      type: Object,
      default () {
        return ecomPassport
      }
    },
    accountUrl: {
      type: String,
      default: '/app/#/account/'
    }
  },

  data () {
    return {
      body: {},
      fixedPrice: null,
      selectedVariationId: null,
      currentGalleyImg: 1,
      isOnCart: false,
      qntToBuy: 1,
      isStickyBuyVisible: false,
      isFavorite: false,
      hasClickedBuy: false,
      hasLoadError: false,
      paymentOptions: [],
      customizations: [],
      kitItems: [],
      currentTimer: null,
      cms_customizations : [],
      cms_customizations_step : 1,
      current_customization : [],
      customizationPanel : false,
      variationImagesKey : null,
      variationImages: [],      
      variantGalleryImages:[]
    }
  },

  computed: {
    i19addToFavorites: () => i18n(i19addToFavorites),
    i19close: () => i18n(i19close),
    i19days: () => i18n(i19days),
    i19discountOf: () => i18n(i19discountOf),
    i19endsIn: () => i18n(i19endsIn),
    i19freeShippingFrom: () => i18n(i19freeShippingFrom),
    i19loadProductErrorMsg: () => i18n(i19loadProductErrorMsg),
    i19offer: () => i18n(i19offer),
    i19only: () => i18n(i19only),
    i19outOfStock: () => i18n(i19outOfStock),
    i19paymentOptions: () => i18n(i19paymentOptions),
    i19perUnit: () => i18n(i19perUnit),
    i19productionDeadline: () => i18n(i19productionDeadline),
    i19removeFromFavorites: () => i18n(i19removeFromFavorites),
    i19retry: () => i18n(i19retry),
    i19selectVariationMsg: () => i18n(i19selectVariationMsg),
    i19unavailable: () => i18n(i19unavailable),
    i19quoteProduct: () => 'Cotar produto',
    i19units: () => i18n(i19units).toLowerCase(),
    i19unitsInStock: () => i18n(i19unitsInStock),
    i19workingDays: () => i18n(i19workingDays),

    selectedVariation () {
      return this.selectedVariationId
        ? this.body.variations.find(({ _id }) => _id === this.selectedVariationId)
        : {}
    },

    name () {
      return this.selectedVariation.name || getName(this.body)
    },

    isInStock () {
      return checkInStock(this.body)
    },

    isWithoutPrice () {
      return !getPrice(this.body)
    },

    isVariationInStock () {
      return checkInStock(this.selectedVariationId ? this.selectedVariation : this.body)
    },

    isLogged () {
      return ecomPassport.checkAuthorization()
    },

    thumbnail () {
      return getImg(this.body, null, 'small')
    },

    productQuantity () {
      if (this.selectedVariation.quantity) {
        return this.selectedVariation.quantity
      } else if (this.body.quantity) {
        return this.body.quantity
      }
    },

    isLowQuantity () {
      return this.productQuantity > 0 && this.lowQuantityToWarn > 0 &&
        this.productQuantity <= this.lowQuantityToWarn
    },

    strBuy () {
      return this.buyText || i18n(i19buy)
    },

    discount () {
      const { body } = this
      const priceValue = this.fixedPrice || getPrice(body)
      return checkOnPromotion(body) || (body.price > priceValue)
        ? Math.round(((body.base_price - priceValue) * 100) / body.base_price)
        : 0
    },

    isOnSale () {
      const { body } = this
      return this.hasPromotionTimer &&
        checkOnPromotion(body) &&
        body.price_effective_date &&
        body.price_effective_date.end &&
        Date.now() < new Date(body.price_effective_date.end).getTime()
    },

    ghostProductForPrices () {
      const prices = {}
      ;['price', 'base_price'].forEach(field => {
        let price = this.selectedVariation[field] || this.body[field]
        if (price !== undefined) {
          this.customizations.forEach(customization => {
            if (customization.add_to_price) {
              price += this.getAdditionalPrice(customization.add_to_price)
            }
          })
        }
        prices[field] = price
      })
      const ghostProduct = { ...this.body }
      if (this.selectedVariationId) {
        Object.assign(ghostProduct, this.selectedVariation)
        delete ghostProduct.variations
      }
      
      return {
        ...ghostProduct,
        ...prices
      }
    },

    hasVariations () {
      return this.body.variations && this.body.variations.length
    },

    isKit () {
      return this.body.kit_composition && this.body.kit_composition.length
    },

    productToGallery() {
      if (this.variationImages.length) {
        window.mainProductGallery = [...this.variationImages]
        this.variationImagesKey = Math.random().toString()
        //console.log('update',window.mainProductGallery)
        return {
          ...this.body,
          pictures: this.variationImages
          //...this.body.pictures
        }
      }
      return this.body
    }
  },

  methods: {
    getVariationsGrids,
    getSpecValueByText,

    setBody (data) {
      this.body = {
        ...data,
        body_html: '',
        body_text: '',
        inventory_records: []
      }
      this.$emit('update:product', data)
    },

    fetchProduct (isRetry = false) {
      const { productId } = this
      return store({
        url: `/products/${productId}.json`,
        axiosConfig: {
          timeout: isRetry ? 2500 : 6000
        }
      })
        .then(({ data }) => {
          this.setBody(data)
          if (getContextId() === productId) {
            storefront.context.body = this.body
          }
          this.hasLoadError = false
        })
        .catch(err => {
          console.error(err)
          const { response } = err
          if (!response || !(response.status >= 400 && response.status < 500)) {
            if (!isRetry) {
              this.fetchProduct(true)
            } else {
              this.setBody(getContextBody())
              if (!this.body.name || !this.body.price || !this.body.pictures) {
                this.hasLoadError = true
              }
            }
          }
        })
    },

    getAdditionalPrice ({ type, addition }) {
      return type === 'fixed'
        ? addition
        : getPrice(this.body) * addition / 100
    },

    formatAdditionalPrice (addToPrice) {
      if (addToPrice && addToPrice.addition) {
        return formatMoney(this.getAdditionalPrice(addToPrice))
      }
      return ''
    },
    customizationStepBack(){
      const product = sanitizeProductBody(this.body);

      if (this.cms_customizations_step === 3) {
        if (this.current_customization[0] && this.current_customization[0].tipo_de_oculos) {
          if (this.current_customization[0].tipo_de_oculos.title === "Sem grau") {
            this.cms_customizations_step = 2;
          }
        }
      } 

      if (this.cms_customizations_step === 4) {
        if (this.current_customization[0] && this.current_customization[0].tipo_de_oculos) {
          if (this.current_customization[0].tipo_de_oculos.title === "Sem grau") {
            this.cms_customizations_step = 2;
          } else {
            this.cms_customizations_step = 3;
          }
        }
        if (product.categories[0].name === "Óculos de Sol" && this.current_customization[0].tipo_de_oculos.title === "Sem grau") {
          this.cms_customizations_step = 1;
        }
        if (product.categories[0].name === "Óculos de Sol" && this.current_customization[0].tipo_de_oculos.title === "Com grau (para corrigir minha visão para apenas um campo)") {
          this.cms_customizations_step = 2;
        }
      } 

      else {
        this.cms_customizations_step--
      }
    },
    setDeepCustomizationOption(index, grid_id, item) {
      const product = sanitizeProductBody(this.body);

      this.current_customization[index] = { [grid_id]: item };
      //console.log(this.current_customization);
      //console.log(this.cms_customizations_step);

      //console.log(product.categories[0].name);
      
      if (this.cms_customizations_step === 1) {
        if (this.current_customization[0] && this.current_customization[0].tipo_de_oculos) {
          if (this.current_customization[0].tipo_de_oculos.title === "Sem grau") {
            this.current_customization[1] = { 'lente': { title: '-', type: 'Fixo', value: 0 }};
            this.current_customization[2] = { 'tipo_da_lente': { title: '-', type: 'Fixo', value: 0 }};
            
            this.cms_customizations_step = 2;
          }
          if (product.categories[0].name === "Óculos de Sol" && this.current_customization[0].tipo_de_oculos.title === "Sem grau") {
            this.current_customization[1] = { 'lente': { title: '-', type: 'Fixo', value: 0 }};
            this.current_customization[2] = { 'tipo_da_lente': { title: '-', type: 'Fixo', value: 0 }};
            
            this.cms_customizations_step = 3;
          }
        }
      }
      if (this.cms_customizations_step === 2) {
        if (product.categories[0].name === "Óculos de Sol") {    
          this.current_customization[2] = { 'tipo_da_lente': { title: '-', type: 'Fixo', value: 0 }};
          this.cms_customizations_step = 3;
        }
      } 
      if (this.cms_customizations_step === 3) {
        this.cms_customizations_step++;
      } 
      else {
        this.cms_customizations_step++;
      }
    },
    shouldShowButton(option) {
      if (this.cms_customizations_step === 3 && this.current_customization[0].tipo_de_oculos.title === "Sem grau") {
        return option.title === 'Somente armação' || option.title === 'Antirreflexo';
      } 
      if (this.cms_customizations_step === 3 && this.current_customization[0].tipo_de_oculos.title === "Com grau (para corrigir minha visão para apenas um campo)") {
        return option.title === 'Antirreflexo' || option.title === 'Antirreflexo + Proteção Luz Azul' || option.title === 'Antirreflexo + Fotosensível (escurece no Sol)' || option.title === 'Antirreflexo + Fotosensível (escurece no Sol) + Protecao Luz Azul';
      }
      else {
        return option.title !== '-';
      }
    },
    totalWithCustomization(){
      // let variationId
      // if (this.hasVariations) {
      //   if (this.selectedVariationId) {
      //     variationId = this.selectedVariationId
      //   } else {
      //     return
      //   }
      // }
      // //console.log(variationId)

      let price = getPrice(this.body)
      //console.log(this.body)
      //console.log('current',this.current_customization)
      for (const item of this.current_customization) {
        //console.log(Object.values(item)[0])  
        const value = Object.values(item)[0].value;
        price += value;
      }
      
      //console.log(this.body.price, price)
      ////console.log(this.body)
      return price.toLocaleString('pt-br', {style: 'currency',currency: 'BRL', minimumFractionDigits: 2}) 
    },
    setCustomizationOption (customization, text) {
      
      const index = this.customizations.findIndex(({ _id }) => _id === customization._id)
      if (text) {
        if (index > -1) {
          this.customizations[index].option = { text }
        } else {
          this.customizations.push({
            _id: customization._id,
            label: customization.label,
            add_to_price: customization.add_to_price,
            option: { text }
          })
        }
      } else if (index > -1) {
        this.customizations.splice(index, 1)
      }
    },

    setCustomCustomization (customization, text) {
      ////console.log(customization, text, this.customizations)
      const index = this.customizations.findIndex(({ _id }) => _id === customization._id)
      if (text) {
        if (index > -1) {
          this.customizations[index].option = { text }
        } else {
          this.customizations.push({
            _id: customization._id,
            label: customization.label,
            add_to_price: customization.add_to_price,
            option: { text }
          })
        }
      } else if (index > -1) {
        this.customizations.splice(index, 1)
      }
    },

    showVariationPicture (variation) {
      if (variation.picture_id) {

        let pictureIndex = this.body.pictures.findIndex(({ _id }) => {
          return _id === variation.picture_id
        })
        
        this.variationImages = []
        for(let i_ = pictureIndex; i_ < (pictureIndex + (this.body.pictures.length / this.body.variations.length)) ; i_++){
          this.variationImages.push(this.body.pictures[i_])
        }

        pictureIndex = this.variationImages.findIndex(({ _id }) => {
          return _id === variation.picture_id
        })

        //console.log('body', this.body)
        //console.log('customBody', this.variantGalleryImages)

        this.currentGalleyImg = pictureIndex + 1
      }
    },

    getCustomizationLabel(gridId) {
      const customization = this.body.customizations.find(el => el.grid_id === gridId);
      return customization ? customization.label : 'Label não encontrado';
    },

    handleGridOption ({ gridId, gridIndex, optionText }) {
      if (gridIndex === 0) {
        const variation = this.body.variations.find(variation => {
          return getSpecTextValue(variation, gridId) === optionText
        })
        if (variation) {
          this.showVariationPicture(variation)
        }
      }
    },

    toggleFavorite () {
      if (this.isLogged) {
        this.isFavorite = toggleFavorite(this.body._id, this.ecomPassport)
      }
    },

    closeCustomizations() {
      this.customizationPanel = false;
      this.hasClickedBuy = false;
    },
    buy (option) {
      //alert('aa')
      this.hasClickedBuy = true
      const product = sanitizeProductBody(this.body)
      let variationId
      
      if (this.hasVariations) {
        if (this.selectedVariationId) {
          variationId = this.selectedVariationId
        } else {
          return
        }
      }
      
      product.pictures = this.productToGallery.pictures
      //const customizations = [...this.customizations]
      let customCustomizations = []
      if(this.body.customizations){
        for (const item of this.current_customization) {
          let customizationFromBody = this.body.customizations.find(el => el.grid_id == Object.keys(item)[0])
          if(customizationFromBody){        
            customCustomizations.push({
              _id: customizationFromBody._id,
              label: customizationFromBody.label,
              add_to_price: {
                type: (Object.values(item)[0].type == "Fixo" ? 'fixed' : 'percent'),
                addition: Object.values(item)[0].value
              },
              option:  {text:Object.values(item)[0].title}
            })
          }
        }
      }  
      
      
      if(this.body.customizations && this.cms_customizations){
        if(this.cms_customizations && option != "customized"){
          this.customizationPanel = true;
        }else{
          this.$emit('buy', { product, variationId, customizations : customCustomizations })
          if (this.canAddToCart) {
            this.current_customization = []
            this.customizationPanel = false
            this.cms_customizations_step = 1
            ecomCart.addProduct({ ...product, customizations : customCustomizations }, variationId, this.qntToBuy)          
          }
          this.isOnCart = true
        }
      }else{
        const customizations = [...this.customizations]
        this.$emit('buy', { product, variationId, customizations })
        if (this.canAddToCart) {
          //console.log({ ...product, customizations })
          ecomCart.addProduct({ ...product, customizations }, variationId, this.qntToBuy)
        }
        this.isOnCart = true
      } 
      
    },

    buyOrScroll () {
      if (this.hasVariations || this.isKit) {
        scrollToElement(this.$refs.actions)
      } else {
        this.buy()
      }
    }
  },

  watch: {
    // selectedVariationId (variationId) {
    //   if (variationId) {
    //     if (this.hasClickedBuy) {
    //       this.hasClickedBuy = false
    //     }
    //     const { pathname } = window.location
    //     const searchParams = new chat(window.location.search)
    //     searchParams.set('variation_id', variationId)
    //     window.history.pushState({
    //       pathname,
    //       searchParams
    //     }, '', `${pathname}?${searchParams.toString()}`)
    //     //console.log(this.selectedVariation)
    //     this.showVariationPicture(this.selectedVariation)
    //   }
    // },
   
    selectedVariationId(variationId) {
      if (variationId) {
        if (this.hasClickedBuy) {
          this.hasClickedBuy = false;
        }
    
        const { pathname } = window.location;
        const searchParams = new URLSearchParams(window.location.search);
    
        searchParams.set('variation_id', variationId);
    
        // Creating a new state object with pathname and serialized searchParams
        const newState = {
          pathname,
          search: searchParams.toString()
        };
    
        // Pushing the new state to the browser history
        window.history.pushState(newState, '', `${pathname}?${searchParams.toString()}`);
    
        // Logging the selected variation (make sure this.selectedVariation is updated somewhere)
        ////console.log(this.selectedVariation);
    
        // Calling your function to show the variation picture
        this.showVariationPicture(this.selectedVariation);
      }
    },

    fixedPrice (price) {
      if (price > 0 && !this.isQuickview) {
        //console.log(sanitizeProductBody(this.body));
        addIdleCallback(() => {
          modules({
            url: '/list_payments.json',
            method: 'POST',
            data: {
              amount: {
                total: price
              },
              items: [{
                ...sanitizeProductBody(this.body),
                product_id: this.body._id
              }],
              currency_id: this.body.currency_id || $ecomConfig.get('currency'),
              currency_symbol: this.body.currency_symbol || $ecomConfig.get('currency_symbol')
            }
          })
            .then(({ data }) => {
              if (Array.isArray(this.paymentAppsSort) && this.paymentAppsSort.length) {
                sortApps(data.result, this.paymentAppsSort)
              }
              this.paymentOptions = data.result
                .reduce((paymentOptions, appResult) => {
                  if (appResult.validated) {
                    paymentOptions.push({
                      app_id: appResult.app_id,
                      ...appResult.response
                    })
                  }
                  return paymentOptions
                }, [])
                .sort((a, b) => {
                  return a.discount_option && a.discount_option.value &&
                    !(b.discount_option && b.discount_option.value)
                    ? -1
                    : 1
                })
            })
            .catch(console.error)
        })
      }
    },

    isKit: {
      handler (isKit) {
        if (isKit && !this.kitItems.length) {
          const kitComposition = this.body.kit_composition
          const ecomSearch = new EcomSearch()
          ecomSearch
            .setPageSize(kitComposition.length)
            .setProductIds(kitComposition.map(({ _id }) => _id))
            .fetch(true)
            .then(() => {
              ecomSearch.getItems().forEach(product => {
                const { quantity } = kitComposition.find(({ _id }) => _id === product._id)
                const addKitItem = variationId => {
                  const item = ecomCart.parseProduct(product, variationId, quantity)
                  if (quantity) {
                    item.min_quantity = item.max_quantity = quantity
                  } else {
                    item.quantity = 1
                  }
                  this.kitItems.push({
                    ...item,
                    _id: genRandomObjectId()
                  })
                }
                if (product.variations) {
                  product.variations.forEach(variation => {
                    variation._id = genRandomObjectId()
                    addKitItem(variation._id)
                  })
                } else {
                  addKitItem()
                }
              });
            })
            .catch(console.error)
        }
      },
      immediate: true
    },
    variationImages (variationImages, pastVariationImages) {
      if (variationImages.length) {
        if (pastVariationImages.length && pastVariationImages[0][0] === variationImages[0][0]) {
          return
        }
        this.variationImagesKey = Math.random().toString()
      } else {
        this.variationImagesKey = null
      }
      
    },
  },

  created () {
    this.cms_customizations = [...($('[data-customizations]').length > 0 && $('[data-customizations]').attr('data-customizations') != '' ? JSON.parse($('[data-customizations]').attr('data-customizations')) : [])]
    //console.log(this.cms_customizations)
    const presetQntToBuy = () => {
      this.qntToBuy = this.body.min_quantity || 1
    }
    if (this.product) {
      this.body = this.product
      if (this.isSSR) {
        this.fetchProduct().then(presetQntToBuy)
      } else {
        presetQntToBuy()
      }
    } else {
      this.fetchProduct().then(presetQntToBuy)
    }
    this.isFavorite = checkFavorite(this.body._id || this.productId, this.ecomPassport)
  },

  mounted () {

    $(document).ready(function() {
      ////console.log("Entrei no mounted document ready.");
      if($(".variations__option").length > 0) {
        $(".variations__option").first().click();
      }
      $(`.variations__grid--colors`).each(function(){
        $(this).find(`.variations__option`).each(function(){
          let color_name = $(this).attr(`class`).split(`--`)[1].toLowerCase().trim();
          let q = window.apx_properties.find(el => el.title.toLowerCase().trim() == color_name.toLowerCase().trim())
          if(q){
            $(this).css(`background`,`url(${q.img})`)       
          }
        })
      });

      //if(window.innerWidth < 990){
        $('.product-content .variations, .product-content .product__name').wrapAll('<div class="mobile-group_"></div>')
        $('.product-content .product__prices, .mobile-group_').wrapAll('<div class="mobile-group d-flex align-items-start"></div>')
      //}
    })
    ////console.log(this.body.customizations)
    if (this.$refs.sticky && !this.isWithoutPrice) {
      let isBodyPaddingSet = false
      const setStickyBuyObserver = (isToVisible = true) => {
        const $anchor = this.$refs[isToVisible ? 'sticky' : 'buy']
        if (!$anchor) {
          return
        }
        const $tmpDiv = document.createElement('div')
        $anchor.parentNode.insertBefore($tmpDiv, $anchor)
        if (isToVisible) {
          $tmpDiv.style.position = 'absolute'
          $tmpDiv.style.bottom = isMobile ? '-1600px' : '-1000px'
        }
        const obs = lozad($tmpDiv, {
          rootMargin: '100px',
          threshold: 0,
          load: () => {
            this.isStickyBuyVisible = isToVisible
            if (isToVisible && !isBodyPaddingSet) {
              this.$nextTick(() => {
                const stickyHeight = this.$refs.sticky.offsetHeight
                document.body.style.paddingBottom = `${(stickyHeight + 4)}px`
                isBodyPaddingSet = true
              })
            }
            $tmpDiv.remove()
            setTimeout(() => {
              const createObserver = function () {
                setStickyBuyObserver(!isToVisible)
                document.removeEventListener('scroll', createObserver)
              }
              document.addEventListener('scroll', createObserver)
            }, 100)
          }
        })
        obs.observe()
      }
      setStickyBuyObserver()
    }
    if (this.isOnSale) {
      const promotionDate = new Date(this.body.price_effective_date.end)
      const now = Date.now()
      if (promotionDate.getTime() > now) {
        let targetDate
        const dayMs = 24 * 60 * 60 * 1000
        const daysBetween = Math.floor((promotionDate.getTime() - now) / dayMs)
        if (daysBetween > 2) {
          targetDate = new Date()
          targetDate.setHours(23, 59, 59, 999)
        } else {
          targetDate = promotionDate
        }
        const formatTime = (number) => number < 10 ? `0${number}` : number
        const getRemainingTime = () => {
          const distance = targetDate.getTime() - Date.now()
          const days = Math.floor(distance / dayMs)
          const hours = Math.floor((distance % dayMs) / (1000 * 60 * 60))
          const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
          const seconds = Math.floor((distance % (1000 * 60)) / 1000)
          return (days > 0 ? `${formatTime(days)}:` : '') +
            `${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}`
        }
        this.currentTimer = setInterval(() => {
          this.$refs.timer.innerHTML = getRemainingTime()
        }, 1000)
      }
    }
  },

  destroyed () {
    if (this.currentTimer) {
      clearInterval(this.currentTimer)
    }
  }
}