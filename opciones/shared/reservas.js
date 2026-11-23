/* Reservas en línea + registro de pedidos para el panel de Nómadas del Café */
const API_RESERVAS = "https://nomadasdelcafe.vercel.app/api";

(function () {
  const css = `
  .reserva{background:radial-gradient(ellipse at top,#2a1c12,#140d08 70%)}
  .reserva .wrap{display:grid;grid-template-columns:1fr 1.1fr;gap:50px;align-items:center}
  .reserva .txt h2{font-family:var(--head);font-size:clamp(2.2rem,5vw,3.2rem);line-height:1.05;margin:10px 0 14px}
  .reserva .txt p{color:var(--ink2);margin-bottom:18px}
  .reserva .pasos{list-style:none;display:grid;gap:10px;margin-top:8px}
  .reserva .pasos li{display:flex;gap:12px;align-items:center;color:var(--ink)}
  .reserva .pasos b{width:30px;height:30px;border-radius:50%;border:1px solid var(--oro);color:var(--oro);display:grid;place-items:center;font-family:var(--head);flex:0 0 30px}
  .fres{background:var(--card,#231810);border:1px solid rgba(201,162,74,.35);border-radius:10px;padding:26px;box-shadow:0 30px 60px rgba(0,0,0,.35)}
  .fres h3{font-family:var(--head);font-size:1.6rem;margin-bottom:14px;color:var(--oro)}
  .fres .g{display:grid;grid-template-columns:1fr 1fr;gap:12px}
  .fres label{display:block;font-size:.72rem;letter-spacing:1.5px;text-transform:uppercase;font-weight:800;color:var(--ink2);margin-bottom:6px}
  .fres input,.fres select,.fres textarea{width:100%;background:#120c08;border:1px solid #3a2a1c;color:var(--ink);border-radius:8px;padding:12px;font-family:inherit;font-size:1rem}
  .fres input:focus,.fres select:focus,.fres textarea:focus{outline:2px solid var(--oro);border-color:transparent}
  .fres .full{grid-column:1/-1}
  .fres .chips{display:flex;flex-wrap:wrap;gap:8px}
  .fres .chips button{background:transparent;border:1px solid #4a3622;color:var(--ink2);border-radius:999px;padding:8px 13px;font-family:inherit;font-weight:700;cursor:pointer;font-size:.86rem}
  .fres .chips button.on{background:var(--oro);color:#17100b;border-color:var(--oro)}
  .fres .enviar{width:100%;margin-top:16px;background:var(--oro);color:#17100b;border:0;border-radius:8px;padding:16px;font-weight:800;font-size:1rem;cursor:pointer;font-family:inherit}
  .fres .enviar:disabled{opacity:.6;cursor:wait}
  .fres .msg{font-size:.88rem;margin-top:10px;min-height:1.2em;color:#ff9d8a;text-align:center}
  .fres .seguro{font-size:.78rem;color:var(--ink2);text-align:center;margin-top:10px}
  .ok-res{display:none;text-align:center;padding:10px 0}
  .ok-res.on{display:block}
  .ok-res .ic{font-size:3rem}
  .ok-res h3{color:var(--oro)}
  .ok-res p{color:var(--ink2);margin:8px 0 16px}
  .ok-res .resumen{background:#120c08;border-radius:8px;padding:14px;text-align:left;line-height:1.8;margin-bottom:16px}
  @media(max-width:860px){.reserva .wrap{grid-template-columns:1fr;gap:30px}.fres{padding:20px}}
  @media(max-width:420px){.fres .g{grid-template-columns:1fr}}`;
  const st = document.createElement("style"); st.textContent = css; document.head.appendChild(st);

  const sedes = (typeof SEDES !== "undefined" ? SEDES : []).map(s => s.nombre);
  const hoy = new Date(); const iso = d => new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
  const max = new Date(hoy.getTime() + 90 * 864e5);
  // Horarios de reserva por sede (última reserva 1 hora antes del cierre)
  const RANGOS = { cra8: [[7, 30], [16, 0]], cra6: [[12, 0], [20, 0]], cra6Tarde: [[12, 0], [20, 30]] };
  const horasDe = (sedeIdx, fecha) => {
    const id = (typeof SEDES !== "undefined" && SEDES[sedeIdx]) ? SEDES[sedeIdx].id : "cra6";
    const dow = fecha ? new Date(fecha + "T12:00:00").getDay() : 0;
    const [[h1, m1], [h2, m2]] = id === "cra8" ? RANGOS.cra8 : (dow === 5 || dow === 6 ? RANGOS.cra6Tarde : RANGOS.cra6);
    const out = []; for (let t = h1 * 60 + m1; t <= h2 * 60 + m2; t += 30) out.push(`${String(Math.floor(t / 60)).padStart(2, "0")}:${t % 60 ? "30" : "00"}`);
    return out;
  };
  const horas = horasDe(0, iso(hoy));
  const h12 = h => { const [H, M] = h.split(":").map(Number); return `${((H + 11) % 12) + 1}:${String(M).padStart(2, "0")} ${H < 12 ? "a. m." : "p. m."}`; };

  const sec = document.createElement("section");
  sec.className = "reserva"; sec.id = "reservar";
  sec.innerHTML = `<div class="wrap">
    <div class="txt">
      <span style="color:var(--oro);letter-spacing:5px;text-transform:uppercase;font-size:.74rem;font-weight:800">Reservas en línea</span>
      <h2>Reserva tu mesa en 30 segundos</h2>
      <p>Elige el día, la hora y cuántos vienen. Tu reserva nos llega al instante y te confirmamos por WhatsApp.</p>
      <ul class="pasos">
        <li><b>1</b> Llenas el formulario</li>
        <li><b>2</b> Nos llega tu reserva al momento</li>
        <li><b>3</b> Te confirmamos por WhatsApp ✅</li>
      </ul>
    </div>
    <div class="fres">
      <form id="formRes" novalidate>
        <h3>Datos de tu reserva</h3>
        <div class="g">
          <div class="full"><label for="rNombre">Nombre</label><input id="rNombre" autocomplete="name" placeholder="¿A nombre de quién?" required></div>
          <div><label for="rCel">Celular / WhatsApp</label><input id="rCel" type="tel" inputmode="tel" autocomplete="tel" placeholder="300 123 4567" required></div>
          <div><label for="rPer">Personas</label><select id="rPer">${Array.from({ length: 20 }, (_, i) => `<option ${i === 1 ? "selected" : ""}>${i + 1}</option>`).join("")}<option value="25">Más de 20</option></select></div>
          <div><label for="rFecha">Fecha</label><input id="rFecha" type="date" min="${iso(hoy)}" max="${iso(max)}" value="${iso(hoy)}" required></div>
          <div><label for="rHora">Hora</label><select id="rHora">${horas.map(h => `<option value="${h}" ${h === "13:00" ? "selected" : ""}>${h12(h)}</option>`).join("")}</select></div>
          ${sedes.length ? `<div class="full"><label for="rSede">Sede</label><select id="rSede">${sedes.map(s => `<option>${s}</option>`).join("")}</select></div>` : ""}
          <div class="full"><label>Ocasión</label><div class="chips" id="rOca">${["Comida normal", "Cumpleaños 🎂", "Aniversario 💑", "Reunión de trabajo", "Otra celebración 🎉"].map((o, i) => `<button type="button" class="${i ? "" : "on"}">${o}</button>`).join("")}</div></div>
          <div class="full"><label for="rNota">¿Algo que debamos saber? (opcional)</label><textarea id="rNota" rows="2" placeholder="Ej: silla para bebé, mesa en el balcón, alergias…"></textarea></div>
        </div>
        <button class="enviar" id="rBtn">Reservar mi mesa</button>
        <div class="msg" id="rMsg"></div>
        <div class="seguro">🔒 Tus datos solo los ve el restaurante.</div>
      </form>
      <div class="ok-res" id="rOk"></div>
    </div></div>`;
  const ancla = document.getElementById("sedes-sec") || document.querySelector("footer");
  ancla.parentNode.insertBefore(sec, ancla);

  const llenarHoras = () => {
    const sel = document.getElementById("rHora"), prev = sel.value;
    const idx = document.getElementById("rSede") ? document.getElementById("rSede").selectedIndex : 0;
    const hs = horasDe(idx, document.getElementById("rFecha").value);
    sel.innerHTML = hs.map(h => `<option value="${h}">${h12(h)}</option>`).join("");
    sel.value = hs.includes(prev) ? prev : (hs.includes("13:00") ? "13:00" : hs[0]);
  };
  if (document.getElementById("rSede")) document.getElementById("rSede").addEventListener("change", llenarHoras);
  document.getElementById("rFecha").addEventListener("change", llenarHoras);
  llenarHoras();
  document.querySelectorAll("#rOca button").forEach(b => b.onclick = () => { document.querySelectorAll("#rOca button").forEach(x => x.classList.remove("on")); b.classList.add("on"); });

  // Los botones "Reservar" de la página llevan al formulario
  document.querySelectorAll('[data-wa*="reservar una mesa"]').forEach(a => {
    a.removeAttribute("target"); a.href = "#reservar";
    a.addEventListener("click", e => { e.preventDefault(); sec.scrollIntoView({ behavior: "smooth" }); setTimeout(() => document.getElementById("rNombre").focus({ preventScroll: true }), 600); }, true);
  });
  const nav = document.querySelector(".top nav");
  if (nav && !nav.querySelector('[href="#reservar"]')) { const a = document.createElement("a"); a.href = "#reservar"; a.textContent = "Reservar"; nav.appendChild(a); }

  document.getElementById("formRes").addEventListener("submit", async e => {
    e.preventDefault();
    const $ = id => document.getElementById(id), msg = $("rMsg");
    const d = {
      nombre: $("rNombre").value.trim(), celular: $("rCel").value.trim(), personas: $("rPer").value,
      fecha: $("rFecha").value, hora: $("rHora").value, sede: $("rSede") ? $("rSede").value : "",
      ocasion: document.querySelector("#rOca .on").textContent.replace(/[^\p{L} ]/gu, "").trim(), nota: $("rNota").value.trim(),
    };
    if (!d.nombre) return msg.textContent = "Escribe tu nombre.", $("rNombre").focus();
    if (d.celular.replace(/\D/g, "").length < 7) return msg.textContent = "Escribe un celular válido para confirmarte.", $("rCel").focus();
    if (!d.fecha) return msg.textContent = "Elige la fecha.";
    const dia = new Date(d.fecha + "T12:00:00");
    if (dia.getDay() === 4) return msg.textContent = "Los jueves estamos cerrados. Elige otro día 🙏";
    if (d.fecha === iso(hoy)) { const [H, M] = d.hora.split(":").map(Number); const ahora = new Date(); if (H * 60 + M < ahora.getHours() * 60 + ahora.getMinutes() + 30) return msg.textContent = "Para hoy, elige una hora al menos 30 minutos más tarde."; }
    msg.textContent = ""; const btn = $("rBtn"); btn.disabled = true; btn.textContent = "Enviando…";
    let guardada = false, numero = typeof WHATSAPP !== "undefined" ? WHATSAPP : "573142211270";
    try {
      const r = await fetch(API_RESERVAS + "/reservas", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(d) });
      const j = await r.json(); guardada = !!j.ok;
      if (!j.ok && r.status === 400) { msg.textContent = j.error; btn.disabled = false; btn.textContent = "Reservar mi mesa"; return; }
      const c = await fetch(API_RESERVAS + "/config").then(x => x.json()).catch(() => null); if (c && c.whatsapp) numero = c.whatsapp;
    } catch (err) { /* sin conexión al sistema: igual se envía por WhatsApp */ }
    const fechaTxt = dia.toLocaleDateString("es-CO", { weekday: "long", day: "numeric", month: "long" });
    const texto = `Hola Nómadas del Café 👋 Acabo de hacer una reserva en la página:\n\n👤 ${d.nombre}\n📅 ${fechaTxt}\n🕐 ${h12(d.hora)}\n👥 ${d.personas} persona${d.personas > 1 ? "s" : ""}${d.sede ? `\n📍 ${d.sede}` : ""}${d.ocasion !== "Comida normal" ? `\n🎉 ${d.ocasion}` : ""}${d.nota ? `\n📝 ${d.nota}` : ""}\n\n¿Me la confirman? Gracias.`;
    const link = `https://api.whatsapp.com/send?phone=${numero}&text=${encodeURIComponent(texto)}`;
    $("formRes").style.display = "none";
    $("rOk").innerHTML = `<div class="ic">🎉</div><h3 style="font-family:var(--head);font-size:1.8rem">¡Reserva recibida!</h3>
      <p>${guardada ? "Ya quedó registrada en nuestro sistema." : "Envíanos el mensaje para registrarla."} Te confirmamos por WhatsApp en breve.</p>
      <div class="resumen">📅 ${fechaTxt}<br>🕐 ${h12(d.hora)}<br>👥 ${d.personas} persona${d.personas > 1 ? "s" : ""}${d.sede ? `<br>📍 ${d.sede}` : ""}</div>
      <a class="enviar" style="display:block;text-decoration:none;background:#25d366;color:#0b2a16" href="${link}" target="_blank" rel="noopener">💬 Avisar por WhatsApp para confirmar más rápido</a>
      <button class="enviar" style="background:transparent;border:1px solid #4a3622;color:var(--ink2);margin-top:10px" onclick="document.getElementById('rOk').classList.remove('on');document.getElementById('formRes').style.display='';this.closest('.fres').querySelector('#rBtn').disabled=false;document.getElementById('rBtn').textContent='Reservar mi mesa'">Hacer otra reserva</button>`;
    $("rOk").classList.add("on");
  });

  // Cada pedido enviado por WhatsApp también queda registrado en el panel
  document.addEventListener("click", e => {
    const b = e.target.closest("#enviar");
    if (!b || b.classList.contains("off") || typeof carrito === "undefined") return;
    const items = Object.keys(carrito).map(i => ({ n: (productos.find(p => p.id == i) || {}).n, c: carrito[i] })).filter(x => x.n);
    if (!items.length) return;
    const v = id => (document.getElementById(id) || {}).value || "";
    fetch(API_RESERVAS + "/pedidos", { method: "POST", headers: { "Content-Type": "application/json" }, keepalive: true,
      body: JSON.stringify({ items, nombre: v("nombre"), sede: v("sedePed"), tipo: v("tipo"), nota: v("nota") }) }).catch(() => {});
  }, true);
})();
