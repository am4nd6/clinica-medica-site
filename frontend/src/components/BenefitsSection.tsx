import { motion } from "framer-motion";
import { Zap, Brain, Activity } from "lucide-react";

const benefits = [
  { icon: Zap, title: "Atendimento Rápido", desc: "Consultas ágeis sem longas filas de espera. Seu tempo é valioso." },
  { icon: Brain, title: "Diagnóstico Inteligente", desc: "IA e análise avançada para diagnósticos mais precisos e rápidos." },
  { icon: Activity, title: "Monitoramento Contínuo", desc: "Acompanhamento da sua saúde 24/7 com tecnologia wearable integrada." },
];

const BenefitsSection = () => {
  return (
    <section className="section-padding bg-background">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-6 md:mb-8"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent text-accent-foreground text-sm font-medium mb-4">
            Por que nos escolher
          </span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
            Experiência <span className="gradient-text">diferenciada</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {benefits.map((b, i) => (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              className="text-center p-6 md:p-8 rounded-2xl bg-card border border-border/50 hover:border-primary/30 hover:shadow-lg transition-all duration-300"
            >
              <motion.div
                whileHover={{ rotate: 10, scale: 1.1 }}
                transition={{ duration: 0.3 }}
                className="w-16 h-16 rounded-2xl bg-accent flex items-center justify-center mx-auto mb-4 md:mb-6"
              >
                <b.icon className="w-8 h-8 text-primary" strokeWidth={1.5} />
              </motion.div>
              <h3 className="font-heading text-xl font-semibold text-foreground mb-3">{b.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{b.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
