import"./assets/modulepreload-polyfill-3cfb730f.js";/* empty css                      */import{i as o}from"./assets/vendor-77e16229.js";const t=document.querySelector(".form");t.addEventListener("submit",l);function l(s){s.preventDefault();const r=Number(t.elements.delay.value),i=t.elements.state.value;((e,m)=>new Promise((n,a)=>{setTimeout(()=>{m==="fulfilled"?n(e):a(e)},e)}))(r,i).then(e=>{o.success({message:`✅ Fulfilled promise in ${e}ms`,messageColor:"#fff",position:"topRight",backgroundColor:"#59a10d",theme:"dark"})}).catch(e=>{o.error({message:`❌ Rejected promise in ${e}ms`,messageColor:"#fff",position:"topRight",backgroundColor:"#ef4040",theme:"dark"})}),t.reset()}
//# sourceMappingURL=commonHelpers2.js.map
