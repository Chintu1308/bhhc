import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useKeyboardControls } from '@react-three/drei';
import { RigidBody } from '@react-three/rapier';
import * as THREE from 'three';
import { DISTRICTS } from './cityData';

export default function Vehicle({ setCurrentDistrict }) {
  const vehicleRef = useRef();
  const { camera } = useThree();
  const [, getKeys] = useKeyboardControls();

  const smoothedCameraPos = useRef(new THREE.Vector3(0, 10, 37));
  const smoothedCameraTarget = useRef(new THREE.Vector3(0, 0, 25));

  useFrame((state, delta) => {
    if (!vehicleRef.current) return;

    const keys = getKeys();
    
    // Movement logic
    const speed = 25;
    const rotationSpeed = 3;
    
    // Get current velocity and rotation
    const linvel = vehicleRef.current.linvel();
    const rot = vehicleRef.current.rotation();
    
    // Create an Euler rotation from the quaternion
    const euler = new THREE.Euler().setFromQuaternion(new THREE.Quaternion(rot.x, rot.y, rot.z, rot.w));
    
    // Calculate forward vector
    const direction = new THREE.Vector3(0, 0, -1).applyEuler(euler);
    
    // Apply rotation
    if (keys.left) {
      vehicleRef.current.applyTorqueImpulse({ x: 0, y: rotationSpeed * delta * 50, z: 0 }, true);
    }
    if (keys.right) {
      vehicleRef.current.applyTorqueImpulse({ x: 0, y: -rotationSpeed * delta * 50, z: 0 }, true);
    }
    
    // Get the current actual rotation
    const actualRot = vehicleRef.current.rotation();
    const actualEuler = new THREE.Euler().setFromQuaternion(new THREE.Quaternion(actualRot.x, actualRot.y, actualRot.z, actualRot.w));
    const actualDirection = new THREE.Vector3(0, 0, -1).applyEuler(actualEuler);

    // Apply impulse for forward/backward
    if (keys.forward) {
      vehicleRef.current.applyImpulse(actualDirection.clone().multiplyScalar(speed * delta * 30), true);
    } else if (keys.backward) {
      vehicleRef.current.applyImpulse(actualDirection.clone().multiplyScalar(-speed * delta * 15), true);
    }
    
    // Camera follow logic
    const pos = vehicleRef.current.translation();
    const currentPos = new THREE.Vector3(pos.x, pos.y, pos.z);

    // Camera follow logic
    const cameraOffset = new THREE.Vector3(0, 6, 14); // Lower, slightly further back
    cameraOffset.applyEuler(euler);
    const targetCameraPos = currentPos.clone().add(cameraOffset);
    
    // Look slightly ahead and above the car
    const lookAhead = direction.clone().multiplyScalar(4).add(new THREE.Vector3(0, 1.5, 0));
    const targetLookAt = currentPos.clone().add(lookAhead);
    
    smoothedCameraPos.current.lerp(targetCameraPos, 0.1);
    smoothedCameraTarget.current.lerp(targetLookAt, 0.1);

    camera.position.copy(smoothedCameraPos.current);
    camera.lookAt(smoothedCameraTarget.current);

    // Check which district we are in
    let closestDistrict = 0;
    let minDistance = Infinity;
    DISTRICTS.forEach((d, index) => {
      const dPos = new THREE.Vector3(...d.worldPos);
      // Flatten distance check to ignore height
      const dist = Math.hypot(dPos.x - currentPos.x, dPos.z - currentPos.z);
      if (dist < minDistance) {
        minDistance = dist;
        closestDistrict = index;
      }
    });

    if (minDistance < 20) { // Trigger radius
      setCurrentDistrict(closestDistrict);
    }
  });

  return (
    <RigidBody 
      ref={vehicleRef} 
      colliders="cuboid" 
      type="dynamic" 
      position={[DISTRICTS[0].worldPos[0], 2, DISTRICTS[0].worldPos[2] + 25]}
      linearDamping={4}
      angularDamping={4}
    >
      <group>
        {/* Underglow */}
        <mesh position={[0, -0.2, 0]}>
          <planeGeometry args={[2.5, 4]} />
          <meshBasicMaterial color="#39d353" transparent opacity={0.15} />
        </mesh>
        <pointLight position={[0, 0, 0]} color="#39d353" intensity={1.5} distance={6} />

        {/* Car Body (Cyberpunk style) */}
        <mesh position={[0, 0.5, 0]} castShadow>
          <boxGeometry args={[1.5, 0.6, 2.8]} />
          <meshPhysicalMaterial color="#020503" metalness={1} roughness={0.1} clearcoat={1} />
        </mesh>
        
        {/* Cockpit / Glass */}
        <mesh position={[0, 0.9, -0.2]} castShadow>
          <boxGeometry args={[1.1, 0.4, 1.2]} />
          <meshPhysicalMaterial color="#0dcfc0" metalness={0.9} roughness={0.1} transparent opacity={0.7} />
        </mesh>
        
        {/* Glow lines / Neon accents */}
        <mesh position={[0, 0.2, 0]}>
          <boxGeometry args={[1.55, 0.05, 2.85]} />
          <meshBasicMaterial color="#39d353" transparent opacity={0.9} />
        </mesh>

        {/* Headlights */}
        <mesh position={[0.5, 0.4, -1.41]}>
          <planeGeometry args={[0.3, 0.15]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
        <mesh position={[-0.5, 0.4, -1.41]}>
          <planeGeometry args={[0.3, 0.15]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
        <spotLight position={[0.5, 0.4, -1.4]} angle={0.4} penumbra={0.5} color="#ffffff" intensity={3} distance={40} target-position={[0.5, 0.4, -10]} castShadow />
        <spotLight position={[-0.5, 0.4, -1.4]} angle={0.4} penumbra={0.5} color="#ffffff" intensity={3} distance={40} target-position={[-0.5, 0.4, -10]} castShadow />
        
        {/* Taillights */}
        <mesh position={[0.5, 0.4, 1.41]} rotation={[0, Math.PI, 0]}>
          <planeGeometry args={[0.4, 0.1]} />
          <meshBasicMaterial color="#ff0000" />
        </mesh>
        <mesh position={[-0.5, 0.4, 1.41]} rotation={[0, Math.PI, 0]}>
          <planeGeometry args={[0.4, 0.1]} />
          <meshBasicMaterial color="#ff0000" />
        </mesh>
        <pointLight position={[0, 0.4, 1.5]} color="#ff0000" intensity={1} distance={8} />

        {/* Floating Wheels (Hovercar vibe) */}
        {[-0.85, 0.85].map(x => (
          [-1, 1].map(z => (
            <group key={`${x}-${z}`} position={[x, 0.2, z]}>
              <mesh rotation={[0, 0, Math.PI / 2]}>
                <cylinderGeometry args={[0.3, 0.3, 0.2, 16]} />
                <meshStandardMaterial color="#111" roughness={0.8} />
              </mesh>
              {/* Wheel neon rim */}
              <mesh rotation={[0, 0, Math.PI / 2]}>
                <cylinderGeometry args={[0.31, 0.31, 0.05, 16]} />
                <meshBasicMaterial color="#0dcfc0" />
              </mesh>
            </group>
          ))
        ))}
      </group>
    </RigidBody>
  );
}
