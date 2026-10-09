var CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTpWDOBhG0TjMrBBi1EYQ8fjdlqTKYOV5PZqlgPrm_Pp8qLE-kcX_QoGPLZTofZ7W1JNYHEpBfLvlLL/pub?output=csv';

var logos = {
    "ESPN": "https://raw.githubusercontent.com/oalborta/programaci-n-deportiva/main/espn.png",
    "ESPN2": "https://raw.githubusercontent.com/oalborta/programaci-n-deportiva/main/espn2.png",
    "ESPN3": "https://raw.githubusercontent.com/oalborta/programaci-n-deportiva/main/espn3.png",
    "ESPN4": "https://raw.githubusercontent.com/oalborta/programaci-n-deportiva/main/espn4.png",
    "ESPN5": "https://raw.githubusercontent.com/oalborta/programaci-n-deportiva/main/espn5.png",
    "ESPN6": "https://raw.githubusercontent.com/oalborta/programaci-n-deportiva/main/espn6.png",
    "ESPN7": "https://raw.githubusercontent.com/oalborta/programaci-n-deportiva/main/espn7.png",
    "TS1": "https://raw.githubusercontent.com/oalborta/programaci-n-deportiva/main/ts1.png",
    "TS2": "https://raw.githubusercontent.com/oalborta/programaci-n-deportiva/main/ts2.png",
    "DSPORTS": "https://raw.githubusercontent.com/oalborta/programaci-n-deportiva/main/DSPORTS.png",
    "DSPORTS2": "https://raw.githubusercontent.com/oalborta/programaci-n-deportiva/main/DSPORTS2.png",
    "TYCSPORTS": "https://raw.githubusercontent.com/oalborta/programaci-n-deportiva/main/TyCSp.png",
    "T&CSPORTS": "https://raw.githubusercontent.com/oalborta/programaci-n-deportiva/main/TyCSp.png"
};

var canalesTigo = {
    "TS1": "Ch. 700",
    "TS2": "Ch. 701",
    "ESPN": "Ch. 703",
    "ESPN2": "Ch. 704",
    "ESPN3": "Ch. 705",
    "ESPN4": "Ch. 706",
    "ESPN5": "Ch. 709",
    "ESPN6": "Ch. 711",
    "ESPN7": "Ch. 710",
    "TYCSPORTS": "Ch. 715",
    "T&CSPORTS": "Ch. 715",
    "DSPORTS": "Ch. 699",
    "DSPORTS2": "Ch. 698"
};

var logosTorneo = {
    "MUNDIAL": "https://raw.githubusercontent.com/oalborta/programaci-n-deportiva/main/fifa.png",
    "F1": "https://raw.githubusercontent.com/oalborta/programaci-n-deportiva/main/f1.png",
    "TOUR DE FRANCE": "https://raw.githubusercontent.com/oalborta/programaci-n-deportiva/main/tdf.png",
    "BRASILEIRAO": "https://raw.githubusercontent.com/oalborta/programaci-n-deportiva/main/brasileirao.png",
    "SUDAMERICANA": "https://raw.githubusercontent.com/oalborta/programaci-n-deportiva/main/sudamericana.png",
    "LPF ARGENTINA": "https://raw.githubusercontent.com/oalborta/programaci-n-deportiva/main/Liga_Argentina_2026.png",
    "LA LIGA": "https://raw.githubusercontent.com/oalborta/programaci-n-deportiva/main/LaLiga.png",
    "Liga Portugal": "https://raw.githubusercontent.com/oalborta/programaci-n-deportiva/main/LigaPortugal.png",
    "COPA ARGENTINA": "https://raw.githubusercontent.com/oalborta/programaci-n-deportiva/main/copa_argentina.png",
    "COPA BRASIL": "https://raw.githubusercontent.com/oalborta/programaci-n-deportiva/main/copa_brasil.png",
    "COPA MUNDIAL FEMENINA - SUB 20": "https://raw.githubusercontent.com/oalborta/programaci-n-deportiva/main/femsub20.png",
    "PREMIER LEAGUE": "https://raw.githubusercontent.com/oalborta/programaci-n-deportiva/main/premier.png",
    "US OPEN": "https://raw.githubusercontent.com/oalborta/programaci-n-deportiva/main/usopne.png",
    "CONMEBOL LIBERTADORES": "https://raw.githubusercontent.com/oalborta/programaci-n-deportiva/main/libertadores.png",
    "BUNDESLIGA": "https://raw.githubusercontent.com/oalborta/programaci-n-deportiva/main/bundes.png",
    "SERIE A": "https://raw.githubusercontent.com/oalborta/programaci-n-deportiva/main/serieaitalia.png",
    "UEFA CHAMPIONS LEAGUE": "https://raw.githubusercontent.com/oalborta/programaci-n-deportiva/main/champions.png",
    "COPA MUNDIAL FEMENINA - SUB 17": "https://raw.githubusercontent.com/oalborta/programaci-n-deportiva/main/fem_u_17.png",
    "UEFA NATIONS LEAGUE": "https://raw.githubusercontent.com/oalborta/programaci-n-deportiva/main/uefa_nations.png",
    "FECHA FIFA": "https://raw.githubusercontent.com/oalborta/programaci-n-deportiva/main/fecha_fifa.jpeg",
    "CONMEBOL SUB-20 FUTSAL 2026": "https://raw.githubusercontent.com/oalborta/programaci-n-deportiva/main/futsal_sub_20.png",
    "EFL CHAMPIONSHIP": "https://raw.githubusercontent.com/oalborta/programaci-n-deportiva/main/EFL-Championship-v2016.png",
    "LIGUE 1": "https://raw.githubusercontent.com/oalborta/programaci-n-deportiva/main/Ligue_1.png",
    "WIMBLEDON": "https://raw.githubusercontent.com/oalborta/programaci-n-deportiva/main/wimbledon.png"
};

var diasSemana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
var meses = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

var todosLosEventos = [];
var filtroCanalActual = 'TODOS';
var textoBusquedaActual = '';

/* ─── BOTÓN INSTALAR PWA ─── */
var deferredPrompt = null;

if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('./sw.js').catch(function() {});
    });
}

window.addEventListener('beforeinstallprompt', function(e) {
    e.preventDefault();
    deferredPrompt = e;
    var btn = document.getElementById('btnInstalar');
    if (btn) btn.style.display = 'inline-flex';
});

function iniciarInstalacion() {
    if (deferredPrompt) {
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then(function(res) {
            if (res.outcome === 'accepted') {
                var btn = document.getElementById('btnInstalar');
                if (btn) btn.style.display = 'none';
            }
            deferredPrompt = null;
        });
    }
}

window.addEventListener('appinstalled', function() {
    var btn = document.getElementById('btnInstalar');
    if (btn) btn.style.display = 'none';
    deferredPrompt = null;
    mostrarToast('¡App instalada con éxito!');
});

/* ─── TEMA NOCHE / DÍA ─── */
function inicializarTema() {
    var guardado = localStorage.getItem('spg_tema');
    var prefiereOscuro = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (guardado === 'dark' || (!guardado && prefiereOscuro)) {
        aplicarTemaOscuro(true);
    } else {
        aplicarTemaOscuro(false);
    }
}

function alternarModoOscuro() {
    var esOscuro = document.body.classList.contains('dark-mode');
    aplicarTemaOscuro(!esOscuro);
    localStorage.setItem('spg_tema', !esOscuro ? 'dark' : 'light');
}

function aplicarTemaOscuro(activar) {
    var metaTheme = document.getElementById('themeMetaColor');
    var txtTema = document.getElementById('txtTema');
    var iconoTema = document.getElementById('iconoTema');

    if (activar) {
        document.body.classList.add('dark-mode');
        if (metaTheme) metaTheme.setAttribute('content', '#0f172a');
        if (txtTema) txtTema.innerText = 'Día';
        if (iconoTema) {
            iconoTema.innerHTML = '<circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>';
        }
    } else {
        document.body.classList.remove('dark-mode');
        if (metaTheme) metaTheme.setAttribute('content', '#0033bf');
        if (txtTema) txtTema.innerText = 'Noche';
        if (iconoTema) {
            iconoTema.innerHTML = '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>';
        }
    }
}

inicializarTema();

/* ─── UTILIDADES ─── */
function limpiarClave(texto) {
    if (!texto) return '';
    return texto.toString().replace(/[\s\-_&.]/g, '').toUpperCase().trim();
}

function parsearFecha(fechaStr) {
    if (!fechaStr) return null;
    var partes = fechaStr.toString().trim().split(/[-/]/);
    if (partes.length !== 3) return null;

    var anio, mes, dia;
    if (partes[0].length === 4) {
        anio = parseInt(partes[0], 10);
        mes = parseInt(partes[1], 10) - 1;
        dia = parseInt(partes[2], 10);
    } else {
        dia = parseInt(partes[0], 10);
        mes = parseInt(partes[1], 10) - 1;
        anio = parseInt(partes[2], 10);
    }
    return new Date(anio, mes, dia);
}

function buscarLogoCanal(nombreCanal) {
    if (!nombreCanal) return null;
    var clave = limpiarClave(nombreCanal);

    if (clave.indexOf('DSPORTS2') !== -1 || clave.indexOf('DIRECTV2') !== -1) return logos['DSPORTS2'];
    if (clave.indexOf('DSPORTS') !== -1 || clave.indexOf('DIRECTV') !== -1) return logos['DSPORTS'];

    if (logos[clave]) return logos[clave];
    if (clave.indexOf('TYC') !== -1) return logos['TYCSPORTS'];
    if (clave.indexOf('TS1') !== -1) return logos['TS1'];
    if (clave.indexOf('TS2') !== -1) return logos['TS2'];

    return null;
}

function obtenerNumeroCanalTigo(nombreCanal) {
    if (!nombreCanal) return '';
    var clave = limpiarClave(nombreCanal);

    if (clave.indexOf('DSPORTS2') !== -1 || clave.indexOf('DIRECTV2') !== -1) return canalesTigo['DSPORTS2'];
    if (clave.indexOf('DSPORTS') !== -1 || clave.indexOf('DIRECTV') !== -1) return canalesTigo['DSPORTS'];

    if (canalesTigo[clave]) return canalesTigo[clave];
    if (clave.indexOf('TS2') !== -1) return canalesTigo['TS2'];
    if (clave.indexOf('TS1') !== -1 || clave === 'TS') return canalesTigo['TS1'];
    if (clave.indexOf('TYC') !== -1) return canalesTigo['TYCSPORTS'];

    return '';
}

/* ─── CARGA ROBUSTA DE GOOGLE SHEETS ─── */
function cargarDatos() {
    var btn = document.getElementById('btnRecargar');
    if (btn) {
        btn.classList.add('is-loading');
        btn.disabled = true;
    }

    // Usamos fetch nativo primero para evitar problemas con PapaParse cruzando dominios
    fetch(CSV_URL)
        .then(function(response) {
            if (!response.ok) throw new Error('Error al descargar CSV: ' + response.status);
            return response.text();
        })
        .then(function(csvTexto) {
            if (btn) {
                btn.classList.remove('is-loading');
                btn.disabled = false;
            }

            Papa.parse(csvTexto, {
                header: true,
                skipEmptyLines: true,
                complete: function(res) {
                    var filas = res.data || [];
                    var data = [];

                    filas.forEach(function(row) {
                        var obj = {};
                        for (var key in row) {
                            var k = key.trim().toLowerCase().replace(/[\s_áéíóú]/g, function(m) {
                                if (m === 'á') return 'a';
                                if (m === 'é') return 'e';
                                if (m === 'í') return 'i';
                                if (m === 'ó') return 'o';
                                if (m === 'ú') return 'u';
                                return '';
                            });

                            if (k === 'evento') obj.Evento = (row[key] || '').trim();
                            if (k === 'fecha') obj.Fecha = (row[key] || '').trim();
                            if (k === 'horainicio' || k === 'inicio') obj.Hora_Inicio = (row[key] || '').trim();
                            if (k === 'horafin' || k === 'fin') obj.Hora_Fin = (row[key] || '').trim();
                            if (k === 'canal') obj.Canal = (row[key] || '').trim();
                            if (k === 'torneo') obj.Torneo = (row[key] || '').trim();
                        }

                        if (obj.Evento && obj.Fecha) {
                            data.push(obj);
                        }
                    });

                    if (data.length > 0) {
                        todosLosEventos = data;
                        localStorage.setItem('spg_eventos_cache', JSON.stringify(data));
                        renderizarEventos();
                    } else {
                        mostrarToast('La hoja se leyó pero no contiene filas válidas');
                    }
                }
            });
        })
        .catch(function(err) {
            console.error('Error cargando hoja:', err);
            if (btn) {
                btn.classList.remove('is-loading');
                btn.disabled = false;
            }
            var cached = localStorage.getItem('spg_eventos_cache');
            if (cached) {
                todosLosEventos = JSON.parse(cached);
                renderizarEventos();
                mostrarToast('Usando datos de respaldo');
            } else {
                mostrarToast('No se pudo conectar con Google Sheets');
            }
        });
}

function filtrarCanal(canal, elemento) {
    filtroCanalActual = canal;
    document.querySelectorAll('.chip').forEach(function(c) {
        c.classList.remove('active');
    });
    elemento.classList.add('active');
    renderizarEventos();
}

function filtrarEventos() {
    var val = document.getElementById('inputBuscar').value;
    textoBusquedaActual = val.toLowerCase().trim();
    var btnClean = document.getElementById('btnLimpiarBusqueda');
    btnClean.style.display = textoBusquedaActual ? 'block' : 'none';
    renderizarEventos();
}

function limpiarBusqueda() {
    document.getElementById('inputBuscar').value = '';
    textoBusquedaActual = '';
    document.getElementById('btnLimpiarBusqueda').style.display = 'none';
    renderizarEventos();
}

function obtenerCuentaRegresiva(objFecha, hora) {
    var h = parseInt(hora.split(':')[0], 10);
    var m = parseInt(hora.split(':')[1], 10);
    var eventoFecha = new Date(objFecha.getFullYear(), objFecha.getMonth(), objFecha.getDate(), h, m);
    var ahora = new Date();
    var diff = eventoFecha - ahora;
    var horas = Math.floor(diff / 3600000);
    var mins = Math.floor((diff % 3600000) / 60000);
    
    if (horas <= 0 && mins <= 0) return '';
    if (horas === 0) return 'En ' + mins + ' min';
    if (horas === 1) return 'En 1 hora';
    if (horas < 24) return 'En ' + horas + ' horas';
    var dias = Math.floor(horas / 24);
    if (dias === 1) return 'Mañana';
    return 'En ' + dias + ' días';
}

function fechaLegible(objFecha) {
    return diasSemana[objFecha.getDay()] + ' ' + objFecha.getDate() + ' ' + meses[objFecha.getMonth()];
}

function renderizarEventos() {
    document.querySelectorAll('.lista').forEach(function(c) {
        c.innerHTML = '';
    });

    var hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    var hoyTs = hoy.getTime();

    var eventos = todosLosEventos.slice();

    eventos.sort(function(a, b) {
        var fA = parsearFecha(a.Fecha);
        var fB = parsearFecha(b.Fecha);
        var tA = fA ? fA.getTime() : 0;
        var tB = fB ? fB.getTime() : 0;
        if (tA !== tB) return tA - tB;
        var hA = parseInt((a.Hora_Inicio || '00:00').split(':')[0], 10);
        var mA = parseInt((a.Hora_Inicio || '00:00').split(':')[1], 10);
        var hB = parseInt((b.Hora_Inicio || '00:00').split(':')[0], 10);
        var mB = parseInt((b.Hora_Inicio || '00:00').split(':')[1], 10);
        return (hA * 60 + mA) - (hB * 60 + mB);
    });

    var ultimoDiaMostrado = '';

    eventos.forEach(function(ev) {
        if (!ev.Fecha || !ev.Hora_Inicio) return;

        var fechaObj = parsearFecha(ev.Fecha);
        if (!fechaObj) return;

        if (textoBusquedaActual) {
            var strTotal = (ev.Evento + ' ' + (ev.Torneo || '') + ' ' + (ev.Canal || '')).toLowerCase();
            if (strTotal.indexOf(textoBusquedaActual) === -1) return;
        }

        var hI = parseInt(ev.Hora_Inicio.split(':')[0], 10);
        var mI = parseInt(ev.Hora_Inicio.split(':')[1], 10);
        var hF = ev.Hora_Fin ? parseInt(ev.Hora_Fin.split(':')[0], 10) : (hI + 2);
        var mF = ev.Hora_Fin ? parseInt(ev.Hora_Fin.split(':')[1], 10) : mI;

        var fechaInicio = new Date(fechaObj.getFullYear(), fechaObj.getMonth(), fechaObj.getDate(), hI, mI);
        var fechaFin = new Date(fechaObj.getFullYear(), fechaObj.getMonth(), fechaObj.getDate(), hF, mF);

        if (fechaFin <= fechaInicio) {
            fechaFin.setDate(fechaFin.getDate() + 1);
        }

        var ahora = new Date();
        var estaEnVivo = (ahora >= fechaInicio && ahora <= fechaFin);
        var fechaTs = fechaObj.getTime();
        var esHoy = (fechaTs === hoyTs);

        if (!esHoy && estaEnVivo) {
            esHoy = true;
        }

        if (filtroCanalActual === 'VIVO' && !estaEnVivo) return;
        if (filtroCanalActual !== 'TODOS' && filtroCanalActual !== 'VIVO') {
            var canalNorm = limpiarClave(ev.Canal);
            if (filtroCanalActual === 'TS') {
                var esTigo = (canalNorm.indexOf('TS') !== -1 || canalNorm.indexOf('TIGO') !== -1) && (canalNorm.indexOf('DSPORTS') === -1);
                if (!esTigo) return;
            } else if (filtroCanalActual === 'DSPORTS') {
                var esDsports = (canalNorm.indexOf('DSPORTS') !== -1 || canalNorm.indexOf('DIRECTV') !== -1);
                if (!esDsports) return;
            } else {
                if (canalNorm.indexOf(filtroCanalActual) === -1) return;
            }
        }

        var urlLogoCanal = buscarLogoCanal(ev.Canal);
        var numCanalTigo = obtenerNumeroCanalTigo(ev.Canal);
        var badgeNumeroHtml = numCanalTigo ? '<span class="canal-numero">' + numCanalTigo + '</span>' : '';

        var logoCanal = urlLogoCanal
            ? '<img src="' + urlLogoCanal + '" class="logo">'
            : '<span class="badge">' + (ev.Canal ? ev.Canal.substring(0, 4).toUpperCase() : '') + '</span>';

        var logoTorneo = logosTorneo[ev.Torneo]
            ? '<img src="' + logosTorneo[ev.Torneo] + '" class="logo">'
            : '<span class="badge">' + (ev.Torneo ? ev.Torneo.substring(0, 3).toUpperCase() : '') + '</span>';

        var indicadorTiempoHtml = '';
        if (estaEnVivo) {
            indicadorTiempoHtml = '<div class="cuenta-regresiva" style="background:#ffebee;color:#c62828;">● En Vivo</div>';
        } else {
            var cuenta = obtenerCuentaRegresiva(fechaObj, ev.Hora_Inicio);
            indicadorTiempoHtml = cuenta ? '<div class="cuenta-regresiva">' + cuenta + '</div>' : '';
        }

        var linkWhatsApp = obtenerLinkWhatsApp(ev.Evento, ev.Torneo, ev.Canal, numCanalTigo, fechaObj, ev.Hora_Inicio, estaEnVivo);
        var linkGoogleCal = obtenerLinkGoogleCalendar(ev.Evento, ev.Torneo, ev.Canal, fechaInicio, fechaFin);

        var div = document.createElement('div');
        div.className = 'evento';

        var botonRecordarHtml = '';
        if (!estaEnVivo) {
            botonRecordarHtml = 
                '<a href="' + linkGoogleCal + '" target="_blank" class="btn-recordar-pro" title="Guardar recordatorio">' +
                    '<svg viewBox="0 0 24 24"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>' +
                    'Recordar
