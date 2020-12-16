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
//Guardar n n' s s'
function getdat() {
    n=parseFloat(document.getElementById("n").value);
    n_p=parseFloat(document.getElementById("n_p").value);
    s=parseFloat(document.getElementById("s").value);
    s_p=parseFloat(document.getElementById("s_p").value);
}
//CONVERTIR GRADOS MINUTOS SEGUNDOS A DECIMAL
    function ConvertGMSToDD(grados, minutos, segundos, direccion) {
        var dd = grados + minutos/60 + segundos/(60*60);
        if (direccion == "S" || direccion == "W") {
            dd = dd * (-1);
        } // Don't do anything for N or E
    return dd;
    }
//CALCULAR D Y C
function cal_d_c(){
    dcalc=(2*n)-2;
    ccalc=((n-s+1)+((n_p-(2*s_p)+3)));
}
//CALCULO ALFA o BETA
function alfa1(an) {
    ang=an*(Math.PI/180);
    ang2=(an+0.0002777777777777778)*(Math.PI/180);
    al1=Math.log10(Math.sin(ang));
    al_1=Math.log10(Math.sin(ang2));
}
//Calculo camino
function camino(a1,b1,a2,b2) {
    cam=((dcalc - ccalc)/dcalc)*(((a1*a1)+a1*b1+(b1*b1))+((a2*a2)+a2*b2+(b2*b2)));
return cam;
}
//BOTONES
function boton1(){
    get8ang();
    getdat();
    cal_d_c()
    document.getElementById("d").innerHTML= "D (Número de direcciones figura)=" + dcalc;
    document.getElementById("c").innerHTML="C (Numero de condiciones que presenta la figura)=" + ccalc;
}
//MOSTRAR DATOS
function setData() {
    alfa1(ang8[3]);
    alf1=(al_1 - al1)*Math.pow(10,6);
    alfa1(ang8[1]+ang8[2]);
    bet1=(al_1 - al1)*Math.pow(10,6);
    alfa1(ang8[6]+ang8[5]);
    alf2=(al_1 - al1)*Math.pow(10,6);
    alfa1(ang8[7]);
    bet2=(al_1 - al1)*Math.pow(10,6);
    camin=camino(alf1,bet1,alf2,bet2);
    document.getElementById("c_1").innerHTML= "δ<sub>α1</sub>= "+ alf1.toExponential() +"<br>δ<sub>β1</sub>= "+bet1.toExponential()+"<br>δ<sub>α2</sub>= "+alf2.toExponential()+"<br>δ<sub>β2</sub>= "+bet2.toExponential()+"<br>R<sub>1</sub>= "+camin;


    alfa1(ang8[6]);
    alf1=(al_1 - al1)*Math.pow(10,6);
    alfa1(ang8[0]+ang8[7]);
    bet1=(al_1 - al1)*Math.pow(10,6);
    alfa1(ang8[4]+ang8[3]);
    alf2=(al_1 - al1)*Math.pow(10,6);
    alfa1(ang8[2]);
    bet2=(al_1 - al1)*Math.pow(10,6);
    camin=camino(alf1,bet1,alf2,bet2);
    document.getElementById("c_2").innerHTML= "δ<sub>α1</sub>= "+ alf1.toExponential() +"<br>δ<sub>β1</sub>= "+bet1.toExponential()+"<br>δ<sub>α2</sub>= "+alf2.toExponential()+"<br>δ<sub>β2</sub>= "+bet2.toExponential()+"<br>R<sub>2</sub>= "+camin;


    alfa1(ang8[6]);
    alf1=(al_1 - al1)*Math.pow(10,6);
    alfa1(ang8[1]);
    bet1=(al_1 - al1)*Math.pow(10,6);
    alfa1(ang8[4]);
    alf2=(al_1 - al1)*Math.pow(10,6);
    alfa1(ang8[7]);
    bet2=(al_1 - al1)*Math.pow(10,6);
    camin=camino(alf1,bet1,alf2,bet2);
    document.getElementById("c_3").innerHTML= "δ<sub>α1</sub>= "+ alf1.toExponential() +"<br>δ<sub>β1</sub>= "+bet1.toExponential()+"<br>δ<sub>α2</sub>= "+alf2.toExponential()+"<br>δ<sub>β2</sub>= "+bet2.toExponential()+"<br>R<sub>3</sub>= "+camin;


    alfa1(ang8[3]);
    alf1=(al_1 - al1)*Math.pow(10,6);
    alfa1(ang8[0]);
    bet1=(al_1 - al1)*Math.pow(10,6);
    alfa1(ang8[5]);
    alf2=(al_1 - al1)*Math.pow(10,6);
    alfa1(ang8[2]);
    bet2=(al_1 - al1)*Math.pow(10,6);
    camin=camino(alf1,bet1,alf2,bet2);
    document.getElementById("c_4").innerHTML= "δ<sub>α1</sub>= "+ alf1.toExponential() +"<br>δ<sub>β1</sub>= "+bet1.toExponential()+"<br>δ<sub>α2</sub>= "+alf2.toExponential()+"<br>δ<sub>β2</sub>= "+bet2.toExponential()+"<br>R<sub>4</sub>= "+camin;

}
