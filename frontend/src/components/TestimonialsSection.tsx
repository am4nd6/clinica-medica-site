import { motion } from "framer-motion";
import { useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import patient1 from "@/assets/paciente5.png";
import patient2 from "@/assets/paciente6.png";
import patient3 from "@/assets/patient-3.jpg";

const testimonials = [
  {
    name: "Maria Silva",
    text: "Atendimento excepcional! A equipe médica é extremamente profissional e acolhedora. Me senti segura durante todo o tratamento.",
    photo: patient1,
    rating: 5,
  },
  {
    name: "João Pereira",
    text: "A tecnologia utilizada na clínica é impressionante. Meu diagnóstico foi rápido e preciso. Recomendo a todos!",
    photo: patient2,
    rating: 5,
  },
  {
    name: "Dona Aparecida",
    text: "Há anos me consulto na VidaPlena. O cuidado e a atenção que recebo é incomparável. Uma clínica de referência.",
    photo: patient3,
    rating: 5,
  },
];

const TestimonialsSection = () => {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((p) => (p + 1) % testimonials.length);
  const prev = () => setCurrent((p) => (p - 1 + testimonials.length) % testimonials.length);

  return (
    <section id="depoimentos" className="section-padding bg-muted/50">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-6 md:mb-8"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent text-accent-foreground text-sm font-medium mb-4">
            Depoimentos
          </span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            O que nossos <span className="gradient-text">pacientes</span> dizem
          </h2>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4 }}
            className="min-w-0 bg-card rounded-3xl p-6 md:p-10 max-[281px]:p-3 shadow-sm border border-border/50 text-center"
          >
            <div className="flex justify-center mb-4">
              {[...Array(testimonials[current].rating)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-primary fill-primary" />
              ))}
            </div>
            <p className="text-lg md:text-xl max-[281px]:text-sm text-foreground leading-relaxed mb-8 max-[281px]:mb-4 italic break-words">
              "{testimonials[current].text}"
            </p>
            <div className="flex items-center justify-center gap-4 max-[281px]:flex-col max-[281px]:gap-2">
              <img
                src={testimonials[current].photo}
                alt={testimonials[current].name}
                className="w-14 h-14 max-[281px]:w-10 max-[281px]:h-10 rounded-full object-cover border-2 border-primary/20"
                loading="lazy"
              />
              <div className="min-w-0 text-left max-[281px]:text-center">
                <div className="font-heading text-sm max-[281px]:text-xs font-semibold text-foreground break-words">{testimonials[current].name}</div>
                <div className="text-sm max-[281px]:text-xs text-muted-foreground">Paciente</div>
              </div>
            </div>
          </motion.div>

          <div className="flex justify-center gap-4 mt-6">
            <button
              onClick={prev}
              className="w-12 h-12 rounded-full bg-card border border-border/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/30 transition-all duration-200 hover:scale-105 active:scale-95"
            >
              <ChevronLeft size={20} />
            </button>
            <div className="flex items-center gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${i === current ? "bg-primary w-8" : "bg-border hover:bg-muted-foreground"}`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="w-12 h-12 rounded-full bg-card border border-border/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/30 transition-all duration-200 hover:scale-105 active:scale-95"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
