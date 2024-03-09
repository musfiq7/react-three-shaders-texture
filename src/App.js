import * as THREE from "three";
import React, { useRef, Suspense } from "react";
import { Canvas, extend, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls, shaderMaterial } from "@react-three/drei";
import glsl from "babel-plugin-glsl/macro";
import "./App.css";

const vertexShader =`
precision mediump float;

    varying vec2 vUv;
   

    uniform float uTime;

  


    void main() {
     vUv = uv;
     gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0 ); 
    }

`;
 const fragmentShader = `
precision mediump float;

    uniform vec3 uColor;
    uniform float uTime;
    uniform sampler2D uTexture;

    varying vec2 vUv;
   

    void main() {
      
      vec3 texture = texture2D(uTexture, vUv).rgb;
     
      //texture.r += sin(uTime * 0.1);
      //texture.g += sin(uTime * 0.1);
      texture.b += sin(uTime * 0.1);
     
      gl_FragColor = vec4(texture, 1.0); 
    } 

`;

const uniforms = {
  uTime: 0.0,
  uColor: new THREE.Color(0.0, 0.0, 0.0),
  uTexture: new THREE.Texture(),
}

const MyShaderMaterial = shaderMaterial(uniforms,vertexShader,fragmentShader);

extend({ MyShaderMaterial });



const ImgTexture =() => {
  const ref = useRef();
  const mesh_ref = useRef();
  //useFrame(({ clock }) => (ref.current.uTime = clock.getElapsedTime()));


  // const [image] = useLoader(THREE.TextureLoader, [
  //   "img/car.jpg",
  // ]);

  const [image] = useLoader(THREE.TextureLoader, [
    "img/art.jpg",
  ]);

  

  // useFrame(() => {
  //   mesh_ref.current.material.uniforms.uTime += 0.3;
  // });

  console.log(ref.uniforms);

  return (
<>
<mesh ref={mesh_ref} scale={0.8}>
      {/* <planeGeometry args={[0.4, 0.6, 16, 16]}  /> */}
      {/* <boxGeometry /> */}
      <sphereGeometry/>
     
      
      {/* below myShaderMaterial does not start with capital letter because 
      they start with small letter then capital letter 
      (which called camel case that is syntax here) as like shaderMaterial */}

      <myShaderMaterial uColor={"hotpink"} ref={ref} uTexture={image}
       uTime={useFrame(({ clock }) => (ref.current.uTime +=0.07))}/>
      
     
    </mesh>

    <mesh ref={mesh_ref} scale={0.5} position={[1,1,1]}>
      {/* <planeGeometry args={[0.4, 0.6, 16, 16]}  /> */}
      {/* <boxGeometry /> */}
      <sphereGeometry/>
     
      
      {/* below myShaderMaterial does not start with capital letter because 
      they start with small letter then capital letter 
      (which called camel case that is syntax here) as like shaderMaterial */}

      <myShaderMaterial uColor={"hotpink"} ref={ref} uTexture={image}
       uTime={useFrame(({ clock }) => (ref.current.uTime +=0.07))}/>
      
     
    </mesh>

</>
  );
};

const Scene = () => {
  return (
    // <Canvas camera={{ fov: 12, position: [0, 0, 5] }}>
    <Canvas camera={{ fov: 42, position: [0, 2, 5] }}>
      <Suspense fallback={null}>
        <ImgTexture />
        <OrbitControls autoRotate/>
      </Suspense>
    </Canvas>
  );
};

const App = () => {
  return (
    <>
      <h1>POMADA MODELADORA</h1>
      <Scene />
    </>
  );
};

export default App;