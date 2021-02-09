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
// PRIMER VERTICAL O GRAN NORMAL
function radnormal(a,e2,lat){
    latRad=lat*(Math.PI/180);
    n=a/Math.sqrt(1-e2*(Math.sin(latRad)*Math.sin(latRad)));
return n;
}
//CURVATURA SECCION MERIDIANA
function radmeridiana(a,e2,lat){
    latRad=lat*(Math.PI/180);
    w=Math.pow((1-e2*(Math.sin(latRad)*Math.sin(latRad))),3/2);
    m=a*(1-e2)/w;
return m;
}
//constantes
function constpuis(n,m,lat){
    latRad=lat*(Math.PI/180);
    const_b=1/(m*0.00000484813681109536);
    const_c=Math.tan(latRad)/(2*m*n*0.00000484813681109536);
    const_d=(3*e2Elipsoide*Math.sin(latRad)*Math.cos(latRad)*0.00000484813681109536)/(2*(1-e2Elipsoide*Math.sin(latRad)*Math.sin(latRad)));
    const_e=(1+3*Math.tan(latRad)*Math.tan(latRad))/(6*n*n);
    
}
//deltas
function deltas() {
    del_lat=(lat2-lat)*3600;
    console.log(del_lat);
    del_lon=(lon2-lon)*3600;
    console.log(del_lon);
    del_lon_rad=del_lon*(Math.PI/180);
    lat2_Rad=lat2*(Math.PI/180);
    xcalc=n2*Math.sin(del_lon_rad/3600)*Math.cos(lat2_Rad);
    console.log(xcalc);
    ycalc=(-del_lat-(const_c*xcalc*xcalc)-(const_d*del_lat*del_lat))/(const_b*(1-(const_e*xcalc*xcalc)));
    console.log(ycalc);
    etr=((xcalc)/(ycalc));
    alpha=Math.atan(etr)*(180/Math.PI);
    console.log(alpha);

    latpromrad=((lat+lat2)/2)*(Math.PI/180);
    del_latrad=del_lat*(Math.PI/180);
    del_az=(del_lon/3600)*Math.sin(latpromrad)*(1/Math.cos(del_latrad/7200))+((Math.pow((del_lon/3600),3)/12))*(Math.sin(latpromrad)*Math.cos(latpromrad)*Math.cos(latpromrad)*0.00000484813681109536*0.00000484813681109536);
    
    del_alpha=(del_lon/3600)*(Math.sin((((lat2+lat)/2)*(Math.PI/180)))*(1/Math.cos(((del_lat/7200)*(Math.PI/180)))));
    console.log(del_az);
}
//resultados
function result() {
    if((del_lon)<0 && del_lat>0){
        re=360-alpha;
    }else if ((del_lon)<0 && del_lat<0) {
        re=alpha+180;
    }else if ((del_lon)>0 && del_lat<0 ) {
        re=180-alpha;
    }else if ((del_lon)>0 && del_lat>0 ) {
        re=-alpha;//revisar
    }
    console.log(re);

    if ((re+del_az+180)>=360) {
        re2=re+del_az+180-360;
    }else{
        re2=re+del_az+180;
    }
    console.log(re2);
    dist=xcalc/Math.sin((re*(Math.PI/180)));
    console.log(dist);
}
//BOTON
function boton(){
    getDataElipsoide();
    get_dat();
    n1=radnormal(aElipsoide,e2Elipsoide,lat);
    m1=radmeridiana(aElipsoide,e2Elipsoide,lat);
    n2=radnormal(aElipsoide,e2Elipsoide,lat2);
    m2=radmeridiana(aElipsoide,e2Elipsoide,lat2);
    document.getElementById("gnormal").innerHTML="Gran Normal(N<sub>A</sub>)= " +n1 ;
    document.getElementById("radcurv").innerHTML="Radio de curvatura(ρ<sub>A</sub>)= " +m1 ;
    document.getElementById("gnormal2").innerHTML="Gran Normal(N<sub>B</sub>)= " + n2;
    document.getElementById("radcurv2").innerHTML="Radio de curvatura(ρ<sub>B</sub>)= " +m2 ;
}
//MOOSTRAR DATOS
function setData(){
    constpuis(n1,m1,lat);
    document.getElementById("const").innerHTML="B= "+const_b+"<br>C= "+const_c+"<br>D= "+const_d+"<br>E= "+const_e;
    deltas();
    document.getElementById("delt").innerHTML="<br>Δ<sub>φ<sup>''</sup></sub>= "+del_lat+"<br>Δ<sub>λ<sup>''</sup></sub>= "+del_lon+"<br>X= "+ xcalc+"<br>Y= "+ycalc+"<br>α= "+alpha+"<br>Δα= "+del_az;
    result();
    document.getElementById("resul").innerHTML="<br>α(A-B) Norte = "+ConvertDDtoGMS(re)+"<br>α(B-A) Norte = "+ConvertDDtoGMS(re2)+"<br>s(AB) metros = "+dist;

}
