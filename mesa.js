import * as THREE from '../libs/three.module.js'
import { CSG } from '../libs/CSG-v2.js'
import * as TWEEN from '../libs/tween.esm.js'

class Mesa extends THREE.Object3D {
  constructor(gui, titleGui){
    super();

    //var mat = new THREE.MeshNormalMaterial();
    var mat = new THREE.MeshPhongMaterial({color: 0xD57F11});

    var geometriaPatamesa = new THREE.BoxGeometry(0.5,4,0.5);
    geometriaPatamesa.translate(0,2,0);
    var pata1 = new THREE.Mesh (geometriaPatamesa, mat);
    pata1.position.x = 4;
    pata1.position.z = 2;
    var pata2 = new THREE.Mesh (geometriaPatamesa, mat);
    pata2.position.x = 4;
    pata2.position.z = -2;
    var pata3 = new THREE.Mesh (geometriaPatamesa, mat);
    pata3.position.x = -4;
    pata3.position.z = 2;
    var pata4 = new THREE.Mesh (geometriaPatamesa, mat);
    pata4.position.x = -4;
    pata4.position.z = -2;

    var geometriaTablero = new THREE.BoxGeometry(8.5,4.5,0.5);
    var tableroMesa = new THREE.Mesh (geometriaTablero, mat);
    tableroMesa.position.y = 4;
    tableroMesa.rotation.x = (Math.PI / 2);


    this.mesa = new THREE.Object3D();
  
    this.mesa.add(pata1);
    this.mesa.add(pata2);
    this.mesa.add(pata3);
    this.mesa.add(pata4);
    this.mesa.add(tableroMesa);
    
    this.mesa.position.z = 3;
    this.mesa.scale.set(1.5,1.5,1.5);
    this.add(this.mesa);
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

export { Mesa };