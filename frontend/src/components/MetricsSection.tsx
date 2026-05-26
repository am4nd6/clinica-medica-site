import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Users, Target, Clock, ThumbsUp } from "lucide-react";

const metrics = [
  { value: 15000, prefix: "+", suffix: "", label: "Pacientes Atendidos", icon: Users },
  { value: 98, prefix: "", suffix: "%", label: "Precisão Diagnóstica", icon: Target },
  { value: 24, prefix: "", suffix: "h", label: "Atendimento Contínuo", icon: Clock },
  { value: 97, prefix: "", suffix: "%", label: "Alta Satisfação", icon: ThumbsUp },
];

const CountUp = ({ target, prefix, suffix }: { target: number; prefix: string; suffix: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 2000;
          const startTime = performance.now();
          const step = (now: number) => {
            const progress = Math.min((now - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <div ref={ref} className="font-heading text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-foreground break-words">
      {prefix}{count.toLocaleString("pt-BR")}{suffix}
    </div>
  );
};

const MetricsSection = () => {
  return (
    <section className="section-padding relative z-10 bg-background">
      <div className="container mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
          {metrics.map((metric, i) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="text-center p-3 md:p-5 rounded-2xl bg-card border border-border/50 shadow-sm hover:shadow-md transition-shadow duration-300 w-full max-w-full"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.3 }}
                className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-accent flex items-center justify-center mx-auto mb-2 md:mb-3"
              >
                <metric.icon className="w-5 h-5 md:w-6 md:h-6 text-primary" strokeWidth={1.5} />
              </motion.div>
              <CountUp target={metric.value} prefix={metric.prefix} suffix={metric.suffix} />
              <div className="mt-1 md:mt-2 text-xs md:text-sm text-muted-foreground font-medium break-words">{metric.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MetricsSection;
