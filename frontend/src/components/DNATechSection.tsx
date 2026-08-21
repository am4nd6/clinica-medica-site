import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import dnaTech from "@/assets/dna-tech.jpg";

const sectionImageAnimation = {
  scale: [1, 1.012, 1.018, 1.01, 1],
  rotate: [0, -0.08, -0.14, 0.08, 0],
  transition: { duration: 0.55, ease: [0.25, 0.1, 0.25, 1] },
};

const isTouchDevice = () =>
  typeof window !== "undefined" && window.matchMedia("(hover: none), (pointer: coarse)").matches;

const DNATechSection = () => {
  const sectionImageControls = useAnimation();
  const cardAnimationTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [supportsHover, setSupportsHover] = useState(false);

  useEffect(() => {
    setSupportsHover(window.matchMedia("(hover: hover) and (pointer: fine)").matches);
  }, []);

  useEffect(() => {
    return () => {
      if (cardAnimationTimeout.current) clearTimeout(cardAnimationTimeout.current);
    };
  }, []);

  const animateCardOnTouch = (index: number) => {
    if (!isTouchDevice()) return;
    if (cardAnimationTimeout.current) clearTimeout(cardAnimationTimeout.current);

    setActiveCard(null);
    requestAnimationFrame(() => setActiveCard(index));
    cardAnimationTimeout.current = setTimeout(() => setActiveCard(null), 360);
  };

  return (
    <section className="section-padding relative overflow-hidden bg-secondary">
      <div className="absolute inset-0 opacity-30">
        <img src={dnaTech} alt="" className="w-full h-full object-cover" loading="lazy" />
      </div>
      <div className="absolute inset-0 bg-secondary/80" />

      <div className="container mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="min-w-0 space-y-6"
          >
            <span className="section-eyebrow inline-block max-[239px]:px-2 max-[239px]:py-1 rounded-full bg-primary/15 text-primary text-sm max-[239px]:text-xs max-[154px]:text-[0.55rem] font-medium">
              Inovação & Tecnologia
            </span>
            <h2 className="font-heading text-3xl max-[239px]:text-2xl max-[199px]:text-[clamp(0.9rem,7vw,1.5rem)] md:text-4xl lg:text-5xl font-bold text-secondary-foreground leading-tight break-words max-[199px]:break-normal">
              Tecnologia que antecipa diagnósticos e{" "}
              <span className="text-primary">personaliza tratamentos</span>
            </h2>
            <p className="text-secondary-foreground/70 text-lg max-[239px]:text-sm leading-relaxed text-justify break-words">
              Utilizamos inteligência artificial e análise genômica avançada para oferecer diagnósticos mais rápidos, 
              precisos e tratamentos personalizados para cada paciente.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 pt-4">
              {[
                { title: "Análise Genômica", desc: "Mapeamento genético completo" },
                { title: "IA Diagnóstica", desc: "Detecção precoce de patologias" },
                { title: "Medicina de Precisão", desc: "Tratamentos personalizados" },
                { title: "Big Data em Saúde", desc: "Análise preditiva avançada" },
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                >
                  <div
                    onPointerDown={() => animateCardOnTouch(i)}
                    className={`tech-card-hover min-w-0 h-full p-4 max-[239px]:p-2 rounded-xl border border-primary/20 bg-primary/5 ${activeCard === i ? "tech-card-tap" : ""}`}
                  >
                    <div className="text-sm max-[239px]:text-xs font-semibold text-secondary-foreground break-words">{item.title}</div>
                    <div className="text-xs text-secondary-foreground/60 mt-1 break-words">{item.desc}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            <motion.div
              animate={sectionImageControls}
              onTap={() => {
                if (isTouchDevice()) sectionImageControls.start(sectionImageAnimation);
              }}
              className="rounded-3xl overflow-hidden shadow-2xl border border-primary/20 cursor-pointer"
            >
              <div className="tech-image-hover">
                <img src={dnaTech} alt="Tecnologia DNA e análise genômica" width={1200} height={800} loading="lazy" className="w-full h-auto" />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DNATechSection;
