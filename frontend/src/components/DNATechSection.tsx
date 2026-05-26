import { motion } from "framer-motion";
import dnaTech from "@/assets/dna-tech.jpg";

const DNATechSection = () => {
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
            className="space-y-6"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/15 text-primary text-sm font-medium">
              Inovação & Tecnologia
            </span>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-secondary-foreground leading-tight">
              Tecnologia que antecipa diagnósticos e{" "}
              <span className="text-primary">personaliza tratamentos</span>
            </h2>
            <p className="text-secondary-foreground/70 text-lg leading-relaxed text-justify">
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
                  className="p-4 rounded-xl border border-primary/20 bg-primary/5"
                >
                  <div className="text-sm font-semibold text-secondary-foreground">{item.title}</div>
                  <div className="text-xs text-secondary-foreground/60 mt-1">{item.desc}</div>
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
            <div className="rounded-3xl overflow-hidden shadow-2xl border border-primary/20">
              <img src={dnaTech} alt="Tecnologia DNA e análise genômica" width={1200} height={800} loading="lazy" className="w-full h-auto" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DNATechSection;
