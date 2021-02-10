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
    lat2=ConvertGMSToDD(parseFloat(document.getElementById("lat_grados2").value),parseFloat(document.getElementById("lat_minutos2").value),parseFloat(document.getElementById("lat_segundos2").value),document.getElementById("direccion2").value);
    lon2=ConvertGMSToDD(parseFloat(document.getElementById("lon_grados2").value),parseFloat(document.getElementById("lon_minutos2").value),parseFloat(document.getElementById("lon_segundos2").value),document.getElementById("lon_direccion2").value);
    pp=parseFloat(document.getElementById("pp").value);
    orig_norte=parseFloat(document.getElementById("no").value);
    orig_este=parseFloat(document.getElementById("eo").value);
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
//HALLAR NORTE
function calc_norte() {
    part_1=(Math.tan(lat*(Math.PI/180))*Math.pow((delt_lon*(Math.PI/180))*normal_punto*Math.cos(lat2),2))/(2*curv_orig*normal_orig);
    part_2=1+(pp/curv_med);
    norte=(curv_orig*((delt_lat*(Math.PI/180))+part_1)*part_2)+orig_norte;
    return norte;
}
function delta(segun,prim){
    delt=segun-prim;
    return delt;
}
function media(segun,prim){
    med=(segun+prim)/2;
    return med;
}
//HALLAR ESTE
function calc_este(){
    este=(delt_lon*(Math.PI/180))*normal_punto*Math.cos(lat2*(Math.PI/180))*(1+(pp/normal_orig))+orig_este;
    return este;
}
//BOTON
function boton(){
    getDataElipsoide();
    get_dat();
    normal_orig=radnormal(aElipsoide,e2Elipsoide,lat);
    normal_punto=radnormal(aElipsoide,e2Elipsoide,lat2);
    curv_orig=radmeridiana(aElipsoide,e2Elipsoide,lat);
    lat_medi=media(lat2,lat);
    curv_med=radmeridiana(aElipsoide,e2Elipsoide,lat_medi);
    curv_orig=radmeridiana(aElipsoide,e2Elipsoide,lat);
    delt_lat=delta(lat2,lat);
    delt_lon=delta(lon2,lon);
    calc_norte();
    calc_este();

    }
//MOOSTRAR DATOS
function setData(){

    document.getElementById("resul").innerHTML="Norte= "+norte+"<br>Este= "+este;
    
}
