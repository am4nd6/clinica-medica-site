import { motion } from "framer-motion";
import heroDoctors from "@/assets/hero-doctors.jpg";

const HeroSection = () => {
  return (
    <section id="inicio" className="relative min-h-screen flex items-center pt-20 overflow-hidden" style={{ background: "var(--gradient-hero)" }}>
      <div className="container mx-auto px-4 md:px-8">
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
              <a
                href="#agendar"
                className="inline-flex items-center justify-center px-7 py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold text-base transition-all duration-300 hover:scale-[1.03] hover:shadow-lg active:scale-[0.97]"
                style={{ boxShadow: "var(--shadow-button)" }}
              >
                Agendar Consulta
              </a>
              <a
                href="#servicos"
                className="inline-flex items-center justify-center px-7 py-3.5 rounded-xl border-2 border-border bg-card text-foreground font-semibold text-base transition-all duration-300 hover:border-primary hover:text-primary hover:scale-[1.03] active:scale-[0.97]"
              >
                Conhecer Serviços
              </a>
            </motion.div>

            {/* Trust badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.7 }}
              className="flex items-center gap-6 pt-4"
            >
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-card bg-muted overflow-hidden">
                    <div className="w-full h-full bg-primary/20" />
                  </div>
                ))}
              </div>
              <div>
                <div className="text-sm font-semibold text-foreground">+15.000 pacientes</div>
                <div className="text-xs text-muted-foreground">confiam em nós</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Image */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: "easeOut", delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img
                src={heroDoctors}
                alt="Equipe médica profissional da clínica VidaPlena"
                width={1024}
                height={1024}
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-secondary/20 to-transparent" />
            </div>

            {/* Floating card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="absolute -bottom-6 -left-6 glass-card rounded-2xl p-4 shadow-lg"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-primary text-lg">❤️</span>
                </div>
                <div>
                  <div className="text-sm font-semibold text-foreground">98% Satisfação</div>
                  <div className="text-xs text-muted-foreground">dos nossos pacientes</div>
                </div>
              </div>
            </motion.div>

            {/* Floating card top-right */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2, duration: 0.5 }}
              className="absolute -top-4 -right-4 glass-card rounded-2xl p-4 shadow-lg animate-float"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                  24h
                </div>
                <div>
                  <div className="text-sm font-semibold text-foreground">Atendimento</div>
                  <div className="text-xs text-muted-foreground">sempre disponível</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
