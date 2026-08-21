import { motion } from "framer-motion";

const CTASection = () => {
  return (
    <section id="agendar" className="section-padding bg-secondary relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 rounded-full bg-primary blur-3xl" />
      </div>

      <div className="container mx-auto relative z-10 text-center">
        <motion.div
          initial={{ y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-2xl mx-auto space-y-6"
        >
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-secondary-foreground">
            Cuide da sua saúde <span className="text-primary">hoje mesmo</span>
          </h2>
          <p className="text-secondary-foreground/70 text-lg">
            Agende sua consulta e dê o primeiro passo para uma vida mais saudável.
          </p>
          <motion.a
            href="#"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex h-9 items-center justify-center whitespace-nowrap px-4 lg:px-5 py-1.5 lg:py-2 rounded-lg bg-primary text-white font-semibold text-sm lg:text-lg transition-all duration-300 w-full sm:w-auto"
            style={{ boxShadow: "var(--shadow-button)" }}
          >
            Agendar Consulta
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
