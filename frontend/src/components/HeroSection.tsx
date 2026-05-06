import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Heart } from "lucide-react";
import heroDoctors from "@/assets/hero-doctors.jpg";
import avatar1 from "@/assets/avatar-1.jpg";
import avatar2 from "@/assets/avatar-2.jpg";
import avatar3 from "@/assets/avatar-3.jpg";
import avatar4 from "@/assets/avatar-4.jpg";

const avatars = [avatar1, avatar2, avatar3, avatar4];

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 40]);

  return (
    <section
      ref={sectionRef}
      id="inicio"
      className="relative min-h-screen flex items-center pt-20 overflow-hidden"
      style={{ background: "var(--gradient-hero)" }}
    >
      {/* Background decorative elements */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute top-1/2 -left-24 w-[400px] h-[400px] rounded-full bg-primary/4 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] rounded-full bg-accent/40 blur-3xl" />
      </motion.div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent text-accent-foreground text-sm font-medium"
              >
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse-slow" />
                Cuidado médico de excelência
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.7 }}
                className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-foreground"
              >
                Saúde Inteligente com{" "}
                <span className="gradient-text">Cuidado Humano</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.7 }}
                className="text-lg md:text-xl text-muted-foreground max-w-lg leading-relaxed"
              >
                Tecnologia avançada e atendimento personalizado para cuidar de você.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.7 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <motion.a
                href="#agendar"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center justify-center px-7 py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold text-base transition-all duration-300 hover:shadow-lg"
                style={{ boxShadow: "var(--shadow-button)" }}
              >
                Agendar Consulta
              </motion.a>
              <motion.a
                href="#servicos"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center justify-center px-7 py-3.5 rounded-xl border-2 border-border bg-card text-foreground font-semibold text-base transition-all duration-300 hover:border-primary hover:text-primary"
              >
                Conhecer Serviços
              </motion.a>
            </motion.div>

            {/* Trust badges with real avatars */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.7 }}
              className="flex items-center gap-5 pt-4"
            >
              <div className="flex -space-x-3">
                {avatars.map((src, i) => (
                  <div key={i} className="w-11 h-11 rounded-full border-2 border-card overflow-hidden shadow-sm">
                    <img src={src} alt="Paciente" className="w-full h-full object-cover" width={44} height={44} />
                  </div>
                ))}
              </div>
              <div>
                <div className="text-sm font-semibold text-foreground">+15.000 pacientes</div>
                <div className="text-xs text-muted-foreground">confiam em nós</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Image with parallax */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: "easeOut", delay: 0.2 }}
            className="relative"
          >
            <motion.div style={{ y: imageY }} className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img
                src={heroDoctors}
                alt="Equipe médica profissional da clínica VidaPlena"
                width={1024}
                height={1024}
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-secondary/15 via-transparent to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent" />
            </motion.div>

            {/* Subtle glow behind image */}
            <div className="absolute -inset-4 -z-10 rounded-3xl bg-primary/8 blur-2xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
