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
    az=ConvertGMSToDD(parseFloat(document.getElementById("az_grados").value),parseFloat(document.getElementById("az_minutos").value),parseFloat(document.getElementById("az_segundos").value),"N");
    dist=parseFloat(document.getElementById("dist").value);
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
function constpuis(){
    az1=az+180;
    if (az1>360) {
        az1=az1-360;
    }
    azrad=az1*(Math.PI/180);
    latRad=lat*(Math.PI/180);
azrad1=az*(Math.PI/180);
    const_b=1/(m*0.00000484813681109536);
    const_c=Math.tan(latRad)/(2*m*n*0.00000484813681109536);
    const_d=(3*e2Elipsoide*Math.sin(latRad)*Math.cos(latRad)*0.00000484813681109536)/(2*(1-e2Elipsoide*Math.sin(latRad)*Math.sin(latRad)));
    const_e=(1+3*Math.tan(latRad)*Math.tan(latRad))/(6*n*n);
    const_h=(dist*Math.cos(azrad1))/(m)
}
//partes ecuacion
function partec(){
    d1=((dist*Math.cos(azrad1))/(m*0.00000484813681109536));
    d2=((dist*dist*Math.sin(azrad1)*Math.sin(azrad1)*Math.tan(latRad))/(2*m*n*0.00000484813681109536));
    d3=((dist*dist*dist*Math.sin(azrad1)*Math.sin(azrad1)*Math.cos(azrad1)*(1+(3*Math.tan(latRad)*Math.tan(latRad))))/(6*n*n*m*0.00000484813681109536));
    delat1=d1-d2-d3;
    
    p1=const_b*dist*Math.cos(azrad1);
    p2=const_c*dist*dist*Math.sin(azrad1)*Math.sin(azrad1);
    p3=const_h*dist*dist*Math.sin(azrad1)*Math.sin(azrad1)*const_e;
    p4=Math.pow(delat1,2)*const_d;
    del_lat= p1-p2-p3-p4;
}
//calculo long2
function calc2() {
    lat2=lat+(del_lat/3600);
    lat2rad=lat2*(Math.PI/180);
    n2=radnormal(aElipsoide,e2Elipsoide,lat2);
    del_lon=(Math.asin((Math.sin(dist/n2)*Math.sin(azrad1))/(Math.cos(lat2rad))))*(180*3600/Math.PI);
}
//contraazimut
function contaz() {
    latpromrad=((lat+lat2)/2)*(Math.PI/180);
    del_latrad=del_lat*(Math.PI/180);
    del_az=(del_lon/3600)*Math.sin(latpromrad)*(1/Math.cos(del_latrad/7200))+((Math.pow((del_lon/3600),3)/12))*(Math.sin(latpromrad)*Math.cos(latpromrad)*Math.cos(latpromrad)*0.00000484813681109536*0.00000484813681109536);
}
//Resultados
function resul() {
    lon2=lon+(del_lon/3600);
    az2=az1+del_az;
}
//BOTON
function boton(){
    getDataElipsoide();
    get_dat();
    document.getElementById("gnormal").innerHTML="Gran Normal(N)= " + radnormal(aElipsoide,e2Elipsoide,lat);
    document.getElementById("radcurv").innerHTML="Radio de curvatura(ρ)= " + radmeridiana(aElipsoide,e2Elipsoide,lat);
}
//MOOSTRAR DATOS
function setData(){
    constpuis();
    document.getElementById("const").innerHTML="B= "+const_b+"<br>C= "+const_c+"<br>D= "+const_d+"<br>E= "+const_e+"<br>h= "+const_h;
    partec();
    document.getElementById("del_lat").innerHTML="δ<sub>φ</sub>= "+delat1+"<br>Δ<sub>φ</sub>= "+del_lat;
    calc2();
    document.getElementById("nor").innerHTML="N<sub>2</sub>= "+n2;
    contaz();
    document.getElementById("del_lon").innerHTML="Δ<sub>λ</sub>= "+del_lon+"<br>Δ<sub>α</sub>= "+del_az;
    resul();
    document.getElementById("result").innerHTML="φ<sub>2</sub>= "+ConvertDDtoGMS(lat2)+"<br>λ<sub>2</sub>= "+ConvertDDtoGMS(lon2)+"<br>α<sub>2</sub>= "+ConvertDDtoGMS(az2);
    

}
