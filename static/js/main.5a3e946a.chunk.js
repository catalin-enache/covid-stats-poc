(this["webpackJsonpcovid-stats-poc"]=this["webpackJsonpcovid-stats-poc"]||[]).push([[0],{187:function(e,t,a){e.exports=a(378)},197:function(e,t,a){},376:function(e,t,a){},377:function(e,t,a){},378:function(e,t,a){"use strict";a.r(t);var n={};a.r(n),a.d(n,"COVID_DATA_REQUEST",(function(){return w})),a.d(n,"COVID_DATA_SUCCESS",(function(){return C})),a.d(n,"COVID_DATA_FAILURE",(function(){return I})),a.d(n,"SET_SELECTED_STATE",(function(){return L})),a.d(n,"SET_SELECTED_INTERVAL",(function(){return g})),a.d(n,"SET_DRILL_DOWN_DATA",(function(){return Y})),a.d(n,"fetchCovidData",(function(){return k})),a.d(n,"setSelectedState",(function(){return x})),a.d(n,"setSelectedInterval",(function(){return B})),a.d(n,"setDrillDownData",(function(){return R}));var r=a(1),c=a.n(r),l=a(14),u=a.n(l),s=a(63),o=a(15),i=a(146),d=a(159),v=a(24),f=a.n(v),E=a(28),h=a(158),b=f.a.mark(S),m=f.a.mark(D),p=function(e){var t=e.processAs,a=e.fetchArgs;return function(){return fetch.apply(void 0,Object(h.a)(a)).then((function(e){if(200!==e.status)throw new Error("".concat(e.status,": ").concat(e.statusText));return e[t]()})).then((function(e){return{data:e}})).catch((function(e){return{err:e}}))}};function S(e){var t,a,n,r,c,l,u,s;return f.a.wrap((function(o){for(;;)switch(o.prev=o.next){case 0:return t=e.type,a=e.payload,n=a.processAs,r=a.fetchArgs,c=t.replace("_REQUEST",""),o.prev=2,o.next=5,Object(E.b)(p({processAs:n,fetchArgs:r}));case 5:if(l=o.sent,u=l.data,!(s=l.err)){o.next=10;break}throw s;case 10:return o.next=12,Object(E.c)({type:"".concat(c,"_SUCCESS"),payload:u});case 12:o.next=18;break;case 14:return o.prev=14,o.t0=o.catch(2),o.next=18,Object(E.c)({type:"".concat(c,"_FAILURE"),payload:o.t0});case 18:case"end":return o.stop()}}),b,null,[[2,14]])}function D(){return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(E.d)((function(e){return e.type.endsWith("_REQUEST")}),S);case 2:case"end":return e.stop()}}),m)}var O=D,A=f.a.mark(_);function _(){return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(E.a)([O()]);case 2:case"end":return e.stop()}}),A)}var j,T=a(13),y=a(64),N=a(10),w="COVID_DATA_REQUEST",C="COVID_DATA_SUCCESS",I="COVID_DATA_FAILURE",L="SET_SELECTED_STATE",g="SET_SELECTED_INTERVAL",Y="SET_DRILL_DOWN_DATA",k=function(){return function(e){e({type:w,payload:{processAs:"text",fetchArgs:["https://raw.githubusercontent.com/catalin-enache/covid-stats-poc/master/public/covid_data.csv"]}})}},x=function(e){return function(t){t({type:L,payload:e})}},B=function(e){return function(t){t({type:g,payload:e})}},R=function(e){return function(t){t({type:Y,payload:e})}},M={BY_DAYS:"By Days",BY_MONTHS:"By Months",LAST_SEVEN_DAYS:"Last Seven Days",LAST_MONTH:"Last Month"},U=function(e,t){return t.reduce((function(t,a){var n=a.date,r=a.cases,c=a.deaths,l=e===M.BY_MONTHS?n.slice(0,7):n;return t[l]={cases:((t[l]||{}).cases||0)+r,deaths:((t[l]||{}).deaths||0)+c},t}),{})},V=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},a=t.key,n=void 0===a?"interval":a;return Object.keys(e).map((function(t){return Object(N.a)(Object(T.a)({},n,t),e[t])}))},H={covidData:null,states:null,errorRequest:null,selectedState:{value:"All",label:"All"},defaultSelectedState:{value:"All",label:"All"},selectedInterval:{value:M.BY_MONTHS,label:M.BY_MONTHS},drillDownData:null},W=(j={},Object(T.a)(j,w,(function(e,t){return Object(N.a)(Object(N.a)({},t),{},{covidData:null,states:null,errorRequest:null})})),Object(T.a)(j,C,(function(e,t){var a=function(e){var t={},a=new Set;return[e.split("\n").slice(1).map((function(e){var n=e.split(","),r=Object(y.a)(n,5),c=r[0],l=r[1],u=(r[2],r[3]),s=r[4];a.add(l);var o=u-((t[l]||{}).cases||0),i=s-((t[l]||{}).deaths||0);return t[l]={cases:u,deaths:s},{date:c,state:l,cases:o<0?0:o,deaths:i<0?0:i}})),Array.from(a).sort((function(e,t){return e<t?-1:e>t?1:0}))]}(e.payload),n=Object(y.a)(a,2),r=n[0],c=n[1];return Object(N.a)(Object(N.a)({},t),{},{covidData:r,states:c})})),Object(T.a)(j,I,(function(e,t){var a=e.payload;return Object(N.a)(Object(N.a)({},t),{},{errorRequest:a})})),Object(T.a)(j,L,(function(e,t){var a=e.payload;return Object(N.a)(Object(N.a)({},t),{},{selectedState:a,drillDownData:null})})),Object(T.a)(j,g,(function(e,t){var a=e.payload;return Object(N.a)(Object(N.a)({},t),{},{selectedInterval:a,drillDownData:null})})),Object(T.a)(j,Y,(function(e,t){var a,n,r=e.payload;return r?Object(N.a)(Object(N.a)({},t),{},{drillDownData:(a=t.covidData,n=r,10===n.length?a.filter((function(e){return e.date===n})):V(a.filter((function(e){return e.date.startsWith(n)})).reduce((function(e,t){var a=t.date,n=t.state,r=t.cases,c=t.deaths;return e[n]={cases:((e[n]||{}).cases||0)+r,deaths:((e[n]||{}).deaths||0)+c,date:a.slice(0,7)},e}),{}),{key:"state"}).sort((function(e,t){return e.state<t.state?-1:e.state>t.state?1:0})))}):Object(N.a)(Object(N.a)({},t),{},{drillDownData:null})})),j),Q=Object(o.c)({covidChart:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:H,t=arguments.length>1?arguments[1]:void 0;return W[t.type]?W[t.type](t,e):e}}),q=Object(d.a)(),F=Object(o.e)(Q,Object(o.a)(i.a,q));q.run(_);a(197);var K=a(17),J=a(157),z=(a(376),function(e,t,a,n){var r=(n?[n]:[]).concat(e.map((function(e){return{value:e,label:e}})));return c.a.createElement(J.a,{value:a,options:r,onChange:t})}),G=Object(s.b)((function(e){return e.covidChart}),(function(e){return Object(o.b)(n,e)}))((function(e){var t=e.fetchCovidData,a=e.covidData,n=e.states,l=e.setSelectedState,u=e.selectedState,s=e.defaultSelectedState,o=e.setSelectedInterval,i=e.selectedInterval,d=e.drillDownData,v=e.setDrillDownData;Object(r.useEffect)(t,[]);var f=Object(r.useCallback)((function(e){v(e&&e.activeLabel)}),[]);if(!a)return"Loading ...";var E=function(e,t){return c.a.createElement(K.e,null,c.a.createElement(K.b,{onClick:t,data:e,margin:{top:20,right:30,left:20,bottom:5}},c.a.createElement(K.c,{strokeDasharray:"3 3"}),c.a.createElement(K.g,{dataKey:"interval"}),c.a.createElement(K.h,null),c.a.createElement(K.f,null),c.a.createElement(K.d,null),c.a.createElement(K.a,{dataKey:"deaths",stackId:"a",fill:"indianred"}),c.a.createElement(K.a,{dataKey:"cases",stackId:"a",fill:"orange"})))}(function(e,t,a){var n,r,c="All"===a?e:(r=e,r.reduce((function(e,t){var a=t.state;return e[a]?e[a].push(t):e[a]=[t],e}),{}))[a]||[];return(n={},Object(T.a)(n,M.BY_DAYS,(function(){return V(U(M.BY_DAYS,c))})),Object(T.a)(n,M.BY_MONTHS,(function(){return V(U(M.BY_MONTHS,c))})),Object(T.a)(n,M.LAST_SEVEN_DAYS,(function(){return V(U(M.BY_DAYS,c)).slice(-7)})),Object(T.a)(n,M.LAST_MONTH,(function(){var e=V(U(M.BY_DAYS,c)),t=e.slice(-1)[0].interval.slice(0,7);return e.filter((function(e){return e.interval.startsWith(t)}))})),n)[t]()}(e.covidData,i.value,u.value),f),h=z(n,l,u,s),b=z(Object.values(M),o,i),m=d?function(e){return c.a.createElement("table",{className:"covid-chart-table"},c.a.createElement("tbody",null,c.a.createElement("tr",{className:"covid-chart-table-head-row"},c.a.createElement("th",null,"State"),c.a.createElement("th",null,"Date"),c.a.createElement("th",{className:"covid-chart-table-numeric-cell"},"Cases"),c.a.createElement("th",{className:"covid-chart-table-numeric-cell"},"Deaths")),e.map((function(e,t){return c.a.createElement("tr",{key:t,className:"covid-chart-table-body-row"},c.a.createElement("td",null,e.state),c.a.createElement("td",null,e.date),c.a.createElement("td",{className:"covid-chart-table-numeric-cell"},e.cases),c.a.createElement("td",{className:"covid-chart-table-numeric-cell"},e.deaths))}))))}(d):null;return c.a.createElement("div",{className:"covid-chart"},c.a.createElement("div",{className:"covid-chart-menu clearfix"},c.a.createElement("div",{className:"covid-chart-title"},"Covid Chart: ",u.label," - ",i.value),c.a.createElement("div",{className:"covid-chart-menu-right"},c.a.createElement("div",{className:"covid-chart-dropdown"},h),c.a.createElement("div",{className:"covid-chart-dropdown"},b))),c.a.createElement("div",{className:"covid-chart-graph"},E),m&&c.a.createElement("div",{className:"covid-chart-drill-down"},m))}));a(377);var P=function(){return c.a.createElement("div",{className:"app"},c.a.createElement(G,null))};u.a.render(c.a.createElement(c.a.StrictMode,null,c.a.createElement(s.a,{store:F},c.a.createElement(P,null))),document.getElementById("root"))}},[[187,1,2]]]);
//# sourceMappingURL=main.5a3e946a.chunk.js.map