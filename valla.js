import * as THREE from '../libs/three.module.js'
import { CSG } from '../libs/CSG-v2.js'
import * as TWEEN from '../libs/tween.esm.js'

class Valla extends THREE.Object3D {
  constructor(gui, titleGui){
    super();

    var texture = new THREE.TextureLoader().load('./imgs/valla.jpg');
    var mat = new THREE.MeshPhongMaterial ({map: texture});;
    //var mat = new THREE.MeshPhongMaterial({color: 0xFF3333});
   

    var geometriaPalosVertical = new THREE.BoxGeometry(13,2,50);
    geometriaPalosVertical.translate(0,0,-25);
    geometriaPalosVertical.rotateX(Math.PI / 2);
    geometriaPalosVertical.rotateY(Math.PI / 2);

    var geometriaPalosHorizontal = new THREE.BoxGeometry(10,2,68);
    geometriaPalosHorizontal.translate(0,-2,0);
    //geometriaPalosHorizontal.rotateX(Math.PI / 2);
    geometriaPalosHorizontal.rotateZ(Math.PI / 2);

    var paloVertical1 = new THREE.Mesh (geometriaPalosVertical, mat);
    paloVertical1.position.set(0,0,26);
    var paloVertical2 = new THREE.Mesh (geometriaPalosVertical, mat);
    paloVertical2.position.set(0,0,8.5);
    var paloVertical3 = new THREE.Mesh (geometriaPalosVertical, mat);
    paloVertical3.position.set(0,0,-8.5);
    var paloVertical4 = new THREE.Mesh (geometriaPalosVertical, mat);
    paloVertical4.position.set(0,0,-26);

    var paloHorizontal1 = new THREE.Mesh (geometriaPalosHorizontal, mat);
    paloHorizontal1.position.set(0,34,0);

    var paloHorizontal2 = new THREE.Mesh (geometriaPalosHorizontal, mat);
    paloHorizontal2.position.set(0,16,0);

    
    this.valla = new THREE.Object3D();
    this.valla.add(paloVertical1);
    this.valla.add(paloVertical2);
    this.valla.add(paloVertical3);
    this.valla.add(paloVertical4);
    this.valla.add(paloHorizontal1);
    this.valla.add(paloHorizontal2);


    this.add(this.valla);
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

export { Valla };