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

    if (clave.indexOf('DSPORTS2') !== -1 || clave.indexOf('DIRECTV2') !== -1) return canalesTigo['DSPORTS2'];
    if (clave.indexOf('DSPORTS') !== -1 || clave.indexOf('DIRECTV') !== -1) return canalesTigo['DSPORTS'];

    if (canalesTigo[clave]) return canalesTigo[clave];
    if (clave.indexOf('TS2') !== -1) return canalesTigo['TS2'];
    if (clave.indexOf('TS1') !== -1 || clave === 'TS') return canalesTigo
