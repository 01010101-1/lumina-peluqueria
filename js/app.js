const CITAS=[
{h:"09:00",c:"María González",s:"Corte + brushing",p:"Valentina",e:"Confirmada"},
{h:"10:30",c:"Camila Rodríguez",s:"Coloración completa",p:"Sofía",e:"En curso"},
{h:"11:00",c:"Lucía Fernández",s:"Manicure semipermanente",p:"Elena",e:"Confirmada"},
{h:"12:30",c:"Ana Martínez",s:"Limpieza facial",p:"Martina",e:"Pendiente"},
{h:"15:00",c:"Carolina Silva",s:"Balayage",p:"Sofía",e:"Confirmada"}];
const PAGINAS=[["inicio.html","Inicio"],["agenda.html","Agenda"],["clientes.html","Clientes"],["servicios.html","Servicios"],["nueva-cita.html","Nueva cita"]];
const esc=t=>String(t).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const guardadas=()=>{try{return JSON.parse(localStorage.getItem("citas")||"[]")}catch(e){return[]}};
const todas=()=>CITAS.concat(guardadas()).sort((a,b)=>a.h.localeCompare(b.h));
function pintarCitas(id,limite){
  const ul=document.getElementById(id);if(!ul)return;
  ul.innerHTML=todas().slice(0,limite||99).map(c=>`<li class="cita"><b class="hora">${esc(c.h)}</b><div><strong>${esc(c.c)}</strong><span>${esc(c.s)}</span></div><span class="prof">${esc(c.p)}</span><span class="tag ${esc(c.e).toLowerCase().replace(" ","")}">${esc(c.e)}</span></li>`).join("");
}
function aviso(txt){
  const t=document.createElement("div");t.className="toast";t.setAttribute("role","status");t.textContent=txt;
  document.body.appendChild(t);setTimeout(()=>t.remove(),2500);
}
const menu=document.getElementById("menu");
if(menu){
  const actual=location.pathname.split("/").pop()||"inicio.html";
  menu.innerHTML=`<div class="marca">Lúmina</div>`+PAGINAS.map(([u,n])=>`<a href="${u}"${u===actual?' aria-current="page"':""}>${n}</a>`).join("")+`<div class="usuario">Laura Méndez<span>Administradora</span><a href="index.html">Cerrar sesión</a></div>`;
  const b=document.createElement("button");b.className="burger";b.textContent="Menú";b.setAttribute("aria-label","Abrir menú");
  b.onclick=()=>menu.classList.toggle("abierto");document.body.appendChild(b);
}
pintarCitas("lista-inicio",5);pintarCitas("lista-agenda");
const n=document.getElementById("n-citas");if(n)n.textContent=todas().length;
const buscar=document.getElementById("buscar");
if(buscar)buscar.oninput=()=>document.querySelectorAll("tbody tr").forEach(f=>f.hidden=!f.textContent.toLowerCase().includes(buscar.value.toLowerCase()));
const formCita=document.getElementById("form-cita");
if(formCita){
  formCita.fecha.min=new Date().toISOString().slice(0,10);
  formCita.onsubmit=e=>{
    e.preventDefault();
    const f=formCita,err=document.getElementById("error");
    if(!f.cliente.value.trim()||!f.servicio.value||!f.profesional.value||!f.fecha.value||!f.hora.value){err.textContent="Completa todos los campos obligatorios.";return}
    err.textContent="";
    const l=guardadas();l.push({h:f.hora.value,c:f.cliente.value.trim(),s:f.servicio.value,p:f.profesional.value,e:"Pendiente"});
    localStorage.setItem("citas",JSON.stringify(l));
    aviso("Cita guardada");setTimeout(()=>location.href="agenda.html",1200);
  };
}
const login=document.getElementById("form-login");
if(login)login.onsubmit=e=>{e.preventDefault();location.href="inicio.html"};
