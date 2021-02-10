//Seleccionar elipsoide
function selec_elip() {
    opc=document.getElementById("elip_ref").value;
    if (opc=="wgs84") {
        document.getElementById("aElipsoide").value="6378137";
        document.getElementById("bElipsoide").value="6356752.3141";
        document.getElementById("fElipsoide").value="298.257222101";
    }else if (opc=="internacional") {
        document.getElementById("aElipsoide").value="6378388";
        document.getElementById("bElipsoide").value="6356911.946";
        document.getElementById("fElipsoide").value="297";
    }
}
//guardar datos elipsoide
function getDataElipsoide() {
    aElipsoide =parseFloat(document.getElementById("aElipsoide").value);
    bElipsoide =parseFloat(document.getElementById("bElipsoide").value);
    fElipsoide= parseFloat(document.getElementById("fElipsoide").value);
    e2Elipsoide=calc_e2(bElipsoide,aElipsoide);
    document.getElementById("e2").innerHTML="<h2>Calculados</h2>e<sup>2</sup> =  "  + e2Elipsoide;
}
//guardar Datos iniciales
function get_dat(){
    lat=ConvertGMSToDD(parseFloat(document.getElementById("lat_grados").value),parseFloat(document.getElementById("lat_minutos").value),parseFloat(document.getElementById("lat_segundos").value),document.getElementById("direccion").value);
    lon=ConvertGMSToDD(parseFloat(document.getElementById("lon_grados").value),parseFloat(document.getElementById("lon_minutos").value),parseFloat(document.getElementById("lon_segundos").value),document.getElementById("lon_direccion").value);
    
    h=parseFloat(document.getElementById("altura").value);
    dx=parseFloat(document.getElementById("dx").value);
    dy=parseFloat(document.getElementById("dy").value);
    dz=parseFloat(document.getElementById("dz").value);
    rx=parseFloat(document.getElementById("rx").value);
    ry=parseFloat(document.getElementById("ry").value);
    rz=parseFloat(document.getElementById("rz").value);
    dl=parseFloat(document.getElementById("dl").value);
}
// Convertir grados a decimal
function ConvertGMSToDD(grados, minutos, segundos, direccion) {
    var dd = grados + minutos/60 + segundos/(60*60);
    if (direccion == "S" || direccion == "W") {
        dd = dd * (-1);
    } // Don't do anything for N or E
return dd;
}
//Convertir decimal a grados
function ConvertDDtoGMS(lat){
    var latn = Math.abs(lat); /* Devuelve el valor absoluto de un número, sea positivo o negativo */
    var latgr = Math.floor(latn * 1); /* Redondea un número hacia abajo a su entero más cercano */
    var latmin = Math.floor((latn - latgr) * 60); /* Vamos restando el número entero para transformarlo en minutos */
    var latseg = ((((latn - latgr) * 60) - latmin) * 60); /* Restamos el entero  anterior ahora para segundos */
    var latc = (latgr + "º " + latmin + "\' " + latseg.toFixed(7) + '\"'); /* Prolongamos a centésimas de segundo */
    if (lat > 0) {
        x = latc + ' N'; /* Si el número original era positivo, es Norte */
    } else {
        x = latc + ' S'; /* Si el número original era negativo, es Sur */
        }
        
return x;
}
// Calcular e2
function calc_e2(b,a){
    e2calc =(1-((b*b)/(a*a)));
return e2calc;
}
// Calcular e2 segunda
function calc_e2segunda(b,a){
    e2segunda =((a*a)-(b*b))/(b*b);
return e2segunda;
}
// PRIMER VERTICAL O GRAN NORMAL
function radnormal(a,e2,lat){
    latRad=lat*(Math.PI/180);
    normal=a/Math.sqrt(1-e2*(Math.sin(latRad)*Math.sin(latRad)));
return normal;
}
//CURVATURA SECCION MERIDIANA
function radmeridiana(a,e2,lat){
    latRad=lat*(Math.PI/180);
    w=Math.pow((1-e2*(Math.sin(latRad)*Math.sin(latRad))),3/2);
    m=a*(1-e2)/w;
return m;
}
//COORDENADAS X, Y , Z con a, e^2, latitud, longitud
ae2latlon_x = function(lat,lon,a,e2,h) {
    latRad=lat*(Math.PI/180);
    lonRad=lon*(Math.PI/180);
    w=Math.sqrt(1-e2*Math.pow(Math.sin(latRad),2));
    n=a/w;
    x=(n+h)*Math.cos(latRad)*Math.cos(lonRad);
return x;
}
ae2latlon_y = function(lat,lon,a,e2,h) {
    latRad=lat*(Math.PI/180);
    lonRad=lon*(Math.PI/180);
    w=Math.sqrt(1-e2*Math.pow(Math.sin(latRad),2));
    n=a/w;
    y=(n+h)*Math.cos(latRad)*Math.sin(lonRad);
return y;
}
ae2latlon_z = function(lat,lon,a,e2,h) {
    latRad=lat*(Math.PI/180);
    lonRad=lon*(Math.PI/180);
    w=Math.sqrt(1-e2*Math.pow(Math.sin(latRad),2));
    n=a/w;
    z=(n*(1-e2)+h)*Math.sin(latRad);
return z;
}
//NUEVAS COORDENADAS
function nuev_coor(){
    x_n=dx+x+(rz*y)-(ry*z)+(x*dl);
    y_n=dy+y+-(rz*x)+(rx*z)+(y*dl);
    z_n=dz+z+(ry*x)-(rx*y)+(z*dl);
}
//BOTON
function boton(){
    getDataElipsoide();
    get_dat();
    ae2latlon_x(lat,lon,aElipsoide,e2Elipsoide,h);
    ae2latlon_y(lat,lon,aElipsoide,e2Elipsoide,h);
    ae2latlon_z(lat,lon,aElipsoide,e2Elipsoide,h);
    nuev_coor();
    }
//MOOSTRAR DATOS
function setData(){
        document.getElementById("x").innerHTML="<h2>Coordenadas Iniciales</h2>X= " + x+"<br>Y= "+y+"<br>Z= "+z;;
        
        document.getElementById("resul").innerHTML="<h2>Coordenadas Nuevas</h2>X= " + x_n+"<br>Y= "+y_n+"<br>Z= "+z_n;
    
    
}
