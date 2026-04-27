// Initialize Three.js scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('world-container').appendChild(renderer.domElement);

// Create a character
const characterGeometry = new THREE.BoxGeometry(1, 2, 1);
const characterMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const character = new THREE.Mesh(characterGeometry, characterMaterial);
character.position.y = 1;
scene.add(character);

// Create a rolling terrain
const terrainGeometry = new THREE.PlaneGeometry(100, 100, 10, 10);
const terrainMaterial = new THREE.MeshBasicMaterial({ color: 0x8b4513 });
const terrain = new THREE.Mesh(terrainGeometry, terrainMaterial);
terrain.rotation.x = -Math.PI / 2;
scene.add(terrain);

// Create a blue sky with white clouds
const skyGeometry = new THREE.SphereGeometry(500, 60, 40);
const skyMaterial = new THREE.MeshBasicMaterial({ color: 0x87ceeb });
const sky = new THREE.Mesh(skyGeometry, skyMaterial);
scene.add(sky);

// Add random geometric objects
function addRandomObject() {
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: Math.random() * 0xffffff });
    const object = new THREE.Mesh(geometry, material);
    object.position.set(Math.random() * 200 - 100, Math.random() * 200 - 100, Math.random() * 200 - 100);
    scene.add(object);
}

for (let i = 0; i < 50; i++) {
    addRandomObject();
}

// Controls
const controls = {
    up: false,
    down: false,
    left: false,
    right: false,
    jump: false
};

document.getElementById('up').addEventListener('click', () => { controls.up = true; });
document.getElementById('down').addEventListener('click', () => { controls.down = true; });
document.getElementById('left').addEventListener('click', () => { controls.left = true; });
document.getElementById('right').addEventListener('click', () => { controls.right = true; });
document.getElementById('jump').addEventListener('click', () => { controls.jump = true; });

// Animation loop
function animate() {
    requestAnimationFrame(animate);

    if (controls.up) character.position.z -= 0.1;
    if (controls.down) character.position.z += 0.1;
    if (controls.left) character.position.x -= 0.1;
    if (controls.right) character.position.x += 0.1;
    if (controls.jump) {
        character.position.y += 0.5;
        controls.jump = false;
    }

    renderer.render(scene, camera);
}

animate();