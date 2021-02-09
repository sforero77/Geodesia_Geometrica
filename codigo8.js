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
    x=parseFloat(document.getElementById("x").value);
    y=parseFloat(document.getElementById("y").value);
    z=parseFloat(document.getElementById("z").value);
    
    
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
//PRIMERA ITERACION
function prim_ite(x,y,z) {
    lon1=(180/Math.PI)*(Math.atan(y/x));
    lat1=(180/Math.PI)*Math.atan((z)/(Math.sqrt((x*x)+(y*y)))*(1/(1-e2Elipsoide)));
    n1=(aElipsoide/Math.sqrt(1-e2Elipsoide*(Math.sin((lat1*(Math.PI/180)))*Math.sin((lat1*(Math.PI/180)))) ));
    h1=((Math.sqrt((x*x)+(y*y)))/Math.cos((lat1*(Math.PI/180))))-n1;
}
//SEGUNDA ITERACION
function segun_ite(x,y,z) {
    lat2=(180/Math.PI)*Math.atan((z)/(Math.sqrt((x*x)+(y*y)))*(1+(n1*e2Elipsoide*Math.sin((lat1*(Math.PI/180))))/z));
    n2=(aElipsoide/Math.sqrt(1-e2Elipsoide*(Math.sin((lat2*(Math.PI/180)))*Math.sin((lat2*(Math.PI/180)))) ));
    h2=((Math.sqrt((x*x)+(y*y)))/Math.cos((lat2*(Math.PI/180))))-n2;
    error2=h2-h1;
}

//TERCERA ITERACION
function tercera_ite(x,y,z) {
    lat3=(180/Math.PI)*Math.atan((z)/(Math.sqrt((x*x)+(y*y)))*(1+(n2*e2Elipsoide*Math.sin((lat2*(Math.PI/180))))/z));
    n3=(aElipsoide/Math.sqrt(1-e2Elipsoide*(Math.sin((lat3*(Math.PI/180)))*Math.sin((lat3*(Math.PI/180)))) ));
    h3=((Math.sqrt((x*x)+(y*y)))/Math.cos((lat3*(Math.PI/180))))-n3;
    error3=h3-h2;
}
//CUARTA ITERACION
function cuarta_ite(x,y,z) {
    lat4=(180/Math.PI)*Math.atan((z)/(Math.sqrt((x*x)+(y*y)))*(1+(n3*e2Elipsoide*Math.sin((lat3*(Math.PI/180))))/z));
    n4=(aElipsoide/Math.sqrt(1-e2Elipsoide*(Math.sin((lat4*(Math.PI/180)))*Math.sin((lat4*(Math.PI/180)))) ));
    h4=((Math.sqrt((x*x)+(y*y)))/Math.cos((lat4*(Math.PI/180))))-n4;
    error4=h4-h3;
}
//condicional error y cantidad de itracion
/*if (error2 <= 0.1 && error2 >= -0.1) {
    document.getElementById("corr").innerHTML="<h3>Primera Iteración</h3> lat<sub>1</sub>= "+ConvertDDtoGMS(lat1) +"<br>lon = "+ConvertDDtoGMS(lon1)+"<br>N<sub>1</sub> = "+n1+"<br>h<sub>1</sub> = "+h1;
    document.getElementById("term").innerHTML="<h3>Segunda Iteración</h3> lat<sub>2</sub>= "+ConvertDDtoGMS(lat2) +"<br>lon = "+ConvertDDtoGMS(lon1)+"<br>N<sub>2</sub> = "+n2+"<br>h<sub>2</sub> = "+h2+"<br>error h<sub>2</sub> = "+(error2*1000).toFixed(2)+"mm";
}else if (error3<=0.1 && error3 >= -0.1) {
    document.getElementById("corr").innerHTML="<h3>Primera Iteración</h3> lat<sub>1</sub>= "+ConvertDDtoGMS(lat1) +"<br>lon = "+ConvertDDtoGMS(lon1)+"<br>N<sub>1</sub> = "+n1+"<br>h<sub>1</sub> = "+h1;
    document.getElementById("term").innerHTML="<h3>Segunda Iteración</h3> lat<sub>2</sub>= "+ConvertDDtoGMS(lat2) +"<br>lon = "+ConvertDDtoGMS(lon1)+"<br>N<sub>2</sub> = "+n2+"<br>h<sub>2</sub> = "+h2+"<br>error h<sub>2</sub> = "+(error2*1000).toFixed(2)+"mm";
    document.getElementById("resul").innerHTML="<h3>Tercera Iteración</h3> lat<sub>3</sub>= "+ConvertDDtoGMS(lat3) +"<br>lon = "+ConvertDDtoGMS(lon1)+"<br>N<sub>3</sub> = "+n3+"<br>h<sub>3</sub> = "+h3+"<br>error h<sub>3</sub> = "+(error3*1000).toFixed(2)+"mm";
}else if (error4<=0.1 && error4 >= -0.1){
    document.getElementById("corr").innerHTML="<h3>Primera Iteración</h3> lat<sub>1</sub>= "+ConvertDDtoGMS(lat1) +"<br>lon = "+ConvertDDtoGMS(lon1)+"<br>N<sub>1</sub> = "+n1+"<br>h<sub>1</sub> = "+h1;
    document.getElementById("term").innerHTML="<h3>Segunda Iteración</h3> lat<sub>2</sub>= "+ConvertDDtoGMS(lat2) +"<br>lon = "+ConvertDDtoGMS(lon1)+"<br>N<sub>2</sub> = "+n2+"<br>h<sub>2</sub> = "+h2+"<br>error h<sub>2</sub> = "+(error2*1000).toFixed(2)+"mm";
    document.getElementById("resul").innerHTML="<h3>Tercera Iteración</h3> lat<sub>3</sub>= "+ConvertDDtoGMS(lat3) +"<br>lon = "+ConvertDDtoGMS(lon1)+"<br>N<sub>3</sub> = "+n3+"<br>h<sub>3</sub> = "+h3+"<br>error h<sub>3</sub> = "+(error3*1000).toFixed(2)+"mm";
    document.getElementById("resul2").innerHTML="<h3>Cuarta Iteración</h3> lat<sub>3</sub>= "+ConvertDDtoGMS(lat4) +"<br>lon = "+ConvertDDtoGMS(lon1)+"<br>N<sub>3</sub> = "+n4+"<br>h<sub>3</sub> = "+h4+"<br>error h<sub>4</sub> = "+(error4*1000).toFixed(2)+"mm";
}*/

//BOTON
function boton(){
    getDataElipsoide();
    get_dat();
    prim_ite(x,y,z);
    segun_ite(x,y,z);
    tercera_ite(x,y,z);
    cuarta_ite(x,y,z);

    //document.getElementById("gnormal").innerHTML="Gran Normal(N<sub>A</sub>)= " +n ;
    //document.getElementById("radcurv").innerHTML="Radio de curvatura(ρ<sub>A</sub>)= " +m ;
    //document.getElementById("radcurvaz").innerHTML="Radio de curvatura azimut(ρ<sub>α<sub>1-2</sub></sub>)= " + cu_az ;

}
//MOOSTRAR DATOS
function setData(){
    
    if (error2 <= 0.1 && error2 >= -0.1) {
        document.getElementById("corr").innerHTML="<h3>Primera Iteración</h3> lat<sub>1</sub>= "+ConvertDDtoGMS(lat1) +"<br>lon = "+ConvertDDtoGMS(lon1)+"<br>N<sub>1</sub> = "+n1+"<br>h<sub>1</sub> = "+h1;
        document.getElementById("term").innerHTML="<h3>Segunda Iteración</h3> lat<sub>2</sub>= "+ConvertDDtoGMS(lat2) +"<br>lon = "+ConvertDDtoGMS(lon1)+"<br>N<sub>2</sub> = "+n2+"<br>h<sub>2</sub> = "+h2+"<br>Error h<sub>2</sub>-h<sub>1</sub> = "+(error2*1000).toFixed(2)+"mm";
    }else if (error3<=0.1 && error3 >= -0.1) {
        document.getElementById("corr").innerHTML="<h3>Primera Iteración</h3> lat<sub>1</sub>= "+ConvertDDtoGMS(lat1) +"<br>lon = "+ConvertDDtoGMS(lon1)+"<br>N<sub>1</sub> = "+n1+"<br>h<sub>1</sub> = "+h1;
        document.getElementById("term").innerHTML="<h3>Segunda Iteración</h3> lat<sub>2</sub>= "+ConvertDDtoGMS(lat2) +"<br>lon = "+ConvertDDtoGMS(lon1)+"<br>N<sub>2</sub> = "+n2+"<br>h<sub>2</sub> = "+h2+"<br>Error h<sub>2</sub>-h<sub>1</sub> = "+(error2*1000).toFixed(2)+"mm";
        document.getElementById("resul").innerHTML="<h3>Tercera Iteración</h3> lat<sub>3</sub>= "+ConvertDDtoGMS(lat3) +"<br>lon = "+ConvertDDtoGMS(lon1)+"<br>N<sub>3</sub> = "+n3+"<br>h<sub>3</sub> = "+h3+"<br>Error h<sub>3</sub>-h<sub>2</sub> = "+(error3*1000).toFixed(2)+"mm";
    }else if (error4<=0.1 && error4 >= -0.1){
        document.getElementById("corr").innerHTML="<h3>Primera Iteración</h3> lat<sub>1</sub>= "+ConvertDDtoGMS(lat1) +"<br>lon = "+ConvertDDtoGMS(lon1)+"<br>N<sub>1</sub> = "+n1+"<br>h<sub>1</sub> = "+h1;
        document.getElementById("term").innerHTML="<h3>Segunda Iteración</h3> lat<sub>2</sub>= "+ConvertDDtoGMS(lat2) +"<br>lon = "+ConvertDDtoGMS(lon1)+"<br>N<sub>2</sub> = "+n2+"<br>h<sub>2</sub> = "+h2+"<br>Error h<sub>2</sub>-h<sub>1</sub> = "+(error2*1000).toFixed(2)+"mm";
        document.getElementById("resul").innerHTML="<h3>Tercera Iteración</h3> lat<sub>3</sub>= "+ConvertDDtoGMS(lat3) +"<br>lon = "+ConvertDDtoGMS(lon1)+"<br>N<sub>3</sub> = "+n3+"<br>h<sub>3</sub> = "+h3+"<br>Error h<sub>3</sub>-h<sub>2</sub> = "+(error3*1000).toFixed(2)+"mm";
        document.getElementById("resul2").innerHTML="<h3>Cuarta Iteración</h3> lat<sub>3</sub>= "+ConvertDDtoGMS(lat4) +"<br>lon = "+ConvertDDtoGMS(lon1)+"<br>N<sub>3</sub> = "+n4+"<br>h<sub>3</sub> = "+h4+"<br>Error h<sub>4</sub>-h<sub>3</sub> = "+(error4*1000).toFixed(2)+"mm";
    }
    
}

