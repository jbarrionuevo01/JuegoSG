import * as THREE from '../libs/three.module.js'
import { CSG } from '../libs/CSG-v2.js'
import * as TWEEN from '../libs/tween.esm.js'

class Estanteria extends THREE.Object3D {
  constructor(gui, titleGui){
    super();

    var mat = new THREE.MeshNormalMaterial();

    var geometriaBaldasHorizontales = new THREE.BoxGeometry(2.5,10,0.5);
    geometriaBaldasHorizontales.rotateZ(Math.PI / 2);
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

    this.estanteria = new THREE.Object3D();

    for(var i = 0; i < 4; i++)
    {
      var baldasHorizontales = new THREE.Mesh (geometriaBaldasHorizontales, mat);
      //baldasHorizontales.rotation.z =  (Math.PI / 2);
      //baldasHorizontales.rotation.x =  (Math.PI / 2);
      baldasHorizontales.position.y = i*3;
      this.estanteria.add (baldasHorizontales);
    }

    this.estanteria.add(baldaVertical1);
    this.estanteria.add(baldaVertical2);

    this.add(this.estanteria);
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

export { Estanteria };