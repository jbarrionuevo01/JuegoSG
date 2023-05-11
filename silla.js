import * as THREE from '../libs/three.module.js'
import { CSG } from '../libs/CSG-v2.js'
import * as TWEEN from '../libs/tween.esm.js'

class Silla extends THREE.Object3D {
  constructor(gui, titleGui){
    super();

    var mat = new THREE.MeshNormalMaterial();

    var geometriaPataSilla = new THREE.BoxGeometry(0.5,4,0.5);
    geometriaPataSilla.translate(0,2,0);
    var pata1 = new THREE.Mesh (geometriaPataSilla, mat);
    pata1.position.x = 2;
    pata1.position.z = 2;
    var pata2 = new THREE.Mesh (geometriaPataSilla, mat);
    pata2.position.x = 2;
    pata2.position.z = -2;
    var pata3 = new THREE.Mesh (geometriaPataSilla, mat);
    pata3.position.x = -2;
    pata3.position.z = 2;
    var pata4 = new THREE.Mesh (geometriaPataSilla, mat);
    pata4.position.x = -2;
    pata4.position.z = -2;

    var geometriaAsiento = new THREE.BoxGeometry(4.5,4.5,0.5);
    var asientoSilla = new THREE.Mesh (geometriaAsiento, mat);
    asientoSilla.position.y = 4;
    asientoSilla.rotation.x = (Math.PI / 2);

    var geometriaRespaldo = new THREE.BoxGeometry(4.5,5.5,0.5);
    geometriaRespaldo.translate(0,2,0);
    var respaldoSilla = new THREE.Mesh (geometriaRespaldo, mat);
    respaldoSilla.position.y = 4.5;
    respaldoSilla.position.z = -2;
    //asientoSilla.rotation.x = (Math.PI / 2);

    



    /*geometriaBaldasHorizontales.rotateZ(Math.PI / 2);
    geometriaBaldasHorizontales.rotateX(Math.PI / 2);
    geometriaBaldasHorizontales.translate(0,0.25,0);

    var geometriaBaldasVerticales = new THREE.BoxGeometry(2.5,11,0.5);
    geometriaBaldasVerticales.rotateY(Math.PI / 2);
    geometriaBaldasVerticales.translate(0,5.5,0);
    
    var baldaVertical1 = new THREE.Mesh (geometriaBaldasVerticales, mat);
    baldaVertical1.position.x = 5;
    var baldaVertical2 = new THREE.Mesh (geometriaBaldasVerticales, mat);
    baldaVertical2.position.x = -5;
    
    this.createGUI(gui, titleGui);

    //this.add (baldasHorizontales);

    this.silla = new THREE.Object3D();

    for(var i = 0; i < 4; i++)
    {
      var baldasHorizontales = new THREE.Mesh (geometriaBaldasHorizontales, mat);
      //baldasHorizontales.rotation.z =  (Math.PI / 2);
      //baldasHorizontales.rotation.x =  (Math.PI / 2);
      baldasHorizontales.position.y = i*3;
      this.silla.add (baldasHorizontales);
    }

    this.silla.add(baldaVertical1);
    this.silla.add(baldaVertical2);

    //this.estanteria.position.x = 100;
    //this.estanteria.position.z = 247.5;

    //this.estanteria.scale.set(4,4,4);

    this.add(this.silla);*/
    this.add(pata1);
    this.add(pata2);
    this.add(pata3);
    this.add(pata4);
    this.add(asientoSilla);
    this.add(respaldoSilla)
}



createGUI(gui, titleGui){

}

update(){
    //  Con independencia de cómo se escriban las 3 lineas siguientes, el orden en el que se aplican las transformaciones es:
    //  1º. Escalado
    //  2º. Rotación en Z
    //  3º. Rotación en Y
    //  4º. Rotación en X
    //  5º. Traslaciones

    //-= así va en el sentido de las agujas del reloj
    //espacio = velocidad x tiempo

}
}

export { Silla };