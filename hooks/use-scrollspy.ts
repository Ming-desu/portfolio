"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useEffect, useState } from "react";

gsap.registerPlugin(ScrollTrigger);

export function useScrollSpy(sectionIds: string[]) {
  const [activeId, setActiveId] = useState(sectionIds[0]);

  useEffect(() => {
    const triggers: ScrollTrigger[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const trigger = ScrollTrigger.create({
        trigger: el,
        start: "top 45%",
        end: "bottom 45%",
        onEnter: () => setActiveId(id),
        onEnterBack: () => setActiveId(id),
      });

      triggers.push(trigger);
    });

    return () => {
      triggers.forEach((t) => {
        t.kill();
      });
    };
  }, [sectionIds]);

  useEffect(() => {
    if (!activeId) return;

    const newHash = `#${activeId}`;

    if (window.location.hash === newHash) return;

    window.history.replaceState(null, "", newHash);
  }, [activeId]);

  return activeId;
}
