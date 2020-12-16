//guardar datos elipsoide
function getDataElipsoide() {
    aElipsoide =parseFloat(document.getElementById("aElipsoide").value);
    bElipsoide =parseFloat(document.getElementById("bElipsoide").value);
    fElipsoide= parseFloat(document.getElementById("fElipsoide").value);
    e2Elipsoide=calc_e2(bElipsoide,aElipsoide);
    document.getElementById("e2").innerHTML="<h2>Calculados</h2>e<sup>2</sup> =  "  + e2Elipsoide;
}
// Guardar 8 angulos cuadrilatero
function get8ang() {
    ang8= new Array(8);
    ang8[0]=ConvertGMSToDD(parseFloat(document.getElementById("1_grados").value), parseFloat(document.getElementById("1_minutos").value), parseFloat(document.getElementById("1_segundos").value), "N") ;
    ang8[1]=ConvertGMSToDD(parseFloat(document.getElementById("2_grados").value), parseFloat(document.getElementById("2_minutos").value), parseFloat(document.getElementById("2_segundos").value), "N") ;
    ang8[2]=ConvertGMSToDD(parseFloat(document.getElementById("3_grados").value), parseFloat(document.getElementById("3_minutos").value), parseFloat(document.getElementById("3_segundos").value), "N") ;
    ang8[3]=ConvertGMSToDD(parseFloat(document.getElementById("4_grados").value), parseFloat(document.getElementById("4_minutos").value), parseFloat(document.getElementById("4_segundos").value), "N") ;
    ang8[4]=ConvertGMSToDD(parseFloat(document.getElementById("5_grados").value), parseFloat(document.getElementById("5_minutos").value), parseFloat(document.getElementById("5_segundos").value), "N") ;
    ang8[5]=ConvertGMSToDD(parseFloat(document.getElementById("6_grados").value), parseFloat(document.getElementById("6_minutos").value), parseFloat(document.getElementById("6_segundos").value), "N") ;
    ang8[6]=ConvertGMSToDD(parseFloat(document.getElementById("7_grados").value), parseFloat(document.getElementById("7_minutos").value), parseFloat(document.getElementById("7_segundos").value), "N") ;
    ang8[7]=ConvertGMSToDD(parseFloat(document.getElementById("8_grados").value), parseFloat(document.getElementById("8_minutos").value), parseFloat(document.getElementById("8_segundos").value), "N") ;
    }
//guardar grados minutos segundos y direccion de latitud1
function get_lat_GMS(){
    grados=parseFloat(document.getElementById("lat_grados").value);
    minutos=parseFloat(document.getElementById("lat_minutos").value);
    segundos=parseFloat(document.getElementById("lat_segundos").value);
    direccion=document.getElementById("direccion").value;
}
//guardar grados minutos segundos ANGULOS 1,2,3
function get_ang_GMS(){
    grados_a1=parseFloat(document.getElementById("ang1_grados").value);
    minutos_a1=parseFloat(document.getElementById("ang1_minutos").value);
    segundos_a1=parseFloat(document.getElementById("ang1_segundos").value);

    grados_a2=parseFloat(document.getElementById("ang2_grados").value);
    minutos_a2=parseFloat(document.getElementById("ang2_minutos").value);
    segundos_a2=parseFloat(document.getElementById("ang2_segundos").value);

    grados_a3=parseFloat(document.getElementById("ang3_grados").value);
    minutos_a3=parseFloat(document.getElementById("ang3_minutos").value);
    segundos_a3=parseFloat(document.getElementById("ang3_segundos").value);
    
}
//guardar datos lados
function getlado() {
    ladcon =document.getElementById("ladcon").value;
    met_ladcon =parseFloat( document.getElementById("lado").value);
}
//guardar  lado
function getlado1() {
    met_ladcon =parseFloat( document.getElementById("lado").value);
}
// Calcular e2
function calc_e2(b,a){
    e2calc =(1-((b*b)/(a*a)));
return e2calc;
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
//EXCESO ESFERICO PRELIMINAR
function ex_es_pre(a,b,c) {
    exc_pre=a+b+c-180;
return exc_pre;
}
// ANGULOS EXCESO PRELIMINAR
function ang_exc_pre(a,b,c,excp) {
    ang_pre1= a-(excp/3);
    ang_pre2= b-(excp/3);
    ang_pre3= c-(excp/3);
}
//CALCULO DE LADOS T-SENO
function calc_lad(lad_con,a,b){
    as=a*(Math.PI/180);
    bs=b*(Math.PI/180);
    ladcal=lad_con*Math.sin(as)/Math.sin(bs);
    console.log(ladcal);
return ladcal;
}
//EXCESO ESFERICO REAL
function exc_re(a,b,ang) {
    an=ang*(Math.PI/180);
    eer=(a*b*Math.sin(an))/(2*radnormal(aElipsoide,e2Elipsoide,lat)*radmeridiana(aElipsoide,e2Elipsoide,lat));
    return eer;
}
//CONVERTIR RADIANES A GRADOS
function convgrados(rad) {
    grad=rad*(180/Math.PI);
return grad;
}
//ANGULOS PLANOS FINALES
function ang_exc_fin(a,b,c,excp) {
    ang_fin1= a-(excp/3);
    ang_fin2= b-(excp/3);
    ang_fin3= c-(excp/3);
}
//ERROR DE CIERRE
function errfin(a,b,c) {
    erfin=a+b+c-180;
return erfin;
}
//SELECCION Y CALCULO DE LADOS
function sel_cal_lad(){
    if (ladcon == "a") {
        ladob=calc_lad(met_ladcon,ang_pre2,ang_pre1);
        ladoc=calc_lad(met_ladcon,ang_pre3,ang_pre1);
        document.getElementById("lad_pre").innerHTML="Lado conocido a="+ met_ladcon +"<br> Lado b= "+ ladob +"<br> Lado c= "+ladoc;
        excre=exc_re(met_ladcon,ladob,ang_pre3);
        excregrad=convgrados(excre);
        document.getElementById("exc_re").innerHTML="Exceso esferico radianes= " + excre+"<br> Exceso esferico grados= "+ ConvertDDtoGMS(excregrad);
    }else if (ladcon == "b") {
        ladoa=calc_lad(met_ladcon,ang_pre1,ang_pre2);
        ladoc=calc_lad(met_ladcon,ang_pre3,ang_pre2);
        document.getElementById("lad_pre").innerHTML="Lado conocido b="+ met_ladcon +"<br> Lado a= "+ ladoa +"<br> Lado c= "+ladoc;
        excre=exc_re(met_ladcon,ladoa,ang_pre3);
        excregrad=convgrados(excre);
        document.getElementById("exc_re").innerHTML="Exceso esferico radianes= " + excre+"<br> Exceso esferico grados= "+ ConvertDDtoGMS(excregrad);
    }else if (ladcon == "c") {
        ladob=calc_lad(met_ladcon,ang_pre2,ang_pre3);
        ladoa=calc_lad(met_ladcon,ang_pre1,ang_pre3);
        document.getElementById("lad_pre").innerHTML="Lado conocido c="+ met_ladcon +"<br> Lado a= "+ ladoa +"<br> Lado b= "+ladob;
        excre=exc_re(met_ladcon,ladob,ang_pre1);
        excregrad=convgrados(excre);
        document.getElementById("exc_re").innerHTML="Exceso esferico radianes= " + excre+"<br> Exceso esferico grados= "+ ConvertDDtoGMS(excregrad);
    }
}
function sel_cal_lad2(){
    if (ladcon == "a") {
        ladob=calc_lad(met_ladcon,ang_pre2,ang_pre1);
        ladoc=calc_lad(met_ladcon,ang_pre3,ang_pre1);
        
    }else if (ladcon == "b") {
        ladoa=calc_lad(met_ladcon,ang_pre1,ang_pre2);
        ladoc=calc_lad(met_ladcon,ang_pre3,ang_pre2);
        
    }else if (ladcon == "c") {
        ladob=calc_lad(met_ladcon,ang_pre2,ang_pre3);
        ladoa=calc_lad(met_ladcon,ang_pre1,ang_pre3);
        
    }
}
//BOTONES
function boton(){
    getDataElipsoide();
    get_lat_GMS();
    get_ang_GMS()
    getlado();
    lat=ConvertGMSToDD(grados, minutos, segundos, direccion);
    ang1=ConvertGMSToDD(grados_a1, minutos_a1, segundos_a1, "N");
    ang2=ConvertGMSToDD(grados_a2, minutos_a2, segundos_a2, "N");
    ang3=ConvertGMSToDD(grados_a3, minutos_a3, segundos_a3, "N");
}
function boton1(){
    getDataElipsoide();
    get_lat_GMS();
    get8ang();
    getlado1();
    lat=ConvertGMSToDD(grados, minutos, segundos, direccion);
    
}
//MOSTRAR
function setData() {
    document.getElementById("dat_in").innerHTML="Gran Normal(N)= "+ radnormal(aElipsoide,e2Elipsoide,lat)+ "<br> Radio Curvatura(ρ)="+ radmeridiana(aElipsoide,e2Elipsoide,lat);
    ex_es_pre(ang1,ang2,ang3)
    document.getElementById("dat_prel").innerHTML="Exceso Esferico Preliminar ="+ ConvertDDtoGMS(exc_pre);
    ang_exc_pre(ang1,ang2,ang3,exc_pre);
    document.getElementById("ang_pre").innerHTML="Angulos planos preliminares <br> α= "+ ConvertDDtoGMS(ang_pre1)+"<br> β= "+ConvertDDtoGMS(ang_pre2)+"<br> γ= "+ConvertDDtoGMS(ang_pre3);
    sel_cal_lad();
    ang_exc_fin(ang1,ang2,ang3,excregrad);
    document.getElementById("ang_fi").innerHTML="Angulos planos finales <br> α= "+ ConvertDDtoGMS(ang_fin1)+"<br> β= "+ConvertDDtoGMS(ang_fin2)+"<br> γ= "+ConvertDDtoGMS(ang_fin3);
    document.getElementById("err").innerHTML="Error de cierre de triangulo = " +ConvertDDtoGMS(errfin(ang_fin1,ang_fin2,ang_fin3));
}
function setData2() {
    document.getElementById("dat_in").innerHTML="Gran Normal(N)= "+ radnormal(aElipsoide,e2Elipsoide,lat)+ "<br> Radio Curvatura(ρ)="+ radmeridiana(aElipsoide,e2Elipsoide,lat);
    ex_es_pre(ang8[0],ang8[1]+ang8[2],ang8[3])
    document.getElementById("dat_prel").innerHTML="Exceso Esferico Preliminar ="+ ConvertDDtoGMS(exc_pre);
    ang_exc_pre(ang8[0],ang8[1]+ang8[2],ang8[3],exc_pre);
    document.getElementById("ang_pre").innerHTML="Angulos planos preliminares <br> 1= "+ ConvertDDtoGMS(ang_pre1)+"<br> 2+3= "+ConvertDDtoGMS(ang_pre2)+"<br> 4= "+ConvertDDtoGMS(ang_pre3);
    ladcon="c";
    sel_cal_lad2();
    document.getElementById("lad_pre").innerHTML="Lado conocido AB="+ met_ladcon +"<br> Lado BC= "+ ladoa +"<br> Lado AC= "+ladob;
        excre=exc_re(met_ladcon,ladob,ang_pre1);
        excregrad=convgrados(excre);
        document.getElementById("exc_re").innerHTML="Exceso esferico radianes= " + excre+"<br> Exceso esferico grados= "+ ConvertDDtoGMS(excregrad);
    ang_exc_fin(ang8[0],ang8[1]+ang8[2],ang8[3],excregrad);
    document.getElementById("ang_fi").innerHTML="Angulos planos finales <br> 1= "+ ConvertDDtoGMS(ang_fin1)+"<br> 2+3= "+ConvertDDtoGMS(ang_fin2)+"<br> 4= "+ConvertDDtoGMS(ang_fin3);
    document.getElementById("err").innerHTML="Error de cierre de triangulo = " +ConvertDDtoGMS(errfin(ang_fin1,ang_fin2,ang_fin3));
//camino 1 triangulo2
ex_es_pre(ang8[4],ang8[5]+ang8[6],ang8[7])
    document.getElementById("dat_pre_t2").innerHTML="Exceso Esferico Preliminar ="+ ConvertDDtoGMS(exc_pre);
    ang_exc_pre(ang8[4],ang8[5]+ang8[6],ang8[7],exc_pre);
    document.getElementById("ang_pre_t2").innerHTML="Angulos planos preliminares <br> 5= "+ ConvertDDtoGMS(ang_pre1)+"<br> 6+7= "+ConvertDDtoGMS(ang_pre2)+"<br> 8= "+ConvertDDtoGMS(ang_pre3);
    ladoa1=ladob;
    ladoa=calc_lad(ladoa1,ang_pre1,ang_pre2);
    ladoc=calc_lad(ladoa1,ang_pre3,ang_pre2);
    document.getElementById("lad_pre_t2").innerHTML="Lado conocido AC="+ ladoa1 +"<br> Lado AD= "+ ladoa +"<br> Lado DC= "+ladoc;
        excre=exc_re(ladoa1,ladoa,ang_pre3);
        excregrad=convgrados(excre);
        document.getElementById("exc_re_t2").innerHTML="Exceso esferico radianes= " + excre+"<br> Exceso esferico grados= "+ ConvertDDtoGMS(excregrad);
    ang_exc_fin(ang8[4],ang8[5]+ang8[6],ang8[7],excregrad);
    document.getElementById("ang_fi_t2").innerHTML="Angulos planos finales <br> 5= "+ ConvertDDtoGMS(ang_fin1)+"<br> 6+7= "+ConvertDDtoGMS(ang_fin2)+"<br> 8= "+ConvertDDtoGMS(ang_fin3);
    document.getElementById("err_t2").innerHTML="Error de cierre de triangulo = " +ConvertDDtoGMS(errfin(ang_fin1,ang_fin2,ang_fin3));
//camino 2 triangulo 3
    ex_es_pre(ang8[1],ang8[0]+ang8[7],ang8[6])
    document.getElementById("dat_pre_t3").innerHTML="Exceso Esferico Preliminar ="+ ConvertDDtoGMS(exc_pre);
    ang_exc_pre(ang8[1],ang8[0]+ang8[7],ang8[6],exc_pre);
    document.getElementById("ang_pre_t3").innerHTML="Angulos planos preliminares <br> 2= "+ ConvertDDtoGMS(ang_pre1)+"<br> 1+8= "+ConvertDDtoGMS(ang_pre2)+"<br> 7= "+ConvertDDtoGMS(ang_pre3);
    ladcon="c";
    sel_cal_lad2();
    document.getElementById("lad_pre_t3").innerHTML="Lado conocido AB="+ met_ladcon +"<br> Lado AD= "+ ladoa +"<br> Lado BD= "+ladob;
        excre=exc_re(met_ladcon,ladob,ang_pre1);
        excregrad=convgrados(excre);
        document.getElementById("exc_re_t3").innerHTML="Exceso esferico radianes= " + excre+"<br> Exceso esferico grados= "+ ConvertDDtoGMS(excregrad);
    ang_exc_fin(ang8[1],ang8[0]+ang8[7],ang8[6],excregrad);
    document.getElementById("ang_fi_t3").innerHTML="Angulos planos finales <br> 2= "+ ConvertDDtoGMS(ang_fin1)+"<br> 1+8= "+ConvertDDtoGMS(ang_fin2)+"<br> 7= "+ConvertDDtoGMS(ang_fin3);
    document.getElementById("err_t3").innerHTML="Error de cierre de triangulo = " +ConvertDDtoGMS(errfin(ang_fin1,ang_fin2,ang_fin3));
//camino 2 triangulo 4
ex_es_pre(ang8[2],ang8[3]+ang8[4],ang8[5])
    document.getElementById("dat_pre_t4").innerHTML="Exceso Esferico Preliminar ="+ ConvertDDtoGMS(exc_pre);
    ang_exc_pre(ang8[2],ang8[3]+ang8[4],ang8[5],exc_pre);
    document.getElementById("ang_pre_t4").innerHTML="Angulos planos preliminares <br> 5= "+ ConvertDDtoGMS(ang_pre1)+"<br> 6+7= "+ConvertDDtoGMS(ang_pre2)+"<br> 8= "+ConvertDDtoGMS(ang_pre3);
    ladoa1=ladob;
    ladoa=calc_lad(ladoa1,ang_pre1,ang_pre2);
    ladoc=calc_lad(ladoa1,ang_pre3,ang_pre2);
    document.getElementById("lad_pre_t4").innerHTML="Lado conocido BD="+ ladoa1 +"<br> Lado CD= "+ ladoa +"<br> Lado BC= "+ladoc;
        excre=exc_re(ladoa1,ladoa,ang_pre3);
        excregrad=convgrados(excre);
        document.getElementById("exc_re_t4").innerHTML="Exceso esferico radianes= " + excre+"<br> Exceso esferico grados= "+ ConvertDDtoGMS(excregrad);
    ang_exc_fin(ang8[2],ang8[3]+ang8[4],ang8[5],excregrad);
    document.getElementById("ang_fi_t4").innerHTML="Angulos planos finales <br> 5= "+ ConvertDDtoGMS(ang_fin1)+"<br> 6+7= "+ConvertDDtoGMS(ang_fin2)+"<br> 8= "+ConvertDDtoGMS(ang_fin3);
    document.getElementById("err_t4").innerHTML="Error de cierre de triangulo = " +ConvertDDtoGMS(errfin(ang_fin1,ang_fin2,ang_fin3));
}