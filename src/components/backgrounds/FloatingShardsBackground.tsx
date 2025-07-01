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
  const lastFrameTime = useRef(0)

  // Mouse/Touch Interaction for Camera position
  const mouseX = useRef(0)
  const mouseY = useRef(0)
  const isMouseDown = useRef(false)

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
    new THREE.Color(0x666666),
    new THREE.Color(0x44aaaa),
    new THREE.Color(0xaa44aa)
  ]

  // Function to generate random glass shard geometry
  const createRandomShardGeometry = (): THREE.BufferGeometry => {
    const points = []
    for (let i = 0; i < 4; i++) {
      points.push(new THREE.Vector3(
        (Math.random() - 0.5) * 2,
        (Math.random() - 0.5) * 2,
        (Math.random() - 0.5) * 2
      ))
    }
    const geometry = new ConvexGeometry(points)
    geometry.scale(0.8, 0.8, 0.8)
    geometry.scale(
      0.7 + Math.random() * 0.6,
      0.7 + Math.random() * 0.6,
      0.7 + Math.random() * 0.6
    )
    return geometry
  }

  // Detect low-end device (very basic check)
  const isLowEndDevice = () => navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4

  const initThreeJs = useCallback(() => {
    if (!mountRef.current) return

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
    renderer.setPixelRatio(isLowEndDevice() ? 0.7 : window.devicePixelRatio)
    renderer.setClearColor(0x000000, 0)
    rendererRef.current = renderer
    mountRef.current.appendChild(renderer.domElement)

    // --- Lighting Setup (fewer lights, lower intensity) ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7)
    scene.add(ambientLight)
    const lightCount = isLowEndDevice() ? 4 : 8
    const lightIntensity = isLowEndDevice() ? 0.7 : 1.2
    const lightDistance = 22
    const lightColors = [
      0x00ffff, 0xff00ff, 0xffffff, 0x44aaaa, 0xaa44aa, 0x666666,
    ]
    for (let i = 0; i < lightCount; i++) {
      const y = 1 - (i / (lightCount - 1)) * 2
      const radius = Math.sqrt(1 - y * y)
      const theta = Math.PI * (3 - Math.sqrt(5)) * i
      const x = Math.cos(theta) * radius
      const z = Math.sin(theta) * radius
      const color = lightColors[i % lightColors.length]
      const dirLight = new THREE.DirectionalLight(color, lightIntensity)
      dirLight.position.set(x * lightDistance, y * lightDistance, z * lightDistance)
      scene.add(dirLight)
    }

    // --- Create Glass Shard Shapes (fewer on low-end) ---
    const numShapes = isLowEndDevice() ? 60 : 120
    for (let i = 0; i < numShapes; i++) {
      const geometry = createRandomShardGeometry()
      const color = glassColors[Math.floor(Math.random() * glassColors.length)].clone()
      const material = new THREE.MeshPhysicalMaterial({
        color: color,
        transparent: true,
        opacity: 0.92,
        roughness: 0.08,
        metalness: 0.0,
        clearcoat: isLowEndDevice() ? 0.5 : 1.0,
        clearcoatRoughness: 0.1,
        ior: 1.5,
        transmission: isLowEndDevice() ? 0.5 : 1.0,
        thickness: 0.8,
        attenuationColor: color.clone().lerp(new THREE.Color(0xffffff), 0.7),
        attenuationDistance: 0.2,
        emissive: new THREE.Color(0x000000),
        emissiveIntensity: 0,
        specularIntensity: 1.0,
        sheen: 0.0,
        envMapIntensity: isLowEndDevice() ? 1.0 : 2.0
      })
      const mesh = new THREE.Mesh(geometry, material)
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
      mesh.userData.velocity = new THREE.Vector3(
        (Math.random() - 0.5) * 0.02,
        (Math.random() - 0.5) * 0.02,
        0
      )
      scene.add(mesh)
    }

    // --- Animation Loop (throttle to 30 FPS on low-end) ---
    const minFrameTime = isLowEndDevice() ? 1000 / 30 : 1000 / 60
    const animate = (now = 0) => {
      animationFrameIdRef.current = requestAnimationFrame(animate)
      if (now - lastFrameTime.current < minFrameTime) return
      lastFrameTime.current = now

      scene.children.forEach(obj => {
        if (obj instanceof THREE.Mesh) {
          obj.rotation.x += 0.0008
          obj.rotation.y += 0.0009
          obj.position.add(obj.userData.velocity)

          // Only wrap when completely out of view AND near distribution edge
          if (cameraRef.current) {
            const frustum = new THREE.Frustum()
            frustum.setFromProjectionMatrix(
              new THREE.Matrix4().multiplyMatrices(
                cameraRef.current.projectionMatrix,
                cameraRef.current.matrixWorldInverse
              )
            )
            const isVisible = frustum.containsPoint(obj.position)
            const isNearEdge = 
              Math.abs(obj.position.x) > HALF_DISTRIBUTION_RANGE ||
              Math.abs(obj.position.y) > HALF_DISTRIBUTION_RANGE ||
              Math.abs(obj.position.z) > HALF_DISTRIBUTION_RANGE
            
            if (!isVisible && isNearEdge) {
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
        }
      })

      if (cameraRef.current) {
        cameraRef.current.position.z = minCameraZ + 
          (maxCameraZ - minCameraZ) * scrollPercentage.current
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

    const handleGlobalMouseMove = (event: MouseEvent) => {
      if (isMouseDown.current) {
        mouseX.current = (event.clientX / window.innerWidth) * 2 - 1
        mouseY.current = -(event.clientY / window.innerHeight) * 2 + 1
      }
    }
    const handleGlobalMouseDown = () => { isMouseDown.current = true }
    const handleGlobalMouseUp = () => { isMouseDown.current = false }
    window.addEventListener('mousemove', handleGlobalMouseMove)
    window.addEventListener('mousedown', handleGlobalMouseDown)
    window.addEventListener('mouseup', handleGlobalMouseUp)

    const handleGlobalTouchMove = (event: TouchEvent) => {
      if (event.touches.length > 0 && isMouseDown.current) {
        mouseX.current = (event.touches[0].clientX / window.innerWidth) * 2 - 1
        mouseY.current = -(event.touches[0].clientY / window.innerHeight) * 2 + 1
      }
    }
    const handleGlobalTouchStart = () => { isMouseDown.current = true }
    const handleGlobalTouchEnd = () => { isMouseDown.current = false }
    window.addEventListener('touchmove', handleGlobalTouchMove)
    window.addEventListener('touchstart', handleGlobalTouchStart)
    window.addEventListener('touchend', handleGlobalTouchEnd)

    const handleScroll = () => {
      const scrollY = window.scrollY
      const maxScroll = document.body.scrollHeight - window.innerHeight
      scrollPercentage.current = maxScroll > 0 ? 
        Math.min(1, Math.max(0, scrollY / maxScroll)) : 0
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

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
    }
  }, []) 

  useEffect(() => {
    let cleanupFunction: (() => void) | undefined
    
    const start = () => {
      if (mountRef.current) {
        cleanupFunction = initThreeJs()
      }
    }
    
    // Use idle callback or timeout for initialization
    if ('requestIdleCallback' in window) {
      (window as any).requestIdleCallback(start)
    } else {
      setTimeout(start, 100)
    }
    
    return () => {
      if (cleanupFunction) cleanupFunction()
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