import * as THREE from '../libs/three.module.js'
import { CSG } from '../libs/CSG-v2.js'
import * as TWEEN from '../libs/tween.esm.js'

class Silla extends THREE.Object3D {
  constructor(gui, titleGui){
    super();

    //var mat = new THREE.MeshNormalMaterial();
    var mat = new THREE.MeshPhongMaterial({color: 0xFF3333});

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

    var geometriaHuecoRespaldo = new THREE.BoxGeometry(3.5,2,0.5);
    geometriaHuecoRespaldo.translate(0,0.75,0);

    var huecoRespaldo = new THREE.Mesh (geometriaHuecoRespaldo, mat);
    huecoRespaldo.position.y = 4.5;
    huecoRespaldo.position.z = -2;

    var csg = new CSG();
    csg.union([respaldoSilla]);
    csg.subtract([huecoRespaldo]);

    var respaldoConHueco = csg.toMesh ( );

    this.silla = new THREE.Object3D();
  
    this.silla.add(pata1);
    this.silla.add(pata2);
    this.silla.add(pata3);
    this.silla.add(pata4);
    this.silla.add(asientoSilla);
    this.silla.add(respaldoConHueco);
    
    this.add(this.silla);
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