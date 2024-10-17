// app/page.tsx
import React from 'react';
import {FeatureSection } from '@/components/FeatureSection';
import { LandingHero } from '@/components/LandingHero';
import { HowItWorksSection } from '@/components/HowItWorksSection';

export default function HomePage() {
  return (
    <div>
      <LandingHero />
      <FeatureSection />
      <HowItWorksSection />
    
    </div>
  );
}