import * as THREE from 'three';
import vertexShader from './vertex.glsl';
import fragmentShader from './fragment.glsl';
import img0 from './img/img.jpg';
import img1 from './img/img1.jpg';
import img2 from './img/img2.jpg';
import img3 from './img/img3.jpg';
import img4 from './img/img4.jpg';
import img5 from './img/img5.jpg';
import video1src from './img/vid1.mp4';
import video2src from './img/vid2.mp4';

const video1 = document.createElement('video');
video1.src = video1src;
video1.crossOrigin = 'anonymous';
video1.loop = true;
video1.muted = true;
video1.playsInline = true;
video1.autoplay = true;

const video2 = document.createElement('video');
video2.src = video2src;
video2.crossOrigin = 'anonymous';
video2.loop = true;
video2.muted = true;
video2.playsInline = true;
video2.autoplay = true;

// const gallery = [video1, video2];
const gallery = [img0, img1, img2];

// Function to start all videos
const startVideos = async () => {
    try {
        await Promise.all([
            video1.play(),
            video2.play()
        ]);
    } catch (error) {
        console.warn('Autoplay failed:', error);
    }
};

// Try to start videos immediately
startVideos();

// Also try to start videos on first user interaction
document.addEventListener('click', () => {
    startVideos();
}, { once: true });

export class Experience {
    constructor(updateIndex) {
        this.updateIndex = updateIndex;
        this.setup();
        this.time = 0;
        this.speed = 0;
        this.position = 0;
        this.touchStartY = 0;
        this.touchEndY = 0;
        
        document.addEventListener("resize", this.resize.bind(this));
        document.addEventListener('wheel', this.onWheel.bind(this));
        // Add touch events with passive: false
        document.addEventListener('touchstart', this.onTouchStart.bind(this), { passive: false });
        document.addEventListener('touchmove', this.onTouchMove.bind(this), { passive: false });
        document.addEventListener('touchend', this.onTouchEnd.bind(this), { passive: false });
        
        this.textureLoader = new THREE.TextureLoader();
        this.textures = [];
        
        gallery.forEach((vid) => {
            // const texture = new THREE.VideoTexture(vid);
            // texture.minFilter = THREE.LinearFilter;
            // texture.magFilter = THREE.LinearFilter;
            // this.textures.push(texture);
            this.textures.push(this.textureLoader.load(vid));
        });
        
        this.addObject();
        this.update();
        this.resize();
        this.render();
    }

    setup() {
        this.container = document.getElementById('experience');
        this.scene = new THREE.Scene();
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.container.appendChild(this.renderer.domElement)
        this.camera = new THREE.PerspectiveCamera(65, 2, 0.1, 1000);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.camera.position.z = 1;
    }

    addObject() {
        this.geometry = new THREE.PlaneGeometry(1, 1, 1, 1);
        this.material = new THREE.ShaderMaterial({
            side: THREE.DoubleSide,
            vertexShader: vertexShader,
            fragmentShader: fragmentShader,
            uniforms: {
                time: { value: 0 },
                pixels: { value: new THREE.Vector2(this.width,this.height) },
                uvRate1: { value: new THREE.Vector2(1,1) },
                texture1: { value: this.textures[0] },
                texture2: { value: this.textures[1] },
                accel: { value: new THREE.Vector2(0.5,2)},
                progress: { value: 0 },
            },
            transparent: true,
        });
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.scene.add(this.mesh);
    }

    onWheel(event) {
        this.speed += event.deltaY * 0.0002;
    }

    onTouchStart(event) {
        this.touchStartY = event.touches[0].clientY;
    }

    onTouchMove(event) {
        // Remove preventDefault
        this.touchEndY = event.touches[0].clientY;
        const deltaY = this.touchEndY - this.touchStartY;
        this.speed += -deltaY * 0.0007;
        this.touchStartY = this.touchEndY;
    }

    onTouchEnd() {
        this.touchStartY = 0;
        this.touchEndY = 0;
    }

    resize() {
        this.width = this.container.offsetWidth;
        this.height = this.container.offsetHeight;
        this.renderer.setSize(this.width, this.height);
        this.camera.aspect = this.width / this.height;

        if (this.material) {
            this.material.uniforms.uvRate1.value.x = this.width / this.height;
            this.material.uniforms.pixels.value.x = this.width;
            this.material.uniforms.pixels.value.y = this.height;
        }

        this.camera.fov = (360 / Math.PI) * Math.atan(this.height / (2 * this.camera.position.z));
        if (this.geometry) {
            this.mesh.scale.set(this.width, this.height, 1);
        }

        this.camera.updateProjectionMatrix();
    }

    update() {
        this.position += this.speed;
        this.speed *=0.7;


        let i = Math.round(this.position);
        let dif = i - this.position;

        // dif = dif<0? Math.max(dif,-0.02):Math.max(dif,+0.03);

        this.position += dif*0.035;
        if(Math.abs(i - this.position)<0.001) {
            this.position = i;
        }
        this.material.uniforms.progress.value = this.position;

        let curslide = (Math.floor(this.position)%gallery.length + gallery.length) % gallery.length;
        let nextslide = (curslide + 1)%gallery.length;
        this.updateIndex(curslide);
        this.material.uniforms.texture1.value = this.textures[curslide];
        this.material.uniforms.texture2.value = this.textures[nextslide];
    }

    render() {
        this.time += 0.01633;
        this.update();
        this.material.uniforms.time.value = this.time;
        this.renderer.render(this.scene, this.camera);
        window.requestAnimationFrame(this.render.bind(this));
    }

    destroy() {
        this.renderer.dispose();
        this.geometry.dispose();
        this.material.dispose();
        this.scene.clear();
        this.container.removeChild(this.renderer.domElement);
        document.removeEventListener("resize", this.resize.bind(this));
        document.removeEventListener("wheel", this.onWheel.bind(this));
        // Remove touch events
        document.removeEventListener('touchstart', this.onTouchStart.bind(this));
        document.removeEventListener('touchmove', this.onTouchMove.bind(this));
        document.removeEventListener('touchend', this.onTouchEnd.bind(this));
    }
}