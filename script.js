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

// Canales oficiales HD en Tigo
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

/* ─── MOTOR DE INSTALACIÓN DIRECTA PWA ─── */
var deferredPrompt = null;

if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('./sw.js').then(function(reg) {
            reg.update();
        }).catch(function(err) {
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
    } else {
        var esStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone;
        if (esStandalone) {
            mostrarToast('La aplicación ya está instalada');
        } else {
            mostrarToast('Abriendo instalador del navegador...');
            if (window.navigator && window.navigator.serviceWorker) {
                navigator.serviceWorker.getRegistration().then(function(reg) {
                    if (reg) reg.update();
                });
            }
        }
    }
}

window.addEventListener('appinstalled', function() {
    var btn = document.getElementById('btnInstalar');
    if (btn) btn.style.display = 'none';
    deferredPrompt = null;
    mostrarToast('¡App instalada con éxito!');
});

/* ─── MODO OSCURO / NOCHE ─── */
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
    var clave = limpiarClave(nombreCan
