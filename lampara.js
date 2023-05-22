import * as THREE from '../libs/three.module.js'
import { CSG } from '../libs/CSG-v2.js'
import * as TWEEN from '../libs/tween.esm.js'

class Lampara extends THREE.Object3D {
  constructor(gui, titleGui){
    super();

    var mat = new THREE.MeshNormalMaterial;

    var textureNegro = new THREE.TextureLoader().load('../imgs/negro.jpg');
    var matLampara = new THREE.MeshPhongMaterial ({map: textureNegro});

    var geometriaBase = new THREE.CylinderGeometry(1.5,1.5,0.6,50);
    geometriaBase.translate(0,0.25,0);
    var base = new THREE.Mesh(geometriaBase, matLampara);

    var geometriaBrazo1 = new THREE.CylinderGeometry(0.2,0.2,3,50);
    geometriaBrazo1.rotateZ(-Math.PI / 6);
    geometriaBrazo1.translate(0.75,1.75,0);
    var brazo1 = new THREE.Mesh(geometriaBrazo1, matLampara);

    var geometriaArticulacion = new THREE.SphereGeometry(0.25);
    geometriaArticulacion.translate(1.6,3.25,0);
    var articulacion = new THREE.Mesh(geometriaArticulacion, matLampara);

    var geometriaBrazo2 = new THREE.CylinderGeometry(0.2,0.2,3,50);
    geometriaBrazo2.rotateZ(Math.PI / 4);
    geometriaBrazo2.translate(0.4,4.5,0);
    var brazo2 = new THREE.Mesh(geometriaBrazo2, matLampara);
    
    var geometriaFoco1 = new THREE.CylinderGeometry(0.75,1,1.25,50);
    geometriaFoco1.rotateZ(-Math.PI / 3);
    geometriaFoco1.translate(-1.25,6,0);
    var foco1 = new THREE.Mesh(geometriaFoco1, matLampara);

    var geometriaFoco2= new THREE.CylinderGeometry(0.9,1.5,1.25,50);
    geometriaFoco2.rotateZ(-Math.PI / 3);
    geometriaFoco2.translate(-2,5.55,0);
    var foco2 = new THREE.Mesh(geometriaFoco2, matLampara);

    var geometriaHueco = new THREE.CylinderGeometry(0.75,1.5,1.25,50);
    geometriaHueco.rotateZ(-Math.PI / 3);
    geometriaHueco.translate(-2.25,5.45,0);
    var huecofoco = new THREE.Mesh(geometriaHueco, mat);

    var csg = new CSG();
    csg.union([base]);
    csg.union([brazo1]);
    csg.union([articulacion]);
    csg.union([brazo2]);
    csg.union([foco1]);
    csg.union([foco2]);
    csg.subtract([huecofoco]);

    var focoConHueco = csg.toMesh ( );

    this.add(focoConHueco);
    
    this.lampara = new THREE.Object3D();
    this.lampara.add(focoConHueco);
    this.add(this.lampara);
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

export { Lampara };