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
//Seleccionar origen
function selec_origen() {
    opc=document.getElementById("orig").value;
    if (opc=="bogota") {
        document.getElementById("lat_grados").value="4";
        document.getElementById("lat_minutos").value="35";
        document.getElementById("lat_segundos").value="56.57";
        document.getElementById("direccion").value="N";
        document.getElementById("lon_grados").value="74";
        document.getElementById("lon_minutos").value="4";
        document.getElementById("lon_segundos").value="51.3";
        document.getElementById("lon_direccion").value="W";
    }else if (opc=="este_central") {
        document.getElementById("lat_grados").value="4";
        document.getElementById("lat_minutos").value="35";
        document.getElementById("lat_segundos").value="56.57";
        document.getElementById("direccion").value="N";
        document.getElementById("lon_grados").value="71";
        document.getElementById("lon_minutos").value="4";
        document.getElementById("lon_segundos").value="51.3";
        document.getElementById("lon_direccion").value="W";
    }else if (opc=="este_este") {
        document.getElementById("lat_grados").value="4";
        document.getElementById("lat_minutos").value="35";
        document.getElementById("lat_segundos").value="56.57";
        document.getElementById("direccion").value="N";
        document.getElementById("lon_grados").value="68";
        document.getElementById("lon_minutos").value="4";
        document.getElementById("lon_segundos").value="51.3";
        document.getElementById("lon_direccion").value="W";
    }else if (opc=="oeste") {
        document.getElementById("lat_grados").value="4";
        document.getElementById("lat_minutos").value="35";
        document.getElementById("lat_segundos").value="56.57";
        document.getElementById("direccion").value="N";
        document.getElementById("lon_grados").value="77";
        document.getElementById("lon_minutos").value="4";
        document.getElementById("lon_segundos").value="51.3";
        document.getElementById("lon_direccion").value="W";
    }else if (opc=="oeste_oeste") {
        document.getElementById("lat_grados").value="4";
        document.getElementById("lat_minutos").value="35";
        document.getElementById("lat_segundos").value="56.57";
        document.getElementById("direccion").value="N";
        document.getElementById("lon_grados").value="80";
        document.getElementById("lon_minutos").value="4";
        document.getElementById("lon_segundos").value="51.3";
        document.getElementById("lon_direccion").value="W";
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
//ARCO DE MERIDIANO DE PUNTO
function calc_alpha(a,b,n){
    alpha=((a+b)/2)*(1+((1/4)*n*n)+((1/64)*n*n*n*n));
    return alpha;
}
function calc_beta(n){
    beta=((-3/2)*n)+((9/16)*n*n*n)-((3/2)*n*n*n*n*n);
    return beta;
}
function calc_gamma(n){
    gamma=((15/16)*n*n)-((15/32)*n*n*n*n);
    return gamma;
}
function calc_delta(n){
    delta=((-35/48)*n*n*n)+((105/256)*n*n*n*n*n);
    return delta;
}
function calc_epsilon(n){
    epsilon=((315/512)*n*n*n*n);
    return epsilon;
}
function calc_n(a,b){
    n=(a-b)/(a+b);
    return n;
}
function arc_mer_punto(lat){
    latrad=lat*(Math.PI/180);
    amp=alpha*(latrad+(beta*Math.sin(2*latrad))+(gamma*Math.sin(4*latrad))+(delta*Math.sin(6*latrad))+(epsilon*Math.sin(8*latrad)));
    return amp;
}
//COORDENADA NORTE
function calc_t(lat) {
    latrad=lat*(Math.PI/180);
    t=Math.tan(latrad);
return t;
}
function calc_ncuad(lat) {
    latrad=lat*(Math.PI/180);
    ncuad=e2seg*Math.cos(latrad)*Math.cos(latrad);
return ncuad;
}
function calc_l(lonp,lono) {
    //lonprad=lonp*(Math.PI/180);
    //lonorad=lono*(Math.PI/180);
    l=(lonp-lono)*3600;
return l;
}
function calc_norte(lat) {
    latrad=lat*(Math.PI/180);
    sen1s=Math.sin((1/3600)*(Math.PI/180));
    part_o=punto-origen;
    part_a=((t/2)*normal*l*l*Math.cos(latrad)*Math.cos(latrad))*sen1s*sen1s;
    part_b=((t/24)*Math.pow(sen1s,4)*normal*Math.pow(Math.cos(latrad),4)*(5-(t*t)+(9*ncuad)+(4*ncuad*ncuad))*Math.pow(l,4));
    part_c=((t/720)*Math.pow(sen1s,6)*normal*Math.pow(Math.cos(latrad),6)*(61-(58*t*t)+Math.pow(t,4)+(270*ncuad)-(330*t*t*ncuad))*Math.pow(l,6));
    part_d=((t/40320)*Math.pow(sen1s,8)*normal*Math.pow(Math.cos(latrad),8)*(1385-(3111*t*t)+(543*t*t*t*t)-(Math.pow(t,6)))*Math.pow(l,8));
    norte=1000000+part_o+part_a+part_b+part_c+part_d;
    return norte;
}
function calc_este(lat){
    latrad=lat*(Math.PI/180);
    sen1s=Math.sin((1/3600)*(Math.PI/180));
    part_1=normal*l*Math.cos(latrad)*sen1s;
    part_2=((1/6)*Math.pow(sen1s,3)*normal*Math.pow(Math.cos(latrad),3)*(1-(t*t)+ncuad)*l*l*l);
    part_3=(1/120)*Math.pow(sen1s,5)*normal*Math.pow(Math.cos(latrad),5)*(5-(18*t*t)+(t*t*t*t)+(14*ncuad)-(58*t*t*ncuad))*l*l*l*l*l;
    part_4=(1/5040)*Math.pow(sen1s,7)*normal*Math.pow(Math.cos(latrad),7)*(61-(479*t*t)+(179*t*t*t*t)-(t*t*t*t*t*t))*Math.pow(l,7);
    este=1000000+part_1+part_2+part_3+part_4;
    return este
}
//BOTON
function boton(){
    getDataElipsoide();
    get_dat();
    e2seg=calc_e2segunda(bElipsoide,aElipsoide)
    radnormal(aElipsoide,e2Elipsoide,lat2)
    calc_n(aElipsoide,bElipsoide);
    calc_alpha(aElipsoide,bElipsoide,n);
    calc_beta(n);
    calc_gamma(n);
    calc_delta(n);
    calc_epsilon(n);
    origen=arc_mer_punto(lat);
    punto=arc_mer_punto(lat2);
    calc_t(lat2);
    calc_ncuad(lat2);
    calc_l(lon2,lon);
    calc_norte(lat2);
    calc_este(lat2);

    }
//MOOSTRAR DATOS
function setData(){

    document.getElementById("resul").innerHTML="Norte= "+norte+"<br>Este= "+este;
    
}
