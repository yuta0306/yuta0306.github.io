(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[925],{7329:function(e,a,r){"use strict";r.d(a,{Z:function(){return c}});var n=r(676);var t=r(2961);function c(e){return function(e){if(Array.isArray(e))return(0,n.Z)(e)}(e)||function(e){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||(0,t.Z)(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}},6876:function(e,a,r){"use strict";r.d(a,{Z:function(){return o}});var n=r(5893),t=r(1664),c=r(1069),i=r.n(c),s=r(5835);function o(e){var a=e.slug,r=e.content,c=!1;return r.Author!=s.v&&r.Author||(c=!0),(0,n.jsx)("div",{className:i().card__container,children:(0,n.jsx)(t.default,{href:"/".concat(a),children:(0,n.jsx)("a",{children:(0,n.jsxs)("div",{className:i().card,children:[(0,n.jsx)("div",{className:i().card__thumbnail,children:r.Thumbnail&&(0,n.jsx)("img",{src:r.Thumbnail,alt:r.Title,className:i().card__thumbnail__img,loading:"lazy"})}),(0,n.jsxs)("div",{children:[(0,n.jsxs)("div",{className:i().card__meta,children:[(0,n.jsx)("time",{dateTime:r.Date,itemProp:"published",children:r.Date}),c?(0,n.jsx)(t.default,{href:"/about",children:(0,n.jsx)("a",{itemScope:!0,role:"author",itemType:"http://schema.org/Person",children:(0,n.jsx)("span",{itemProp:"name",children:r.Author||s.v})})}):(0,n.jsx)("span",{itemScope:!0,role:"author",itemType:"http://schema.org/Person",itemProp:"name",children:r.Author||s.v})]}),(0,n.jsx)("h2",{className:i().card__title,children:r.Title})]})]})})})})}},2120:function(e,a,r){"use strict";r.d(a,{Z:function(){return o}});var n=r(5893),t=r(7329),c=r(1664),i=r(2202),s=r.n(i);function o(e){var a=e.top,r=e.pages,i=e.page,o=e.minPage,_=void 0===o?1:o,l=e.visible,d=void 0===l?5:l,u=i<r&&_<=i,p=_<i,h=r-_+1,g=Math.floor(d/2),m=i-g>=_?i-g-_:0,x=i+g<=r?i+g-_+1:r-_+1,f=(0,t.Z)(Array(h+1)).map((function(e,a){return a+_})).slice(m,x);return(0,n.jsx)("div",{className:s().container,children:(0,n.jsxs)("ul",{className:s().container__pagers,children:[(0,n.jsx)(c.default,{href:"".concat(a,"/").concat(_),children:(0,n.jsx)("a",{className:s().container__pager,children:(0,n.jsx)("li",{className:s().container__pager__page,children:"<<"},"<<")})}),p?(0,n.jsx)(c.default,{href:"".concat(a,"/").concat(i-1),children:(0,n.jsx)("a",{className:s().container__pager,children:(0,n.jsx)("li",{className:s().container__pager__page,children:"<"},"<")})}):(0,n.jsx)("li",{className:s().container__pager_deactive,children:"<"},"<"),f.map((function(e){return e!=i?(0,n.jsx)(c.default,{href:"".concat(a,"/").concat(e),children:(0,n.jsx)("a",{className:s().container__pager,children:(0,n.jsx)("li",{className:s().container__pager__page,children:e},"/".concat(a,"/").concat(e))})}):(0,n.jsx)("li",{className:s().container__pager_active,children:e},"".concat(a,"/").concat(e))})),u?(0,n.jsx)(c.default,{href:"".concat(a,"/").concat(i+1),children:(0,n.jsx)("a",{className:s().container__pager,children:(0,n.jsx)("li",{className:s().container__pager__page,children:">"},">")})}):(0,n.jsx)("li",{className:s().container__pager_deactive,children:">"},">"),(0,n.jsx)(c.default,{href:"".concat(a,"/").concat(r),children:(0,n.jsx)("a",{className:s().container__pager,children:(0,n.jsx)("li",{className:s().container__pager__page,children:">>"},">>")})})]})})}},9198:function(e,a,r){"use strict";r.r(a),r.d(a,{__N_SSG:function(){return x},default:function(){return f}});var n=r(5893),t=r(7329),c=r(9008),i=r(239),s=r(9955),o=r(3607),_=r(6092),l=r(6876),d=r(19),u=r(1932),p=r(3612),h=r(9545),g=r(2120),m=r(5835),x=!0;function f(e){var a=e.allPostData,r=e.page,x=a.map((function(e){return e.content.Category})),f=[];a.map((function(e){var a,r=e.content.Tags;Array.isArray(r)?(a=f).push.apply(a,(0,t.Z)(r)):"string"==typeof r&&f.push(r)})),x=(0,t.Z)(new Set(x)),f=(0,t.Z)(new Set(f));var j=Math.ceil(a.length/(m.rs-m.AQ));return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(c.default,{children:(0,n.jsx)("title",{children:m.aD})}),(0,n.jsx)(s.Z,{categories:x,index:"index"}),(0,n.jsx)(_.Z,{content:(0,n.jsxs)(n.Fragment,{children:[a.slice((m.rs-m.AQ)*(r-1),(m.rs-m.AQ)*r).map((function(e,a){var r=e.slug,t=e.content;return(a+1)%Math.floor(m.rs/m.AQ)==Math.floor(m.rs/m.AQ)-1?(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(l.Z,{slug:r,content:t}),(0,n.jsx)(i.Z.Google,{client:"ca-pub-4998278830587376",slot:"3060159795",style:{display:"block",borderBottom:"1px dashed rgba(240, 240, 240, 0.6)"},format:"auto",responsive:"true"})]}):(0,n.jsx)(l.Z,{slug:r,content:t})})),(a.length-m.rs*(r-1))%2==1&&(0,n.jsx)("div",{}),(0,n.jsx)(g.Z,{top:"/post",pages:j,page:r,minPage:1})]}),sidebar:(0,n.jsxs)(n.Fragment,{children:[m.A&&(0,n.jsx)(d.Z,{bio:m.A,author:m.v}),m.UY&&(0,n.jsx)(u.Z,{socials:m.UY}),(0,n.jsx)(i.Z.Google,{client:"ca-pub-4998278830587376",slot:"8978700883",style:{display:"block"},format:"auto",responsive:"true"}),x&&(0,n.jsx)(p.Z,{categories:x}),f&&(0,n.jsx)(h.Z,{tags:f}),(0,n.jsx)(i.Z.Google,{client:"ca-pub-4998278830587376",slot:"8978700883",style:{display:"block"},format:"auto",responsive:"true"})]}),grid_layout:!0}),(0,n.jsx)(o.Z,{})]})}},9188:function(e,a,r){(window.__NEXT_P=window.__NEXT_P||[]).push(["/post/[page]",function(){return r(9198)}])},1069:function(e){e.exports={card:"card_card__1XHqb",card__container:"card_card__container__1HXVB",card__meta:"card_card__meta__3UO09",card__thumbnail:"card_card__thumbnail__3rV6C",card__thumbnail__img:"card_card__thumbnail__img__1f8pd",card__title:"card_card__title__26MYL"}},2202:function(e){e.exports={container:"paginager_container__3j3Qx",container__pagers:"paginager_container__pagers__1oXIX",container__pager:"paginager_container__pager__268RS",container__pager__page:"paginager_container__pager__page__3c5sS",container__pager_deactive:"paginager_container__pager_deactive__3v2QM",container__pager_active:"paginager_container__pager_active__Fm_0T"}}},function(e){e.O(0,[774,351,996,382],(function(){return a=9188,e(e.s=a);var a}));var a=e.O();_N_E=a}]);