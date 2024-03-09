import React, { useMemo, useRef } from 'react'
import './App.css';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { TextureLoader } from 'three';
import * as THREE from "three";

// const fragmentShader = `...`;
const fragmentShader = `
uniform float testParam;
uniform sampler2D  mytexure;
varying vec2 uvu;
void main() {
  // infinite color transformation animation
  //vec4 pixel = gl_FragCoord;
  //  gl_FragColor = vec4(sin(pixel.x+testParam)  ,cos(pixel.y+testParam), sin(pixel.z +testParam), 1.0);
  //  gl_FragColor = vec4(1.0  ,cos(pixel.y * 0.01+testParam), 0.0, 1.0);
  gl_FragColor = texture2D(mytexure, uvu);
   
  // gl_FragColor = vec4( 0.0,max(sin(testParam), 0.0), 0.0, 1.0);
}`;


// const vertexShader = `...`;




//======= default vertexShader =====
const vertexShader = `
varying vec2 uvu;

void main(){

    uvu = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0 );
}

`

const Flag = () =>{
  const ref = useRef();
  // const txureimg = useLoader(TextureLoader, 'car.jpg');

  const uniforms = {
    testParam: {type: 'f', value: 0.9},
    mytexure : new THREE.Texture(),
};

const [txureimg] = useLoader(THREE.TextureLoader, [
  './car.jpg',
]);

const animation = useFrame((state) => {
  const { clock } = state;
  // ref.current.material.uniforms.testParam.value = clock.getElapsedTime()/20;
  //ref.current.material.uniforms.testParam.value +=0.05;
});

// useMemo( () =>{
//  return animation
// },[animation]);


  return(
    <>
     <ambientLight/> 
    <directionalLight position={[0,0,2]}/>
    <mesh ref={ref} position={[0,0,0]} scale={4}>
     <planeGeometry args={[1, 1, 32, 32]}/>  
      
      
      <shaderMaterial fragmentShader={fragmentShader} vertexShader={vertexShader}
         uniforms={uniforms} mytexure={txureimg} />
    </mesh>
    </>
  )
}

function App() {
  return (
    <div className='container'>
      <Canvas camera={{ fov: 75, position: [0, 0,5]}}>
        <Flag/>
        <OrbitControls autoRotate/>
      </Canvas>
    </div>
  )
}

export default App