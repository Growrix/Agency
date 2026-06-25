"use client";

import { EnergyWaveLayer } from "./layers/EnergyWaveLayer";
import { FloatingOrbLayer } from "./layers/FloatingOrbLayer";
import { GradientMeshLayer } from "./layers/GradientMeshLayer";
import { LightBeamLayer } from "./layers/LightBeamLayer";
import { LivingGridLayer } from "./layers/LivingGridLayer";
import { ParticleFieldLayer } from "./layers/ParticleFieldLayer";

export function HomeHeroAmbientLayers() {
  return (
    <div className="hero-ambient pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="hero-ambient__scrim" />
      <GradientMeshLayer />
      <LivingGridLayer />
      <ParticleFieldLayer />
      <EnergyWaveLayer />
      <FloatingOrbLayer />
      <LightBeamLayer />
    </div>
  );
}
