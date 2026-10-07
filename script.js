var CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTpWDOBhG0TjMrBBi1EYQ8fjdlqTKYOV5PZqlgPrm_Pp8qLE-kcX_QoGPLZTofZ7W1JNYHEpBfLvlLL/pub?output=csv';

var BASE_REPO_URL = 'https://raw.githubusercontent.com/oalborta/programaci-n-deportiva/main/';

var logos = {
    "ESPN": BASE_REPO_URL + "espn.png",
    "ESPN2": BASE_REPO_URL + "espn2.png",
    "ESPN3": BASE_REPO_URL + "espn3.png",
    "ESPN4": BASE_REPO_URL + "espn4.png",
    "ESPN5": BASE_REPO_URL + "espn5.png",
    "ESPN6": BASE_REPO_URL + "espn6.png",
    "ESPN7": BASE_REPO_URL + "espn7.png",
    "TS1": BASE_REPO_URL + "ts1.png",
    "TS2": BASE_REPO_URL + "ts2.png",
    "DSPORTS": BASE_REPO_URL + "DSPORTS.png",
    "DSPORTS2": BASE_REPO_URL + "DSPORTS2.png",
    "TYCSPORTS": BASE_REPO_URL + "TyCSp.png",
    "T&CSPORTS": BASE_REPO_URL + "TyCSp.png"
};

// Grilla oficial HD en Tigo
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
    "MUNDIAL": BASE_REPO_URL + "fifa.png",
    "F1": BASE_REPO_URL + "f1.png",
    "TOUR DE FRANCE": BASE_REPO_URL + "tdf.png",
    "BRASILEIRAO": BASE_REPO_URL + "brasileirao.png",
    "SUDAMERICANA": BASE_REPO_URL + "sudamericana.png",
    "LPF ARGENTINA": BASE_REPO_URL + "Liga_Argentina_2026.png",
    "LA LIGA": BASE_REPO_URL + "LaLiga.png",
    "Liga Portugal": BASE_REPO_URL + "LigaPortugal.png",
    "COPA ARGENTINA": BASE_REPO_URL + "copa_argentina.png",
    "COPA BRASIL": BASE_REPO_URL + "copa_brasil.png",
    "COPA MUNDIAL FEMENINA - SUB 20": BASE_REPO_URL + "femsub20.png",
    "PREMIER LEAGUE": BASE_REPO_URL + "premier.png",
    "US OPEN": BASE_REPO_URL + "usopne.png",
    "CONMEBOL LIBERTADORES": BASE_REPO_URL + "libertadores.png",
    "BUNDESLIGA": BASE_REPO_URL + "bundes.png",
    "SERIE A": BASE_REPO_URL + "serieaitalia.png",
    "UEFA CHAMPIONS LEAGUE": BASE_REPO_URL + "champions.png",
    "COPA MUNDIAL FEMENINA - SUB 17": BASE_REPO_URL + "fem_u_17.png",
    "UEFA NATIONS LEAGUE": BASE_REPO_URL + "uefa_nations.png",
    "FECHA FIFA": BASE_REPO_URL + "fecha_fifa.jpeg",
    "CONMEBOL SUB-20 FUTSAL 2026": BASE_REPO_URL + "futsal_sub_20.png",
    "EFL CHAMPIONSHIP": BASE_REPO_URL + "EFL-Championship-v2016.png",
    "LIGUE 1": BASE_REPO_URL + "Ligue_1.png",
    "WIMBLEDON": BASE_REPO_URL + "wimbledon.png"
};

var diasSemana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
var meses = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

var todosLosEventos = [];
var filtroCanalActual = 'TODOS';
var textoBusquedaActual = '';
var deferredPrompt = null;

/* ─── LÓGICA DE INSTALACIÓN PWA ─── */
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

function esDispositivoIOS() {
    return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
}

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
        return;
    }

    if (esDispositivoIOS()) {
        mostrarToast('En iPhone: toca Compartir (icono con flecha) y luego "Agregar a inicio"');
        return;
    }

    var esStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone;
    if (esStandalone) {
        mostrarToast('La aplicación ya está instalada');
    } else {
        mostrarToast('En Chrome: toca los tres puntos (⋮) y elige "Instalar aplicación"');
    }
}

window.addEventListener('appinstalled', function() {
    var btn = document.getElementById('btnInstalar');
    if (btn) btn.style.display = 'none';
    deferredPrompt = null;
    mostrarToast('¡Aplicación instalada con éxito!');
});

/* ─── MODO OSCURO / NOCHE ─── */
function inicializarTema() {
    var guardado = localStorage.getItem('guia_tema');
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
    localStorage.setItem('guia_tema', !esOscuro ? 'dark' : 'light');
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

/* ─── UTILIDADES Y PROCESAMIENTO ─── */
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

function cargarDatos() {
    var btn = document.getElementById('btnRecargar');
    if (btn) {
        btn.classList.add('is-loading');
        btn.disabled = true;
    }

    Papa.parse(CSV_URL, {
        download: true,
        header: true,
        skipEmptyLines: true,
        complete: function(res) {
            if (btn) {
                btn.classList.remove('is-loading');
                btn.disabled = false;
            }

            var filas = res.data || [];
            var data = filas.map(function(row) {
                var normalizado = {};
                for (var key in row) {
                    var claveLimpia = key.trim().toLowerCase().replace(/[\s_]/g, '');
                    if (claveLimpia === 'evento') normalizado.Evento = row[key];
                    if (claveLimpia === 'fecha') normalizado.Fecha = row[key];
                    if (claveLimpia === 'horainicio') normalizado.Hora_Inicio = row[key];
                    if (claveLimpia === 'horafin') normalizado.Hora_Fin = row[key];
                    if (claveLimpia === 'canal') normalizado.Canal = row[key];
                    if (claveLimpia === 'torneo') normalizado.Torneo = row[key];
                }
                return normalizado;
            }).filter(function(row) {
                return row.Evento && row.Fecha;
            });

            if (data.length > 0) {
                todosLosEventos = data;
                localStorage.setItem('guia_deportes_cache', JSON.stringify(data));
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
            var cached = localStorage.getItem('guia_deportes_cache');
            if (cached) {
                todosLosEventos = JSON.parse(cached);
                renderizarEventos();
                mostrarToast('Usando datos guardados');
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

function obtenerTiempoTranscurrido(fechaInicio) {
    var ahora = new Date();
    var diff = ahora - fechaInicio;
    var mins = Math.floor(diff / 60000);
    if (mins < 0) mins = 0;
    if (mins < 60) return mins + "'";
    var hrs = Math.floor(mins / 60);
    var restoMins = mins % 60;
    return hrs + 'h ' + restoMins + 'm';
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
        var mA = parseInt((a.Hora_Inicio ||
