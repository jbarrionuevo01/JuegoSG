import * as THREE from '../libs/three.module.js'
import { CSG } from '../libs/CSG-v2.js'
import * as TWEEN from '../libs/tween.esm.js'

class ParedCentral extends THREE.Object3D {
  constructor(gui, titleGui){
    super();

    //var mat = new THREE.MeshNormalMaterial();

    var texturePared = new THREE.TextureLoader().load('./imgs/ladrillos.jpg');
    texturePared.wrapS = THREE.RepeatWrapping;
    texturePared.wrapT = THREE.RepeatWrapping;
    texturePared.repeat.set(2,2);

    var materialPared = new THREE.MeshPhongMaterial ({map: texturePared});
    var geometryWallInt = new THREE.BoxGeometry (5,199.9,499.9);
    
    var wallInt = new THREE.Mesh (geometryWallInt, materialPared);

    // Hueco puerta paredes interiores
    var huecoWallIntGeom = new THREE.BoxGeometry (10,60,20);
    var huecoWallInt = new THREE.Mesh (huecoWallIntGeom, materialPared);

    wallInt.position.y = 100;
    huecoWallInt.y = 11;

    var csg = new CSG();
    csg.union([wallInt]);
    csg.subtract([huecoWallInt]);

    var paredHueco = csg.toMesh ( );

    this.add(paredHueco);

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

export { ParedCentral };