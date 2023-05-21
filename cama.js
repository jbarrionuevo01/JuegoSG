import * as THREE from '../libs/three.module.js'
import { CSG } from '../libs/CSG-v2.js'
import * as TWEEN from '../libs/tween.esm.js'

class Cama extends THREE.Object3D {
  constructor(gui, titleGui){
    super();

    //var mat = new THREE.MeshNormalMaterial();

    var textureMadera = new THREE.TextureLoader().load('./imgs/madera1.jpg');
    var matMadera = new THREE.MeshPhongMaterial ({map: textureMadera});
  
    var textureSabana = new THREE.TextureLoader().load('./imgs/telaRoja.jpg');
    var matColchon = new THREE.MeshPhongMaterial ({map: textureSabana});

      
    var textureAlmohada = new THREE.TextureLoader().load('./imgs/sabana.jpg');
    var matAlmohada = new THREE.MeshPhongMaterial ({map: textureAlmohada});

    //var matColchon = new THREE.MeshPhongMaterial ({color: 0xFF0000});
    //var matAlmohada = new THREE.MeshPhongMaterial ({color: 0xFFFFFF});
    //var mat = new THREE.MeshPhongMaterial({color: 0xC6C6C6});

    var geometriaPataCama = new THREE.BoxGeometry(0.5,2,0.5);
    geometriaPataCama.translate(0,1,0);
    var pata1 = new THREE.Mesh (geometriaPataCama, matMadera);
    pata1.position.x = 4;
    pata1.position.z = 2;
    var pata2 = new THREE.Mesh (geometriaPataCama, matMadera);
    pata2.position.x = 4;
    pata2.position.z = -2;
    var pata3 = new THREE.Mesh (geometriaPataCama, matMadera);
    pata3.position.x = -4;
    pata3.position.z = 2;
    var pata4 = new THREE.Mesh (geometriaPataCama, matMadera);
    pata4.position.x = -4;
    pata4.position.z = -2;

    var geometriaTablero = new THREE.BoxGeometry(8.5,4.5,0.5);
    var tableroMesa = new THREE.Mesh (geometriaTablero, matMadera);
    tableroMesa.position.y = 2.25;
    tableroMesa.rotation.x = (Math.PI / 2);

    var geometriaColchon = new THREE.BoxGeometry(6.5,4.5,0.75);
    var colchon = new THREE.Mesh (geometriaColchon, matColchon);
    colchon.position.y = 2.875;
    colchon.position.x = 1;
    colchon.rotation.x = (Math.PI / 2);

    var geometriaAlmohada = new THREE.BoxGeometry(2,4.5,0.75);
    var almohada = new THREE.Mesh (geometriaAlmohada, matAlmohada);
    almohada.position.y = 2.875;
    almohada.position.x = -3.25;
    almohada.rotation.x = (Math.PI / 2);

    this.cama = new THREE.Object3D();
  
    this.cama.add(pata1);
    this.cama.add(pata2);
    this.cama.add(pata3);
    this.cama.add(pata4);
    this.cama.add(tableroMesa);
    this.cama.add(colchon);
    this.cama.add(almohada);
    
    this.cama.position.z = 3;
    this.cama.scale.set(1.5,1.5,1.5);
    this.add(this.cama);
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

export { Cama };