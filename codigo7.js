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
    z1=ConvertGMSToDD(parseFloat(document.getElementById("z1_grados").value),parseFloat(document.getElementById("z1_minutos").value),parseFloat(document.getElementById("z1_segundos").value),"N");
    
    azimut=ConvertGMSToDD(parseFloat(document.getElementById("azimut_grados").value),parseFloat(document.getElementById("azimut_minutos").value),parseFloat(document.getElementById("azimut_segundos").value),"N");
    lat=ConvertGMSToDD(parseFloat(document.getElementById("lat_grados").value),parseFloat(document.getElementById("lat_minutos").value),parseFloat(document.getElementById("lat_segundos").value),document.getElementById("lat_direccion").value);
    h1=parseFloat(document.getElementById("alt_punt_1").value);
    s=parseFloat(document.getElementById("dist").value);
    i1=parseFloat(document.getElementById("i1").value);
    
    o2=parseFloat(document.getElementById("o2").value);
    mvar=parseFloat(document.getElementById("m").value);
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
//CURVATURA AZIMUT
function curv_azim(n,m,az){
    azrad=az*(Math.PI/180);
    cu_az=((n*m)/((m*(Math.sin(azrad)*Math.sin(azrad))+(n*(Math.cos(azrad)*Math.cos(azrad))))));
return cu_az;
}
//CORRECCION 1
function cor_1(){
    cor1=((o2-i1)/(s*Math.sin(0.0002777777777777778)))*(180/Math.PI);
return cor1;
}

//Z1_CORREGIDO
function z1_cor(){
    if (z1>=0) {
        z1c=z1+(cor1/3600);
    }else {
        z1c=z1-(cor1/3600);
    }
}
//HALLAR K
function hallar_k(){
    hk=(((0.5-mvar)*s)/(cu_az*Math.sin(0.0002777777777777778)))*(180/Math.PI);
    return hk;
}

//TERMINOS A, B ,C
function terminos(h1,pa,s){
    
    t_a=1+(h1/pa);
    t_b=1+((s/(2*pa))*(Math.tan((90+(hk/3600)-z1c)*(Math.PI/180))));
    t_c=1+((s*s)/(12*pa*pa));
}
//DELTA H
function delt_h(){

    dh=(s*(Math.tan((90+(hk/3600)-z1c)*(Math.PI/180)))*t_a*t_b*t_c);
    return dh;
}
//H2
function alt2(){
    h2=dh+h1;
    return h2;
}
//BOTON
function boton(){
    getDataElipsoide();
    get_dat();
    radnormal(aElipsoide,e2Elipsoide,lat);
    radmeridiana(aElipsoide,e2Elipsoide,lat);
    curv_azim(n,m,azimut);
    cor_1();
    z1_cor();
    hallar_k();
    terminos(h1,cu_az,s);
    delt_h();
    alt2();

    document.getElementById("gnormal").innerHTML="Gran Normal(N<sub>A</sub>)= " +n ;
    document.getElementById("radcurv").innerHTML="Radio de curvatura(ρ<sub>A</sub>)= " +m ;
    document.getElementById("radcurvaz").innerHTML="Radio de curvatura azimut(ρ<sub>α<sub>1-2</sub></sub>)= " + cu_az ;

}
//MOOSTRAR DATOS
function setData(){
    document.getElementById("corr").innerHTML="Corrección ζ<sub>1</sub>= "+cor1+"<br>ζ<sub>1</sub> corregido = "+ConvertDDtoGMS(z1c) ;
    document.getElementById("term").innerHTML="<br> A ="+t_a+"<br> B ="+t_b+"<br> C ="+t_c+"<br> k ="+hk;
    document.getElementById("resul").innerHTML="<br>Δh = "+dh+"<br>h<sub>2</sub> = "+h2;

}

