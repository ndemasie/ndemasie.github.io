import{a as p,r as e}from"./index.1d48f179.js";var l,f,u=p;f=u.createRoot,l=u.hydrateRoot;const o=({value:t,name:r})=>t?e.createElement("astro-slot",{name:r,suppressHydrationWarning:!0,dangerouslySetInnerHTML:{__html:t}}):null;o.shouldComponentUpdate=()=>!1;function E(t){for(const r in t)if(r.startsWith("__reactContainer"))return r}const v=t=>(r,n,{default:a,...d},{client:y})=>{if(!t.hasAttribute("ssr"))return;for(const[c,m]of Object.entries(d))n[c]=e.createElement(o,{value:m,name:c});const s=e.createElement(r,n,a!=null?e.createElement(o,{value:a}):a),i=E(t);return i&&delete t[i],y==="only"?e.startTransition(()=>{f(t).render(s)}):e.startTransition(()=>{l(t,s)})};export{v as default};
