let scene, camera, renderer, controls;

document.getElementById('upload').addEventListener('change', function (e) {
  const img = document.getElementById('previewImg');
  const file = e.target.files[0];
  if (file) {
    img.src = URL.createObjectURL(file);
  }
});

document.getElementById("processBtn").addEventListener("click", () => {
  if (!scene) initScene();
  addDummyBlock();
});

function initScene() {
  const canvas = document.getElementById("threeCanvas");

  renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
  renderer.setSize(canvas.clientWidth, canvas.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);

  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xdfe6e9);

  const aspect = canvas.clientWidth / canvas.clientHeight;
  const d = 20;
  camera = new THREE.OrthographicCamera(-d * aspect, d * aspect, d, -d, 1, 1000);
  camera.position.set(20, 20, 20);
  camera.lookAt(0, 0, 0);

  controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.enablePan = false;
  controls.minZoom = 0.5;
  controls.maxZoom = 4;

  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(10, 20, 10);
  scene.add(light);
  scene.add(new THREE.AmbientLight(0xaaaaaa));

  const grid = new THREE.GridHelper(40, 40);
  scene.add(grid);

  animate();
}

function addDummyBlock() {
  const geometry = new THREE.BoxGeometry(5, 5, 5);
  const material = new THREE.MeshStandardMaterial({ color: 0x6c5ce7 });
  const cube = new THREE.Mesh(geometry, material);
  cube.position.set(0, 2.5, 0);
  scene.add(cube);
}

function animate() {
  requestAnimationFrame(animate);
  if (controls) controls.update();
  if (renderer && scene && camera) renderer.render(scene, camera);
}