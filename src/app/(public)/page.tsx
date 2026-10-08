import { HomeCta } from "@/components/home/home-cta";
import { HomeCuttingEdge } from "@/components/home/home-cutting-edge";
import { HomeFoundation } from "@/components/home/home-foundation";
import { HomeHero } from "@/components/home/home-hero";
import { HomeNewsroom } from "@/components/home/home-newsroom";
import { HomePartners } from "@/components/home/home-partners";
import { HomeStructures } from "@/components/home/home-structures";
import { HomeSystems } from "@/components/home/home-systems";
import { PixelTransition } from "@/components/visual/pixel-transition";

export default function HomePage() {
  return (
    <>
      <HomeHero />

      <HomeFoundation />

      <HomePartners />

      <div className="transition-cubes">
        <PixelTransition
          from="#044AB3"
          to="#151515"
          accent="#6FE3FF"
          triggerId="partners"
          targetId="structures"
        />
      </div>

      <HomeStructures />

      <HomeSystems />

      <div className="transition-cubes">
        <PixelTransition
          from="#151515"
          to="#044AB3"
          accent="#6FE3FF"
          triggerId="systems"
          targetId="cutting-edge"
          seed={220}
        />
      </div>

      <HomeCuttingEdge />

      <div className="transition-cubes">
        <PixelTransition
          from="#044AB3"
          to="#FFFFFF"
          accent="#6FE3FF"
          triggerId="cutting-edge"
          targetId="newsroom"
          seed={340}
        />
      </div>

      <HomeNewsroom />

      <HomeCta />
    </>
  );
}
