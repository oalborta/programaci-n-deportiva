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

/* ─── INSTALACIÓN PWA ─── */
var deferredPrompt = null;

if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('./sw.js').catch(function(err) {
            console.log('SW error:', err);
        });
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
        deferredPrompt.userChoice.then(function(choiceResult) {
            if (choiceResult.outcome === 'accepted') {
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

/* ─── CARGA DE DATOS ─── */
function cargarDatos() {
    var btn = document.getElementById('btnRecargar');
    if (btn) {
        btn.classList.add('is-loading');
        btn.disabled = true;
    }

    var urlLimpia = CSV_URL + '&nocache=' + new Date().getTime();

    Papa.parse(urlLimpia, {
        download: true,
        header: true,
        skipEmptyLines: 'greedy',
        complete: function(res) {
            if (btn) {
                btn.classList.remove('is-loading');
                btn.disabled = false;
            }

            var filas = res.data || [];
            var data = filas.map(function(row) {
                var normalizado = {};
                for (var key in row) {
                    var k = key.trim().toLowerCase().replace(/[\s_áéíóú]/g, function(m) {
                        if (m === 'á') return 'a';
                        if (m === 'é') return 'e';
                        if (m === 'í') return 'i';
                        if (m === 'ó') return 'o';
                        if (m === 'ú') return 'u';
                        return '';
                    });

                    if (k === 'evento') normalizado.Evento = row[key];
                    if (k === 'fecha') normalizado.Fecha = row[key];
                    if (k === 'horainicio' || k === 'inicio') normalizado.Hora_Inicio = row[key];
                    if (k === 'horafin' || k === 'fin') normalizado.Hora_Fin = row[key];
                    if (k === 'canal') normalizado.Canal = row[key];
                    if (k === 'torneo') normalizado.Torneo = row[key];
                }
                return normalizado;
            }).filter(function(row) {
                return row.Evento && row.Fecha;
            });

            if (data.length > 0) {
                todosLosEventos = data;
                localStorage.setItem('spg_eventos_cache', JSON.stringify(data));
                renderizarEventos();
            } else {
                mostrarToast('No se encontraron filas con eventos');
            }
        },
        error: function(err) {
            if (btn) {
                btn.classList.remove('is-loading');
                btn.disabled = false;
            }
            var cached = localStorage.getItem('spg_eventos_cache');
            if (cached) {
                todosLosEventos = JSON.parse(cached);
                renderizarEventos();
            } else {
                mostrarToast('Error al conectar con la hoja');
            }
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

function obtenerProgresoTransmision(fechaInicio, fechaFin) {
    var ahora = new Date();
    var duracionTotal = fechaFin - fechaInicio;
    var transcurrido = ahora - fechaInicio;

    if (duracionTotal <= 0) return { porcentaje: 0, etiqueta: '● En el aire' };

    var porcentaje = Math.min(Math.max(Math.round((transcurrido / duracionTotal) * 100), 0), 100);

    return {
        porcentaje: porcentaje,
        etiqueta: '● En el aire'
    };
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
            var prog = obtenerProgresoTransmision(fechaInicio, fechaFin);
            indicadorTiempoHtml = 
                '<div class="progreso-envivo-container">' +
                    '<div class="progreso-envivo-info">' +
                        '<span>' + prog.etiqueta + '</span>' +
                        '<span>' + prog.porcentaje + '%</span>' +
                    '</div>' +
                    '<div class="progreso-envivo-track">' +
                        '<div class="progreso-envivo-fill" style="width: ' + prog.porcentaje + '%;"></div>' +
                    '</div>' +
                '</div>';
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
                    'Recordar' +
                '</a>';
        }

        var botonWspHtml = 
            '<a href="' + linkWhatsApp + '" target="_blank" class="btn-wsp" title="Compartir en WhatsApp">' +
                '<svg viewBox="0 0 24 24"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 15 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67M9.53 6.92C9.34 6.92 9.03 6.99 8.78 7.27C8.52 7.54 7.8 8.22 7.8 9.58C7.8 10.95 8.8 12.26 8.94 12.45C9.08 12.63 11 15.6 13.9 16.85C14.59 17.15 15.13 17.33 15.54 17.46C16.24 17.68 16.87 17.65 17.37 17.58C17.93 17.49 19.09 16.88 19.33 16.19C19.57 15.5 19.57 14.92 19.5 14.79C19.43 14.67 19.24 14.6 18.95 14.46C18.66 14.31 17.24 13.61 16.98 13.51C16.71 13.42 16.52 13.37 16.33 13.66C16.14 13.94 15.58 14.6 15.41 14.79C15.24 14.98 15.07 15 14.78 14.86C14.49 14.71 13.56 14.41 12.45 13.42C11.59 12.65 11 11.7 10.83 11.41C10.66 11.12 10.81 10.97 10.96 10.82C11.09 10.69 11.25 10.48 11.39 10.31C11.53 10.14 11.58 10.02 11.68 9.83C11.78 9.64 11.73 9.47 11.66 9.32C11.59 9.17 11 7.74 10.76 7.15C10.52 6.58 10.28 6.66 10.1 6.65C9.93 6.64 9.74 6.64 9.54 6.64L9.53 6.92Z"/></svg>' +
                'Avisar' +
            '</a>';

        div.innerHTML =
            '<div class="col-logo">' + 
                logoCanal + 
                badgeNumeroHtml + 
            '</div>' +
            '<div class="evento-info">' +
                '<strong>' + ev.Evento + '</strong>' +
                '<small>' + (ev.Torneo || '') + '</small><br>' +
                '<span class="hora-destacada">' + ev.Hora_Inicio + '</span>' +
                '<small> - ' + (ev.Hora_Fin || '') + '</small>' +
                indicadorTiempoHtml +
            '</div>' +
            '<div class="col-logo">' + logoTorneo + '</div>' +
            '<div class="acciones-evento">' +
                botonRecordarHtml +
                botonWspHtml +
            '</div>';

        if (esHoy) {
            if (estaEnVivo) {
                document.querySelector('#ahora .lista').appendChild(div);
            } else {
                document.querySelector('#hoy .lista').appendChild(div);
            }
        } else if (fechaTs > hoyTs) {
            var claveDia = fechaObj.toDateString();
            if (claveDia !== ultimoDiaMostrado) {
                ultimoDiaMostrado = claveDia;
                var sep = document.createElement('div');
                sep.className = 'separador-dia';
                sep.innerText = fechaLegible(fechaObj);
                document.querySelector('#proximos .lista').appendChild(sep);
            }
            document.querySelector('#proximos .lista').appendChild(div);
        }
    });

    ['ahora', 'hoy', 'proximos'].forEach(function(id) {
        var lista = document.querySelector('#' + id + ' .lista');
        if (lista.children.length === 0) {
            lista.innerHTML = '<div class="sin-eventos">Sin eventos para mostrar</div>';
        }
    });
}

function obtenerLinkWhatsApp(evento, torneo, canal, numCanal, objFecha, hora, estaEnVivo) {
    var estadoTxt = estaEnVivo ? '🔴 *¡EN VIVO AHORA!*' : '📅 *' + fechaLegible(objFecha) + ' - ' + hora + '*';
    var canalTxt = canal ? (canal + (numCanal ? ' (' + numCanal + ')' : '')) : 'Tigo Sports';
    var msg = estadoTxt + '\n🏆 *' + evento + '* (' + (torneo || 'Deportes') + ')\n📺 *Canal:* ' + canalTxt + '\n\nMiralo en la app: ' + window.location.href;
    return 'https://api.whatsapp.com/send?text=' + encodeURIComponent(msg);
}

function obtenerLinkGoogleCalendar(evento, torneo, canal, fechaInicio, fechaFin) {
    var isoStart = fechaInicio.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    var isoEnd = fechaFin.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

    var titulo = encodeURIComponent(evento + ' (' + (torneo || 'Deportes') + ')');
    var detalles = encodeURIComponent('Transmite: ' + (canal || 'Tigo Sports') + '\nProgramación Deportiva');

    return 'https://calendar.google.com/calendar/render?action=TEMPLATE&text=' + titulo + '&dates=' + isoStart + '/' + isoEnd + '&details=' + detalles;
}

function compartirApp() {
    var url = window.location.href;
    if (navigator.share) {
        navigator.share({
            title: 'Programación Deportiva',
            text: 'Consulta la guía de eventos deportivos en vivo y próximos.',
            url: url
        }).catch(function() {});
    } else {
        navigator.clipboard.writeText(url).then(function() {
            mostrarToast('Enlace copiado al portapapeles');
        }).catch(function() {
            mostrarToast('No se pudo copiar el enlace');
        });
    }
}

function mostrarToast(mensaje) {
    var toast = document.getElementById('toastMessage');
    if (!toast) return;
    toast.innerText = mensaje;
    toast.classList.add('show');
    setTimeout(function() {
        toast.classList.remove('show');
    }, 2500);
}

var cacheInicial = localStorage.getItem('spg_eventos_cache');
if (cacheInicial) {
    try {
        todosLosEventos = JSON.parse(cacheInicial);
        renderizarEventos();
    } catch(e) {}
}

cargarDatos();
setInterval(cargarDatos, 60000);
