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


    //guardar grados minutos segundos y direccion de latitud1
    function get_lat_GMS(){
        grados=parseFloat(document.getElementById("lat_grados").value);
        minutos=parseFloat(document.getElementById("lat_minutos").value);
        segundos=parseFloat(document.getElementById("lat_segundos").value);
        direccion=document.getElementById("direccion").value;
    }
    //guardar grados minutos segundos y direccion de latitud2
    function get_lat2_GMS(){
        grados2=parseFloat(document.getElementById("lat2_grados").value);
        minutos2=parseFloat(document.getElementById("lat2_minutos").value);
        segundos2=parseFloat(document.getElementById("lat2_segundos").value);
        direccion2=document.getElementById("lat2_direccion").value;
    }
    //guardar grados minutos segundos y direccion de latitud3
    function get_lat3_GMS(){
        grados3=parseFloat(document.getElementById("la_grados").value);
        minutos3=parseFloat(document.getElementById("la_minutos").value);
        segundos3=parseFloat(document.getElementById("la_segundos").value);
        direccion3=document.getElementById("la_direccion").value;
        la3=ConvertGMSToDD(grados3, minutos3, segundos3, direccion3);
    return la3;
    }
    //guardar grados minutos segundos y direccion de longitud
    function get_lon_GMS(){
        longrados=parseFloat(document.getElementById("lon_grados").value);
        lonminutos=parseFloat(document.getElementById("lon_minutos").value);
        lonsegundos=parseFloat(document.getElementById("lon_segundos").value);
        londireccion=document.getElementById("lon_direccion").value;
    }
    function get_lon2_GMS(){
        longrados2=parseFloat(document.getElementById("lon2_grados").value);
        lonminutos2=parseFloat(document.getElementById("lon2_minutos").value);
        lonsegundos2=parseFloat(document.getElementById("lon2_segundos").value);
        londireccion2=document.getElementById("lon2_direccion").value;
    }
    //guardar altura
    function get_altura(){
        h=parseFloat(document.getElementById("altura").value);
    }
// guardar datos de azimut
    function get_az(){
        azgrados=parseFloat(document.getElementById("az_grados").value);
        azminutos=parseFloat(document.getElementById("az_minutos").value);
        azsegundos=parseFloat(document.getElementById("az_segundos").value);
        azim=ConvertGMSToDD(azgrados, azminutos, azsegundos, "N");
    return azim;
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
//RELACION GEODESICA Y GEOCENTRICA
    function geod_geoc(lat,e2){
        latRad=lat*(Math.PI/180);
        inrad=Math.atan((1-e2)*Math.tan(latRad));
        latgeoc=inrad*(180/Math.PI);
    return latgeoc;
    }


//RELACION GEODESICA Y REDUCIDA
    function geod_red(lat,e2){
        latRad=lat*(Math.PI/180);
        inrad=Math.atan(Math.sqrt(1-e2)*Math.tan(latRad));
        latred=inrad*(180/Math.PI);
    return latred;
    }
//COORDENADAS Y , Z con a, e^2 y latitud
    function ae2_y(lat,a,e2) {
        latRad=lat*(Math.PI/180);
        y=(a* Math.cos(latRad))/(Math.sqrt(1-(e2*(Math.sin(latRad)*Math.sin(latRad)))));
    return y;
    }
    function ae2_z(lat,a,e2) {
        latRad=lat*(Math.PI/180);
        z=(a*(1-e2)*Math.sin(latRad))/(Math.sqrt(1-(e2*(Math.sin(latRad)*Math.sin(latRad)))));
    return z;
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

//RADIO AZIMUT CUALQUIERA
    function radazimut(){
        get_az();
        radaz=azim*(Math.PI/180);
        m=radmeridiana(aElipsoide,e2Elipsoide,lat);
        n=radnormal(aElipsoide,e2Elipsoide,lat);
        r=(m*n)/((n*(Math.cos(radaz)*Math.cos(radaz)))+(m*(Math.sin(radaz)*Math.sin(radaz))));
    return r;
    }

//RADIO SECCION PROMEDIO
    function secprom(a,e2,lat){
        latRad=lat*(Math.PI/180);
        p=(a*Math.sqrt(1-e2))/(1-e2*(Math.sin(latRad)*Math.sin(latRad)))
        return p;
    }
//LONGITUD ARCO MERIDIANO
//Coeficientes A,B,C,D,E,F
    function coeficientes(e2){
        coef_a=1+(3/4)*e2+(45/64)*(e2)*(e2)+(175/256)*e2*e2*e2+(11025/16384)*e2*e2*e2*e2+(43659/65536)*e2*e2*e2*e2*e2;
        coef_b=(3/4)*e2+(15/16)*(e2)*(e2)+(525/512)*e2*e2*e2+(2205/2048)*e2*e2*e2*e2+(72765/65536)*e2*e2*e2*e2*e2;
        coef_c=(15/64)*(e2)*(e2)+(105/256)*e2*e2*e2+(2205/4096)*e2*e2*e2*e2+(10395/16384)*e2*e2*e2*e2*e2;
        coef_d=(35/512)*e2*e2*e2+(315/2048)*e2*e2*e2*e2+(31185/131072)*e2*e2*e2*e2*e2;
        coef_e=(315/16384)*e2*e2*e2*e2+(3465/65536)*e2*e2*e2*e2*e2;
        coef_f=(693/131072)*e2*e2*e2*e2*e2;
    }
    function long_arc_mer(a,b,c,d,e,f,la1,la2,aelip,e2){
        lat1=la1*(Math.PI/180);
        lat2=la2*(Math.PI/180);
        s=aelip*(1-e2)*(a*(lat2-lat1)-(b/2)*(Math.sin(2*lat2)-Math.sin(2*lat1))+(c/4)*(Math.sin(4*lat2)-Math.sin(4*lat1))-(d/6)*(Math.sin(6*lat2)-Math.sin(6*lat1))+(e/8)*(Math.sin(8*lat2)-Math.sin(8*lat1))+(f/10)*(Math.sin(10*lat2)-Math.sin(10*lat1)));
    return s;
    }
//AREA CUADRILATERO
    function area_cuad(b,e2,lo1,lo2,la1,la2){
        lat1=la1*(Math.PI/180);
        lat2=la2*(Math.PI/180);
        lon1=lo1*(Math.PI/180);
        lon2=lo2*(Math.PI/180);
        a_cuad=b*b*(lon2-lon1)*((Math.sin(lat2)-Math.sin(lat1))+(2/3)*e2*(Math.pow(Math.sin(lat2),3)-Math.pow(Math.sin(lat1),3))+(3/5)*e2*e2*(Math.pow(Math.sin(lat2),5)-Math.pow(Math.sin(lat1),5))+(4/7)*e2*e2*e2*(Math.pow(Math.sin(lat2),7)-Math.pow(Math.sin(lat1),7)));
    return a_cuad;
    }
//GEODESICA LINEA
    function azim_lin_geod (lat,lat2,az){
        n2=radnormal(aElipsoide,e2Elipsoide,lat2);
        n1=radnormal(aElipsoide,e2Elipsoide,lat);
        lat1=lat*(Math.PI/180);
        lat2r=lat2*(Math.PI/180);
        az1=az*(Math.PI/180);
        prim=n1*Math.cos(lat1)*Math.sin(az1);
        segun=n2*Math.cos(lat2r);
        az3= Math.asin(prim/segun);
        az_lin=az3*(180/Math.PI);;
    return az_lin;
    }
    function lat_lin_geod (lat,az,az2){
        n1=radnormal(aElipsoide,e2Elipsoide,lat);
        lat1=lat*(Math.PI/180);
        az1=az*(Math.PI/180);
        azm2=az2*(Math.PI/180);
        prim=n1*Math.cos(lat1)*Math.sin(az1);
        k=prim/(Math.sin(azm2)*aElipsoide);
        lat3= Math.asin(Math.sqrt(((k*k)-1)/(k*k*e2Elipsoide-1)));
        latt3=lat3*(180/Math.PI);;
    return latt3;
    }
//OPERACIONES SATELITE
    function dist_tan(la,y0,c) {
        l1=la*(Math.PI/180);
        ta=-1/Math.tan(l1);
        ydis=ta*y0;
        tot=ydis+c;
}
//BINOMIO CUADRADO
    function binom(a,b){
        res_q=a*a;
        res_w=2*a*b;
        res_e=b*b;
    }
// ARMAR CUADRATICA
    function armar(a,b,c,d){
        re_a=a+1;
        re_b=b;
        re_c=c+(d*d*(-1));
    }
//RESOLVER CUADRATICA
    function res(a,b,c){ 
    disc=b*b-4*a*c;
    x1=(-b-Math.sqrt(disc))/(2*a);
    x2=(-b+Math.sqrt(disc))/(2*a);
    } 
//HALLAR Z CON Y CALCULADA
    function hallarz(x,a,b){
        coz=a*x+b;
    return coz;
    }
//BOTONES
// boton coordenadas en funcion latitud de seccion meridiana
    function boton(){
        getDataElipsoide();
        get_lat_GMS();
        lat=ConvertGMSToDD(grados, minutos, segundos, direccion);
    }
    function boton2(){
        getDataElipsoide();
        get_lon_GMS();
        get_lat_GMS();
        get_altura();
        lat=ConvertGMSToDD(grados, minutos, segundos, direccion);
        lon=ConvertGMSToDD(longrados, lonminutos, lonsegundos, londireccion);
        coeficientes(e2Elipsoide);
        long_arc_mer(coef_a,coef_b,coef_c,coef_d,coef_e,coef_f,4,0,aElipsoide,e2Elipsoide);
    }
    function boton3(){
        getDataElipsoide();
        get_lat_GMS();
        get_lat2_GMS();
        lat=ConvertGMSToDD(grados, minutos, segundos, direccion);
        lat2=ConvertGMSToDD(grados2, minutos2, segundos2, direccion2);
        coeficientes(e2Elipsoide);
        document.getElementById("coefi").innerHTML="<h2>Coeficientes</h2>"  + "A= " + coef_a + "<br>B= " + coef_b+ "<br>C= " + coef_c+ "<br>D= " + coef_d+ "<br>E= " + coef_e+ "<br>F= " + coef_f ;
    }
    function boton4(){
        getDataElipsoide();
        get_lon_GMS();
        get_lat_GMS();
        get_lon2_GMS();
        get_lat2_GMS();
        lat=ConvertGMSToDD(grados, minutos, segundos, direccion);
        lon=ConvertGMSToDD(longrados, lonminutos, lonsegundos, londireccion);
        lat2=ConvertGMSToDD(grados2, minutos2, segundos2, direccion2);
        lon2=ConvertGMSToDD(longrados2, lonminutos2, lonsegundos2, londireccion2);
    }
    function boton5(){
        getDataElipsoide();
        get_lat_GMS();
        get_lat2_GMS();
        lat=ConvertGMSToDD(grados, minutos, segundos, direccion);
        azim1=ConvertGMSToDD(grados2, minutos2, segundos2, direccion2);
    }
    function boton6(){
        getDataElipsoide();
        get_lat_GMS();
        lat=ConvertGMSToDD(grados, minutos, segundos, direccion);
        lat_fin=lat;
        rads=parseFloat(document.getElementById("rad_sat").value);
    }
    
//MOSTRAR RESULTADOS
    function setData() {
        document.getElementById("ae2_y").innerHTML="Coordenada Y= " + ae2_y(lat_fin,aElipsoide,e2Elipsoide);
        document.getElementById("ae2_z").innerHTML="Coordenada Z= " + ae2_z(lat_fin,aElipsoide,e2Elipsoide);
    }
    function setData1() {
        document.getElementById("radnormal").innerHTML="N= " + radnormal(aElipsoide,e2Elipsoide,lat);
    }
    function setData2() {
        document.getElementById("radmeridiana").innerHTML="M= " + radmeridiana(aElipsoide,e2Elipsoide,lat);
    }
    function setData3() {
        document.getElementById("radazimut").innerHTML="M= " + radazimut();
    }
    function setData4() {
        document.getElementById("radprom").innerHTML="p= " + secprom(aElipsoide,e2Elipsoide,lat);
    }
    function geod() {
        lat_fin=lat;
        document.getElementById("latgeod").innerHTML="φ = " + ConvertDDtoGMS(lat);
    }
    function redu() {
        lat_fin=lat;
        document.getElementById("latred").innerHTML="β = " + ConvertDDtoGMS(geod_red(lat,e2Elipsoide));
    }
    function geoc() {
        lat_fin=lat;
        document.getElementById("latgeoc").innerHTML="ψ = " + ConvertDDtoGMS(geod_geoc(lat,e2Elipsoide));
    }
    function setData5() {
        document.getElementById("x").innerHTML="X= " + ae2latlon_x(lat_fin,lon,aElipsoide,e2Elipsoide,h) ;
        document.getElementById("y").innerHTML="Y= " + ae2latlon_y(lat_fin,lon,aElipsoide,e2Elipsoide,h) ;
        document.getElementById("z").innerHTML="Z= " + ae2latlon_z(lat_fin,lon,aElipsoide,e2Elipsoide,h) ;
    }
    function setData6() {
        long_arc_mer(coef_a,coef_b,coef_c,coef_d,coef_e,coef_f,lat,lat2,aElipsoide,e2Elipsoide);
        document.getElementById("arc").innerHTML="s = " + s;
    }
    function setData7() {
        area_cuad(bElipsoide,e2Elipsoide,lon,lon2,lat,lat2);
        document.getElementById("area").innerHTML="Area = " + a_cuad;
    }
    function setData8() {
        azm=get_az();
        lam=lat_lin_geod(lat,azim1,azm);
        document.getElementById("geodlat").innerHTML="Azimut = " + ConvertDDtoGMS(lam);
    }
    function setData9() {
        la2=get_lat3_GMS();
        la=azim_lin_geod(lat,la2,azim1);
        document.getElementById("geodazim").innerHTML="Azimut = " + ConvertDDtoGMS(la);
    }
    function setData10() {
        yp0=ae2_y(lat_fin,aElipsoide,e2Elipsoide)*(-1);
        zp0=ae2_z(lat_fin,aElipsoide,e2Elipsoide);
        dist_tan(lat_fin,yp0,zp0);
        document.getElementById("ae2_y").innerHTML="<legend>Coordenadas en funcion de latitud</legend> <br>Coordenada Y= " + ae2_y(lat_fin,aElipsoide,e2Elipsoide);
        document.getElementById("ae2_z").innerHTML="Coordenada Z= " + ae2_z(lat_fin,aElipsoide,e2Elipsoide);
        document.getElementById("ec_N").innerHTML="<h2>Ecuacion Primera Vertical</h2>";
        document.getElementById("z0").innerHTML=ae2_z(lat_fin,aElipsoide,e2Elipsoide);
        document.getElementById("laob").innerHTML=ConvertDDtoGMS(lat_fin);
        document.getElementById("y0").innerHTML=ae2_y(lat_fin,aElipsoide,e2Elipsoide);
        document.getElementById("tpv").innerHTML="<h2>Ecuacion Linea Tangente Primera Vertical     (1)</h2>";
        document.getElementById("z0T").innerHTML=ae2_z(lat_fin,aElipsoide,e2Elipsoide);
        document.getElementById("laobT").innerHTML=ConvertDDtoGMS(lat_fin);
        document.getElementById("y0T").innerHTML=ae2_y(lat_fin,aElipsoide,e2Elipsoide);
        document.getElementById("sat").innerHTML="<h2>Circunferencia del Satelite     (2)</h2>";
        document.getElementById("rsat").innerHTML= rads;
        document.getElementById("d_y").innerHTML="<h2>Despejando Z de(1)     (3) </h2>";
        document.getElementById("laobD").innerHTML=ConvertDDtoGMS(lat_fin);
        document.getElementById("y0D").innerHTML=ae2_y(lat_fin,aElipsoide,e2Elipsoide);
        document.getElementById("z0D").innerHTML=ae2_z(lat_fin,aElipsoide,e2Elipsoide);
        document.getElementById("d_ty").innerHTML=ta;
        document.getElementById("r_m").innerHTML=ydis;
        document.getElementById("tre").innerHTML=zp0;
        document.getElementById("tt").innerHTML=ta;
        document.getElementById("tt_s").innerHTML=tot;
        document.getElementById("remp").innerHTML="<h2>Remplaznado (3) en (2)</h2>";
        document.getElementById("ttt").innerHTML=ta;
        document.getElementById("ttt_s").innerHTML=tot;
        document.getElementById("rsatt").innerHTML= rads;
        binom(ta,tot);
        document.getElementById("fac_a").innerHTML= res_q;
        document.getElementById("fac_b").innerHTML= res_w;
        document.getElementById("fac_c").innerHTML= res_e;
        document.getElementById("rsattt").innerHTML= rads;
        armar(res_q,res_w,res_e,rads);
        document.getElementById("fa_a").innerHTML= re_a;
        document.getElementById("fa_b").innerHTML= re_b;
        document.getElementById("fa_c").innerHTML= re_c;
        document.getElementById("cuad").innerHTML="<h2>Resolver Cuadratica y reemplazar</h2>";
        res(re_a,re_b,re_c);
        document.getElementById("y_1").innerHTML= x1;
        document.getElementById("y_2").innerHTML= x2;
        z1=hallarz(x1,ta,tot);
        z2=hallarz(x2,ta,tot);
        document.getElementById("z_1").innerHTML= z1;
        document.getElementById("z_2").innerHTML= z2;
        mostrar();
        
    }
    function mostrar(){
        document.getElementById('obj2').style.display = 'inline';
        }

