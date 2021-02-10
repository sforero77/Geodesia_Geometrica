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
    lat_a=ConvertGMSToDD(parseFloat(document.getElementById("lat_grados").value),parseFloat(document.getElementById("lat_minutos").value),parseFloat(document.getElementById("lat_segundos").value),document.getElementById("direccion").value);
    lon_a=ConvertGMSToDD(parseFloat(document.getElementById("lon_grados").value),parseFloat(document.getElementById("lon_minutos").value),parseFloat(document.getElementById("lon_segundos").value),document.getElementById("lon_direccion").value);
    az_a=ConvertGMSToDD(parseFloat(document.getElementById("az_grados").value),parseFloat(document.getElementById("az_minutos").value),parseFloat(document.getElementById("az_segundos").value),"N");
    
    lat_g=ConvertGMSToDD(parseFloat(document.getElementById("lat_grados2").value),parseFloat(document.getElementById("lat_minutos2").value),parseFloat(document.getElementById("lat_segundos2").value),document.getElementById("direccion2").value);
    lon_g=ConvertGMSToDD(parseFloat(document.getElementById("lon_grados2").value),parseFloat(document.getElementById("lon_minutos2").value),parseFloat(document.getElementById("lon_segundos2").value),document.getElementById("lon_direccion2").value);
    az_g=ConvertGMSToDD(parseFloat(document.getElementById("az_grados2").value),parseFloat(document.getElementById("az_minutos2").value),parseFloat(document.getElementById("az_segundos2").value),"N");

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
// CALCULAR ZETA Y ETA
function calc_zeta(lat_astro,lat_geod){
    zeta=(lat_astro*(Math.PI/180)-lat_geod*(Math.PI/180))*(180/Math.PI)*3600;
    return zeta;    
}
function calc_eta(lat_astro,lon_astro,lon_geod) {
    eta=((lon_astro*(Math.PI/180)-lon_geod*(Math.PI/180))*Math.cos(lat_astro*(Math.PI/180)))*((180/Math.PI)*3600);
    return eta;
}
function calc_teta(zeta,eta) {
    teta=Math.sqrt(zeta*zeta+eta*eta);
    return teta;
}
//CALCULAR AZ GEOD Y ASTRO
function calc_azgeo(az_astro,lon_astro,lon_geod,lat_astro) {
    azgeorad=az_astro*(Math.PI/180)-((lon_astro*(Math.PI/180)-lon_geod*(Math.PI/180))*Math.sin(lat_astro*(Math.PI/180)));
    azgeod=azgeorad*(180/Math.PI);
    return azgeod;
}
function calc_azastro(az_geod,lon_astro,lon_geod,lat_astro) {
    azastrorad=az_geod*(Math.PI/180)+((lon_astro*(Math.PI/180)-lon_geod*(Math.PI/180))*Math.sin(lat_astro*(Math.PI/180)));
    azastro=azastrorad*(180/Math.PI);
    return azastro;
}
//BOTON
function boton(){
    getDataElipsoide();
    get_dat();
    calc_zeta(lat_a,lat_g);
    calc_eta(lat_a,lon_a,lon_g);
    calc_teta(zeta,eta);
    calc_azgeo(az_a,lon_a,lon_g,lat_a);
    calc_azastro(az_g,lon_a,lon_g,lat_a);
    }
//MOOSTRAR DATOS
function setData(){
        document.getElementById("resul").innerHTML="ξ= " + zeta+"<br>ᶇ= "+eta+"<br>Ѳ= "+teta;
    
    
}
