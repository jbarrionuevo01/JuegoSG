import * as THREE from '../libs/three.module.js'
import { CSG } from '../libs/CSG-v2.js'
import * as TWEEN from '../libs/tween.esm.js'

class Silla extends THREE.Object3D {
  constructor(gui, titleGui){
    super();

    
    var texture = new THREE.TextureLoader().load('./imgs/madera2.jpg');
    var matMadera = new THREE.MeshPhongMaterial ({map: texture});


    //var mat = new THREE.MeshNormalMaterial();
    var mat = new THREE.MeshPhongMaterial({color: 0xFF3333});

    var geometriaPataSilla = new THREE.BoxGeometry(0.5,4,0.5);
    geometriaPataSilla.translate(0,2,0);
    var pata1 = new THREE.Mesh (geometriaPataSilla, matMadera);
    pata1.position.x = 2;
    pata1.position.z = 2;
    var pata2 = new THREE.Mesh (geometriaPataSilla, matMadera);
    pata2.position.x = 2;
    pata2.position.z = -2;
    var pata3 = new THREE.Mesh (geometriaPataSilla, matMadera);
    pata3.position.x = -2;
    pata3.position.z = 2;
    var pata4 = new THREE.Mesh (geometriaPataSilla, matMadera);
    pata4.position.x = -2;
    pata4.position.z = -2;

    var geometriaAsiento = new THREE.BoxGeometry(4.5,4.5,0.5);
    var asientoSilla = new THREE.Mesh (geometriaAsiento, matMadera);
    asientoSilla.position.y = 4.25;
    asientoSilla.rotation.x = (Math.PI / 2);

    var geometriaRespaldo = new THREE.BoxGeometry(4.5,5.5,0.5);
    geometriaRespaldo.translate(0,2,0);
    var respaldoSilla = new THREE.Mesh (geometriaRespaldo, matMadera);
    respaldoSilla.position.y = 4.5;
    respaldoSilla.position.z = -2;

    var geometriaHuecoRespaldo = new THREE.BoxGeometry(3.5,2,0.5);
    geometriaHuecoRespaldo.translate(0,0.5,0);

    var huecoRespaldo = new THREE.Mesh (geometriaHuecoRespaldo, mat);
    huecoRespaldo.position.y = 4.5;
    huecoRespaldo.position.z = -2;

    var csgSilla= new CSG();
    csgSilla.union([respaldoSilla]);
    csgSilla.union([asientoSilla]);
    csgSilla.union([pata1]);
    csgSilla.union([pata2]);
    csgSilla.union([pata3]);
    csgSilla.union([pata4]);
    csgSilla.subtract([huecoRespaldo]);
   

    var sillaCompleta = csgSilla.toMesh ( );

    this.silla = new THREE.Object3D();

    this.silla.add(sillaCompleta);
    
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