// Shader Animation (Vanilla JS Port)
document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('shader-container');
    if (!container) return;

    // Vertex Shader (Standard pass-through)
    const vertexShader = `
        void main() {
            gl_Position = vec4( position, 1.0 );
        }
    `;

    // Fragment Shader (Adapted for Black & Gold theme)
    const fragmentShader = `
        #define TWO_PI 6.2831853072
        #define PI 3.14159265359

        precision highp float;
        uniform vec2 resolution;
        uniform float time;

        void main(void) {
            vec2 uv = (gl_FragCoord.xy * 2.0 - resolution.xy) / min(resolution.x, resolution.y);
            float t = time * 0.05;
            float lineWidth = 0.002;

            vec3 color = vec3(0.0);
            
            // Gold Color Palette
            vec3 goldColor = vec3(0.83, 0.68, 0.21); // Metallic Gold

            for(int j = 0; j < 3; j++){
                for(int i=0; i < 5; i++){
                    // Calculate wave interference pattern
                    float d = abs(fract(t - 0.01*float(j)+float(i)*0.01)*5.0 - length(uv) + mod(uv.x+uv.y, 0.2));
                    
                    // Modulate intensity based on distance 'd'
                    float intensity = lineWidth * float(i*i) / d;
                    
                    // Apply gold tint with varying brightness based on 'j' layer
                    color += goldColor * intensity * (0.5 + 0.5 * sin(time * 0.1 + float(j))); 
                }
            }
            
            // Final composite: Ensure background stays deep black, enhance highlights
            gl_FragColor = vec4(color, 1.0);
        }
    `;

    // Initialize Three.js Scene
    const camera = new THREE.Camera();
    camera.position.z = 1;

    const scene = new THREE.Scene();
    const geometry = new THREE.PlaneGeometry(2, 2);

    const uniforms = {
        time: { type: "f", value: 1.0 },
        resolution: { type: "v2", value: new THREE.Vector2() },
    };

    const material = new THREE.ShaderMaterial({
        uniforms: uniforms,
        vertexShader: vertexShader,
        fragmentShader: fragmentShader,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    // Resize Handler
    const onWindowResize = () => {
        const width = container.clientWidth;
        const height = container.clientHeight;
        renderer.setSize(width, height);
        uniforms.resolution.value.x = renderer.domElement.width;
        uniforms.resolution.value.y = renderer.domElement.height;
    };

    // Initial Resize & Event Listener
    onWindowResize();
    window.addEventListener("resize", onWindowResize, false);

    // Animation Loop
    let animationId;
    const animate = () => {
        animationId = requestAnimationFrame(animate);
        uniforms.time.value += 0.05;
        renderer.render(scene, camera);
    };

    animate();
});
