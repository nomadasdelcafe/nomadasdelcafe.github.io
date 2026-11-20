/* ==========================================================
   Nómadas del Café · lógica compartida por todas las opciones
   (datos del menú, sedes, galerías, pedido por WhatsApp y chat)
   ========================================================== */
const WHATSAPP = "573142211270";
const TEL = "+573142211270";
const TEL_TXT = "314 221 1270";
const wa = t => `https://api.whatsapp.com/send?phone=${WHATSAPP}&text=${encodeURIComponent(t)}`;
const R = window.RUTA || "";
const I = n => `${R}img/f${String(n).padStart(3, "0")}.jpg`;

/* ===== SEDES ===== */
const SEDES = [
  {
    id: "cra8",
    nombre: "Sede Calle del Tiempo Detenido",
    corto: "Sede Cra. 8",
    dir: "Cra. 8 # 6-52, Calle del Tiempo Detenido",
    ref: "En una casa de balcones de colores, a dos cuadras del parque principal",
    horario: [["Lun · Mar · Mié · Vie · Sáb · Dom", "7:30 a. m. – 5:00 p. m."]],
    nota: "Según la afluencia, podemos extendernos hasta las 6:00 p. m.",
    maps: "https://www.google.com/maps/search/?api=1&query=Restaurante%20N%C3%B3madas%20del%20caf%C3%A9%20Filandia&query_place_id=ChIJc5QhyiWJOI4RT6lwettsmSE",
    embed: "https://maps.google.com/maps?q=4.6764889,-75.6590839&hl=es&z=17&output=embed",
    ideal: "Desayunos, almuerzos típicos y café de origen"
  },
  {
    id: "cra6",
    nombre: "Sede Parque Principal",
    corto: "Sede Giraldo Plaza",
    dir: "Cra. 6 # 6-18, C. C. Giraldo Plaza, local 8",
    ref: "Frente al parque principal · al fondo a la derecha",
    horario: [
      ["Dom · Lun · Mar · Mié", "12:00 m. – 9:00 p. m."],
      ["Vie · Sáb", "12:00 m. – 9:30 p. m."],
      ["Domingo antes de festivo", "12:00 m. – 9:30 p. m."]
    ],
    nota: "Según la afluencia, podemos extendernos un poquito más.",
    maps: "https://www.google.com/maps/search/?api=1&query=Centro%20Comercial%20Giraldo%20Plaza%20Filandia%20Quind%C3%ADo",
    embed: "https://maps.google.com/maps?q=Centro%20Comercial%20Giraldo%20Plaza%20Filandia%20Quindio&hl=es&z=17&output=embed",
    ideal: "Almuerzos, menú de noche, cócteles y celebraciones"
  }
];
const CERRADO = "Jueves cerrado por descanso (ambas sedes)";

/* ===== PRODUCTOS (edita nombres, fotos y precios aquí) =====
   Sin foto todavía → usa "ic" (emoji). Cuando llegue la foto, cambia ic por img:I(número) o img:"img/nombre.jpg" */
const productos = [
  {id:200, cat:"☀️ Platos fuertes", n:"Sobrebarriga Criolla", d:"Sobrebarriga pitada con cerveza, Coca-Cola, pimentón, cebolla, tomate y puerro; arroz, tajada de plátano, ensalada y aguacate.", ic:"🥩", tag:"Favorita"},
  {id:201, cat:"☀️ Platos fuertes", n:"Costilla Montañera", d:"Costilla de cerdo horneada con vino tinto y cerveza, romero y hogao; arroz, tajada, ensalada y aguacate.", img:I(91)},
  {id:202, cat:"☀️ Platos fuertes", n:"Sopa Especial del Día", d:"Sancocho, ajiaco o mondongo con arroz, ensalada, banano y aguacate.", img:I(93)},
  {id:203, cat:"☀️ Platos fuertes", n:"Cazuela de Fríjoles", d:"Fríjoles con plátano en cuadritos y chicharrón; con arroz, aguacate, tajada y ensalada.", img:I(47)},
  {id:204, cat:"☀️ Platos fuertes", n:"Bandeja Paisa de la Casa", d:"Nuestra receta mejorada: fríjoles, arroz, carne desmechada, chicharrón, tajada, chorizo, aguacate, arepa y huevo.", ic:"🍛", tag:"🏆 Reconocida en la región"},
  {id:205, cat:"☀️ Platos fuertes", n:"Asado de Pollo, Cerdo o Res", d:"A la plancha 200 g, con papas fritas y ensalada.", ic:"🍗"},
  {id:206, cat:"☀️ Platos fuertes", n:"Filete Mar y Tierra", d:"Pechuga a la plancha 250 g con champiñones, camarones y queso mozzarella; aguacate y papas fritas.", img:I(97), tag:"Especial"},
  {id:207, cat:"☀️ Platos fuertes", n:"Filete de Pollo Apanado", d:"Pechuga apanada 250 g, ensalada, arroz y papas fritas.", img:I(27)},
  {id:208, cat:"☀️ Platos fuertes", n:"Chuleta Valluna", d:"Cerdo apanado 300 g, arroz, ensalada, aguacate y papas fritas.", img:I(45)},
  {id:209, cat:"☀️ Platos fuertes", n:"Sancocho de Gallina Criolla", d:"Con presa de gallina, arroz, banano y aguacate.", img:I(100), tag:"Solo domingos"},
  {id:210, cat:"☀️ Platos fuertes", n:"Menú Vegetariano", d:"Crema del día, vegetales salteados, aguacate, arroz, ensalada, huevo, tajada y limonada del día.", ic:"🥗", tag:"Vegetariano"},
  {id:211, cat:"☀️ Platos fuertes", n:"Menú Infantil", d:"Nuggets, papas a la francesa y jugo natural.", ic:"🍟", tag:"Niños"},
  {id:212, cat:"☀️ Truchas", n:"Trucha a la Plancha", d:"Trucha de 200 g con arroz, ensalada, aguacate y patacón.", img:I(101), tag:"Típico del Quindío"},
  {id:213, cat:"☀️ Truchas", n:"Trucha con Champiñones", d:"Trucha de 200 g con champiñones cremosos, arroz, ensalada, aguacate y patacón.", ic:"🍄"},
  {id:214, cat:"☀️ Truchas", n:"Trucha al Ajillo", d:"Trucha de 200 g al ajillo cremoso, arroz, ensalada, aguacate y patacón.", img:I(63)},
  {id:215, cat:"☀️ Truchas", n:"Trucha con Camarones", d:"Trucha de 200 g con camarones en salsa roja con leche de coco, arroz, ensalada, aguacate y patacón.", ic:"🦐"},
  {id:216, cat:"☀️ Truchas", n:"Trucha Gratinada", d:"Trucha de 200 g con leche, romero y queso mozzarella; arroz, ensalada, aguacate y patacón.", img:I(38)},
  {id:217, cat:"☀️ Truchas", n:"Trucha Tierra y Mar", d:"Trucha de 200 g con champiñones, camarones y queso mozzarella; arroz, ensalada, aguacate y patacón.", ic:"🐟", tag:"Especial"},
  {id:218, cat:"Adicionales", n:"Sopa (adicional)", d:"Porción adicional de sopa.", ic:"🥣"},
  {id:219, cat:"Adicionales", n:"Papas Fritas (adicional)", d:"Porción adicional.", ic:"🍟"},
  {id:220, cat:"Adicionales", n:"Arroz (adicional)", d:"Porción adicional.", ic:"🍚"},
  {id:221, cat:"Adicionales", n:"Chicharrón (adicional)", d:"Porción adicional.", ic:"🥓"},
  {id:222, cat:"Adicionales", n:"Patacón (adicional)", d:"Porción adicional.", ic:"🍌"},
  {id:223, cat:"Adicionales", n:"Aguacate (adicional)", d:"Porción adicional.", ic:"🥑"},
  {id:100, cat:"🌙 Callanazo", n:"Callanazo Pico de Gallo", d:"Plátano maduro en crema de leche con guacamole y pico de gallo.", img:I(104), tag:"Menú de noche"},
  {id:101, cat:"🌙 Callanazo", n:"Callanazo Desmechado de Res", d:"Plátano maduro en crema de leche con carne desmechada, guacamole y pico de gallo.", img:I(105), tag:"Menú de noche"},
  {id:102, cat:"🌙 Callanazo", n:"Callanazo Desmechado de Pollo", d:"Plátano maduro en crema de leche con pollo, guacamole y pico de gallo.", img:I(43), tag:"Menú de noche"},
  {id:103, cat:"🌙 Callanazo", n:"Callanazo Ranchero", d:"Plátano maduro en crema de leche con chorizo, maíz, guacamole y pico de gallo.", img:I(107), tag:"Menú de noche"},
  {id:104, cat:"🌙 Callanazo", n:"Callanazo Napolitano", d:"Plátano maduro en crema de leche, tomates salteados y queso mozzarella.", img:I(58), tag:"Menú de noche"},
  {id:105, cat:"🌙 Tacos", n:"Tacos de Res a la Plancha", d:"Tortilla con queso y res a la plancha, pico de gallo y guacamole.", img:I(109), tag:"Menú de noche"},
  {id:106, cat:"🌙 Tacos", n:"Tacos de Pollo a la Plancha", d:"Tortilla con queso y pollo a la plancha, pico de gallo y guacamole.", img:I(60), tag:"Menú de noche"},
  {id:107, cat:"🌙 Tacos", n:"Tacos Tipo Birria", d:"Tortilla con queso, res desmechada y caldo, pico de gallo y guacamole.", img:I(53), tag:"⭐ Los más comentados"},
  {id:108, cat:"🌙 Tacos", n:"Tacos a la Cerdita", d:"Tortilla con queso, cerdo desmechado y caldo, pico de gallo y guacamole.", img:I(112), tag:"Menú de noche"},
  {id:109, cat:"🌙 Tacos", n:"Burrito con Todo", d:"Res, pollo, fríjoles, pico de gallo, guacamole, queso y salsas.", ic:"🌯", tag:"Menú de noche"},
  {id:110, cat:"🌙 Tacos", n:"Nachos", d:"Nachos con queso y toppings.", img:I(42), tag:"Menú de noche"},
  {id:111, cat:"🌙 Arepas rellenas", n:"Arepa Todo Todito", d:"Pollo, res a la plancha, chorizo, hogao, queso y salsa de la casa.", ic:"🫓", tag:"Menú de noche"},
  {id:112, cat:"🌙 Arepas rellenas", n:"Arepa Tradicional", d:"Jamón, queso y mantequilla.", img:I(114), tag:"Menú de noche"},
  {id:113, cat:"🌙 Arepas rellenas", n:"Arepa Quesudita", d:"Mozzarella y mantequilla.", ic:"🧀", tag:"Menú de noche"},
  {id:114, cat:"🌙 Arepas rellenas", n:"Arepa Colombia", d:"Carne desmechada, pico de gallo, platanito maduro y aguacate.", ic:"🇨🇴", tag:"Menú de noche"},
  {id:115, cat:"🌙 Arepas rellenas", n:"Arepa Mexicano", d:"Carne molida, pico de gallo picante, queso y guacamole.", ic:"🌶️", tag:"Menú de noche"},
  {id:116, cat:"🌙 Arepas rellenas", n:"Arepa Soledad", d:"Solo pollo o solo carne, con queso y salsa de la casa.", ic:"🫓", tag:"Menú de noche"},
  {id:117, cat:"🌙 Típicos", n:"Chorizo con Arepa", d:"Chorizo asado acompañado de arepa.", img:I(115), tag:"Menú de noche"},
  {id:118, cat:"🌙 Típicos", n:"Pincho de Pollo, Res o Cerdo", d:"Elige tu pincho: pollo, res o cerdo.", ic:"🍢", tag:"Menú de noche"},
  {id:119, cat:"🌙 Típicos", n:"Carne con Arepa", d:"Carne asada acompañada de arepa.", ic:"🥩", tag:"Menú de noche"},
  {id:120, cat:"🌙 Típicos", n:"Patacón con Todo", d:"Patacón con papa ripio, hogao, guacamole y crema.", img:I(116), tag:"Menú de noche"},
  {id:121, cat:"🌙 Típicos", n:"Empanaditas x6", d:"Seis empanaditas crocantes con ají.", img:I(40), tag:"Menú de noche"},
  {id:38, cat:"Desayunos", n:"Desayuno Típico", d:"Huevos pericos, arepa con quesito, tostadas con mermelada y chocolate caliente.", img:I(118), tag:"Desayuno"},
  {id:40, cat:"Para compartir", n:"Hamburguesa Nómada", d:"Pan artesanal, carne, tocineta, queso, lechuga y tomate.", img:I(119)},
  {id:30, cat:"Para compartir", n:"Salchipapa", d:"Papas, salchicha, queso y salsas.", img:I(128)},
  {id:300, cat:"Postres", n:"Torta Tres Leches", d:"Bizcocho húmedo en tres leches con crema chantilly, chocolate y cereza.", img:I(120), tag:"Casero"},
  {id:301, cat:"Postres", n:"Tartaleta de Frutas", d:"Masa crocante con crema pastelera y frutas frescas de temporada.", img:I(121)},
  {id:302, cat:"Postres", n:"Copa de Frutos Rojos", d:"Postre cremoso con salsa de frutos rojos, ciruela, kiwi y mango.", img:I(122)},
  {id:303, cat:"Postres", n:"Pudín de Pan con Bocadillo", d:"Torta de pan casera con bocadillo de guayaba y canela.", img:I(123), tag:"Tradicional"},
  {id:304, cat:"Postres", n:"Ponqué Marmoleado", d:"Ponqué casero de vainilla y chocolate con salsa de chocolate.", img:I(124)},
  {id:305, cat:"Postres", n:"Torta Casera de Nueces", d:"Torta horneada con nueces y salsa de chocolate.", img:I(125)},
  {id:41, cat:"Postres", n:"Ensalada de Frutas", d:"Frutas frescas de temporada en copa.", img:I(126)},
  {id:36, cat:"Postres", n:"Brevas con Queso", d:"Dulce de brevas casero con queso fresco.", img:I(127), tag:"Tradicional"},
  {id:12, cat:"Café", n:"Tinto de Origen", d:"Café del Quindío recién preparado.", ic:"☕"},
  {id:13, cat:"Café", n:"Capuchino", d:"Espresso con leche espumada.", ic:"☕"},
  {id:14, cat:"Café", n:"Café Filtrado de Especialidad", d:"Método V60 o prensa, notas a panela y frutos.", ic:"🫖"},
  {id:22, cat:"Café", n:"Café Frío de la Casa", d:"Café helado con espuma cremosa.", img:I(21)},
  {id:33, cat:"Café", n:"Aromática / Agua de Panela", d:"Bebida caliente tradicional, servida en pocillo.", img:I(129)},
  {id:9, cat:"Bebidas", n:"Limonada de Coco", d:"Cremosa y refrescante.", img:I(130)},
  {id:10, cat:"Bebidas", n:"Jugo Natural", d:"En agua o en leche: mora, lulo, maracuyá, mango.", ic:"🧃"},
  {id:11, cat:"Bebidas", n:"Limonada Natural", d:"Clásica o de hierbabuena.", ic:"🍋"},
  {id:15, cat:"Cócteles", n:"Cóctel de la Casa", d:"Frutos rojos, hierbabuena y licor.", img:I(16), tag:"2x1"},
  {id:16, cat:"Cócteles", n:"Mojito", d:"Ron, limón, hierbabuena y soda.", img:I(50), tag:"2x1"},
  {id:17, cat:"Cócteles", n:"Margarita", d:"Tequila, limón y triple sec.", img:I(62), tag:"2x1"},
  {id:18, cat:"Cócteles", n:"Piña Colada", d:"Ron, piña y crema de coco.", img:I(25), tag:"2x1"},
];

/* ===== GALERÍAS (solo fotos propias del negocio) ===== */
const GALERIA = [
  [17,"Mesa con platos de la casa"],[61,"Cazuela con carne desmechada"],[50,"Cócteles de la casa"],[20,"Salón con barandas de colores"],
  [24,"Plato típico con patacón"],[21,"Café frío con granos de café"],[33,"Carne con patacón"],[62,"Cócteles con romero"],
  [42,"Nachos con queso"],[30,"Carne asada con arroz"],[49,"Desayunos con chocolate"],[63,"Pescado del chef"],
  [44,"Gratinado con guacamole"],[55,"Bebida cremosa con naranja"],[56,"Pollo asado con ensalada"],[28,"Salón lleno de clientes"],
  [64,"Torta tres leches"],[65,"Pudín de pan con bocadillo"],[19,"Almuerzo completo"],[31,"Carne desmechada con patacón"]
];
const RINCONES = [
  [66,"Nuestra marca"],[67,"Colores de Filandia"],[68,"Siempre en buena compañía"],[69,"Puertas típicas del Quindío"],
  [70,"Nuestra luna nómada"],[71,"El rincón musical"],[72,"Para compartir"],[75,"Noches de luces"],
  [77,"Rincón verde"],[78,"Café de nuestras montañas"],[79,"Aquí se ven los partidos ⚽"],[80,"Nuestra barra"],[81,"Bienvenidos"],[14,"Mejores momentos"]
];
const CLIENTES = [
  [82,"Celebraciones en familia"],[83,"¡Nómadas de corazón!"],[84,"Almuerzos entre amigas"],[85,"Planes en pareja"],
  [86,"Recuerdos de Filandia"],[87,"Servicio con cariño"],[88,"Nuestro rincón de fotos"],[89,"Bienvenidos a la casa"]
];
const REELS = [
  ["video6.mp4",8,"☕ Descubre Nómadas",1],["video3.mp4",9,"🎂 Celebraciones",1],["video4.mp4",10,"🧀 Cazuela gratinada"],
  ["video.mp4",11,"🏡 Casa llena"],["video5.mp4",12,"🥩 Carne en salsa"],["video2.mp4",13,"✨ Nuestro salón"]
];

/* ===== utilidades ===== */
const $ = id => document.getElementById(id);
const esc = s => String(s).replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const WA_SVG = '<svg width="20" height="20" viewBox="0 0 32 32" fill="currentColor" aria-hidden="true"><path d="M16 3C9 3 3.3 8.6 3.3 15.6c0 2.4.7 4.8 2 6.8L3 29l6.8-2.2c2 1.1 4.2 1.6 6.3 1.6 7 0 12.7-5.6 12.7-12.6S23 3 16 3zm0 23c-2 0-3.9-.5-5.6-1.6l-.4-.2-4 1.3 1.3-3.9-.3-.4c-1.2-1.8-1.8-3.8-1.8-5.9C5.2 9.8 10 5.1 16 5.1s10.8 4.7 10.8 10.5S22 26 16 26zm6-7.8c-.3-.2-1.9-1-2.2-1-.3-.1-.5-.2-.7.2l-1 1.2c-.2.2-.4.2-.7.1-.3-.2-1.4-.5-2.6-1.6-1-.9-1.6-1.9-1.8-2.2-.2-.3 0-.5.1-.7l.5-.6.3-.5c.1-.2 0-.4 0-.6l-1-2.4c-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.2 1.1-1.2 2.8s1.2 3.2 1.4 3.5c.2.2 2.4 3.6 5.7 5 .8.3 1.4.5 1.9.7.8.3 1.5.2 2.1.1.6-.1 1.9-.8 2.2-1.5.3-.7.3-1.4.2-1.5-.1-.2-.3-.3-.6-.4z"/></svg>';

/* ===== render de secciones (solo si el contenedor existe) ===== */
function renderSedes(){
  const el = $("sedes"); if (!el) return;
  el.innerHTML = SEDES.map((s,i) => `
    <article class="sede">
      <span class="sede-num">Sede ${i+1}</span>
      <h3>${s.nombre}</h3>
      <p class="sede-dir">📍 ${s.dir}<br><small>${s.ref} · Filandia, Quindío</small></p>
      <ul class="sede-hor">${s.horario.map(h=>`<li><span>${h[0]}</span><b>${h[1]}</b></li>`).join("")}
        <li class="cerrado"><span>Jueves</span><b>Cerrado por descanso</b></li></ul>
      <p class="sede-nota">${s.nota}</p>
      <div class="sede-btns">
        <a class="btn btn-wa" target="_blank" rel="noopener" href="${wa("Hola Nómadas del Café 👋 Quiero reservar en la " + s.nombre + ".")}">${WA_SVG} Reservar</a>
        <a class="btn btn-linea" target="_blank" rel="noopener" href="${s.maps}">🗺️ Cómo llegar</a>
      </div>
      ${document.body.dataset.mapas !== "no" ? `<iframe class="sede-mapa" src="${s.embed}" loading="lazy" referrerpolicy="no-referrer-when-downgrade" title="Mapa ${esc(s.nombre)}"></iframe>` : ""}
    </article>`).join("");
}
function renderFotos(id, lista, conCaption){
  const el = $(id); if (!el) return;
  el.innerHTML = lista.map(([n,t]) => conCaption
    ? `<figure><img src="${I(n)}" alt="${esc(t)}" loading="lazy"><figcaption>${t}</figcaption></figure>`
    : `<img src="${I(n)}" alt="${esc(t)}" loading="lazy">`).join("");
}
function renderReels(){
  const el = $("reels"); if (!el) return;
  el.innerHTML = REELS.map(([v,p,t,dest]) => `
    <div class="marco${dest?" destacado":""}">
      <video src="${R}video/${v}" poster="${I(p)}" autoplay muted loop playsinline preload="metadata"></video>
      <span class="etq">${t}</span>
      <button class="sonido" onclick="toggleSonido(this)">🔇 Sonido</button>
    </div>`).join("");
}
function toggleSonido(b){
  const v = b.parentElement.querySelector("video");
  v.muted = !v.muted; if (!v.muted) v.play().catch(()=>{});
  b.textContent = v.muted ? "🔇 Sonido" : "🔊 Silenciar";
}

/* ===== MENÚ + PEDIDO ===== */
const carrito = {};
let filtroActual = window.FILTRO_INICIAL || "Todos";
function filtrar(c){
  filtroActual = c;
  document.querySelectorAll(".filtro").forEach(b => b.classList.toggle("on", b.dataset.c === c));
  pintarProductos();
}
function pintarProductos(){
  const el = $("productos"); if (!el) return;
  const lista = productos.filter(p => filtroActual === "Todos" || p.cat === filtroActual);
  el.innerHTML = lista.map(p => {
    const q = carrito[p.id] || 0;
    const foto = p.img ? `<img src="${p.img}" alt="${esc(p.n)}" loading="lazy">` : `<div class="icono" aria-hidden="true">${p.ic}</div>`;
    const ctrl = q ? `<div class="cant"><button onclick="cambiar(${p.id},-1)" aria-label="Quitar">−</button><span>${q}</span><button onclick="cambiar(${p.id},1)" aria-label="Agregar otro">+</button></div>`
                   : `<button class="agregar" onclick="cambiar(${p.id},1)">+ Agregar</button>`;
    return `<div class="prod${p.img?"":" sin-foto"}"><div class="foto">${foto}${p.tag?`<span class="tag">${p.tag}</span>`:""}</div>
      <div class="info"><h3>${p.n}</h3><p>${p.d}</p><div class="pie">${ctrl}</div></div></div>`;
  }).join("");
}
function cambiar(id, d){
  carrito[id] = Math.max(0, (carrito[id]||0) + d);
  if (!carrito[id]) delete carrito[id];
  if (d > 0) toast("✓ " + productos.find(p=>p.id===id).n + " agregado");
  pintarProductos(); pintarCarrito();
}
function pintarCarrito(){
  const ids = Object.keys(carrito);
  const cant = ids.reduce((s,i)=>s+carrito[i],0);
  document.querySelectorAll(".numCarrito").forEach(n => { n.textContent = cant; n.classList.toggle("lleno", cant>0); });
  const html = ids.map(i => {
    const p = productos.find(x=>x.id==i);
    return `<div class="item"><div class="n"><b>${p.n}</b><small>${p.cat.replace(/^[^A-Za-zÁÉÍÓÚáéíóúÑñ]+/,"")}</small></div>
      <div class="cant"><button onclick="cambiar(${p.id},-1)">−</button><span>${carrito[i]}</span><button onclick="cambiar(${p.id},1)">+</button></div></div>`;
  }).join("");
  $("lista").innerHTML = html || `<div class="vacio">🧺<br>Tu pedido está vacío.<br>Agrega platos desde el menú.</div>`;
  actualizarEnlace();
}
function actualizarEnlace(){
  const btn = $("enviar"); const ids = Object.keys(carrito);
  if (!ids.length){ btn.classList.add("off"); btn.removeAttribute("href"); return; }
  btn.classList.remove("off");
  const nombre = $("nombre").value.trim(), tipo = $("tipo").value, sede = $("sedePed").value, nota = $("nota").value.trim();
  let t = `Hola Nómadas del Café 👋\nQuiero hacer este pedido:\n\n`;
  ids.forEach(i => { const p = productos.find(x=>x.id==i); t += `• ${carrito[i]} x ${p.n}\n`; });
  t += `\nSede: ${sede}\nModalidad: ${tipo}\n`;
  if (nombre) t += `Nombre: ${nombre}\n`;
  if (nota) t += `Nota: ${nota}\n`;
  t += `\n¿Me confirman disponibilidad y el valor total? Gracias.\n(Les hago una llamada perdida para confirmar 📞)`;
  btn.href = wa(t);
}
function abrirPanel(){ $("panel").classList.add("on"); $("velo").classList.add("on"); }
function cerrarPanel(){ $("panel").classList.remove("on"); $("velo").classList.remove("on"); }
function avisoLlamada(){ setTimeout(() => { cerrarPanel(); $("aviso").classList.add("on"); }, 400); }
let tt;
function toast(m){ const t=$("toast"); t.textContent=m; t.classList.add("on"); clearTimeout(tt); tt=setTimeout(()=>t.classList.remove("on"),1800); }

/* ===== Piezas comunes que se inyectan en todas las opciones ===== */
const AVISO_TXT = `Después de enviar tu pedido por WhatsApp, <b>haznos una llamada perdida o llámanos al ${TEL_TXT}</b>. Así nos aseguramos de ver tu mensaje: cuando la casa está llena estamos atendiendo en las mesas y no queremos dejarte esperando.`;
function inyectarComunes(){
  const sedesOpt = SEDES.map(s => `<option>${s.nombre} (${s.dir.split(",")[0]})</option>`).join("");
  document.body.insertAdjacentHTML("beforeend", `
  <button class="bot-flot" onclick="toggleBot()"><span class="dot"></span> ¿Te ayudamos?</button>
  <a class="wa-flot" target="_blank" rel="noopener" href="${wa("Hola Nómadas del Café 👋 Quiero más información.")}" aria-label="WhatsApp">${WA_SVG.replace('width="20" height="20"','width="34" height="34"')}</a>
  <div class="bot" id="bot">
    <div class="cab"><div class="av">☕</div><div><b>Nómadas del Café</b><small>Respuestas al instante</small></div><button onclick="toggleBot()" aria-label="Cerrar">×</button></div>
    <div class="msgs" id="msgs"></div><div class="rapidas" id="rapidas"></div>
    <form id="botForm"><input id="botIn" placeholder="Escribe tu pregunta…" autocomplete="off"><button type="submit" aria-label="Enviar">➤</button></form>
  </div>
  <div class="velo" id="velo" onclick="cerrarPanel()"></div>
  <aside class="panel" id="panel" aria-label="Tu pedido">
    <div class="cab"><h3>🧺 Tu pedido</h3><button onclick="cerrarPanel()" aria-label="Cerrar">×</button></div>
    <div class="lista" id="lista"></div>
    <div class="fin">
      <div class="aviso-mini">📞 ${AVISO_TXT}</div>
      <label for="sedePed">Sede</label><select id="sedePed">${sedesOpt}</select>
      <label for="tipo">¿Cómo lo quieres?</label>
      <select id="tipo"><option>Para comer en el restaurante</option><option>Para recoger</option><option>Domicilio en Filandia</option></select>
      <label for="nombre">Tu nombre</label><input id="nombre" placeholder="Ej: Laura">
      <label for="nota">Nota (opcional)</label><textarea id="nota" rows="2" placeholder="Ej: sin cebolla, mesa para 4…"></textarea>
      <a class="btn btn-wa off" id="enviar" target="_blank" rel="noopener" onclick="avisoLlamada()">${WA_SVG} Enviar pedido por WhatsApp</a>
    </div>
  </aside>
  <div class="aviso" id="aviso" role="dialog" aria-modal="true">
    <div class="aviso-caja">
      <div class="aviso-ic">📞</div>
      <h3>¡Último paso para confirmar!</h3>
      <p>${AVISO_TXT}</p>
      <a class="btn btn-llamar" href="tel:${TEL}">📞 Llamar ahora · ${TEL_TXT}</a>
      <button class="btn btn-linea" onclick="$('aviso').classList.remove('on')">Listo, ya llamé</button>
    </div>
  </div>
  <div class="toast" id="toast"></div>`);
  ["nombre","tipo","nota","sedePed"].forEach(id => $(id).addEventListener("input", actualizarEnlace));
}

/* ===== CHATBOT ===== */
const horarioTxt = SEDES.map(s => `• ${s.nombre} (${s.dir.split(",")[0]}):\n  ` + s.horario.map(h=>`${h[0]}: ${h[1]}`).join("\n  ")).join("\n\n") + `\n\n🚫 ${CERRADO}.`;
const respuestas = {
  "🕛 Horario": "Estos son nuestros horarios ☕\n\n" + horarioTxt,
  "📍 Sedes": "Tenemos 2 sedes en Filandia, Quindío 🏡\n\n• " + SEDES.map(s=>`${s.nombre}: ${s.dir}. ${s.ref}.`).join("\n• "),
  "🍽️ Ver menú": "De día ☀️: bandeja paisa, sobrebarriga, costilla montañera, truchas y más. De noche 🌙: callanazos, tacos, arepas rellenas y típicos. Te llevo al menú 👇",
  "🛵 Pedidos": "Arma tu pedido en el menú y envíalo por WhatsApp. 📞 Importante: después de enviarlo, haznos una llamada perdida o llámanos al " + TEL_TXT + " para confirmar que lo vimos.",
  "📅 Reservas": "Con gusto te reservamos mesa. Escríbenos por WhatsApp con la sede, el día, la hora y el número de personas.",
  "🎂 Celebraciones": "¡Nos encanta celebrar contigo! 🎉 Decoramos tu mesa a tu gusto y te ayudamos con la torta y las velitas. Manejamos reserva anticipada: escríbenos con la fecha y el número de personas.",
  "🍹 Cócteles 2x1": "¡Sí! Tenemos 2x1 en cócteles 🍹🍹 Pregunta por la promo del día en tu sede.",
  "☀️ Desayunos": "Sí tenemos desayunos típicos desde las 7:30 a. m. en la sede de la Cra. 8: huevos pericos, arepa con quesito, tostadas y chocolate caliente ☕",
  "🥂 Cena fin de año": "¡Tenemos Cena de fin de año en 4 tiempos! 🥂 Cupos limitados. Escríbenos por WhatsApp para conocer el menú, el valor y reservar.",
  "💬 Hablar con alguien": "¡Claro! Escríbenos por WhatsApp. Si no te respondemos rápido, llámanos al " + TEL_TXT + ": puede que estemos atendiendo mesas."
};
const conWa = {"🎂 Celebraciones":"Hola 👋 Quiero celebrar un cumpleaños/evento en Nómadas del Café.","🥂 Cena fin de año":"Hola 👋 Quiero reservar para la Cena de fin de año en 4 tiempos.","📅 Reservas":"Hola 👋 Quiero reservar una mesa en Nómadas del Café.","🛵 Pedidos":"Hola 👋 Quiero hacer un pedido.","💬 Hablar con alguien":"Hola Nómadas del Café 👋 Tengo una pregunta."};
function decir(txt, quien="b", link, mapas){
  const d = document.createElement("div"); d.className = "m " + quien; d.textContent = txt;
  if (link){ const a=document.createElement("a"); a.className="irwa"; a.target="_blank"; a.rel="noopener"; a.href=wa(link); a.textContent="Abrir WhatsApp"; d.appendChild(document.createElement("br")); d.appendChild(a); }
  if (mapas) SEDES.forEach(s => { const a=document.createElement("a"); a.className="irwa mapa"; a.target="_blank"; a.rel="noopener"; a.href=s.maps; a.textContent="📍 " + s.corto; d.appendChild(document.createElement("br")); d.appendChild(a); });
  $("msgs").appendChild(d); $("msgs").scrollTop = $("msgs").scrollHeight;
}
function responder(k){
  decir(k,"u");
  setTimeout(()=>{
    decir(respuestas[k], "b", conWa[k], k==="📍 Sedes");
    if (k==="🍽️ Ver menú"){ setTimeout(()=>{ toggleBot(); filtrar("Todos"); $("menu").scrollIntoView(); },900); }
    if (k==="🍹 Cócteles 2x1"){ setTimeout(()=>{ toggleBot(); filtrar("Cócteles"); $("menu").scrollIntoView(); },1200); }
  },450);
}
const claves = [
  [/hora|abre|cierra|abierto|jueves/i,"🕛 Horario"],[/donde|dónde|direcci|ubica|llegar|queda|sede/i,"📍 Sedes"],
  [/menu|menú|carta|comida|plato|bandeja|precio/i,"🍽️ Ver menú"],[/2x1|coctel|cóctel|promo|trago/i,"🍹 Cócteles 2x1"],
  [/domicil|envio|envío|llevar|recoger|pedido/i,"🛵 Pedidos"],[/reserv|mesa/i,"📅 Reservas"],[/fin de a|cena|año nuevo|diciembre/i,"🥂 Cena fin de año"],
  [/cumple|celebra|torta|evento|aniversario|decora/i,"🎂 Celebraciones"],[/desayun/i,"☀️ Desayunos"]
];
let saludado = false;
function toggleBot(){
  $("bot").classList.toggle("abierto");
  if (!saludado){ saludado = true; decir("¡Hola! 👋 Bienvenido a Nómadas del Café, en Filandia. ¿En qué te ayudamos? Elige una opción o escribe tu pregunta."); }
}

/* ===== arranque ===== */
document.addEventListener("DOMContentLoaded", () => {
  inyectarComunes();
  document.querySelectorAll("[data-wa]").forEach(a => { a.href = wa(a.dataset.wa); a.target="_blank"; a.rel="noopener"; });
  document.querySelectorAll("[data-wa-icon]").forEach(a => a.insertAdjacentHTML("afterbegin", WA_SVG + " "));
  const cats = ["Todos", ...new Set(productos.map(p => p.cat))];
  if ($("filtros")) $("filtros").innerHTML = cats.map(c => `<button class="filtro" data-c="${c}" onclick="filtrar('${c}')">${c}</button>`).join("");
  document.querySelectorAll(".aviso-texto").forEach(e => e.innerHTML = AVISO_TXT);
  renderSedes(); renderReels();
  renderFotos("galeria", GALERIA, false);
  renderFotos("rincones", RINCONES, true);
  renderFotos("clientes", CLIENTES, true);
  $("rapidas").innerHTML = Object.keys(respuestas).map(k=>`<button>${k}</button>`).join("");
  document.querySelectorAll("#rapidas button").forEach(b => b.onclick = () => responder(b.textContent));
  $("botForm").onsubmit = e => {
    e.preventDefault(); const v = $("botIn").value.trim(); if(!v) return;
    $("botIn").value = ""; decir(v,"u");
    const hit = claves.find(([r]) => r.test(v));
    setTimeout(()=> hit ? decir(respuestas[hit[1]], "b", conWa[hit[1]], hit[1]==="📍 Sedes")
      : decir("¡Buena pregunta! Te respondemos personalmente por WhatsApp 😊", "b", "Hola Nómadas del Café 👋 " + v), 450);
  };
  filtrar(window.FILTRO_INICIAL || "Todos"); pintarCarrito();
});
