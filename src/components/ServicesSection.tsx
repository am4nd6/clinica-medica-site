import { motion } from "framer-motion";
import { Heart, Baby, Bone, Microscope, FlaskConical, Laptop } from "lucide-react";

const services = [
  { icon: Heart, title: "Cardiologia", desc: "Diagnóstico e tratamento completo para a saúde do seu coração com tecnologia avançada." },
  { icon: Baby, title: "Pediatria", desc: "Cuidado integral para crianças e adolescentes com acompanhamento humanizado." },
  { icon: Bone, title: "Ortopedia", desc: "Tratamentos especializados para ossos, articulações e sistema musculoesquelético." },
  { icon: Microscope, title: "Oncologia", desc: "Acompanhamento oncológico completo com as mais modernas terapias disponíveis." },
  { icon: FlaskConical, title: "Exames Laboratoriais", desc: "Resultados rápidos e precisos com equipamentos de última geração." },
  { icon: Laptop, title: "Telemedicina", desc: "Consultas online seguras e práticas, onde e quando você precisar." },
];

const ServicesSection = () => {
  return (
    <section id="servicos" className="section-padding bg-background">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent text-accent-foreground text-sm font-medium mb-4">
            Nossos Serviços
          </span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Cuidado Completo para Sua <span className="gradient-text">Saúde</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Oferecemos uma ampla gama de especialidades médicas com profissionais qualificados.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ delay: i * 0.08, duration: 0.6 }}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              className="group p-8 rounded-2xl bg-card border border-border/50 hover:border-primary/30 hover:shadow-lg transition-all duration-300 cursor-pointer"
            >
              <div className="w-14 h-14 rounded-xl bg-accent flex items-center justify-center mb-5 group-hover:bg-primary/10 transition-colors duration-300">
                <service.icon className="w-7 h-7 text-primary" strokeWidth={1.5} />
              </div>
              <h3 className="font-heading text-xl font-semibold text-foreground mb-3">{service.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{service.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
