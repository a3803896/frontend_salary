(this.webpackJsonpreact_practice=this.webpackJsonpreact_practice||[]).push([[0],{205:function(t,e,n){},227:function(t,e,n){"use strict";n.r(e);var a=n(10),r=n.n(a),c=n(80),i=n.n(c),o=n(14),s=n(7),u=n(6);function l(t){var e,n,r=t.originData,c=Object(a.useState)(null),i=Object(o.a)(c,2),l=i[0],d=i[1];function f(){var t=function(){s.q(".area svg").remove();var t={top:10,right:10,bottom:30,left:40},a=parseInt(s.q(".area").style("width")),r=.9*a;return e=a-t.left-t.right,n=r-t.top-t.bottom,s.q(".area").append("svg").attr("width",a).attr("height",r).append("g").attr("class","main-group").attr("transform","translate(".concat(t.left,",").concat(t.top,")"))}(),a=s.i().domain(l.map((function(t){return t.area}))).range([0,e]).padding(.15),r=s.j().domain([0,s.g(l,(function(t){return t.amount}))]).range([n,0]).nice(),c=s.k().domain(l.map((function(t){return t.area}))).range(s.o),i=s.b(a),o=s.c(r);t.append("g").attr("class","x-axis").attr("transform","translate(0, ".concat(n,")")).call(i),t.append("g").attr("class","y-axis").call(o),t.selectAll("rect").data(l).enter().append("rect").attr("width",a.bandwidth()).attr("x",(function(t){return a(t.area)})).attr("y",n).attr("fill",(function(t){return c(t.area)})).transition().duration(500).attr("y",(function(t){return r(t.amount)})).attr("height",(function(t){return r(0)-r(t.amount)})),t.selectAll("amount-text").data(l).enter().append("text").text((function(t){return t.amount})).attr("text-anchor","middle").attr("x",(function(t){return a(t.area)+a.bandwidth()/2})).attr("y",n).transition().duration(500).attr("y",(function(t){return r(t.amount)-8})),t.append("text").text("\u5730\u5340\u5206\u5e03\uff08\u4eba\u6578 / \u5730\u5340\uff09").attr("x",.7*e).attr("y",.2*n)}return Object(a.useEffect)((function(){r.length&&function(){var t={},e=[],n=r;for(var a in n.forEach((function(e){e.company.area.includes("\u53f0\u7063")&&(e.company.area=e.company.area.replace("\u53f0\u7063 - ",""),t[e.company.area]||(t[e.company.area]=[]),t[e.company.area].push(e))})),t)e.push({area:a,amount:t[a].length});e.sort((function(t,e){return e.amount-t.amount})),d(e)}()}),[r]),Object(a.useEffect)((function(){if(l)return f(),window.addEventListener("resize",f),function(){window.removeEventListener("resize",f)}}),[l]),Object(u.jsx)("div",{className:"area"})}function d(t){var e,n=t.originData,r=Object(a.useState)(null),c=Object(o.a)(r,2),i=c[0],l=c[1];function d(){var t=function(){s.q(".gender svg").remove();var t={top:10,right:10,bottom:10,left:10},n=parseInt(s.q(".gender").style("width")),a=n;return n-t.left-t.right,e=a-t.top-t.bottom,s.q(".gender").append("svg").attr("width",n).attr("height",a).append("g").attr("class","main-group").attr("transform","translate(".concat(n/2,",").concat(a/2,")"))}(),n=s.a().innerRadius(0).outerRadius(e/2),a=s.h().value((function(t){return t.value})),r=s.k().domain(i.map((function(t){return t.key}))).range(s.p);t.selectAll("arc").data(a(i)).enter().append("path").attr("d",n).attr("fill",(function(t){return r(t.data.key)}));var c=t.selectAll("text").data(a(i)).enter().append("text").attr("transform",(function(t){return"translate(".concat(n.centroid(t),")")}));c.append("tspan").attr("x","0").attr("dy","0rem").text((function(t){return"".concat(t.data.key)})),c.append("tspan").attr("x","0").attr("dy","1rem").text((function(t){return"".concat(t.data.value,"\u4eba")}))}return Object(a.useEffect)((function(){n.length&&function(){var t=0,e=0;n.forEach((function(n){return"\u7537\u6027"===n.gender?t+=1:"\u5973\u6027"===n.gender?e+=1:void 0})),l([{key:"\u7537\u6027",value:t},{key:"\u5973\u6027",value:e}])}()}),[n]),Object(a.useEffect)((function(){if(i)return d(),window.addEventListener("resize",d),function(){window.removeEventListener("resize",d)}}),[i]),Object(u.jsxs)(u.Fragment,{children:[Object(u.jsx)("p",{className:"chart_title text-center mb-0",children:"\u6027\u5225\u5206\u5e03\uff08\u4eba\u6578 / \u6027\u5225\uff09"}),Object(u.jsx)("div",{className:"gender"})]})}function f(t){var e,n,r=t.originData,c=Object(a.useState)(null),i=Object(o.a)(c,2),l=i[0],d=i[1];function f(){var t=function(){s.q(".age svg").remove();var t={top:30,right:10,bottom:30,left:40},a=parseInt(s.q(".age").style("width")),r=.9*a;return e=a-t.left-t.right,n=r-t.top-t.bottom,s.q(".age").append("svg").attr("width",a).attr("height",r).append("g").attr("class","main-group").attr("transform","translate(".concat(t.left,",").concat(t.top,")"))}(),a=s.i().domain(l.map((function(t){return t.key}))).range([0,e]).padding(.15),r=s.j().domain([0,s.g(l,(function(t){return t.value}))]).range([n,0]).nice(),c=s.k().domain(l.map((function(t){return t.key}))).range(s.n),i=s.b(a),o=s.c(r);t.append("g").attr("class","x-axis").attr("transform","translate(0, ".concat(n,")")).call(i),t.append("g").attr("class","y-axis").call(o),t.selectAll("rect").data(l).join("rect").attr("width",a.bandwidth()).attr("x",(function(t){return a(t.key)})).attr("y",n).attr("fill",(function(t){return c(t.key)})).transition().duration(500).attr("y",(function(t){return r(t.value)})).attr("height",(function(t){return r(0)-r(t.value)})),t.selectAll(".amount-text").data(l).enter().append("text").text((function(t){return t.value})).attr("text-anchor","middle").attr("x",(function(t){return a(t.key)+a.bandwidth()/2})).attr("y",n).transition().duration(500).attr("y",(function(t){return r(t.value)-8})),t.append("text").text("\u5e74\u9f61\u5206\u5e03\uff08\u4eba\u6578 / \u5e74\u9f61\uff09").attr("x",.7*e).attr("y",.2*n)}return Object(a.useEffect)((function(){r.length&&function(){var t={},e=[];for(var n in r.forEach((function(e){t[e.age]||(t[e.age]=[]),t[e.age].push(e)})),t)e.push({key:n,value:t[n].length});d(e)}()}),[r]),Object(a.useEffect)((function(){if(l)return f(),window.addEventListener("resize",f),function(){window.removeEventListener("resize",f)}}),[l]),Object(u.jsx)("div",{className:"age"})}var p=n(25);function m(t){var e,n=t.originData,r=Object(a.useState)(null),c=Object(o.a)(r,2),i=c[0],l=c[1];function d(){var t=Object(p.a)().attr("class","d3-tip"),n=function(){s.q(".major svg").remove(),s.r(".d3-tip").remove();var t={top:10,right:10,bottom:10,left:10},n=parseInt(s.q(".major").style("width")),a=n;return n-t.left-t.right,e=a-t.top-t.bottom,s.q(".major").append("svg").attr("width",n).attr("height",a).append("g").attr("class","main-group").attr("transform","translate(".concat(n/2,",").concat(a/2,")"))}(),a=s.h().value((function(t){return t.value})),r=s.k().domain(i.map((function(t){return t.key}))).range(s.m),c=s.a().innerRadius(0).outerRadius(e/2);t.html((function(t){return"<div>\n                <span>".concat(t.data.key,"</span>\n                <span>").concat(t.data.value,"\u4eba</span>\n              </div>")})),s.q("svg").call(t),n.selectAll("arc").data(a(i)).join("path").attr("d",c).attr("fill",(function(t){return r(t.data.key)})).on("mouseover",(function(e,n){t.show(n,this)})).on("mousemove",(function(e,n){var a=e.x-parseInt(t.style("width"))/2,r=e.y-(parseInt(t.style("height"))+18);t.style("position","fixed"),t.style("left","".concat(a,"px")),t.style("top","".concat(r,"px"))})).on("mouseout",t.hide)}return Object(a.useEffect)((function(){n.length&&function(){var t={},e=[];for(var a in n.forEach((function(e){t[e.major]||(t[e.major]=[]),t[e.major].push(e)})),t)e.push({key:a,value:t[a].length});e=e.filter((function(t){return t.value>1})).sort((function(t,e){return e.value-t.value})),l(e)}()}),[n]),Object(a.useEffect)((function(){if(i)return d(),window.addEventListener("resize",d),function(){window.removeEventListener("resize",d)}}),[i]),Object(u.jsx)("div",{children:Object(u.jsxs)(u.Fragment,{children:[Object(u.jsx)("p",{className:"chart_title text-center mb-0",children:"\u79d1\u7cfb\u5206\u5e03\uff08\u4eba\u6578 / \u79d1\u7cfb\uff09"}),Object(u.jsx)("p",{className:"chart_title text-center mb-0",children:"\u6709\u6ed1\u9f20 hover \u6548\u679c"}),Object(u.jsx)("div",{className:"major"})]})})}function v(t){var e,n,r=t.originData,c=Object(a.useState)(null),i=Object(o.a)(c,2),l=i[0],d=i[1];function f(){var t=function(){s.q(".tenure svg").remove();var t={top:30,right:10,bottom:30,left:40},a=parseInt(s.q(".tenure").style("width")),r=.9*a;return e=a-t.left-t.right,n=r-t.top-t.bottom,s.q(".tenure").append("svg").attr("width",a).attr("height",r).append("g").attr("class","main-group").attr("transform","translate(".concat(t.left,",").concat(t.top,")"))}(),a=Object(p.a)().attr("class","d3-tip");a.html((function(t){return'<div>\n                <p class="mb-1">\u5e74\u8cc7\uff1a'.concat(t.key,'</p>\n                <p class="mb-0">\u5e73\u5747\u5e74\u85aa\uff1a').concat(t.value.toFixed(1),"\u842c</p>\n              </div>")})),a.offset([-4,0]),s.q("svg").call(a);var r=s.l().domain(l.map((function(t){return t.key}))).rangeRound([0,e]).padding(.5),c=s.j().domain(s.d(l,(function(t){return t.value}))).range([n,0]).nice(),i=s.b(r),o=s.c(c);t.append("g").attr("class","x-axis").attr("transform","translate(0,".concat(n,")")).call(i),t.append("g").attr("class","y-axis").call(o);var u=s.f().x((function(t){return r(t.key)})).y((function(t){return c(t.value)}));t.append("path").attr("class","salary-path"),s.q(".salary-path").datum(l).attr("stroke","#FFC400").attr("stroke-width","12").attr("fill","none").transition().duration(2e3).attr("d",u).attr("stroke-linecap","round"),t.selectAll(".circle").data(l).join("circle").attr("cx",(function(t){return r(t.key)})).attr("cy",(function(t){return c(t.value)+1})).attr("r","4").attr("fill","#1FC1B8"),t.selectAll(".circle").data(l).join("circle").attr("cx",(function(t){return r(t.key)})).attr("cy",(function(t){return c(t.value)})).attr("r","20").attr("fill","transparent").on("mouseover",(function(t,e){a.show(e,this)})).on("mouseout",a.hide)}return Object(a.useEffect)((function(){r.length&&function(){var t=JSON.parse(JSON.stringify(r)).filter((function(t){return t.company.salary&&t.company.job_tenure})),e={},n=[];for(var a in t.forEach((function(t){var n=/(.+)~?(.+)\s/.exec(t.company.salary)[0].trim().split("~");n[1]?t.company.salary=(+n[0]+ +n[1])/2:t.company.salary=+n[0],e[t.company.job_tenure]||(e[t.company.job_tenure]=[]),e[t.company.job_tenure].push(t)})),e){var c=e[a].reduce((function(t,e){return t+e.company.salary}),0);n.push({key:a,value:c/e[a].length})}var i=n.sort((function(t,e){return t.key.split(" \u5e74")[0].split("~")[0]-e.key.split(" \u5e74")[0].split("~")[0]}));d(i)}()}),[r]),Object(a.useEffect)((function(){if(l)return f(),window.addEventListener("resize",f),function(){window.removeEventListener("resize",f)}}),[l]),Object(u.jsxs)(u.Fragment,{children:[Object(u.jsx)("p",{className:"chart_title text-center mb-0",children:"\u85aa\u8cc7\u5206\u4f48\uff08\u85aa\u8cc7 / \u5e74\u8cc7\uff09"}),Object(u.jsx)("p",{className:"chart_title text-center mb-0",children:"\u6709\u6ed1\u9f20 hover \u6548\u679c"}),Object(u.jsx)("div",{className:"tenure"}),";"]})}var h=n(8),j=(n(203),n(204),n.p+"static/media/NormalMap.5f9a6494.png");function g(){var t=Object(a.useRef)();return Object(a.useEffect)((function(){var e=new h.h,n=new h.e(75,16/9,.1,1e3);n.position.set(0,0,2),e.add(n);var a=new h.o({alpha:!0,antialias:!0});a.setPixelRatio(window.devicePixelRatio),a.setSize(t.current.offsetWidth,.5625*t.current.offsetWidth);var r=(new h.l).load(j,l);window.addEventListener("resize",(function(){a.setSize(t.current.offsetWidth,.5625*t.current.offsetWidth)}));var c=new h.f(16711680,1.6);c.position.set(-2.59,2.81,-1.5),e.add(c);var i=new h.f(20635,1.6);i.position.set(3.36,-2.75,-.97),e.add(i);var o=new h.i(.5,32,16),s=new h.d({metalness:.7,roughness:.2,normalMap:r});s.color.set(16777215);var u=new h.c(o,s);function l(){a.render(e,n)}e.add(u),t.current.appendChild(a.domElement),l(),window.addEventListener("scroll",(function(){u.position.z=3e-4*window.scrollY,u.position.z>=.6&&(u.position.z=.6)})),function t(){u.rotation.y+=.008,a.render(e,n),window.requestAnimationFrame(t)}()}),[]),Object(u.jsx)("div",{ref:t,className:"three-js position-fixed"})}function b(){var t=Object(a.useState)([]),e=Object(o.a)(t,2),n=e[0],r=e[1];return Object(a.useEffect)((function(){s.e("https://raw.githubusercontent.com/hexschool/2021-ui-frontend-job/master/frontend_data.json").then((function(t){return r(t)}))}),[]),Object(u.jsxs)("div",{className:"container",children:[Object(u.jsx)("div",{className:"row justify-content-center",children:Object(u.jsxs)("div",{className:"col-lg-12 position-relative",children:[Object(u.jsx)("div",{className:"wrap d-flex align-items-center justify-content-center",children:Object(u.jsx)("h1",{className:"",children:"\u524d\u7aef\u85aa\u8cc7\u5927\u8abf\u67e5"})}),Object(u.jsx)(g,{})]})}),Object(u.jsx)("div",{className:"row mb-4",children:Object(u.jsx)("div",{className:"col-lg-7 mx-auto",children:Object(u.jsx)(l,{originData:n})})}),Object(u.jsx)("div",{className:"row mb-4",children:Object(u.jsx)("div",{className:"col-lg-6 mx-auto",children:Object(u.jsx)(d,{originData:n})})}),Object(u.jsx)("div",{className:"row mb-4",children:Object(u.jsx)("div",{className:"col-lg-7 mx-auto",children:Object(u.jsx)(f,{originData:n})})}),Object(u.jsx)("div",{className:"row mb-4",children:Object(u.jsx)("div",{className:"col-lg-6 mx-auto",children:Object(u.jsx)(m,{originData:n})})}),Object(u.jsx)("div",{className:"row",children:Object(u.jsx)("div",{className:"col-lg-7 mx-auto",children:Object(u.jsx)(v,{originData:n})})})]})}n(205),n(206);i.a.render(Object(u.jsx)(r.a.StrictMode,{children:Object(u.jsx)(b,{})}),document.getElementById("root"))}},[[227,1,2]]]);
//# sourceMappingURL=main.a5f66c7b.chunk.js.map