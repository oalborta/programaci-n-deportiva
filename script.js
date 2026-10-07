var CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTpWDOBhG0TjMrBBi1EYQ8fjdlqTKYOV5PZqlgPrm_Pp8qLE-kcX_QoGPLZTofZ7W1JNYHEpBfLvlLL/pub?output=csv';

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
    "DSPORTS": "https://github.com/oalborta/spg/blob/main/DSPORTS.png?raw=true",
    "DSPORTS2": "https://github.com/oalborta/spg/blob/main/DSPORTS2.png?raw=true",
    "TYCSPORTS": "https://github.com/oalborta/spg/blob/main/TyCSp.png?raw=true",
    "T&CSPORTS": "https://github.com/oalborta/spg/blob/main/TyCSp.png?raw=true"
};

var canalesTigo = {
    "TS1": "Ch. 700 / 1",
    "TS2": "Ch. 715",
    "ESPN": "Ch. 508",
    "ESPN2": "Ch. 509",
    "ESPN3": "Ch. 510",
    "ESPN4": "Ch. 511",
    "ESPN5": "Ch. 512",
    "ESPN6": "Ch. 513",
    "ESPN7": "Ch. 514",
    "TYCSPORTS": "Ch. 708",
    "T&CSPORTS": "Ch. 708",
    "DSPORTS": "DGO / App",
    "DSPORTS2": "DGO / App"
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

function limpiarClave(texto) {
    if (!texto) return '';
    return texto.toString().replace(/[\s\-_&.]/g, '').toUpperCase().trim();
}

function buscarLogoCanal(nombreCanal) {
    if (!nombreCanal) return null;
    var clave = limpiarClave(nombreCanal);

    if (clave === 'DSPORTS2' || clave === 'DIRECTV2' || clave.indexOf('DSPORTS2') !== -1 || clave.indexOf('DIRECTVSPORTS2') !== -1) {
        return logos['DSPORTS2'];
    }
    if (clave === 'DSPORTS' || clave === 'DIRECTV' || clave.indexOf('DSPORTS') !== -1 || clave.indexOf('DIRECTVSPORTS') !== -1) {
        return logos['DSPORTS'];
    }

    if (logos[clave]) return logos[clave];

    if (clave.indexOf('TYC') !== -1) return logos['TYCSPORTS'];
    if (clave.indexOf('TS1') !== -1) return logos['TS1'];
    if (clave.indexOf('TS2') !== -1) return logos['TS2'];

    return null;
}

function obtenerNumeroCanalTigo(nombreCanal) {
    if (!nombreCanal) return '';
    var clave = limpiarClave(nombreCanal);
    if (canalesTigo[clave]) return canalesTigo[clave];
    if (clave.indexOf('TS1') !== -1 || clave === 'TS') return canalesTigo['TS1'];
    if (clave.indexOf('TS2') !== -1) return canalesTigo['TS2'];
    if (clave.indexOf('TYC') !== -1) return canalesTigo['TYCSPORTS'];
    if (clave.indexOf('DSPORTS2') !== -1) return canalesTigo['DSPORTS2'];
    if (clave.indexOf('DSPORTS') !== -1) return canalesTigo['DSPORTS'];
    return '';
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
        skipEmptyLines: true,
        complete: function(res) {
            if (btn) {
                btn.classList.remove('is-loading');
                btn.disabled = false;
            }

            var data = (res.data || []).filter(function(row) {
                return row.Evento && row.Fecha;
            });

            todosLosEventos = data;
            renderizarEventos();
        },
        error: function(err) {
            if (btn) {
                btn.classList.remove('is-loading');
                btn.disabled = false;
            }
            mostrarToast('Error al conectar con la hoja');
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
            indicadorTiempoHtml = '<div class="minuto-vivo">● En juego (' + obtenerTiempoTranscurrido(fechaInicio) + ')</div>';
        } else {
            var cuenta = obtenerCuentaRegresiva(ev.Fecha, ev.Hora_Inicio);
            indicadorTiempoHtml = cuenta ? '<div class="cuenta-regresiva">' + cuenta + '</div>' : '';
        }

        var linkWhatsApp = obtenerLinkWhatsApp(ev.Evento, ev.Torneo, ev.Canal, numCanalTigo, ev.Fecha, ev.Hora_Inicio, estaEnVivo);
        var linkGoogleCal = obtenerLinkGoogleCalendar(ev.Evento, ev.Torneo, ev.Canal, ev.Fecha, ev.Hora_Inicio, ev.Hora_Fin);

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
                '<small> - ' + ev.Hora_Fin + '</small>' +
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

function obtenerLinkWhatsApp(evento, torneo, canal, numCanal, fecha, hora, estaEnVivo) {
    var estadoTxt = estaEnVivo ? '🔴 *¡EN VIVO AHORA!*' : '📅 *' + fechaLegible(fecha) + ' - ' + hora + '*';
    var canalTxt = canal ? (canal + (numCanal ? ' (' + numCanal + ')' : '')) : 'Tigo Sports';
    var msg = estadoTxt + '\n🏆 *' + evento + '* (' + (torneo || 'Deportes') + ')\n📺 *Canal:* ' + canalTxt + '\n\nMiralo en la app: ' + window.location.href;
    return 'https://api.whatsapp.com/send?text=' + encodeURIComponent(msg);
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

cargarDatos();
setInterval(cargarDatos, 60000);
