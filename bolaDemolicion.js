import * as THREE from '../libs/three.module.js'
import * as TWEEN from '../libs/tween.esm.js'
 
class BolaDemolicion extends THREE.Object3D {
  constructor(gui,titleGui) {
    super();
    
    // Se crea la parte de la interfaz que corresponde a la caja
    // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
    this.createGUI(gui,titleGui);

    var texture = new THREE.TextureLoader().load('../imgs/wood.jpg');
    var matSoporte = new THREE.MeshPhongMaterial ({map: texture});

    var cadenaGeom = new THREE.CylinderGeometry(0.2*7, 0.2*7, 20*7, 15);
    var matBola = new THREE.MeshPhongMaterial({color: "gray"});
    var cadena = new THREE.Mesh(cadenaGeom, matBola);

    var bolaGeom = new THREE.SphereGeometry(4*7, 10*7, 10*7);
    this.bola = new THREE.Mesh(bolaGeom, matBola);

    var soporteGeom1 = new THREE.CylinderGeometry(2*7, 2*7, 1*7, 20);
    var soporte1 = new THREE.Mesh(soporteGeom1, matSoporte);

    var soporteGeom2 = new THREE.BoxGeometry(1*7, 3*7, 1*7);
    var soporte2 = new THREE.Mesh(soporteGeom2, matSoporte);

    cadena.position.y = -10*7;
    this.bola.position.y = -19*7;

    this.bolaDemolicion = new THREE.Object3D();
    this.bolaDemolicion.add(cadena);
    this.bolaDemolicion.add(this.bola);

    var origen = { t:-Math.PI/4};
    var fin = {t:Math.PI/4};
    var origen2 = {t:Math.PI/4};
    var fin2 = {t: -Math.PI/4};
    var tiempoDeRecorrido = 1000;

    var animacion1 = new TWEEN.Tween (origen).to (fin, tiempoDeRecorrido)
    .onUpdate(() => {
      this.bolaDemolicion.rotation.z = -origen.t;
    }).onComplete(() => {animacion2.start()}).start();

    var animacion2 = new TWEEN.Tween (origen2).to (fin2, tiempoDeRecorrido)
    .onUpdate(() => {
      this.bolaDemolicion.rotation.z = -origen2.t;
    }).onComplete(() => {animacion1.start()});

    soporte1.rotation.x = Math.PI/2;
    soporte1.position.y = -4.8*7;
    soporte2.position.y = -1.5*7;
    this.bolaDemolicion.position.y = -4.8*7;
    this.final = new THREE.Object3D();
    this.final.add(soporte1);
    this.final.add(soporte2);
    this.final.add(this.bolaDemolicion);

    this.final.rotation.y = Math.PI/2;

    this.add(this.final);

  }
  
  createGUI (gui,titleGui) {

  }

  getBolaPosition(){
    var bolaPos = new THREE.Vector3();
    this.bola.getWorldPosition(bolaPos);
    return bolaPos;
  }

  update () {
    // Con independencia de cómo se escriban las 3 siguientes líneas, el orden en el que se aplican las transformaciones es:
    // Primero, el escalado
    // Segundo, la rotación en Z
    // Después, la rotación en Y
    // Luego, la rotación en X
    // Y por último la traslación
    TWEEN.update();
    
  }
}

export { BolaDemolicion };
