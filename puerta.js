import * as THREE from '../libs/three.module.js'
import { CSG } from '../libs/CSG-v2.js'
import * as TWEEN from '../libs/tween.esm.js'

class Puerta extends THREE.Object3D {
  constructor(gui, titleGui){
    super();

    var mat = new THREE.MeshPhongMaterial({color: 0x804000});

    var rectGeo = new THREE.BoxGeometry(2,30,20);
    var rect = new THREE.Mesh(rectGeo, mat); 
    
    // CREAR POMO
    var matPomo = new THREE.MeshPhongMaterial({color: 0xFFFF00});

    var baseGeo = new THREE.CylinderGeometry(2,2,0.5, 20);
    var base = new THREE.Mesh(baseGeo, matPomo); 
    
    var troncoGeo = new THREE.CylinderGeometry(0.75, 0.75, 3, 20);
    var tronco = new THREE.Mesh(troncoGeo, matPomo);

    tronco.position.y += 1.5;

    var esferaGeo = new THREE.SphereGeometry(2, 10, 10);
    var esfera = new THREE.Mesh(esferaGeo, matPomo);

    esfera.position.y += 1.5 + 2;
    esfera.scale.x *= 1.5;
    esfera.scale.z *= 1.5;

    // Mediante operaciones booleanas se creará la cerradura del pomo
    var huecoLlaveAbajoGeo = new THREE.BoxGeometry(2, 2, 1);
    var huecoLlaveAbajo = new THREE.Mesh(huecoLlaveAbajoGeo, mat);

    var huecoLlaveArribaGeo = new THREE.CylinderGeometry(0.75, 0.75, 2, 20);
    var huecoLlaveArriba = new THREE.Mesh(huecoLlaveArribaGeo, mat);

    huecoLlaveAbajo.position.y +=1.5 + 2 + 2;
    huecoLlaveArriba.position.y +=1.5 + 2 + 2
    huecoLlaveArriba.position.x -= 0.75;

    var csg = new CSG();
    csg.union([base, tronco, esfera]);
    csg.subtract([huecoLlaveAbajo]);
    csg.subtract([huecoLlaveArriba]);

    var pomo = csg.toMesh ( );

    pomo.rotation.z = -Math.PI/2;

    pomo.userData = this;
    this.add(pomo);

    // FIN CREAR POMO

    pomo.position.x += 1; // Colocar pomo sobre la puerta

    rect.position.y = 15; // Elevar sobre el 0,0,0 la puerta
    rect.position.z = -10; // Mover para que se gire sobre las "bisagras" al abrir

    pomo.scale.y *= 0.35; // tamaño del pomo proporcional a la puerta
    pomo.scale.x *= 0.35;
    pomo.scale.z *= 0.35;

    pomo.position.z = -17; // colocar pomo a la izquierda en el centro de la puerta
    pomo.position.y = 15;

    var puerta = new THREE.Object3D();

    puerta.add(pomo);
    puerta.add(rect);

    var origen = { t:0};
    var fin = {t:-Math.PI/3};
    var origen2 = {t:-Math.PI/3};
    var fin2 = {t: 0};
    var tiempoDeRecorrido = 2000;

    // animacion de abrir puerta
    // el pomo rota como si se estuviese girando con la mano para abrir
    this.animacion1 = new TWEEN.Tween (origen).to (fin, tiempoDeRecorrido)
    .onUpdate(() => {
      puerta.rotation.y = -origen.t;
      pomo.rotation.x = -origen.t;
    });

    // animacion de cerrar puerta
    // el pomo rota como si se estuviese girando con la mano para cerrar
    this.animacion2 = new TWEEN.Tween (origen2).to (fin2, tiempoDeRecorrido)
    .onUpdate(() => {
      puerta.rotation.y = -origen2.t;
      pomo.rotation.x = -origen2.t;
    });

    this.abierta=false; // variable usada para saber en qué estado está la puerta

    puerta.position.z += 10; // devolver la puerta al centro

    pomo.userData = this; // referenciar al objeto entero cuando se haga click en el pomo
    this.add(puerta);

    this.sePuedeAbrir = false;
    this.esAutomatica = false;
}

recibeClic(meshConcreto) { // si se clicó el pomo si está cerrada se abre y viceversa
  if(this.sePuedeAbrir || this.esAutomatica){
    if(!this.abierta){
      this.animacion1.start();
      this.abierta = true;
    }
    else{
      this.animacion2.start();
      this.abierta = false;
    }

    this.esAutomatica = false;
  }
}

setSePuedeAbrir(sePuede){
  this.sePuedeAbrir = sePuede;
}

setEsAutomatica(automatica){
  this.esAutomatica = automatica;
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

    //this.llave.rotation.y += 0.01

  TWEEN.update();

  if(this.esAutomatica == true){
    recibeClic();
  }
}
}

export { Puerta };