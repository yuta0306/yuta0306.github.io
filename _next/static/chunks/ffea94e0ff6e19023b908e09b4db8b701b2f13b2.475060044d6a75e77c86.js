(window.webpackJsonp_N_E=window.webpackJsonp_N_E||[]).push([[4],{"5FPD":function(e,t,n){"use strict";n.d(t,"a",(function(){return l}));var a=n("nKUr"),r=n("ODXe"),c=n("YFqc"),i=n.n(c),o=n("bgbJ"),s=n.n(o);function l(e){var t=e.socials;return Object(a.jsx)(a.Fragment,{children:Object(a.jsxs)("div",{className:s.a.container,children:[Object(a.jsx)("h3",{className:s.a.container__header,children:"Follow Me"}),Object(a.jsx)("div",{className:s.a.container__links,children:t.map((function(e){var t=Object(r.a)(e,3),n=t[0],c=t[1],o=t[2];return Object(a.jsx)(i.a,{href:c,children:Object(a.jsx)("a",{target:"_blank",children:Object(a.jsx)("img",{src:o,alt:n})})})}))})]})})}},"6ldB":function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=c(n("dciQ")),r=c(n("q2je"));function c(e){return e&&e.__esModule?e:{default:e}}var i={Google:a.default,Baidu:r.default};t.default=i},"7Uda":function(e,t,n){"use strict";n.d(t,"a",(function(){return l}));var a=n("nKUr"),r=n("KQm4"),c=n("YFqc"),i=n.n(c),o=n("iE7Z"),s=n.n(o);function l(e){var t=e.top,n=e.pages,c=e.page,o=e.minPage,l=void 0===o?1:o,_=e.visible,u=void 0===_?5:_,d=c<n&&l<=c,f=l<c,p=n-l+1,h=Math.floor(u/2),b=c-h>=l?c-h-l:0,j=c+h<=n?c+h-l+1:n-l+1,m=Object(r.a)(Array(p+1)).map((function(e,t){return t+l})).slice(b,j);return Object(a.jsx)("div",{className:s.a.container,children:Object(a.jsxs)("ul",{className:s.a.container__pagers,children:[Object(a.jsx)(i.a,{href:"".concat(t,"/").concat(l),children:Object(a.jsx)("a",{className:s.a.container__pager,children:Object(a.jsx)("li",{className:s.a.container__pager__page,children:"<<"},"<<")})}),f?Object(a.jsx)(i.a,{href:"".concat(t,"/").concat(c-1),children:Object(a.jsx)("a",{className:s.a.container__pager,children:Object(a.jsx)("li",{className:s.a.container__pager__page,children:"<"},"<")})}):Object(a.jsx)("li",{className:s.a.container__pager_deactive,children:"<"},"<"),m.map((function(e){return e!=c?Object(a.jsx)(i.a,{href:"".concat(t,"/").concat(e),children:Object(a.jsx)("a",{className:s.a.container__pager,children:Object(a.jsx)("li",{className:s.a.container__pager__page,children:e},"/".concat(t,"/").concat(e))})}):Object(a.jsx)("li",{className:s.a.container__pager_active,children:e},"".concat(t,"/").concat(e))})),d?Object(a.jsx)(i.a,{href:"".concat(t,"/").concat(c+1),children:Object(a.jsx)("a",{className:s.a.container__pager,children:Object(a.jsx)("li",{className:s.a.container__pager__page,children:">"},">")})}):Object(a.jsx)("li",{className:s.a.container__pager_deactive,children:">"},">"),Object(a.jsx)(i.a,{href:"".concat(t,"/").concat(n),children:Object(a.jsx)("a",{className:s.a.container__pager,children:Object(a.jsx)("li",{className:s.a.container__pager__page,children:">>"},">>")})})]})})}},BUqJ:function(e,t,n){"use strict";n.d(t,"a",(function(){return l}));var a=n("nKUr"),r=n("YFqc"),c=n.n(r),i=n("q5Le"),o=n("pFb9"),s=n.n(o);function l(e){var t=e.slug,n=e.content,r=!1;return n.Author!=i.b&&n.Author||(r=!0),Object(a.jsx)("div",{className:s.a.card__container,children:Object(a.jsx)(c.a,{href:"/".concat(t),children:Object(a.jsx)("a",{children:Object(a.jsxs)("div",{className:s.a.card,children:[Object(a.jsx)("div",{className:s.a.card__thumbnail,children:n.Thumbnail?Object(a.jsx)("img",{src:n.Thumbnail,alt:n.Title,className:s.a.card__thumbnail__img,loading:"lazy"}):Object(a.jsx)("img",{src:"/images/default.png",alt:n.Title,className:s.a.card__thumbnail__img,loading:"lazy"})}),Object(a.jsxs)("div",{children:[Object(a.jsxs)("div",{className:s.a.card__meta,children:[Object(a.jsx)("time",{dateTime:n.Date,itemProp:"published",children:n.Date}),r?Object(a.jsx)(c.a,{href:"/about",children:Object(a.jsx)("a",{itemScope:!0,role:"author",itemType:"http://schema.org/Person",children:Object(a.jsx)("span",{itemProp:"name",children:n.Author||i.b})})}):Object(a.jsx)("span",{itemScope:!0,role:"author",itemType:"http://schema.org/Person",itemProp:"name",children:n.Author||i.b})]}),Object(a.jsx)("h2",{className:s.a.card__title,children:n.Title})]})]})})})},t.toString())}},BsWD:function(e,t,n){"use strict";n.d(t,"a",(function(){return r}));var a=n("a3WO");function r(e,t){if(e){if("string"===typeof e)return Object(a.a)(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?Object(a.a)(e,t):void 0}}},D5tg:function(e,t,n){"use strict";n.d(t,"a",(function(){return i}));var a=n("nKUr"),r=n("lf8p"),c=n.n(r);function i(e){var t=e.bio,n=e.author,r=t.split("\n").map((function(e){return Object(a.jsx)("p",{className:c.a.container__paragraph,children:e})}));return Object(a.jsxs)("div",{className:c.a.container,itemScope:!0,itemProp:"author",itemType:"http://schema.org/Person",children:[Object(a.jsx)("div",{className:c.a.container__image,children:Object(a.jsx)("img",{src:"/images/profile.jpeg",alt:n,loading:"lazy"})}),Object(a.jsx)("h3",{className:c.a.author,itemScope:!0,itemProp:"name",children:n}),r]})}},KQm4:function(e,t,n){"use strict";n.d(t,"a",(function(){return c}));var a=n("a3WO");var r=n("BsWD");function c(e){return function(e){if(Array.isArray(e))return Object(a.a)(e)}(e)||function(e){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||Object(r.a)(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}},ODXe:function(e,t,n){"use strict";n.d(t,"a",(function(){return r}));var a=n("BsWD");function r(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(e)){var n=[],a=!0,r=!1,c=void 0;try{for(var i,o=e[Symbol.iterator]();!(a=(i=o.next()).done)&&(n.push(i.value),!t||n.length!==t);a=!0);}catch(s){r=!0,c=s}finally{try{a||null==o.return||o.return()}finally{if(r)throw c}}return n}}(e,t)||Object(a.a)(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}},UD2v:function(e,t,n){"use strict";n.d(t,"a",(function(){return s}));var a=n("nKUr"),r=n("YFqc"),c=n.n(r),i=n("xDC6"),o=n.n(i);function s(e){var t=e.tags;t.sort((function(e,t){return e.toLowerCase()<t.toLowerCase()?-1:1}));return Object(a.jsxs)("div",{className:o.a.container,children:[Object(a.jsx)("h3",{className:o.a.container__header,children:"Tags"}),Object(a.jsx)("div",{className:o.a.container__links,children:t.map((function(e){return Object(a.jsx)(c.a,{href:"/tag/".concat(e,"/1"),children:Object(a.jsx)("a",{className:o.a.container__link,children:e})})}))})]})}},a3WO:function(e,t,n){"use strict";function a(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,a=new Array(t);n<t;n++)a[n]=e[n];return a}n.d(t,"a",(function(){return a}))},bgbJ:function(e,t,n){e.exports={container:"followme_container__3qQyP",container__header:"followme_container__header__1IBfE",container__links:"followme_container__links__3SmDO"}},dciQ:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}(),r=i(n("q1tI")),c=i(n("17x9"));function i(e){return e&&e.__esModule?e:{default:e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function s(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}var l=function(e){function t(){return o(this,t),s(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,e),a(t,[{key:"componentDidMount",value:function(){window&&(window.adsbygoogle=window.adsbygoogle||[]).push({})}},{key:"render",value:function(){return r.default.createElement("ins",{className:this.props.className+" adsbygoogle",style:this.props.style,"data-ad-client":this.props.client,"data-ad-slot":this.props.slot,"data-ad-layout":this.props.layout,"data-ad-layout-key":this.props.layoutKey,"data-ad-format":this.props.format,"data-full-width-responsive":this.props.responsive})}}]),t}(r.default.Component);t.default=l,l.propTypes={className:c.default.string,style:c.default.object,client:c.default.string.isRequired,slot:c.default.string.isRequired,layout:c.default.string,layoutKey:c.default.string,format:c.default.string,responsive:c.default.string},l.defaultProps={className:"",style:{display:"block"},format:"auto",layout:"",layoutKey:"",responsive:"false"}},iE7Z:function(e,t,n){e.exports={container:"paginager_container__3j3Qx",container__pagers:"paginager_container__pagers__1oXIX",container__pager:"paginager_container__pager__268RS",container__pager__page:"paginager_container__pager__page__3c5sS",container__pager_deactive:"paginager_container__pager_deactive__3v2QM",container__pager_active:"paginager_container__pager_active__Fm_0T"}},lf8p:function(e,t,n){e.exports={container:"shortbio_container__11Rzx",container__image:"shortbio_container__image__38jvW",container__paragraph:"shortbio_container__paragraph__2Sxgf",author:"shortbio_author__ZbrSN"}},mUvu:function(e,t,n){e.exports={container:"categories_container__XA7T4",container__header:"categories_container__header__1HMsA",container__links:"categories_container__links__2_sET",container__link:"categories_container__link__3wXMA"}},pFb9:function(e,t,n){e.exports={card:"card_card__1XHqb",card__container:"card_card__container__1HXVB",card__meta:"card_card__meta__3UO09",card__thumbnail:"card_card__thumbnail__3rV6C",card__thumbnail__img:"card_card__thumbnail__img__1f8pd",card__title:"card_card__title__26MYL"}},q2je:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a,r=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}(),c=n("q1tI"),i=(a=c)&&a.__esModule?a:{default:a};function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function s(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}var l=function(e){function t(){return o(this,t),s(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,e),r(t,[{key:"render",value:function(){return i.default.createElement("div",{className:"adsbybaidu"},"TODO")}}]),t}(i.default.Component);t.default=l},rQdo:function(e,t,n){"use strict";n.d(t,"a",(function(){return s}));var a=n("nKUr"),r=n("YFqc"),c=n.n(r),i=n("mUvu"),o=n.n(i);function s(e){var t=e.categories;return Object(a.jsxs)("div",{className:o.a.container,children:[Object(a.jsx)("h3",{className:o.a.container__header,children:"Categories"}),Object(a.jsx)("div",{className:o.a.container__links,children:t.map((function(e){return Object(a.jsx)(c.a,{href:"/category/".concat(e,"/1"),children:Object(a.jsx)("a",{className:o.a.container__link,children:e})})}))})]})}},xDC6:function(e,t,n){e.exports={container:"tags_container__2j2ju",container__header:"tags_container__header__3imWv",container__links:"tags_container__links__3WNOQ",container__link:"tags_container__link__3DgcP"}}}]);