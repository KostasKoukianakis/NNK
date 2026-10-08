"use client";

import { ShaderGradient, ShaderGradientCanvas } from "@shadergradient/react";
import { useThree } from "@react-three/fiber";
import { useReducedMotion } from "framer-motion";
import { useLayoutEffect } from "react";

function FitCanvas() {
  const gl = useThree((state) => state.gl);
  const setSize = useThree((state) => state.setSize);

  useLayoutEffect(() => {
    const element = gl.domElement.parentElement;
    if (!element) {
      return;
    }

    const apply = () => {
      const width = element.clientWidth;
      const height = element.clientHeight;
      if (width > 0 && height > 0) {
        setSize(width, height);
        gl.domElement.style.width = "100%";
        gl.domElement.style.height = "100%";
      }
    };

    apply();
    const observer = new ResizeObserver(apply);
    observer.observe(element);
    return () => observer.disconnect();
  }, [gl, setSize]);

  return null;
}

export function ShaderBackground() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="shader-stage" aria-hidden="true">
      <ShaderGradientCanvas
        className="shader-canvas"
        style={{
          position: "absolute",
          inset: 0,
          width: "100vw",
          height: "100vh",
        }}
        pixelDensity={1}
        fov={45}
        pointerEvents="none"
        lazyLoad={false}
        powerPreference="low-power"
      >
        <FitCanvas />
        <ShaderGradient
          control="props"
          animate={reduceMotion ? "off" : "on"}
          brightness={1.2}
          cAzimuthAngle={180}
          cDistance={4.3}
          cPolarAngle={90}
          cameraZoom={1}
          color1="#bdfffd"
          color2="#bdfffd"
          color3="#75dde1"
          envPreset="city"
          grain="off"
          lightType="3d"
          positionX={-1.4}
          positionY={0}
          positionZ={0}
          range="disabled"
          rangeEnd={40}
          rangeStart={0}
          reflection={0.1}
          rotationX={0}
          rotationY={10}
          rotationZ={50}
          shader="defaults"
          type="waterPlane"
          uAmplitude={1}
          uDensity={3.6}
          uFrequency={5.5}
          uSpeed={reduceMotion ? 0 : 0.4}
          uStrength={0.4}
          uTime={0}
          wireframe={false}
        />
      </ShaderGradientCanvas>
    </div>
  );
}
