import * as THREE from '../libs/three.module.js'
import { CSG } from '../libs/CSG-v2.js'
import * as TWEEN from '../libs/tween.esm.js'

class Llave extends THREE.Object3D {
  constructor(gui, titleGui){
    super();

    var mat = new THREE.MeshPhongMaterial({color: 0xFFFF00});

    var cilGeom = new THREE.CylinderGeometry (1,1,10, 25);
    this.cil = new THREE.Mesh (cilGeom, mat);

    var cilGeom2 = new THREE.CylinderGeometry (0.7,0.7,2, 25);
    this.cil2 = new THREE.Mesh (cilGeom2, mat);

    this.cil2.rotation.z = Math.PI/2;
    this.cil2.position.x = 1.5;
    this.cil2.position.y = 4;

    var cilGeom3 = new THREE.CylinderGeometry (0.7,0.7,2, 25);
    this.cil3 = new THREE.Mesh (cilGeom3, mat);

    this.cil3.rotation.z = Math.PI/2;
    this.cil3.position.x = 1.5;
    this.cil3.position.y = 1.5;

    var toroGeom = new THREE.TorusGeometry (2,1,20, 25);
    this.toro = new THREE.Mesh (toroGeom, mat);

    this.toro.position.y = -7;

    this.llave = new THREE.Object3D();
    this.llave.add(this.cil);
    this.llave.add(this.cil2);
    this.llave.add(this.cil3);
    this.llave.add(this.toro);

    this.llave.position.y = 4;
    this.llave.rotation.z = Math.PI/2;

    this.add(this.llave);

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

    this.llave.rotation.y += 0.01;


}
}

export { Llave };