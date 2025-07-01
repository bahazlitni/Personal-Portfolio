'use client'

import React, { useRef, useEffect, useCallback } from 'react'
import * as THREE from 'three'
import { ConvexGeometry } from 'three-stdlib'

export default function FloatingShardsBackground() {
  const mountRef = useRef<HTMLDivElement>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const animationFrameIdRef = useRef<number | null>(null)
  
  // Mouse/Touch Interaction for Camera position and hover
  const mouseX = useRef(0)
  const mouseY = useRef(0)
  const isMouseDown = useRef(false)

  // For Object Hovering (Raycasting)
  const raycasterRef = useRef(new THREE.Raycaster())
  const mouseVector = useRef(new THREE.Vector2())
  const hoveredObjectRef = useRef<THREE.Mesh | null>(null)

  const initializedRef = useRef(false) 

  // For Camera Zoom based on scroll percentage
  const cameraTargetZ = useRef(15)
  const minCameraZ = 10
  const maxCameraZ = 60

  // --- World Size and Distribution Parameters ---
  const DISTRIBUTION_RANGE = 100
  const HALF_DISTRIBUTION_RANGE = DISTRIBUTION_RANGE / 2

  // Scroll percentage tracker
  const scrollPercentage = useRef(0)

  // Glass shard colors
  const glassColors = [
    new THREE.Color(0x666666), // Colorless (slightly warm white)
    new THREE.Color(0x44aaaa), // Cyan tinted (desaturated)
    new THREE.Color(0xaa44aa)  // Magenta tinted (desaturated)
  ]

  // Function to generate random glass shard geometry
  const createRandomShardGeometry = (): THREE.BufferGeometry => {
    // Random number of points (4-32)
    const points = []
    
    // Create random points within a sphere
    for (let i = 0; i < 4; i++) {
      points.push(new THREE.Vector3(
        (Math.random() - 0.5) * 2,
        (Math.random() - 0.5) * 2,
        (Math.random() - 0.5) * 2
      ))
    }
    
    const geometry = new ConvexGeometry(points)
    
    // Scale geometry to consistent size
    geometry.scale(0.8, 0.8, 0.8)
    
    // Randomly scale dimensions for irregularity
    geometry.scale(
      0.7 + Math.random() * 0.6,
      0.7 + Math.random() * 0.6,
      0.7 + Math.random() * 0.6
    )
    
    return geometry
  }

  const initThreeJs = useCallback(() => {
    if (initializedRef.current || !mountRef.current) return
    initializedRef.current = true

    // Clean up existing canvas
    if (mountRef.current.hasChildNodes()) {
      Array.from(mountRef.current.children).forEach(child => {
        if (child.tagName === 'CANVAS') {
          mountRef.current?.removeChild(child)
        }
      })
    }

    const width = window.innerWidth
    const height = window.innerHeight

    // --- Scene Setup ---
    const scene = new THREE.Scene()
    sceneRef.current = scene
    scene.fog = new THREE.Fog(0x000000, 1, 80)

    // --- Camera Setup ---
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
    camera.position.z = cameraTargetZ.current
    cameraRef.current = camera

    // --- Renderer Setup ---
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true
    })
    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.setSize(width, height)
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setClearColor(0x000000, 0)
    rendererRef.current = renderer
    mountRef.current.appendChild(renderer.domElement)

    // --- Enhanced Lighting Setup ---
    // 1. Soft ambient sun-like light
    const ambientLight = new THREE.AmbientLight(0xffffff, 80)
    scene.add(ambientLight)
    // Distribute 16 directional lights evenly from all directions (using a sphere)
    const lightCount = 16
    const lightIntensity = 120
    const lightDistance = 22
    const lightColors = [
      0x00ffff, // Cyan
      0xff00ff, // Magenta
      0xffffff, // White
      0x44aaaa, // Cyan-tinted
      0xaa44aa, // Magenta-tinted
      0x666666, // Neutral
    ]

    for (let i = 0; i < lightCount; i++) {
      // Golden Section Spiral for even sphere distribution
      const y = 1 - (i / (lightCount - 1)) * 2 // y goes from 1 to -1
      const radius = Math.sqrt(1 - y * y)
      const theta = Math.PI * (3 - Math.sqrt(5)) * i

      const x = Math.cos(theta) * radius
      const z = Math.sin(theta) * radius

      const color = lightColors[i % lightColors.length]
      const dirLight = new THREE.DirectionalLight(color, lightIntensity)
      dirLight.position.set(x * lightDistance, y * lightDistance, z * lightDistance)
      scene.add(dirLight)
    }

    // --- Create Glass Shard Shapes ---
    const numShapes = 250

    for (let i = 0; i < numShapes; i++) {
      // Create random shard geometry
      const geometry = createRandomShardGeometry()
      
      // Select random glass color
      const color = glassColors[Math.floor(Math.random() * glassColors.length)].clone()
      
      // Create glass-like material
      const material = new THREE.MeshPhysicalMaterial({
        color: color,
        transparent: true,
        opacity: 0.98,
        roughness: 0.02, // Very smooth for sharp reflections
        metalness: 0.0, // Diamonds are not metallic
        clearcoat: 1.0,
        clearcoatRoughness: 0.0,
        ior: 2.42, // Diamond IOR
        transmission: 1.0, // Fully transmissive
        thickness: 1.5, // Add some thickness for refraction
        attenuationColor: color.clone().lerp(new THREE.Color(0xffffff), 0.7), // Subtle color tint
        attenuationDistance: 0.2,
        emissive: new THREE.Color(0x000000),
        emissiveIntensity: 0,
        specularIntensity: 2.0,
        sheen: 0.0,
        envMapIntensity: 4.0 // Strong environment reflections
      })

      const mesh = new THREE.Mesh(geometry, material)

      // Random position within distribution range
      mesh.position.set(
        (Math.random() - 0.5) * DISTRIBUTION_RANGE,
        (Math.random() - 0.5) * DISTRIBUTION_RANGE,
        (Math.random() - 0.5) * DISTRIBUTION_RANGE
      )

      mesh.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      )

      // Store original properties
      // Increase velocity by 100% (double the original value)
      mesh.userData.originalVelocity = new THREE.Vector3(
        (Math.random() - 0.5) * 0.032,
        (Math.random() - 0.5) * 0.032,
        0
      )
      mesh.userData.currentVelocity = mesh.userData.originalVelocity.clone()
      mesh.userData.targetVelocity = mesh.userData.originalVelocity.clone()
      mesh.userData.isHovered = false
      mesh.userData.hoverProgress = 0
      mesh.userData.originalColor = color.clone()
      mesh.userData.originalOpacity = material.opacity
      mesh.userData.originalEmissive = material.emissive.clone()

      scene.add(mesh)
    }

    // --- Animation Loop ---
    const animate = () => {
      animationFrameIdRef.current = requestAnimationFrame(animate)

      scene.children.forEach(obj => {
        if (obj instanceof THREE.Mesh) {
          // Smooth rotation
          obj.rotation.x += 0.0008
          obj.rotation.y += 0.0009

          // Apply current velocity
          obj.position.add(obj.userData.currentVelocity)

          // Smooth velocity transitions
          if (obj.userData.isHovered) {
            obj.userData.hoverProgress = Math.min(1, obj.userData.hoverProgress + 0.1)
          } else {
            obj.userData.hoverProgress = Math.max(0, obj.userData.hoverProgress - 0.1)
          }

          // Interpolate velocity
          obj.userData.currentVelocity.lerp(
            obj.userData.targetVelocity,
            obj.userData.hoverProgress * 0.2
          )

          // Update material based on hover state
          const material = obj.material as THREE.MeshPhysicalMaterial
          const t = obj.userData.hoverProgress
          
          // Increase brightness and saturation on hover
          if (t > 0) {
            const saturatedColor = obj.userData.originalColor.clone()
            
            // Apply saturation boost based on color type
            if (obj.userData.originalColor.equals(glassColors[1])) { // Cyan
              saturatedColor.r *= 0.8
              saturatedColor.g = Math.min(1, saturatedColor.g * 1.3)
              saturatedColor.b = Math.min(1, saturatedColor.b * 1.3)
            } else if (obj.userData.originalColor.equals(glassColors[2])) { // Magenta
              saturatedColor.r = Math.min(1, saturatedColor.r * 1.3)
              saturatedColor.g *= 0.8
              saturatedColor.b = Math.min(1, saturatedColor.b * 1.3)
            } else { // Colorless
              saturatedColor.r = Math.min(1, saturatedColor.r * 1.2)
              saturatedColor.g = Math.min(1, saturatedColor.g * 1.2)
              saturatedColor.b = Math.min(1, saturatedColor.b * 1.2)
            }
            
            material.color.lerpColors(obj.userData.originalColor, saturatedColor, t)
            material.emissive.lerpColors(new THREE.Color(0x000000), new THREE.Color(0xffffff), t)
            material.emissiveIntensity = t * 3
            material.opacity = obj.userData.originalOpacity + t * 0.08
          } else {
            material.color.copy(obj.userData.originalColor)
            material.emissive.copy(obj.userData.originalEmissive)
            material.emissiveIntensity = 0
            material.opacity = obj.userData.originalOpacity
          }
          
          material.needsUpdate = true

          // Get camera frustum for visibility checks
          const frustum = new THREE.Frustum()
          if (cameraRef.current) {
            frustum.setFromProjectionMatrix(
              new THREE.Matrix4().multiplyMatrices(
                cameraRef.current.projectionMatrix,
                cameraRef.current.matrixWorldInverse
              )
            )
          }

          // Check if object is completely out of view
          const boundingSphere = new THREE.Sphere()
          obj.geometry.computeBoundingSphere()
          if (obj.geometry.boundingSphere) {
            boundingSphere.copy(obj.geometry.boundingSphere)
            boundingSphere.applyMatrix4(obj.matrixWorld)
          }

          const isVisible = frustum.containsPoint(obj.position)
          const isNearEdge = 
            Math.abs(obj.position.x) > HALF_DISTRIBUTION_RANGE ||
            Math.abs(obj.position.y) > HALF_DISTRIBUTION_RANGE ||
            Math.abs(obj.position.z) > HALF_DISTRIBUTION_RANGE

          // Only wrap when completely out of view AND near distribution edge
          if (!isVisible && isNearEdge) {
            // Wrap to opposite side with padding
            if (obj.position.x > HALF_DISTRIBUTION_RANGE) {
              obj.position.x = -HALF_DISTRIBUTION_RANGE + (obj.position.x - HALF_DISTRIBUTION_RANGE)
            } else if (obj.position.x < -HALF_DISTRIBUTION_RANGE) {
              obj.position.x = HALF_DISTRIBUTION_RANGE + (obj.position.x + HALF_DISTRIBUTION_RANGE)
            }

            if (obj.position.y > HALF_DISTRIBUTION_RANGE) {
              obj.position.y = -HALF_DISTRIBUTION_RANGE + (obj.position.y - HALF_DISTRIBUTION_RANGE)
            } else if (obj.position.y < -HALF_DISTRIBUTION_RANGE) {
              obj.position.y = HALF_DISTRIBUTION_RANGE + (obj.position.y + HALF_DISTRIBUTION_RANGE)
            }

            if (obj.position.z > HALF_DISTRIBUTION_RANGE) {
              obj.position.z = -HALF_DISTRIBUTION_RANGE + (obj.position.z - HALF_DISTRIBUTION_RANGE)
            } else if (obj.position.z < -HALF_DISTRIBUTION_RANGE) {
              obj.position.z = HALF_DISTRIBUTION_RANGE + (obj.position.z + HALF_DISTRIBUTION_RANGE)
            }
          }
        }
      })

      if (cameraRef.current) {
        // Apply scroll-based zoom
        cameraRef.current.position.z = minCameraZ + 
          (maxCameraZ - minCameraZ) * scrollPercentage.current
        
        // Camera movement based on mouse
        cameraRef.current.position.x += (mouseX.current * 0.01 - cameraRef.current.position.x) * 0.05
        cameraRef.current.position.y += (-mouseY.current * 0.01 - cameraRef.current.position.y) * 0.05
        cameraRef.current.lookAt(scene.position)
      }

      if (rendererRef.current && cameraRef.current) {
        rendererRef.current.render(scene, cameraRef.current)
      }
    }

    animate()

    // --- Event Listeners ---
    const handleResize = () => {
      if (cameraRef.current && rendererRef.current) {
        cameraRef.current.aspect = window.innerWidth / window.innerHeight
        cameraRef.current.updateProjectionMatrix()
        rendererRef.current.setSize(window.innerWidth, window.innerHeight)
      }
    }
    window.addEventListener('resize', handleResize)

    // Mouse Interaction
    const handleGlobalMouseMove = (event: MouseEvent) => {
      if (isMouseDown.current) {
        mouseX.current = (event.clientX / window.innerWidth) * 2 - 1
        mouseY.current = -(event.clientY / window.innerHeight) * 2 + 1
      }

      if (cameraRef.current && sceneRef.current) {
        mouseVector.current.x = (event.clientX / window.innerWidth) * 2 - 1
        mouseVector.current.y = -(event.clientY / window.innerHeight) * 2 + 1
        
        raycasterRef.current.setFromCamera(mouseVector.current, cameraRef.current)
        
        const meshes = sceneRef.current.children.filter(obj => obj instanceof THREE.Mesh) as THREE.Mesh[]
        const intersects = raycasterRef.current.intersectObjects(meshes)

        let newHoveredObject: THREE.Mesh | null = null
        if (intersects.length > 0) {
          newHoveredObject = intersects[0].object as THREE.Mesh
        }

        // Reset previous hovered object
        if (hoveredObjectRef.current && hoveredObjectRef.current !== newHoveredObject) {
          hoveredObjectRef.current.userData.isHovered = false
          hoveredObjectRef.current.userData.targetVelocity = 
            hoveredObjectRef.current.userData.originalVelocity.clone()
        }

        // Set new hovered object
        if (newHoveredObject) {
          newHoveredObject.userData.isHovered = true
          newHoveredObject.userData.targetVelocity = new THREE.Vector3(0, 0, 0)
        }
        
        hoveredObjectRef.current = newHoveredObject
      }
    }

    const handleGlobalMouseDown = () => { isMouseDown.current = true }
    const handleGlobalMouseUp = () => { isMouseDown.current = false }

    window.addEventListener('mousemove', handleGlobalMouseMove)
    window.addEventListener('mousedown', handleGlobalMouseDown)
    window.addEventListener('mouseup', handleGlobalMouseUp)

    // Touch events
    const handleGlobalTouchMove = (event: TouchEvent) => {
      if (event.touches.length > 0) {
        mouseX.current = (event.touches[0].clientX / window.innerWidth) * 2 - 1
        mouseY.current = -(event.touches[0].clientY / window.innerHeight) * 2 + 1
      }
    }
    const handleGlobalTouchStart = () => { isMouseDown.current = true }
    const handleGlobalTouchEnd = () => { isMouseDown.current = false }

    window.addEventListener('touchmove', handleGlobalTouchMove)
    window.addEventListener('touchstart', handleGlobalTouchStart)
    window.addEventListener('touchend', handleGlobalTouchEnd)

    // Scroll percentage handler
    const handleScroll = () => {
      const scrollY = window.scrollY
      const maxScroll = document.body.scrollHeight - window.innerHeight
      scrollPercentage.current = maxScroll > 0 ? 
        Math.min(1, Math.max(0, scrollY / maxScroll)) : 0
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Initialize

    // --- Cleanup function ---
    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleGlobalMouseMove)
      window.removeEventListener('mousedown', handleGlobalMouseDown)
      window.removeEventListener('mouseup', handleGlobalMouseUp)
      window.removeEventListener('touchmove', handleGlobalTouchMove)
      window.removeEventListener('touchstart', handleGlobalTouchStart)
      window.removeEventListener('touchend', handleGlobalTouchEnd)
      window.removeEventListener('scroll', handleScroll)

      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current)
      }
      
      if (rendererRef.current && mountRef.current) {
        mountRef.current.removeChild(rendererRef.current.domElement)
        rendererRef.current.dispose()
        
        if (sceneRef.current) {
          sceneRef.current.traverse((object) => {
            if (object instanceof THREE.Mesh) {
              object.geometry.dispose()
              const materials = Array.isArray(object.material) ? 
                object.material : [object.material]
              materials.forEach(material => material.dispose())
            }
          })
        }
      }
      
      initializedRef.current = false
    }
  }, []) 

  useEffect(() => {
    let cleanupFunction: (() => void) | undefined
    
    const timeoutId = setTimeout(() => {
      if (mountRef.current && !initializedRef.current) {
        cleanupFunction = initThreeJs()
      }
    }, 100)

    return () => {
      clearTimeout(timeoutId)
      if (cleanupFunction) {
        cleanupFunction()
      }
    }
  }, [initThreeJs])

return (
   <div
      ref={mountRef}
      style={{
         position: 'fixed',
         inset: 0,
         width: '100vw',
         height: '100vh',
         zIndex: -1,
         pointerEvents: 'none',
         overflow: 'hidden',
      }}
   />
)
}