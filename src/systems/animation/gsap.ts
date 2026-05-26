"use client";

import gsap from "gsap";

let isConfigured = false;

export function configureGsap() {
  if (isConfigured) {
    return gsap;
  }

  gsap.defaults({
    duration: 0.32,
    ease: "power3.out"
  });

  isConfigured = true;
  return gsap;
}
