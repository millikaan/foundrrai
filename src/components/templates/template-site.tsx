"use client";

import * as React from "react";

import type { TemplateId } from "@/components/landing/browser-card";
import { BarberSite } from "@/components/templates/barber-site";
import { CafeSite } from "@/components/templates/cafe-site";
import { ClinicSite } from "@/components/templates/clinic-site";
import { FloristSite } from "@/components/templates/florist-site";
import { GymSite } from "@/components/templates/gym-site";
import { RentacarSite } from "@/components/templates/rentacar-site";
import { RestaurantSite } from "@/components/templates/restaurant-site";
import { StoreSite } from "@/components/templates/store-site";

const SITES: Record<TemplateId, React.ComponentType> = {
  clinic: ClinicSite,
  florist: FloristSite,
  rentacar: RentacarSite,
  restaurant: RestaurantSite,
  barber: BarberSite,
  store: StoreSite,
  cafe: CafeSite,
  gym: GymSite,
};

/** Renders the full generated template website for a given template id. */
export function TemplateSite({ id }: { id: TemplateId }) {
  const Site = SITES[id];
  return <Site />;
}
