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
    ha=parseFloat(document.getElementById("ha").value);
    az_a=ConvertGMSToDD(parseFloat(document.getElementById("az_grados").value),parseFloat(document.getElementById("az_minutos").value),parseFloat(document.getElementById("az_segundos").value),"N");
    
    lat_b=ConvertGMSToDD(parseFloat(document.getElementById("lat_grados2").value),parseFloat(document.getElementById("lat_minutos2").value),parseFloat(document.getElementById("lat_segundos2").value),document.getElementById("direccion2").value);
    hb=parseFloat(document.getElementById("hb").value);
    az_b=ConvertGMSToDD(parseFloat(document.getElementById("az_grados2").value),parseFloat(document.getElementById("az_minutos2").value),parseFloat(document.getElementById("az_segundos2").value),"N");
    s=parseFloat(document.getElementById("dist").value);
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
//Calcular curvatura azimut
function curv_azim(normal,curvatura,azim) {
    azimrad=azim*(Math.PI/180);
    curv_az=(normal*curvatura)/(curvatura*Math.pow(Math.sin(azimrad),2)+normal*Math.pow(Math.cos(azimrad),2));
    return curv_az;
}
//CALCULAR Co
function calc_co() {
    part1=s*s-Math.pow((hb-ha),2);
    part2=(1+(ha/rad))*(1+(hb/rad));
    co=Math.sqrt((part1/part2));
    return co;
}
//Calcular Sfinal
function calc_s() {
    s_calc=cco+((cco*cco*cco)/(24*rad*rad))+((cco*cco*cco*cco*cco)/(1920*rad*rad*rad*rad));
    return s_calc;
}
//BOTON
function boton(){
    getDataElipsoide();
    get_dat();
    n_a=radnormal(aElipsoide,e2Elipsoide,lat_a);
    m_a=radmeridiana(aElipsoide,e2Elipsoide,lat_a);
    curv_az_a=curv_azim(n_a,m_a,az_a);
    
    n_b=radnormal(aElipsoide,e2Elipsoide,lat_b);
    m_b=radmeridiana(aElipsoide,e2Elipsoide,lat_b);
    curv_az_b=curv_azim(n_b,m_b,az_b);
    rad=(curv_az_a+curv_az_b)/2;
    cco=calc_co();
    calc_s();
    }
//MOOSTRAR DATOS
function setData(){
        document.getElementById("resul").innerHTML="ρ<sub>αAB</sub>= " + curv_az_a+"<br>ρ<sub>αBA</sub>= " + curv_az_b+"<br>R= "+rad+"<br>Co= "+cco+"<br>S= "+s_calc;
    
    
}
