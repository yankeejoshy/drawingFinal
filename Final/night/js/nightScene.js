let camera, scene, renderer, controls;
let sphere;
let degree = 0;

var bgAudio = document.querySelector("audio");
bgAudio.volume = 0.2;

function init() {
  scene = new THREE.Scene();
  let width = window.innerWidth;
  let height = window.innerHeight;

  camera = new THREE.PerspectiveCamera(45, width/height, 0.1, 25000);
  camera.position.z = 1000.5; // back camera out
  scene.add(camera);

  let light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(1, 1, 1);
  scene.add(light);

  let textureLoader = new THREE.TextureLoader();
  let loader = new THREE.CubeTextureLoader();
  const texture = loader.load([
    "resources/pic1.png",
    "resources/pic1.png",
    "resources/pic1.png",
    "resources/pic1.png",
    "resources/pic1.png",
    "resources/pic1.png",
  ]);
  scene.background = texture;

  textureLoader.load("resources/moonSurface.jpg", function(texture) {
    let material = new THREE.MeshStandardMaterial({map: texture});

    let sphereGeometry = new THREE.SphereGeometry(100, 50, 50);
    sphere = new THREE.Mesh(sphereGeometry, material);
    sphere.position.y = 50;
    scene.add(sphere);
  });

  renderer = new THREE.WebGLRenderer({alpha: 1, antialias: true});
  renderer.setSize(width, height);

  controls = new THREE.OrbitControls(camera, renderer.domElement);

  document.body.appendChild(renderer.domElement);
}

function animate() {
  requestAnimationFrame(animate);
  if (bgAudio.paused || bgAudio.duration == 0) bgAudio.play();
  renderer.render(scene, camera);
  let xSpeed = 0; let ySpeed = 0; let maxSpeed = 1; let angularV = 0.001;
  xSpeed = Math.cos(degree); ySpeed = Math.sin(degree);
  camera.position.x += xSpeed/10;
  camera.position.z -= ySpeed/10;
  camera.position.y = 4;
  if (degree < 2*Math.PI) {
    degree += angularV/10;
    if (degree >= 2*Math.PI) degree = 0;
  }
  controls.update();
}

init();
animate();
