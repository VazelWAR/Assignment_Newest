const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, 1400 / 1200, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('tubeCanvas'), antialias: true });

renderer.setSize(1400, 1200);
renderer.setClearColor(0xffffff);
document.querySelector('.empty1').appendChild(renderer.domElement);

function generateTorusPoints(majorRadius, minorRadius, count) {
  const points = [];
  
  for (let i = 0; i < count; i++) {
    const theta = (i / count) * Math.PI * 2; 
    const phi = Math.random() * Math.PI * 2; 
    
    const x = (majorRadius + minorRadius * Math.cos(phi)) * Math.cos(theta);
    const y = (majorRadius + minorRadius * Math.cos(phi)) * Math.sin(theta);
    const z = minorRadius * Math.sin(phi);
    
    points.push(new THREE.Vector3(x, y, z));
  }

  return points;
}

const particleCount = 1000;
const particlesGeometry = new THREE.BufferGeometry();
const positions = new Float32Array(particleCount * 3);
const pointMaterial = new THREE.PointsMaterial({
  color: 0x990099, 
  size: 0.1 
});

const majorRadius = 8;
const minorRadius = 3;

const torusPoints = generateTorusPoints(majorRadius, minorRadius, particleCount);
for (let i = 0; i < particleCount; i++) {
  const point = torusPoints[i];

  positions[i * 3] = point.x;
  positions[i * 3 + 1] = point.y;
  positions[i * 3 + 2] = point.z;
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

const particleSystem = new THREE.Points(particlesGeometry, pointMaterial);
scene.add(particleSystem);

camera.position.z = 20;


function getRandomColor() {
  return Math.floor(Math.random() * 16777215);
}

let currentColor = new THREE.Color(pointMaterial.color.getHex());
let targetColor = new THREE.Color(getRandomColor());
let transitionProgress = 0;
const transitionDuration = 4000;
setInterval(() => {
  currentColor.copy(pointMaterial.color);
  targetColor.set(getRandomColor());
  transitionProgress = 0;
}, 4000);

function animate() {
  requestAnimationFrame(animate);

  particleSystem.rotation.x += 0.01;
  particleSystem.rotation.y += 0.01;

  if (transitionProgress < 1) {
    transitionProgress += (1 / (transitionDuration / 16));
    if (transitionProgress > 1) transitionProgress = 1;

    pointMaterial.color.copy(currentColor).lerp(targetColor, transitionProgress);
  }

  renderer.render(scene, camera);
}

animate();

window.addEventListener('resize', () => {
  renderer.setSize(1400, 1200);
  camera.aspect = 1400 / 1200;
  camera.updateProjectionMatrix();
});

