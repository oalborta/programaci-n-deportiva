var CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTpWDOBhG0TjMrBBi1EYQ8fjdlqTKYOV5PZqlgPrm_Pp8qLE-kcX_QoGPLZTofZ7W1JNYHEpBfLvlLL/pub?output=csv';

// Mapa de logos de canales (llaves normalizadas: sin espacios ni signos y en mayúsculas)
var logos = {
    "ESPN": "https://github.com/oalborta/spg/blob/main/espn.png?raw=true",
    "ESPN2": "https://github.com/oalborta/spg/blob/main/espn2.png?raw=true",
    "ESPN3": "https://github.com/oalborta/spg/blob/main/espn3.png?raw=true",
    "ESPN4": "https://github.com/oalborta/spg/blob/main/espn4.png?raw=true",
    "ESPN5": "https://github.com/oalborta/spg/blob/main/espn5.png?raw=true",
    "ESPN6": "https://github.com/oalborta/spg/blob/main/espn6.png?raw=true",
    "ESPN7": "https://github.com/oalborta/spg/blob/main/espn7.png?raw=true",
    "TS1": "https://github.com/oalborta/spg/blob/main/ts1.png?raw=true",
    "TS2": "https://github.com/oalborta/spg/blob/main/ts2.png?raw=true",
    "DSPORTS": "https://github.com/oalborta/spg/blob/main/.png?raw=true",
    "DSPORTS 2": "https://github.com/oalborta/spg/blob/main/2.png?raw=true",
    "TYCSPORTS": "https://github.com/oalborta/spg/blob/main/TyCSp.png?raw=true",
    "T&CSPORTS": "https://github.com/oalborta/spg/blob/main/TyCSp.png?raw=true"
};

var logosTorneo = {
    "MUNDIAL": "https://github.com/oalborta/spg/blob/main/fifa.png?raw=true",
    "F1": "https://github.com/oalborta/spg/blob/main/f1.png?raw=true",
    "TOUR DE FRANCE": "https://github.com/oalborta/spg/blob/main/tdf.png?raw=true",
    "BRASILEIRAO": "https://github.com/oalborta/spg/blob/main/brasileirao.png?raw=true",
    "SUDAMERICANA": "https://github.com/oalborta/spg/blob/main/sudamericana.png?raw=true",
    "LPF ARGENTINA": "https://github.com/oalborta/spg/blob/main/Liga_Argentina_2026.png?raw=true",
    "LA LIGA": "https://github.com/oalborta/spg/blob/main/LaLiga.png?raw=true",
    "Liga Portugal": "https://github.com/oalborta/spg/blob/main/LigaPortugal.png?raw=true",
    "COPA ARGENTINA": "https://github.com/oalborta/spg/blob/main/copa_argentina.png?raw=true",
    "COPA BRASIL": "https://github.com/oalborta/spg/blob/main/copa_brasil.png?raw=true",
    "COPA MUNDIAL FEMENINA - SUB 20": "https://github.com/oalborta/spg/blob/main/femsub20.png?raw=true",
    "PREMIER LEAGUE": "https://github.com/oalborta/spg/blob/main/premier.png?raw=true",
    "US OPEN": "https://github.com/oalborta/spg/blob/main/usopne.png?raw=true",
    "CONMEBOL LIBERTADORES": "https://github.com/oalborta/spg/blob/main/libertadores.png?raw=true",
    "BUNDESLIGA": "https://github.com/oalborta/spg/blob/main/bundes.png?raw=true",
    "SERIE A": "https://github.com/oalborta/spg/blob/main/serieaitalia.png?raw=true",
    "UEFA CHAMPIONS LEAGUE": "https://github.com/oalborta/spg/blob/main/champions.png?raw=true",
    "COPA MUNDIAL FEMENINA - SUB 17": "https://github.com/oalborta/spg/blob/main/fem_u_17.png?raw=true",
    "UEFA NATIONS LEAGUE": "https://github.com/oalborta/spg/blob/main/uefa_nations.png?raw=true",
    "FECHA FIFA": "https://github.com/oalborta/spg/blob/main/fecha_fifa.jpeg?raw=true",
    "CONMEBOL SUB-20 FUTSAL 2026": "https://github.com/oalborta/spg/blob/main/futsal_sub_20.png?raw=true",
    "EFL CHAMPIONSHIP": "https://github.com/oalborta/spg/blob/main/EFL-Championship-v2016.png?raw=true",
    "LIGUE 1": "https://github.com/oalborta/spg/blob/main/Ligue_1.png?raw=true",
    "WIMBLEDON": "https://github.com/oalborta/spg/blob/main/wimbledon.png?raw=true"
};

var diasSemana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
var meses = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

var todosLosEventos = [];
var filtroCanalActual = 'TODOS';
var textoBusquedaActual = '';
var deferredPrompt = null;

// Normaliza texto: quita espacios y caracteres raros para comparar siempre seguro
function limpiarClave(texto) {
    if (!texto) return '';
    return texto.toString().replace(/[\s\-_&]/g, '').toUpperCase();
}

function buscarLogoCanal(nombreCanal) {
    if (!nombreCanal) return null;
    var clave = limpiarClave(nombreCanal);
    if (logos[clave]) return logos[clave];

    // Búsquedas tolerantes
    if (clave.indexOf('2') !== -1 || clave.indexOf('DIRECTV2') !== -1) return logos['2'];
    if (clave.indexOf('') !== -1 || clave.indexOf('DIRECTV') !== -1) return logos[''];
    if (clave.indexOf('TYC') !== -1) return logos['TYCSPORTS'];
    if (clave.indexOf('TS1') !== -1) return logos['TS1'];
    if (clave.indexOf('TS2') !== -1) return logos['TS2'];

    return null;
}

if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('sw.js').catch(function(err) {
            console.log('SW error:', err);
        });
    });
}

window.addEventListener('beforeinstallprompt', function(e) {
    e.preventDefault();
    deferredPrompt = e;
    var btnInstalar = document.getElementById('btnInstalar');
    if (btnInstalar) {
        btnInstalar.style.display = 'inline-flex';
        btnInstalar.onclick = function() {
            btnInstalar.style.display = 'none';
            deferredPrompt.prompt();
            deferredPrompt.userChoice.then(function() {
                deferredPrompt = null;
            });
        };
    }
});

function cargarDatos() {
    var btn = document.getElementById('btnRecargar');
    if (btn) {
        btn.classList.add('is-loading');
        btn.disabled = true;
    }

    Papa.parse(CSV_URL, {
        download: true,
        header: true,
        complete: function(res) {
            if (btn) {
                btn.classList.remove('is-loading');
                btn.disabled = false;
            }
            var data = res.data.filter(function(row) {
                return row.Evento && row.Fecha;
            });
            todosLosEventos = data;
            localStorage.setItem('spg_eventos_cache', JSON.stringify(data));
            renderizarEventos();
        },
        error: function() {
            if (btn) {
                btn.classList.remove('is-loading');
                btn.disabled = false;
            }
            var cached = localStorage.getItem('spg_eventos_cache');
            if (cached) {
                todosLosEventos = JSON.parse(cached);
                renderizarEventos();
                mostrarToast('Sin conexión: usando datos guardados');
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

function obtenerCuentaRegresiva(fecha, hora) {
    var partes = fecha.split('-');
    var h = parseInt(hora.split(':')[0]);
    var m = parseInt(hora.split(':')[1]);
    var eventoFecha = new Date(partes[0], partes[1] - 1, partes[2], h, m);
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

function fechaLegible(fecha) {
    var partes = fecha.split('-');
    var d = new Date(partes[0], partes[1] - 1, partes[2]);
    return diasSemana[d.getDay()] + ' ' + d.getDate() + ' ' + meses[d.getMonth()];
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
        var pA = a.Fecha.split('-');
        var pB = b.Fecha.split('-');
        var fA = new Date(pA[0], pA[1] - 1, pA[2]).getTime();
        var fB = new Date(pB[0], pB[1] - 1, pB[2]).getTime();
        if (fA !== fB) return fA - fB;
        var hA = parseInt(a.Hora_Inicio.split(':')[0]);
        var mA = parseInt(a.Hora_Inicio.split(':')[1]);
        var hB = parseInt(b.Hora_Inicio.split(':')[0]);
        var mB = parseInt(b.Hora_Inicio.split(':')[1]);
        return (hA * 60 + mA) - (hB * 60 + mB);
    });

    var ultimoDiaMostrado = '';

    eventos.forEach(function(ev) {
        if (!ev.Fecha || !ev.Hora_Inicio || !ev.Hora_Fin) return;

        if (textoBusquedaActual) {
            var strTotal = (ev.Evento + ' ' + (ev.Torneo || '') + ' ' + (ev.Canal || '')).toLowerCase();
            if (strTotal.indexOf(textoBusquedaActual) === -1) return;
        }

        var partes = ev.Fecha.split('-');
        var fechaEvento = new Date(partes[0], partes[1] - 1, partes[2]);
        var fechaTs = fechaEvento.getTime();

        var hI = parseInt(ev.Hora_Inicio.split(':')[0]);
        var mI = parseInt(ev.Hora_Inicio.split(':')[1]);
        var hF = parseInt(ev.Hora_Fin.split(':')[0]);
        var mF = parseInt(ev.Hora_Fin.split(':')[1]);

        var fechaInicio = new Date(partes[0], partes[1] - 1, partes[2], hI, mI);
        var fechaFin = new Date(partes[0], partes[1] - 1, partes[2], hF, mF);

        if (fechaFin <= fechaInicio) {
            fechaFin.setDate(fechaFin.getDate() + 1);
        }

        var ahora = new Date();
        if (ahora > fechaFin) return;

        var estaEnVivo = (ahora >= fechaInicio && ahora <= fechaFin);
        var esHoy = (fechaTs === hoyTs);

        if (!esHoy && estaEnVivo) {
            esHoy = true;
        }

        if (filtroCanalActual === 'VIVO' && !estaEnVivo) return;
        if (filtroCanalActual !== 'TODOS' && filtroCanalActual !== 'VIVO') {
            var canalNorm = limpiarClave(ev.Canal);
            if (canalNorm.indexOf(filtroCanalActual) === -1) return;
        }

        var urlLogoCanal = buscarLogoCanal(ev.Canal);
        var logoCanal = urlLogoCanal
            ? '<img src="' + urlLogoCanal + '" class="logo">'
            : '<span class="badge">' + (ev.Canal ? ev.Canal.substring(0, 4).toUpperCase() : '') + '</span>';

        var logoTorneo = logosTorneo[ev.Torneo]
            ? '<img src="' + logosTorneo[ev.Torneo] + '" class="logo">'
            : '<span class="badge">' + (ev.Torneo ? ev.Torneo.substring(0, 3).toUpperCase() : '') + '</span>';

        var cuenta = obtenerCuentaRegresiva(ev.Fecha, ev.Hora_Inicio);
        var cuentaHtml = cuenta ? '<div class="cuenta-regresiva">' + cuenta + '</div>' : '';

        var div = document.createElement('div');
        div.className = 'evento';

        var linkGoogleCal = obtenerLinkGoogleCalendar(ev.Evento, ev.Torneo, ev.Canal, ev.Fecha, ev.Hora_Inicio, ev.Hora_Fin);

        var htmlBotonRecordar = '';
        if (!estaEnVivo) {
            htmlBotonRecordar = 
                '<a href="' + linkGoogleCal + '" target="_blank" class="btn-recordar-pro" title="Guardar recordatorio">' +
                    '<svg viewBox="0 0 24 24">' +
                        '<path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>' +
                        '<path d="M13.73 21a2 2 0 0 1-3.46 0"></path>' +
                    '</svg>' +
                    'Recordar' +
                '</a>';
        }

        div.innerHTML =
            '<div class="col-logo">' + logoCanal + '</div>' +
            '<div class="evento-info">' +
                '<strong>' + ev.Evento + '</strong>' +
                '<small>' + (ev.Torneo || '') + '</small><br>' +
                '<span class="hora-destacada">' + ev.Hora_Inicio + '</span>' +
                '<small> - ' + ev.Hora_Fin + '</small>' +
                cuentaHtml +
            '</div>' +
            '<div class="col-logo">' + logoTorneo + '</div>' +
            htmlBotonRecordar;

        if (esHoy) {
            if (estaEnVivo) {
                document.querySelector('#ahora .lista').appendChild(div);
            } else {
                document.querySelector('#hoy .lista').appendChild(div);
            }
        } else if (fechaTs > hoyTs) {
            if (ev.Fecha !== ultimoDiaMostrado) {
                ultimoDiaMostrado = ev.Fecha;
                var sep = document.createElement('div');
                sep.className = 'separador-dia';
                sep.innerText = fechaLegible(ev.Fecha);
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

function obtenerLinkGoogleCalendar(evento, torneo, canal, fecha, horaInicio, horaFin) {
    var pF = fecha.split('-');
    var pHi = horaInicio.split(':');
    var pHf = horaFin.split(':');

    var dStart = new Date(pF[0], pF[1] - 1, pF[2], parseInt(pHi[0]), parseInt(pHi[1]));
    var dEnd = new Date(pF[0], pF[1] - 1, pF[2], parseInt(pHf[0]), parseInt(pHf[1]));
    if (dEnd <= dStart) dEnd.setDate(dEnd.getDate() + 1);

    var isoStart = dStart.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    var isoEnd = dEnd.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

    var titulo = encodeURIComponent(evento + ' (' + (torneo || 'Deportes') + ')');
    var detalles = encodeURIComponent('Transmite: ' + (canal || 'Ver guía') + '\nProgramación Deportiva');

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
    todosLosEventos = JSON.parse(cacheInicial);
    renderizarEventos();
}

cargarDatos();
setInterval(cargarDatos, 60000);
