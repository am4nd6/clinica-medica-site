import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

const LocationSection = () => {
  return (
    <section id="localizacao" className="section-padding bg-muted/50">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-6 md:mb-8"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent text-accent-foreground text-sm font-medium mb-4">
            Localização
          </span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Onde <span className="gradient-text">estamos</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6 md:gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="w-full min-w-0 rounded-2xl overflow-hidden shadow-lg border border-border/50 h-[220px] min-[327px]:h-[280px] sm:h-[400px]"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.1976573849454!2d-46.65492!3d-23.56444!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce59c7f4818531%3A0x22c0760441e8c845!2sAv.+Paulista%2C+S%C3%A3o+Paulo+-+SP!5e0!3m2!1spt-BR!2sbr!4v1690000000000!5m2!1spt-BR!2sbr"
              width="100%"
              height="100%"
              className="block w-full max-w-full h-full"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Localização da Clínica VidaPlena"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-6"
          >
            {[
              { icon: MapPin, title: "Endereço", info: "Av. Paulista, 1000 - Bela Vista\nSão Paulo - SP, 01310-100" },
              { icon: Phone, title: "Telefone", info: "(11) 3000-0000\n(11) 99000-0000" },
              { icon: Mail, title: "E-mail", info: "contato@vidaplena.com.br" },
              { icon: Clock, title: "Horário", info: "Seg a Sex: 7h às 20h\nSáb: 8h às 14h" },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                whileHover={{ x: 4, transition: { duration: 0.2 } }}
                className="flex min-w-0 items-start gap-3 p-3 md:gap-4 md:p-5 rounded-2xl bg-card border border-border/50 hover:border-primary/30 transition-all duration-300 max-[264px]:flex-col max-[264px]:p-2"
              >
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-accent flex items-center justify-center flex-shrink-0 max-[264px]:w-9 max-[264px]:h-9">
                  <item.icon className="w-5 h-5 md:w-6 md:h-6 max-[264px]:w-4 max-[264px]:h-4 text-primary" strokeWidth={1.5} />
                </div>
                <div className="min-w-0">
                  <h3 className="font-heading text-lg md:text-xl max-[264px]:text-base font-semibold text-foreground break-words">{item.title}</h3>
                  <p className="text-sm max-[264px]:text-xs text-muted-foreground mt-1 whitespace-pre-line break-all">{item.info}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LocationSection;
