(window.webpackJsonp=window.webpackJsonp||[]).push([[36,7,35],{259:function(t,i,s){"use strict";s(6),s(103),s(104),s(105);var e=s(26),o=s(35),a=s(23),n=s(77),r=s(29),c=s(89),l=s(36),u=s(87),d=s(86),p=s(75),_=s(39),m=s(25),h=s(45),y=s(4),b=s(56),v=s(8),f=s(2),g=s(44),w=s(231),k=s(239),C=s(235),z=s(247),x=s(176),S=s(232),O=s(177),j=s(178),I=s(278),P=s(279),B=s(263),L=s(280),T=s(237),V=s(281),A=s(27),F=s(159);const q="object"==typeof window&&window.storefront||{},E=()=>q.context&&q.context.body||{},M=()=>E()._id,D=t=>{const i=Object.assign({},t);return delete i.body_html,delete i.body_text,delete i.specifications,delete i.inventory_records,delete i.price_change_records,i};var G={name:"TheProduct",components:{Portal:z.a,ALink:x.a,AAlert:S.a,APicture:O.a,APrices:j.a,AShare:I.a,ProductVariations:P.a,ProductGallery:B.a,QuantitySelector:L.a,ShippingCalculator:T.a,PaymentOption:V.a},props:{productId:{type:String,default:()=>M()},product:Object,headingTag:{type:String,default:"h1"},buyText:String,galleryColClassName:{type:String,default:"col-12 col-md-6"},hasPromotionTimer:Boolean,hasStickyBuyButton:{type:Boolean,default:!0},hasQuantitySelector:Boolean,canAddToCart:{type:Boolean,default:!0},hasBuyButton:{type:Boolean,default:!0},lowQuantityToWarn:{type:Number,default:12},maxVariationOptionsBtns:Number,isQuickview:Boolean,paymentAppsSort:{type:Array,default:()=>window.ecomPaymentApps||[]},quoteLink:String,isSSR:Boolean,ecomPassport:{type:Object,default:()=>A.default},accountUrl:{type:String,default:"/app/#/account/"}},data:()=>({body:{},fixedPrice:null,selectedVariationId:null,currentGalleyImg:1,isOnCart:!1,qntToBuy:1,isStickyBuyVisible:!1,isFavorite:!1,hasClickedBuy:!1,hasLoadError:!1,paymentOptions:[],customizations:[],kitItems:[],currentTimer:null,cms_customizations:[],cms_customizations_step:1,current_customization:[],customizationPanel:!1,variationImagesKey:null,variationImages:[],variantGalleryImages:[]}),computed:{i19addToFavorites:()=>Object(o.a)(e.m),i19close:()=>Object(o.a)(e.P),i19days:()=>Object(o.a)(e.gb),i19discountOf:()=>Object(o.a)(e.kb),i19endsIn:()=>Object(o.a)(e.sb),i19freeShippingFrom:()=>Object(o.a)(e.Db),i19loadProductErrorMsg:()=>Object(o.a)(e.cc),i19offer:()=>Object(o.a)(e.Hc),i19only:()=>Object(o.a)(e.Kc),i19outOfStock:()=>Object(o.a)(e.Rc),i19paymentOptions:()=>Object(o.a)(e.Vc),i19perUnit:()=>Object(o.a)(e.Wc),i19productionDeadline:()=>Object(o.a)(e.gd),i19removeFromFavorites:()=>Object(o.a)(e.ud),i19retry:()=>Object(o.a)(e.xd),i19selectVariationMsg:()=>Object(o.a)(e.Nd),i19unavailable:()=>Object(o.a)(e.ie),i19quoteProduct:()=>"Cotar produto",i19units:()=>Object(o.a)(e.je).toLowerCase(),i19unitsInStock:()=>Object(o.a)(e.ke),i19workingDays:()=>Object(o.a)(e.ue),selectedVariation(){return this.selectedVariationId?this.body.variations.find((t=>{let{_id:i}=t;return i===this.selectedVariationId})):{}},name(){return this.selectedVariation.name||Object(a.a)(this.body)},isInStock(){return Object(n.a)(this.body)},isWithoutPrice(){return!Object(r.a)(this.body)},isVariationInStock(){return Object(n.a)(this.selectedVariationId?this.selectedVariation:this.body)},isLogged:()=>A.default.checkAuthorization(),thumbnail(){return Object(c.a)(this.body,null,"small")},productQuantity(){return this.selectedVariation.quantity?this.selectedVariation.quantity:this.body.quantity?this.body.quantity:void 0},isLowQuantity(){return this.productQuantity>0&&this.lowQuantityToWarn>0&&this.productQuantity<=this.lowQuantityToWarn},strBuy(){return this.buyText||Object(o.a)(e.z)},discount(){const{body:t}=this,i=this.fixedPrice||Object(r.a)(t);return Object(l.a)(t)||t.price>i?Math.round(100*(t.base_price-i)/t.base_price):0},isOnSale(){const{body:t}=this;return this.hasPromotionTimer&&Object(l.a)(t)&&t.price_effective_date&&t.price_effective_date.end&&Date.now()<new Date(t.price_effective_date.end).getTime()},ghostProductForPrices(){const t={};["price","base_price"].forEach((i=>{let s=this.selectedVariation[i]||this.body[i];void 0!==s&&this.customizations.forEach((t=>{t.add_to_price&&(s+=this.getAdditionalPrice(t.add_to_price))})),t[i]=s}));const i={...this.body};return this.selectedVariationId&&(Object.assign(i,this.selectedVariation),delete i.variations),{...i,...t}},hasVariations(){return this.body.variations&&this.body.variations.length},isKit(){return this.body.kit_composition&&this.body.kit_composition.length},productToGallery(){return this.variationImages.length?(window.mainProductGallery=[...this.variationImages],this.variationImagesKey=Math.random().toString(),console.log("update",window.mainProductGallery),{...this.body,pictures:this.variationImages}):this.body}},methods:{getVariationsGrids:u.a,getSpecValueByText:d.a,setBody(t){this.body={...t,body_html:"",body_text:"",inventory_records:[]},this.$emit("update:product",t)},fetchProduct(){let t=arguments.length>0&&void 0!==arguments[0]&&arguments[0];const{productId:i}=this;return Object(y.g)({url:`/products/${i}.json`,axiosConfig:{timeout:t?2500:6e3}}).then((t=>{let{data:s}=t;this.setBody(s),M()===i&&(q.context.body=this.body),this.hasLoadError=!1})).catch((i=>{console.error(i);const{response:s}=i;s&&s.status>=400&&s.status<500||(t?(this.setBody(E()),this.body.name&&this.body.price&&this.body.pictures||(this.hasLoadError=!0)):this.fetchProduct(!0))}))},getAdditionalPrice(t){let{type:i,addition:s}=t;return"fixed"===i?s:Object(r.a)(this.body)*s/100},formatAdditionalPrice(t){return t&&t.addition?Object(p.a)(this.getAdditionalPrice(t)):""},customizationStepBack(){const t=D(this.body);3===this.cms_customizations_step&&this.current_customization[0]&&this.current_customization[0].tipo_de_oculos&&"Sem grau"===this.current_customization[0].tipo_de_oculos.title&&(this.cms_customizations_step=2),4===this.cms_customizations_step?(this.current_customization[0]&&this.current_customization[0].tipo_de_oculos&&("Sem grau"===this.current_customization[0].tipo_de_oculos.title?this.cms_customizations_step=2:this.cms_customizations_step=3),"Óculos de Sol"===t.categories[0].name&&"Sem grau"===this.current_customization[0].tipo_de_oculos.title&&(this.cms_customizations_step=1),"Óculos de Sol"===t.categories[0].name&&"Com grau (para corrigir minha visão para apenas um campo)"===this.current_customization[0].tipo_de_oculos.title&&(this.cms_customizations_step=2)):this.cms_customizations_step--},setDeepCustomizationOption(t,i,s){const e=D(this.body);this.current_customization[t]={[i]:s},console.log(this.current_customization),console.log(this.cms_customizations_step),console.log(e.categories[0].name),1===this.cms_customizations_step&&this.current_customization[0]&&this.current_customization[0].tipo_de_oculos&&("Sem grau"===this.current_customization[0].tipo_de_oculos.title&&(this.current_customization[1]={lente:{title:"-",type:"Fixo",value:0}},this.current_customization[2]={tipo_da_lente:{title:"-",type:"Fixo",value:0}},this.cms_customizations_step=2),"Óculos de Sol"===e.categories[0].name&&"Sem grau"===this.current_customization[0].tipo_de_oculos.title&&(this.current_customization[1]={lente:{title:"-",type:"Fixo",value:0}},this.current_customization[2]={tipo_da_lente:{title:"-",type:"Fixo",value:0}},this.cms_customizations_step=3)),2===this.cms_customizations_step&&"Óculos de Sol"===e.categories[0].name&&(this.current_customization[2]={tipo_da_lente:{title:"-",type:"Fixo",value:0}},this.cms_customizations_step=3),this.cms_customizations_step,this.cms_customizations_step++},shouldShowButton(t){return 3===this.cms_customizations_step&&"Sem grau"===this.current_customization[0].tipo_de_oculos.title?"Somente armação"===t.title||"Antirreflexo"===t.title:3===this.cms_customizations_step&&"Com grau (para corrigir minha visão para apenas um campo)"===this.current_customization[0].tipo_de_oculos.title?"Antirreflexo"===t.title||"Antirreflexo + Proteção Luz Azul"===t.title||"Antirreflexo + Fotosensível (escurece no Sol)"===t.title||"Antirreflexo + Fotosensível (escurece no Sol) + Protecao Luz Azul"===t.title:"-"!==t.title},totalWithCustomization(){let t=Object(r.a)(this.body);console.log(this.body),console.log("current",this.current_customization);for(const i of this.current_customization){console.log(Object.values(i)[0]);t+=Object.values(i)[0].value}return console.log(this.body.price,t),t.toLocaleString("pt-br",{style:"currency",currency:"BRL",minimumFractionDigits:2})},setCustomizationOption(t,i){const s=this.customizations.findIndex((i=>{let{_id:s}=i;return s===t._id}));i?s>-1?this.customizations[s].option={text:i}:this.customizations.push({_id:t._id,label:t.label,add_to_price:t.add_to_price,option:{text:i}}):s>-1&&this.customizations.splice(s,1)},setCustomCustomization(t,i){const s=this.customizations.findIndex((i=>{let{_id:s}=i;return s===t._id}));i?s>-1?this.customizations[s].option={text:i}:this.customizations.push({_id:t._id,label:t.label,add_to_price:t.add_to_price,option:{text:i}}):s>-1&&this.customizations.splice(s,1)},showVariationPicture(t){if(t.picture_id){let i=this.body.pictures.findIndex((i=>{let{_id:s}=i;return s===t.picture_id}));this.variationImages=[];for(let t=i;t<i+this.body.pictures.length/this.body.variations.length;t++)this.variationImages.push(this.body.pictures[t]);i=this.variationImages.findIndex((i=>{let{_id:s}=i;return s===t.picture_id})),console.log("body",this.body),console.log("customBody",this.variantGalleryImages),this.currentGalleyImg=i+1}},getCustomizationLabel(t){const i=this.body.customizations.find((i=>i.grid_id===t));return i?i.label:"Label não encontrado"},handleGridOption(t){let{gridId:i,gridIndex:s,optionText:e}=t;if(0===s){const t=this.body.variations.find((t=>Object(_.a)(t,i)===e));t&&this.showVariationPicture(t)}},toggleFavorite(){this.isLogged&&(this.isFavorite=Object(F.toggleFavorite)(this.body._id,this.ecomPassport))},closeCustomizations(){this.customizationPanel=!1,this.hasClickedBuy=!1},buy(t){this.hasClickedBuy=!0;const i=D(this.body);let s;if(this.hasVariations){if(!this.selectedVariationId)return;s=this.selectedVariationId}i.pictures=this.productToGallery.pictures;let e=[];if(this.body.customizations)for(const t of this.current_customization){let i=this.body.customizations.find((i=>i.grid_id==Object.keys(t)[0]));i&&e.push({_id:i._id,label:i.label,add_to_price:{type:"Fixo"==Object.values(t)[0].type?"fixed":"percent",addition:Object.values(t)[0].value},option:{text:Object.values(t)[0].title}})}if(this.body.customizations&&this.cms_customizations)this.cms_customizations&&"customized"!=t?this.customizationPanel=!0:(this.$emit("buy",{product:i,variationId:s,customizations:e}),this.canAddToCart&&(this.current_customization=[],this.customizationPanel=!1,this.cms_customizations_step=1,v.a.addProduct({...i,customizations:e},s,this.qntToBuy)),this.isOnCart=!0);else{const t=[...this.customizations];this.$emit("buy",{product:i,variationId:s,customizations:t}),this.canAddToCart&&(console.log({...i,customizations:t}),v.a.addProduct({...i,customizations:t},s,this.qntToBuy)),this.isOnCart=!0}},buyOrScroll(){this.hasVariations||this.isKit?Object(C.a)(this.$refs.actions):this.buy()}},watch:{selectedVariationId(t){if(t){this.hasClickedBuy&&(this.hasClickedBuy=!1);const{pathname:i}=window.location,s=new URLSearchParams(window.location.search);s.set("variation_id",t);const e={pathname:i,search:s.toString()};window.history.pushState(e,"",`${i}?${s.toString()}`),this.showVariationPicture(this.selectedVariation)}},fixedPrice(t){t>0&&!this.isQuickview&&(console.log(D(this.body)),Object(k.a)((()=>{Object(y.c)({url:"/list_payments.json",method:"POST",data:{amount:{total:t},items:[{...D(this.body),product_id:this.body._id}],currency_id:this.body.currency_id||m.$ecomConfig.get("currency"),currency_symbol:this.body.currency_symbol||m.$ecomConfig.get("currency_symbol")}}).then((t=>{let{data:i}=t;Array.isArray(this.paymentAppsSort)&&this.paymentAppsSort.length&&Object(w.a)(i.result,this.paymentAppsSort),this.paymentOptions=i.result.reduce(((t,i)=>(i.validated&&t.push({app_id:i.app_id,...i.response}),t)),[]).sort(((t,i)=>!t.discount_option||!t.discount_option.value||i.discount_option&&i.discount_option.value?1:-1))})).catch(console.error)})))},isKit:{handler(t){if(t&&!this.kitItems.length){const t=this.body.kit_composition,i=new b.a;i.setPageSize(t.length).setProductIds(t.map((t=>{let{_id:i}=t;return i}))).fetch(!0).then((()=>{i.getItems().forEach((i=>{const{quantity:s}=t.find((t=>{let{_id:s}=t;return s===i._id})),e=t=>{const e=v.a.parseProduct(i,t,s);s?e.min_quantity=e.max_quantity=s:e.quantity=1,this.kitItems.push({...e,_id:Object(h.a)()})};i.variations?i.variations.forEach((t=>{t._id=Object(h.a)(),e(t._id)})):e()}))})).catch(console.error)}},immediate:!0},variationImages(t,i){if(t.length){if(i.length&&i[0][0]===t[0][0])return;this.variationImagesKey=Math.random().toString()}else this.variationImagesKey=null}},created(){this.cms_customizations=[...$("[data-customizations]").length>0&&""!=$("[data-customizations]").attr("data-customizations")?JSON.parse($("[data-customizations]").attr("data-customizations")):[]],console.log(this.cms_customizations);const t=()=>{this.qntToBuy=this.body.min_quantity||1};this.product?(this.body=this.product,this.isSSR?this.fetchProduct().then(t):t()):this.fetchProduct().then(t),this.isFavorite=Object(F.checkFavorite)(this.body._id||this.productId,this.ecomPassport)},mounted(){var t=this;if($(document).ready((function(){$(".variations__option").length>0&&$(".variations__option").first().click(),$(".variations__grid--colors").each((function(){$(this).find(".variations__option").each((function(){let t=$(this).attr("class").split("--")[1].toLowerCase().trim(),i=window.apx_properties.find((i=>i.title.toLowerCase().trim()==t.toLowerCase().trim()));i&&$(this).css("background",`url(${i.img})`)}))}))})),this.$refs.sticky&&!this.isWithoutPrice){let i=!1;const s=function(){let e=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];const o=t.$refs[e?"sticky":"buy"];if(!o)return;const a=document.createElement("div");o.parentNode.insertBefore(a,o),e&&(a.style.position="absolute",a.style.bottom=f.isMobile?"-1600px":"-1000px");Object(g.a)(a,{rootMargin:"100px",threshold:0,load:()=>{t.isStickyBuyVisible=e,e&&!i&&t.$nextTick((()=>{const s=t.$refs.sticky.offsetHeight;document.body.style.paddingBottom=`${s+4}px`,i=!0})),a.remove(),setTimeout((()=>{const t=function(){s(!e),document.removeEventListener("scroll",t)};document.addEventListener("scroll",t)}),100)}}).observe()};s()}if(this.isOnSale){const t=new Date(this.body.price_effective_date.end),i=Date.now();if(t.getTime()>i){let s;const e=864e5;Math.floor((t.getTime()-i)/e)>2?(s=new Date,s.setHours(23,59,59,999)):s=t;const o=t=>t<10?`0${t}`:t,a=()=>{const t=s.getTime()-Date.now(),i=Math.floor(t/e),a=Math.floor(t%e/36e5),n=Math.floor(t%36e5/6e4),r=Math.floor(t%6e4/1e3);return(i>0?`${o(i)}:`:"")+`${o(a)}:${o(n)}:${o(r)}`};this.currentTimer=setInterval((()=>{this.$refs.timer.innerHTML=a()}),1e3)}}},destroyed(){this.currentTimer&&clearInterval(this.currentTimer)}};i.a=G},260:function(t,i,s){"use strict";s(6);var e=s(26),o=s(35),a=s(23),n=s(89),r=s(8),c=(s(160),{name:"ProductGallery",components:{APicture:s(177).a},props:{product:{type:Object,default:()=>({pictures:[],videos:[]})},pictures:Array,video:Object,videoAspectRatio:{type:String,default:"16by9"},canAddToCart:{type:Boolean,default:!0},currentSlide:{type:Number,default:1},glideOptions:{type:Object,default:()=>({type:"slider",autoplay:!1,rewind:!1})},isSSR:Boolean},data:()=>({glide:null,pswp:null,activeIndex:null,isSliderMoved:!1,elFirstPicture:null,zoomLinkStyle:null}),computed:{i19addToCart:()=>Object(o.a)(e.l),i19close:()=>Object(o.a)(e.P),i19fullscreen:()=>Object(o.a)(e.Ib),i19next:()=>Object(o.a)(e.uc),i19previous:()=>Object(o.a)(e.bd),i19openGallery:()=>Object(o.a)(e.Lc),i19share:()=>Object(o.a)(e.Pd),i19video:()=>Object(o.a)(e.qe),localPictures(){return this.pictures&&this.pictures.length?this.pictures:this.product.pictures||[]},videoSrc(){const t=this.video||this.product.videos&&this.product.videos[0];return t&&t.url?t.url.replace(/watch\?v=(V7XQvAde51w)/i,"embed/$1?rel=0"):null},pswpItems(){const t=[];return this.localPictures.forEach((i=>{let{zoom:s}=i;if(s){let i,e;if(s.size){const t=s.size.split("x");2===t.length&&(i=parseInt(t[0],10),e=parseInt(t[1],10))}i&&e||(i=e=1e3),t.push({src:s.url,title:Object(a.a)(this.product)||s.alt,w:i,h:e})}})),t},pswpOptions:()=>({shareButtons:[{id:"facebook",label:Object(o.a)(e.Qd),url:"https://www.facebook.com/sharer/sharer.php?u={{url}}"},{id:"twitter",label:"Tweet",url:"https://twitter.com/intent/tweet?text={{text}}&url={{url}}"},{id:"pinterest",label:"Pin it",url:"http://www.pinterest.com/pin/create/button/?url={{url}}&media={{image_url}}&description={{text}}"}]}),dinamicPictures:()=>window.mainProductGallery},methods:{getImg:n.a,moveSlider(t){this.activeIndex=t,this.$emit("update:current-slide",t+1),this.glide&&this.glide.go("="+t),this.isSliderMoved||(this.isSliderMoved=!0)},openZoom(t){return this.zoomLinkStyle="cursor: wait",s.e(45).then(s.t.bind(null,443,7)).then((i=>{const e=i.default;return s.e(44).then(s.t.bind(null,444,7)).then((i=>{const s=i.default;this.pswp=new e(this.$refs.pswp,s,this.pswpItems,{...this.pswpOptions,index:t}),this.pswp.init()}))})).catch(console.error).finally((()=>{this.zoomLinkStyle=null}))},buy(){const{product:t}=this;this.$emit("buy",{product:t}),t.variations&&t.variations.length?window.location.pathname!==`/${t.slug}`?window.location=`/${t.slug}`:window.location="#variations":r.a.addProduct(t),this.pswp&&this.pswp.close()}},watch:{currentSlide:{handler(t){this.activeIndex=t-1},immediate:!0},activeIndex(t){this.moveSlider(t)}},mounted(){this.isSSR&&(this.elFirstPicture=document.querySelector("#product-gallery .product__picture"),this.elFirstPicture&&this.$nextTick((()=>{this.$refs.firstPicture[0].appendChild(this.elFirstPicture)}))),$(".apx_gallery .slicked").slick({infinite:!0,slidesToShow:1,slidesToScroll:1,arrows:!0,dots:!0,autoplay:!0})},beforeDestroy(){this.glide&&this.glide.destroy(),this.pswp&&this.pswp.destroy()}});i.a=c},285:function(t,i,s){"use strict";s.d(i,"a",(function(){return e})),s.d(i,"b",(function(){return o}));var e=function(){var t=this,i=t.$createElement,s=t._self._c||i;return s("section",{staticClass:"product",attrs:{"data-product-id":t.body._id,"data-sku":t.body.sku,"data-selected-variation":t.selectedVariationId}},[s("a-alert",{attrs:{"can-show":t.hasLoadError,variant:"danger"}},[t._v(" "+t._s(t.i19loadProductErrorMsg)+" "),s("a",{staticClass:"alert-link",attrs:{href:"#"},on:{click:function(i){return i.preventDefault(),t.fetchProduct.apply(null,arguments)}}},[t._v(" "+t._s(t.i19retry)+" ")])]),t.cms_customizations&&t.body.customizations?s("div",{class:t.customizationPanel?"visible":"",attrs:{id:"custom_customizations"}},[t.cms_customizations_step>1?s("button",{staticClass:"custom_back",attrs:{type:"button"},on:{click:t.customizationStepBack}},[s("svg",{attrs:{width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg"}},[s("path",{attrs:{d:"M15 6L9 12L15 18",stroke:"black","stroke-linecap":"round","stroke-linejoin":"round"}})])]):t._e(),s("button",{staticClass:"custom_close",attrs:{type:"button"},on:{click:t.closeCustomizations}},[s("svg",{attrs:{width:"13",height:"14",viewBox:"0 0 13 14",fill:"none",xmlns:"http://www.w3.org/2000/svg"}},[s("line",{attrs:{x1:"12",y1:"1.70711",x2:"0.707107",y2:"13",stroke:"black","stroke-linecap":"round","stroke-linejoin":"round"}}),t._v(" "),s("line",{attrs:{x1:"0.707107",y1:"1",x2:"12",y2:"12.2929",stroke:"black","stroke-linecap":"round","stroke-linejoin":"round"}})])]),t.cms_customizations_step<t.cms_customizations.length+1?s("div",{staticClass:"customizations_header mt-4 mb-5 px-5"},t._l(t.cms_customizations,(function(i,e){return s("div",{key:e,staticClass:"button_cover"},[s("button",{class:t.cms_customizations_step==e+1?"active":""},[t._v(" "+t._s(e+1)+" ")])])})),0):t._e(),s("div",{staticClass:"customizations_body px-md-3"},[t._l(t.cms_customizations,(function(i,e){return s("div",{key:e,staticClass:"step px-md-3",class:t.cms_customizations_step==e+1?"current":""},[s("div",{staticClass:"option_title text-center mb-5"},[s("small",[t._v("Selecione a opção para")]),s("h4",[t._v(t._s(t.getCustomizationLabel(i.item.title)))])]),s("div",{staticClass:"option_options"},t._l(i.item.list,(function(o,a){return s("div",{key:a,staticClass:"option mb-md-5 mb-5 mx-3"},[t.shouldShowButton(o.option)?s("div",{staticClass:"row justify-content-between align-items-center"},[s("button",{class:t.current_customization[e]&&t.current_customization[e][i.item.title].title==o.option.title?"active":"",staticStyle:{width:"70%"},attrs:{type:"button"},on:{click:function(s){return t.setDeepCustomizationOption(e,i.item.title,o.option)}}},[t._v(t._s(o.option.title))]),s("strong",[t._v(" "+t._s(o.option.value>0?"+"+o.option.value.toLocaleString("pt-br",{style:"currency",currency:"BRL",minimumFractionDigits:2}):"Grátis")+" ")]),s("p",{staticClass:"mt-3"},[t._v(" "+t._s(o.option.description)+" ")])]):t._e()])})),0)])})),t.cms_customizations_step>t.cms_customizations.length?s("div",{staticClass:"step last px-3",class:t.cms_customizations_step>t.cms_customizations.length?"current":""},[t._m(0),t._l(t.current_customization,(function(i,e){return s("div",{key:e,class:"selected_option "+(t.current_customization.length==e+1?"mb-3":"mb-5")},[s("div",{staticClass:"row justify-content-between align-items-center"},[s("div",{staticClass:"col"},[s("small",[t._v(t._s(t.body.customizations.find((function(t){return t.grid_id==Object.keys(i)[0]}))?t.body.customizations.find((function(t){return t.grid_id==Object.keys(i)[0]})).label:"Err."))]),s("strong",[t._v(t._s(i[Object.keys(i)[0]].title))])]),s("div",{staticClass:"col-auto"},[s("b",[t._v(t._s(i[Object.keys(i)[0]].value>0?"+"+i[Object.keys(i)[0]].value.toLocaleString("pt-br",{style:"currency",currency:"BRL",minimumFractionDigits:2}):"Grátis"))])])])])})),s("div",{staticClass:"subtotal pt-3"},[s("div",{staticClass:"row justify-content-between align-items-center"},[t._m(1),s("div",{staticClass:"col-auto"},[s("b",[t._v(" "+t._s(t.totalWithCustomization())+" ")])])])]),s("div",{staticClass:"customization_functions d-flex flex-column"},[s("button",{staticClass:"btn btn-primary",attrs:{type:"button"},on:{click:function(i){return t.buy("customized")}}},[t._v(" Adicionar ao Carrinho ")]),s("button",{staticClass:"btn-back",on:{click:t.customizationStepBack}},[t._v(" Editar minhas escolhas ")])])],2):t._e()],2)]):t._e(),s("transition",{attrs:{"enter-active-class":"animated fadeIn slower"}},[t.body._id?s("div",{staticClass:"row align-items-center"},[t._t("gallery-col",(function(){return[s("div",{class:t.galleryColClassName},[s(t.isSSR?"portal":"div",{tag:"component",attrs:{selector:"#product-gallery"}},[t._t("stamps"),s("product-gallery",{key:t.variationImagesKey,attrs:{product:t.productToGallery,"can-add-to-cart":t.canAddToCart&&t.body.available&&t.isInStock,"current-slide":t.currentGalleyImg,"is-s-s-r":t.isSSR},on:{"update:currentSlide":function(i){t.currentGalleyImg=i},"update:current-slide":function(i){t.currentGalleyImg=i}}},[t._t("first-picture")],2),t._t("gallery-footer")],2)],1)]})),s("div",{ref:"actions",staticClass:"col pl-2 pl-md-5"},[t.isSSR?t._e():t._t("heading",(function(){return[s(t.headingTag,{tag:"component",staticClass:"product__name"},[t._v(" "+t._s(t.name)+" ")]),s("p",{staticClass:"product__sku d-none"},[t._v(" COD: "+t._s(t.body.sku)+" ")])]})),s(t.isSSR?"portal":"div",{tag:"component",attrs:{selector:"#product-actions"}},[t._t("rating",(function(){return[t._m(2)]})),t.body.available?t.isInStock?t.isWithoutPrice?s("div",{staticClass:"product__without-price"},[t._t("without-price",(function(){return[t.quoteLink?s("a",{attrs:{target:"_blank",rel:"noopener",href:t.quoteLink}},[t._v(" "+t._s(t.i19quoteProduct)+" ")]):t._e()]}))],2):[t._t("prices",(function(){return[s("p",{staticClass:"product__prices mt-3"},[s("a-prices",{attrs:{product:t.ghostProductForPrices,"is-literal":!0,"is-big":!0},on:{"fix-price":function(i){return t.fixedPrice=i}}}),t._e()],2)]})),t.hasVariations?t._t("variations",(function(){return[s("div",{staticClass:"mt-3 pt-3"},[s("product-variations",{attrs:{product:t.body,"selected-id":t.selectedVariationId,"max-options-btns":t.maxVariationOptionsBtns},on:{"update:selectedId":function(i){t.selectedVariationId=i},"update:selected-id":function(i){t.selectedVariationId=i},"select-option":t.handleGridOption}}),s("a-alert",{attrs:{"can-show":t.hasClickedBuy&&!t.selectedVariationId}},[t._v(" "+t._s(t.i19selectVariationMsg)+" ")]),t._t("variations-info")],2)]})):t._e(),t.body.customizations?t._t("customizations",(function(){return t._l(t.body.customizations,(function(i){return i.custom_value?s("div",{key:i._id,staticClass:"product__customization form-group",class:i.grid_id?"product__customization--"+i.grid_id:null},[s("label",{attrs:{for:"c-"+i._id}},[t._v(" "+t._s(i.label)+" "),i.add_to_price?s("span",{staticClass:"badge badge-secondary"},[t._v(" "+t._s(t.formatAdditionalPrice(i.add_to_price))+" ")]):t._e()]),s("input",{staticClass:"form-control",attrs:{type:"text",id:"c-"+i._id},on:{keyup:function(s){return t.setCustomizationOption(i,s.target.value)}}})]):t._e()}))})):t._e(),t.isKit?s("div",{staticClass:"product__kit"},[t._t("kit",(function(){return[s("transition",{attrs:{"enter-active-class":"animated fadeInUp"}},[t.kitItems.length?s("quantity-selector",{attrs:{items:t.kitItems,min:t.body.min_quantity,max:t.body.quantity,slug:t.body.slug,"kit-product-id":t.body._id,"kit-name":t.name,"kit-price":t.fixedPrice},on:{buy:function(i){return t.$emit("buy",i)}},scopedSlots:t._u([{key:"buy-button-content",fn:function(){return[t._t("buy-button-content")]},proxy:!0}],null,!0)}):t._e()],1),t.kitItems.length?t._e():s("span",{staticClass:"product__kit-loading spinner-border",attrs:{role:"status"}},[s("span",{staticClass:"sr-only"},[t._v("Loading...")])])]}),null,{kitItems:t.kitItems})],2):[s("div",{staticClass:"apx_tabs mt-md-0 mt-4 pt-md-0 pt-3"},[s("div",{staticClass:"item"},[s("button",{staticClass:"w-100 d-flex align-items-center justify-content-between",attrs:{type:"button","data-tab":"details"}},[t._v(" Mais Detalhes "),s("span",[s("svg",{attrs:{width:"6",height:"10",viewBox:"0 0 6 10",fill:"none",xmlns:"http://www.w3.org/2000/svg"}},[s("path",{attrs:{d:"M1 9L5 5L1 1",stroke:"#666666","stroke-linecap":"round","stroke-linejoin":"round"}})])])])])]),t.isVariationInStock?t.hasBuyButton?s("div",{ref:"buy",staticClass:"product__buy my-4 "},[s(t.hasQuantitySelector?"quantity-selector":"div",{tag:"component",attrs:{items:t.hasQuantitySelector?[{_id:t.body._id,quantity:t.body.min_quantity||1}]:null,min:t.body.min_quantity,max:t.body.quantity,"has-buy-button":!1},on:{"set-quantity":function(i){var s=i.quantity;return t.qntToBuy=s}}},[s("span",{on:{click:t.buy}},[t._t("buy",(function(){return[s("button",{staticClass:"btn btn-lg btn-primary",attrs:{type:"button",disabled:t.hasClickedBuy&&!t.isOnCart}},[t._t("buy-button-content",(function(){return[t._v(" Adicionar ao Carrinho ")]}))],2)]}),null,{hasClickedBuy:t.hasClickedBuy,isOnCart:t.isOnCart})],2)])],1):t._e():s("div",{staticClass:"product__out-of-stock"},[t._t("out-of-stock",(function(){return[t._v(" "+t._s(t.i19outOfStock)+" ")]}))],2),t._t("favorite",(function(){return[s("div",{staticClass:"apx-favorite"},[s("a",{staticClass:"btn btn-sm product__favorite",attrs:{href:t.isLogged?null:t.accountUrl},on:{click:t.toggleFavorite}},[s("i",{class:t.isFavorite?"active":null},[s("svg",{attrs:{width:"18",height:"16",viewBox:"0 0 18 16",fill:"none",xmlns:"http://www.w3.org/2000/svg"}},[s("path",{attrs:{d:"M15.3147 2.00182C13.6705 0.356817 11.0038 0.356816 9.35962 2.00182L8.54826 2.81318L7.73689 2.00182C6.09244 0.357364 3.42626 0.357365 1.7818 2.00182C0.137348 3.64627 0.137349 6.31246 1.7818 7.95691L2.59316 8.76827L8.54826 14.7234L14.5033 8.76827L15.3147 7.95691C16.9597 6.31268 16.9597 3.64604 15.3147 2.00182Z",stroke:"black","stroke-linecap":"round","stroke-linejoin":"round"}})])]),s("span",[t._v(" "+t._s(t.isFavorite?t.i19removeFromFavorites:t.i19addToFavorites)+" ")])])])]})),s("div",{staticStyle:{display:"flex","flex-direction":"column","align-items":"center","justify-content":"center","margin-top":"25px"}},[s("span",{staticStyle:{margin:"0 auto"}},[t._v("Precisa de Lentes Multifocais?")]),s("a",{staticClass:"mt-4",staticStyle:{display:"flex","align-items":"center","margin-top":"5px"},attrs:{href:"https://wa.me/5531998601785?text=Olá! Quero comprar o produto *"+t.body.name+"* com lentes multifocais. Poderiam me ajudar?",id:"multifocais"}},[s("svg",{staticClass:"bi bi-whatsapp",staticStyle:{"margin-right":"5px"},attrs:{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",fill:"currentColor",viewBox:"0 0 16 16"}},[s("path",{attrs:{d:"M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"}})]),t._v(" Clique aqui para entrar em contato conosco ")])]),(t.isLowQuantity,t._e())],t._t("sale-timer",(function(){return[t.isOnSale?s("div",{staticClass:"product__sale-timer mb-3"},[s("div",[t._v(" "+t._s(t.i19offer)+" "),s("br"),s("small",[t._v(t._s(t.i19endsIn))])]),s("div",{ref:"timer",staticClass:"h1 ml-3 mb-0"},[t._v(" 00:00:00 ")])]):t._e()]})),t._e(),t._e(),t.body.production_time&&t.body.production_time.days?s("p",{staticClass:"product__production"},[s("i",{staticClass:"i-info-circle mr-1"}),t._v(" "+t._s(t.i19productionDeadline)+": "),s("strong",[t._v(" "+t._s(t.body.production_time.days)+" "+t._s(t.body.production_time.working_days?t.i19workingDays:t.i19days)+" "),t.body.production_time.cumulative?[t._v(" "+t._s(t.i19perUnit)+" ")]:t._e()],2)]):t._e(),(!t.isQuickview&&(!t.isKit||t.kitItems.length),t._e()),t._t("track-price",(function(){return[t._m(3)]}))]:s("div",{staticClass:"product__out-of-stock"},[t._t("out-of-stock",(function(){return[t._v(" "+t._s(t.i19outOfStock)+" ")]}))],2):s("div",{staticClass:"product__unavailable"},[t._t("unavailable",(function(){return[t._v(" "+t._s(t.i19unavailable)+" ")]}))],2)],2),!t.isSSR&&t.body.short_description?t._t("short-description",(function(){return[s("p",{staticClass:"product__info lead"},[t._v(" "+t._s(t.body.short_description)+" ")])]})):t._e()],2)],2):t._e()]),!t.isQuickview&&t.hasStickyBuyButton&&t.body.available&&t.isInStock?[s("transition",{attrs:{"enter-active-class":"animated fadeIn","leave-active-class":"animated fadeOut fast"}},[s("div",{directives:[{name:"show",rawName:"v-show",value:t.isStickyBuyVisible&&!1,expression:"isStickyBuyVisible && 1 != 1"}],ref:"sticky",staticClass:"product__sticky"},[s("div",{staticClass:"product__sticky-container container"},[s("div",{staticClass:"product__sticky-info"},[s("a-picture",{staticClass:"product__sticky-picture",attrs:{"can-calc-height":!1,src:t.thumbnail}}),s("h5",[t._v(t._s(t.name))])],1),s("div",{staticClass:"product__sticky-buy"},[s("a-prices",{attrs:{product:t.ghostProductForPrices,"is-literal":!1,"can-show-price-options":!0}}),s("a",{staticClass:"btn btn-lg btn-primary",attrs:{href:"#"},on:{click:function(i){return i.preventDefault(),t.buyOrScroll.apply(null,arguments)}}},[s("i",{staticClass:"i-shopping-bag mr-1"}),t._v(" "+t._s(t.strBuy)+" ")])],1)])])])]:t._e(),t.body._id?t._e():t._t("default")],2)},o=[function(){var t=this,i=t.$createElement,s=t._self._c||i;return s("div",{staticClass:"option_title text-center mb-5 mt-5"},[s("small"),s("h4",[t._v("Confirme sua personalização")])])},function(){var t=this,i=t.$createElement,s=t._self._c||i;return s("div",{staticClass:"col-auto"},[s("b",[t._v("Subtotal:")])])},function(){var t=this,i=t.$createElement;return(t._self._c||i)("div",{staticClass:"product__rating",attrs:{"data-sku":t.body.sku}})},function(){var t=this,i=t.$createElement;return(t._self._c||i)("div",{staticClass:"product__track-price",attrs:{"data-sku":t.body.sku}})}]},287:function(t,i,s){"use strict";s.d(i,"a",(function(){return e})),s.d(i,"b",(function(){return o}));var e=function(){var t=this,i=t.$createElement,s=t._self._c||i;return s("section",{staticClass:"apx_gallery"},[s("div",{staticClass:"slicked"},t._l(t.localPictures,(function(i,e){return s("div",{key:"img-"+e,staticClass:"apx_gallery__item",on:{click:function(i){return t.openZoom(e)}}},[s("a-picture",{staticClass:"apx_gallery__thumb",attrs:{src:t.getImg(i,null,"zoom")}})],1)})),0),t._m(4)])},o=[function(){var t=this.$createElement,i=this._self._c||t;return i("div",{staticClass:"pswp__container"},[i("div",{staticClass:"pswp__item"}),i("div",{staticClass:"pswp__item"}),i("div",{staticClass:"pswp__item"})])},function(){var t=this.$createElement,i=this._self._c||t;return i("div",{staticClass:"pswp__preloader"},[i("div",{staticClass:"pswp__preloader__icn"},[i("div",{staticClass:"pswp__preloader__cut"},[i("div",{staticClass:"pswp__preloader__donut"})])])])},function(){var t=this.$createElement,i=this._self._c||t;return i("div",{staticClass:"pswp__share-modal pswp__share-modal--hidden pswp__single-tap"},[i("div",{staticClass:"pswp__share-tooltip"})])},function(){var t=this.$createElement,i=this._self._c||t;return i("div",{staticClass:"pswp__caption"},[i("div",{staticClass:"pswp__caption__center"})])},function(){var t=this,i=t.$createElement,s=t._self._c||i;return s("div",{ref:"pswp",staticClass:"pswp",attrs:{tabindex:"-1",role:"dialog","aria-hidden":"true"}},[s("div",{staticClass:"pswp__bg"}),s("div",{staticClass:"pswp__scroll-wrap"},[t._m(0),s("div",{staticClass:"pswp__ui pswp__ui--hidden"},[s("div",{staticClass:"pswp__top-bar"},[s("div",{staticClass:"pswp__counter"}),s("button",{staticClass:"pswp__button pswp__button--close",attrs:{title:t.i19close+" (Esc)"}},[s("svg",{attrs:{width:"32",height:"32",viewBox:"0 0 32 32",fill:"none",xmlns:"http://www.w3.org/2000/svg"}},[s("line",{attrs:{x1:"24",y1:"8.70711",x2:"8.70711",y2:"24",stroke:"black","stroke-linecap":"round","stroke-linejoin":"round"}}),s("line",{attrs:{x1:"8.70711",y1:"8",x2:"24",y2:"23.2929",stroke:"black","stroke-linecap":"round","stroke-linejoin":"round"}})])]),s("button",{staticClass:"pswp__button pswp__button--share",attrs:{title:t.i19share}}),s("button",{staticClass:"pswp__button pswp__button--fs",attrs:{title:t.i19fullscreen}}),s("button",{staticClass:"pswp__button pswp__button--zoom",attrs:{title:"Zoom in/out"}}),t._m(1)]),t._m(2),s("button",{staticClass:"pswp__button pswp__button--arrow--left",attrs:{title:t.i19previous}},[s("svg",{attrs:{width:"32",height:"32",viewBox:"0 0 32 32",fill:"none",xmlns:"http://www.w3.org/2000/svg"}},[s("line",{attrs:{x1:"25.5",y1:"16.5",x2:"6.5",y2:"16.5",stroke:"black","stroke-linecap":"round","stroke-linejoin":"round"}}),s("path",{attrs:{d:"M15.5 8L6 16L15.5 24",stroke:"black","stroke-linecap":"round","stroke-linejoin":"round"}})])]),s("button",{staticClass:"pswp__button pswp__button--arrow--right",attrs:{title:t.i19next}},[s("svg",{attrs:{width:"32",height:"32",viewBox:"0 0 32 32",fill:"none",xmlns:"http://www.w3.org/2000/svg"}},[s("line",{attrs:{x1:"6.5",y1:"15.5",x2:"25.5",y2:"15.5",stroke:"black","stroke-linecap":"round","stroke-linejoin":"round"}}),s("path",{attrs:{d:"M16.5 8L26 16L16.5 24",stroke:"black","stroke-linecap":"round","stroke-linejoin":"round"}})])]),t._m(3),t.canAddToCart?s("button",{staticClass:"btn btn-success",attrs:{type:"button"},on:{click:t.buy}},[s("i",{staticClass:"i-shopping-cart"}),s("span",{staticClass:"d-none d-md-inline ml-1"},[t._v(" "+t._s(t.i19addToCart)+" ")])]):t._e()])])])}]}},0,[44,45]]);