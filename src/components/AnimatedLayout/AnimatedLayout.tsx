"use client";

import Navigation from "../Navigation";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ApplyCircleCursor } from "../ApplyCircleCursor/ApplyCircleCursor";
import Link from "next/link";

interface AnimatedLayoutProps {
    children: React.ReactNode;
}

export const AnimatedLayout = ({ children }: AnimatedLayoutProps) => {
    useGSAP(
        () => {
            gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
            let mm = gsap.matchMedia();
            const applySection = document.querySelector(".apply");
            const footer = document.querySelector("#footer");
            const cursor = document.querySelector(".cursor");
            const sponsors = document.querySelector(".sponsors");
            const ball = document.querySelector(".ball");
            const palms = ["first-bg-palm", "second-bg-palm", "third-bg-palm", "fourth-bg-palm"];
            const pinSpacer = document.createElement("div");
            pinSpacer.classList.add("pin-footer");
            const applySpacer = document.createElement("div");
            applySpacer.classList.add("apply-spacer");
            const spacer3 = document.createElement("div");
            spacer3.classList.add("spacer3");
            spacer3.style.zIndex = "-1";
            const modalBg = document.querySelector(".modal-bg");
            const callToActionTicketEl = document.getElementById("call-to-action-ticket");

            mm.add("(max-width: 767px)", () => {
                ScrollSmoother.create({
                    smooth: 3,
                    speed: 0.5,
                    wrapper: "#customW",
                    content: "#customC",
                    normalizeScroll: true,
                    effects: true,
                    smoothTouch: true,
                });

                const pinBannerTrigger = ScrollTrigger.create({
                    trigger: ".first-section-background",
                    pin: true,
                    start: "top top",
                    pinSpacing: false,
                    scrub: 1,
                    end: "+=1200",
                });

                const navTrigger = ScrollTrigger.create({
                    trigger: ".navigation",
                    start: "top top",
                    pin: true,
                    pinSpacing: false,
                    scrub: 1,
                    end: "+=1200",
                });

                const bannerContentTrigger = ScrollTrigger.create({
                    trigger: ".pin-banner",
                    pinSpacing: false,
                    start: 0,
                    pin: true,
                    scrub: 1,
                    end: `+=1200`,
                });

                const spacerTrigger = ScrollTrigger.create({
                    trigger: "#spacer",
                    start: 0,
                    pin: true,
                    pinSpacing: true,
                    scrub: 1,
                    end: "+=380",
                });
                
                const applyTrigger = ScrollTrigger.create({
                    trigger: "#apply",
                    start: "top top",
                    pin: true,
                    pinSpacing: false,
                    scrub: 1,
                    end: "+=1800",
                    pinSpacer: applySpacer,
                });

                const footerTrigger = ScrollTrigger.create({
                    trigger: "#footer",
                    start: "top+=25 bottom",
                    pin: true,
                    pinSpacing: false,
                    scrub: 1,
                    end: "+=1100",
                });

                const spacer3Trigger = ScrollTrigger.create({
                    trigger: "#spacer3",
                    start: 0,
                    pin: true,
                    pinSpacing: true,
                    scrub: 1,
                    end: "+=1100",
                    pinSpacer: spacer3,
                });

                gsap.set("#mobile-circle", { css: {position: "absolute"}})
                gsap.set(spacer3, { css: {zIndex: -1}})

                gsap.fromTo("#mobile-circle", {
                    top: "70dvh",
                    x: 60,
                    scale: 1.1,
                    duration: 1,
                }, {
                    top: "10dvh",
                    x: 110,
                    scale: 0.85,
                    scrollTrigger: {
                        trigger: ".sponsors",
                        start: "bottom center",
                        end: "+=1500px",
                        scrub: true,
                    },
                });
            });

            mm.add("(min-width: 768px)", () => {
                ScrollSmoother.create({
                    smooth: 3,
                    speed: 1,
                    wrapper: "#customW",
                    content: "#customC",
                    normalizeScroll: true,
                    effects: true,
                });

                const xTo = gsap.quickTo(cursor, "x", { duration: 0.9, ease: "power3" });
                const yTo = gsap.quickTo(cursor, "y", { duration: 0.9, ease: "power3" });

                let currPageY = 0;

                gsap.set(cursor, { translateX: -200, translateY: -200 });
                gsap.set(cursor, { scale: 0, opacity: 0 });
                gsap.set(ball, { css: { display: "flex" } });
                gsap.set(applySpacer, { css: { cursor: "none" } });

                callToActionTicketEl?.addEventListener("click", () => {
                    gsap.set(cursor, { scale: 0, opacity: 0 });
                });

                applySection?.addEventListener("mouseenter", () => {
                    gsap.to(cursor, { scale: 1, opacity: 1, duration: 0.3, ease: "power3" })
                });

                modalBg?.addEventListener("mouseenter", () => {
                    gsap.to(cursor, { scale: 0, opacity: 0, duration: 0.3, ease: "power3" })
                });

                document.addEventListener("mouseenter", () => {
                     const modal = document.getElementById("modal");
                     if (modal) {
                        gsap.set(cursor, { scale: 0, opacity: 0 });
                     }
                });

                pinSpacer?.addEventListener("mouseenter", () => {
                    gsap.to(cursor, { scale: 1, opacity: 1, duration: 0.3, ease: "power3" })
                });

                applySpacer?.addEventListener("mouseenter", () => {
                    gsap.to(cursor, { scale: 1, opacity: 1, duration: 0.3, ease: "power3" })
                });

                footer?.addEventListener("mouseenter", () => {
                    gsap.to(cursor, { scale: 0, opacity: 0, duration: 0.3, ease: "power3" })
                });

                // footer?.addEventListener("mouseleave", () => {
                //     gsap.to(cursor, { scale: 1, opacity: 1, duration: 0.3, ease: "power3" })
                // });

                sponsors?.addEventListener("mouseenter", () => {
                    gsap.to(cursor, { scale: 0, opacity: 0, duration: 0.3, ease: "power3" })
                });

                spacer3?.addEventListener("mouseenter", () => {
                    gsap.to(cursor, { scale: 1, opacity: 1, duration: 0.3, ease: "power3" })
                });

                document.addEventListener("mousemove", (e) => {
                    xTo((e.pageX - 20) - 100);
                    yTo((e.pageY - 20) - 100);
                    currPageY = (e.pageY - 20) - 100;
                    gsap.set(cursor, { translateX: -200, translateY: -200 })
                });

                document.addEventListener("wheel", (e) => {
                    const { deltaY } = e;
                    yTo(deltaY > 0 ? currPageY + deltaY + 100 : currPageY - (- deltaY) - 100);
                });

                const pinBannerTrigger = ScrollTrigger.create({
                    trigger: ".first-section-background",
                    pin: true,
                    start: "+=450 0",
                    pinSpacing: false,
                    scrub: 1,
                    end: "+=1000",
                });

                const navTrigger = ScrollTrigger.create({
                    trigger: ".navigation",
                    start: "top top",
                    pin: true,
                    pinSpacing: false,
                    scrub: 1,
                    end: "+=1400",
                });

                const bannerContentTrigger = ScrollTrigger.create({
                    trigger: ".pin-banner",
                    pinSpacing: false,
                    start: "top-=150px 0",
                    pin: true,
                    scrub: 1,
                    end: `+=1200`,
                });

                const spacerTrigger = ScrollTrigger.create({
                    trigger: "#spacer",
                    start: "top-=150px 0",
                    pin: true,
                    pinSpacing: true,
                    scrub: 1,
                    end: "+=380",
                });

                const sponsorsTrigger = ScrollTrigger.create({
                    trigger: "#sponsors",
                    start: "center center",
                    pin: true,
                    pinSpacing: true,
                    scrub: 1,
                    end: "+=600"
                });

                const applyTrigger = ScrollTrigger.create({
                    trigger: "#apply",
                    start: "center-=50 center",
                    pin: true,
                    pinSpacing: false,
                    scrub: 1,
                    end: "+=1700",
                    pinSpacer: applySpacer,
                });

                const spacer2Trigger = ScrollTrigger.create({
                    trigger: "#spacer2",
                    start: 0,
                    pin: true,
                    pinSpacing: false,
                    scrub: 1,
                    end: "+=150",
                });

                const spacer3Trigger = ScrollTrigger.create({
                    trigger: "#spacer3",
                    start: 0,
                    pin: true,
                    pinSpacing: true,
                    scrub: 1,
                    end: "+=960",
                    pinSpacer: spacer3,
                });

                gsap.set("#footer", { y: -40 });

                const footerTrigger = ScrollTrigger.create({
                    trigger: "#footer",
                    start: "top+=40 bottom",
                    pin: true,
                    pinSpacing: false,
                    scrub: 1,
                    end: "+=1000",
                    pinReparent: true,
                    pinSpacer: pinSpacer,
                });

                const palmAnimation = gsap.timeline({
                    paused: true,
                    defaults: {
                        duration: 1,
                        ease: "power1.inOut",
                    },
                });

                palms.forEach(palm => {
                    palmAnimation.fromTo(`#${palm}`, {
                        x: 0,
                        scale: 1,
                        rotate: 0,
                        y: 0,
                    }, {
                        x: palm.startsWith("first") || palm.startsWith("second") ? 40 : -50,
                        y: palm.startsWith("first") || palm.startsWith("second") ? -50 : 0,
                        scale: 1.1,
                        rotate: palm.startsWith("first") || palm.startsWith("second") ? 7 : -9,
                    }, 0)
                });

                ScrollTrigger.create({
                    trigger: "#sponsors",
                    start: "center center",
                    end: "+=600px",
                    scrub: true,
                    animation: palmAnimation,
                    onEnter: () => {
                        palmAnimation.play();
                    },
                    onLeaveBack: () => {
                        palmAnimation.pause();
                    },
                });
            });

            gsap.to("#sun", {
                x: 0,
                y: 360,
                scrollTrigger: {
                    trigger: "#desk",
                    start: 0,
                    end: "+=800px",
                    scrub: true,
                },
            });

            gsap.to("#sun-large", {
                x: 0,
                y: 510,
                scrollTrigger: {
                    trigger: "#desk",
                    start: 0,
                    end: "+=800px",
                    scrub: true,
                },
            });

            gsap.to("#sun-big", {
                x: 0,
                y: 450,
                scrollTrigger: {
                    trigger: "#desk",
                    start: 0,
                    end: "+=800px",
                    scrub: true,
                },
            });

            gsap.to("#bird1", {
                x: 120,
                y: 260,
                scale: 0.2,
                opacity: 0,
                scrollTrigger: {
                    trigger: "#desk",
                    start: 0,
                    end: "+=800px",
                    scrub: true,
                },
            })

            gsap.to("#bird2", {
                x: 70,
                y: 170,
                scale: 0.2,
                opacity: 0,
                scrollTrigger: {
                    trigger: "#desk",
                    start: 0,
                    end: "+=800px",
                    scrub: true,
                },
            })

            gsap.to("#bird3", {
                x: 20,
                y: 340,
                scale: 0.2,
                opacity: 0,
                scrollTrigger: {
                    trigger: "#desk",
                    start: 0,
                    end: "+=800px",
                    scrub: true,
                },
            })

            gsap.to("#bird4", {
                x: -50,
                y: 330,
                scale: 0.2,
                opacity: 0,
                scrollTrigger: {
                    trigger: "#desk",
                    start: 0,
                    end: "+=800px",
                    scrub: true,
                },
            })

            
            gsap.to("#bird5", {
                x: -20,
                y: 390,
                scale: 0.2,
                opacity: 0,
                scrollTrigger: {
                    trigger: "#desk",
                    start: 0,
                    end: "+=800px",
                    scrub: true,
                },
            })

            gsap.to("#bird6", {
                x: -90,
                y: 410,
                scale: 0.2,
                opacity: 0,
                scrollTrigger: {
                    trigger: "#desk",
                    start: 0,
                    end: "+=800px",
                    scrub: true,
                },
            })

            gsap.to("#bird7", {
                x: -130,
                y: 440,
                scale: 0.2,
                opacity: 0,
                scrollTrigger: {
                    trigger: "#desk",
                    start: 0,
                    end: "+=800px",
                    scrub: true,
                },
            })

            gsap.to("#bird8", {
                x: -140,
                y: 414,
                scale: 0.2,
                opacity: 0,
                scrollTrigger: {
                    trigger: "#desk",
                    start: 0,
                    end: "+=800px",
                    scrub: true,
                },
            })
        }
    );


    return (
        <>
            <ApplyCircleCursor />
            <div id="customW">
                <div id="customC">
                    <Navigation />
                    {children}
                </div>
            </div>
        </>
    )
};