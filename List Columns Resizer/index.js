/*! v0.1.0 Build Wed, 14 Oct 2015 08:52:29 GMT */
!function(){var e={},t=function(){var t,n,r,a=Array.prototype.slice.call(arguments,0);"string"==typeof a[0]?(r=a[0],t=a[1],n=a[2]):Array.isArray(a[0])&&(t=a[0],n=a[1]);var i=t.reduce(function(e,t){return e.addDependency(t)},tau.mashups);return i=i.addDependency(r+"/config"),i=i.addMashup(function(){var a=Array.prototype.slice.call(arguments,0);if(t.length>0&&1===a.length)throw new Error("Can't properly load dependencies for mashup \""+r+'", mashup is stopped.');return e.variables=a[a.length-1],a.length-t.length===2?e.config=a[a.length-2]:e.config={},Object.freeze&&(Object.freeze(e.variables),Object.freeze(e.config),Object.freeze(e)),n.apply(null,a)})};t("ListColumnsResizer",["jQuery","Underscore","tau/configurator"],function(t,n,r){return function(t){function n(e){if(r[e])return r[e].exports;var a=r[e]={exports:{},id:e,loaded:!1};return t[e].call(a.exports,a,a.exports,n),a.loaded=!0,a.exports}var r={};return n.m=t,n.c=r,n.p="",n.p=e.variables?e.variables.mashupPath:n.p,n(0)}([function(e,t,n){e.exports=n(3)},,,function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}var a=n(4),i=r(a),o=n(5),s=r(o),u=n(6),l=r(u),c=n(8),d=r(c);n(9);var f=void 0,p=void 0,h={},v=void 0,g={},m=function(e){return(e.data("unit-id")||e.data("id")).replace("_sortable__","__")},y=function(){return p.find(".tau-list-level")},b=function(e){return e.attr("id")},x=function(e){return e.data("list-level")},z=function(e){return e.children(".i-role-headerholder").find(".tau-elems-cell")},L=function(e){var t=p.find("#"+e+" > .i-role-cardsholder > :not(.tau-axis-card-no-value):first");return t.find(".tau-elems-table .tau-board-unit")},C=function(e){return h=e,window.loggedUser.isAdministrator?d["default"].setPublic("ListColumnsResizer",f,{data:JSON.stringify(e)}):d["default"].set("ListColumnsResizer",f,{data:JSON.stringify(e)})},j=function(){return d["default"].get("ListColumnsResizer",f).then(function(e){var t=e.data;try{return JSON.parse(t)}catch(n){return{}}})},R=function(){g=h||{}},O=function(e){v.text(e)},w=function(){return s["default"].map(g,function(e,t){return s["default"].map(e,function(e,n){return[".tau-list-level-"+t+" .tau-list-caption .tau-list-"+n+"-cell {width: "+e+"px !important; }",".tau-list-level-"+t+" .tau-elems-table .tau-board-unit.tau-list-"+n+"-cell {width: "+(e-1)+"px !important; }"].join("\n")}).join("\n\n")}).join("\n\n\n")},A=function(e,t,n){var r=g[e],a=r[t];a!==n&&(r[t]=n,O(w()))},T=function(){var e=g;C(e)},S=function(e){var t=x(e),n=g[t]||{};g[t]=n,L(b(e)).each(function(e,t){var r=i["default"](t),a=m(r);n[a]=n[a]||r.outerWidth()+2}),g[t]=n},U=function(e){if(!e.data("ListColumnsResizer-added")){S(e),e.data("ListColumnsResizer-added",!0);var t=z(e);t.each(function(e,t){return i["default"](t).append('<div class="ListColumnResizer-resizer"></div>')}),t.each(function(t,n){return i["default"](n).data("level-depth",x(e)).data("unit-id",m(i["default"](n)))});var n=t.find(".ListColumnResizer-resizer");n.draggable({axis:"x",containment:t.parent(),cursor:"ew-resize",cursorAt:!1,stop:function(){T(),n.css({left:"auto"})},drag:function(e,t){var n=t.position,r=t.offset;n.left=n.left-1;var a=i["default"](e.target).parent(),o=r.left-a.offset().left,s=o;if(17>=s)return e.stopPropagation(),!1;var u=a.data("level-depth"),l=a.data("unit-id");A(u,l,s)}})}},P=function(){var e=y();R(),e.each(function(e,t){return U(i["default"](t))}),O(w()),p.on("click",".tau-list-level",function(e){U(i["default"](e.currentTarget))})};l["default"].addBusListener("newlist","boardSettings.ready",function(e,t){var n=t.boardSettings;f=n.settings.id}),l["default"].addBusListener("newlist","overview.board.ready",function(e,t){var n=t.element;p=n,p.addClass("ListColumnResizer-added"),j().then(function(e){h=e,g={},P()}),v=i["default"]("<style />").appendTo(p)})},function(e,n){e.exports=t},function(e,t){e.exports=n},function(e,t,n){"use strict";var r=n(7),a=r.getBusRegistry(),i=function(e){return function(){e.apply(null,Array.prototype.slice.call(arguments).slice(1))}},o=function(e,t,n,r){var o=i(function(a){var i=a.bus;i.name===e&&i[r?"once":"on"](t,n)}),s=a.addEventListener("create",o);return a.addEventListener("destroy",i(function(r){var a=r.bus;a.name===e&&a.removeListener(t,n,s)})),{remove:function(){a.removeListener("create",o,s),a.getBusRegistry().getByName(e).then(function(e){e.removeListener(t,n,s)})}}},s=function(e,t,n){return o(e,t,n,!0)};e.exports={addBusListener:o,addBusListenerOnce:s}},function(e,t){e.exports=r},function(e,t,n){"use strict";var r=n(4),a=n(7),i={get:function(e,t){return r.ajax({type:"GET",url:a.getApplicationPath()+"/storage/v1/"+e+"/"+t,contentType:"application/json; charset=utf-8",dataType:"json"}).then(function(e){return Object.keys(e.userData).length?e.userData:e.publicData},function(e){return 200===e.status?(new r.Deferred).resolve({}):e})},set:function(e,t,n){return r.ajax({type:"POST",url:a.getApplicationPath()+"/storage/v1/"+e+"/"+t,contentType:"application/json; charset=utf-8",dataType:"json",data:JSON.stringify({userData:n,scope:"Public"})})},setPublic:function(e,t,n){return r.ajax({type:"POST",url:a.getApplicationPath()+"/storage/v1/"+e+"/"+t,contentType:"application/json; charset=utf-8",dataType:"json",data:JSON.stringify({publicData:n,scope:"Public"})})}};e.exports=i},function(e,t,n){var r=n(10);"string"==typeof r&&(r=[[e.id,r,""]]);n(12)(r,{});r.locals&&(e.exports=r.locals)},function(e,t,n){t=e.exports=n(11)(),t.push([e.id,".ListColumnResizer-resizer{position:absolute;background-color:#e8e8e8;width:3px;top:0;right:-3px;bottom:0;z-index:1;cursor:ew-resize}.ListColumnResizer-resizer.ui-draggable-dragging,.ListColumnResizer-resizer:hover{background-color:#a8a8a8}.ListColumnResizer-added .tau-elems-cell{border-right:1px solid #e8e8e8}.ListColumnResizer-added .tau-list-caption .tau-elems-cell{background-color:#f6f7f9;border-right:2px solid #e8e8e8}.ListColumnResizer-added .tau-board-list-view-resizer{display:none}.ListColumnResizer-added .ui-resizable,.ListColumnResizer-added .ui-resizable .tau-board-unit{margin-right:0!important;margin-left:0!important}",""])},function(e,t){e.exports=function(){var e=[];return e.toString=function(){for(var e=[],t=0;t<this.length;t++){var n=this[t];n[2]?e.push("@media "+n[2]+"{"+n[1]+"}"):e.push(n[1])}return e.join("")},e.i=function(t,n){"string"==typeof t&&(t=[[null,t,""]]);for(var r={},a=0;a<this.length;a++){var i=this[a][0];"number"==typeof i&&(r[i]=!0)}for(a=0;a<t.length;a++){var o=t[a];"number"==typeof o[0]&&r[o[0]]||(n&&!o[2]?o[2]=n:n&&(o[2]="("+o[2]+") and ("+n+")"),e.push(o))}},e}},function(e,t,n){function r(e,t){for(var n=0;n<e.length;n++){var r=e[n],a=d[r.id];if(a){a.refs++;for(var i=0;i<a.parts.length;i++)a.parts[i](r.parts[i]);for(;i<r.parts.length;i++)a.parts.push(s(r.parts[i],t))}else{for(var o=[],i=0;i<r.parts.length;i++)o.push(s(r.parts[i],t));d[r.id]={id:r.id,refs:1,parts:o}}}}function a(e){for(var t=[],n={},r=0;r<e.length;r++){var a=e[r],i=a[0],o=a[1],s=a[2],u=a[3],l={css:o,media:s,sourceMap:u};n[i]?n[i].parts.push(l):t.push(n[i]={id:i,parts:[l]})}return t}function i(){var e=document.createElement("style"),t=h();return e.type="text/css",t.appendChild(e),e}function o(){var e=document.createElement("link"),t=h();return e.rel="stylesheet",t.appendChild(e),e}function s(e,t){var n,r,a;if(t.singleton){var s=g++;n=v||(v=i()),r=u.bind(null,n,s,!1),a=u.bind(null,n,s,!0)}else e.sourceMap&&"function"==typeof URL&&"function"==typeof URL.createObjectURL&&"function"==typeof URL.revokeObjectURL&&"function"==typeof Blob&&"function"==typeof btoa?(n=o(),r=c.bind(null,n),a=function(){n.parentNode.removeChild(n),n.href&&URL.revokeObjectURL(n.href)}):(n=i(),r=l.bind(null,n),a=function(){n.parentNode.removeChild(n)});return r(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap)return;r(e=t)}else a()}}function u(e,t,n,r){var a=n?"":r.css;if(e.styleSheet)e.styleSheet.cssText=m(t,a);else{var i=document.createTextNode(a),o=e.childNodes;o[t]&&e.removeChild(o[t]),o.length?e.insertBefore(i,o[t]):e.appendChild(i)}}function l(e,t){var n=t.css,r=t.media;t.sourceMap;if(r&&e.setAttribute("media",r),e.styleSheet)e.styleSheet.cssText=n;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(n))}}function c(e,t){var n=t.css,r=(t.media,t.sourceMap);r&&(n+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(r))))+" */");var a=new Blob([n],{type:"text/css"}),i=e.href;e.href=URL.createObjectURL(a),i&&URL.revokeObjectURL(i)}var d={},f=function(e){var t;return function(){return"undefined"==typeof t&&(t=e.apply(this,arguments)),t}},p=f(function(){return/msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase())}),h=f(function(){return document.head||document.getElementsByTagName("head")[0]}),v=null,g=0;e.exports=function(e,t){t=t||{},"undefined"==typeof t.singleton&&(t.singleton=p());var n=a(e);return r(n,t),function(e){for(var i=[],o=0;o<n.length;o++){var s=n[o],u=d[s.id];u.refs--,i.push(u)}if(e){var l=a(e);r(l,t)}for(var o=0;o<i.length;o++){var u=i[o];if(0===u.refs){for(var c=0;c<u.parts.length;c++)u.parts[c]();delete d[u.id]}}}};var m=function(){var e=[];return function(t,n){return e[t]=n,e.filter(Boolean).join("\n")}}()}])})}();