import { motion } from "framer-motion";
import doctor1 from "@/assets/doctor-1.jpg";
import doctor2 from "@/assets/doctor-2.jpg";
import doctor3 from "@/assets/doctor-3.jpg";
import doctor4 from "@/assets/doctor-4.jpg";

const team = [
  { name: "Dr. Rafael Mendes", specialty: "Cardiologia", crm: "CRM 12345", photo: doctor1 },
  { name: "Dra. Camila Santos", specialty: "Pediatria", crm: "CRM 23456", photo: doctor2 },
  { name: "Dr. Lucas Ferreira", specialty: "Ortopedia", crm: "CRM 34567", photo: doctor3 },
  { name: "Dra. Ana Oliveira", specialty: "Oncologia", crm: "CRM 45678", photo: doctor4 },
];

const TeamSection = () => {
  return (
    <section id="equipe" className="section-padding bg-background">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent text-accent-foreground text-sm font-medium mb-4">
            Nossa Equipe
          </span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Profissionais de <span className="gradient-text">Excelência</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Uma equipe multidisciplinar dedicada ao seu bem-estar e saúde.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              className="group rounded-2xl overflow-hidden bg-card border border-border/50 hover:border-primary/30 hover:shadow-lg transition-all duration-300"
            >
              <div className="relative overflow-hidden aspect-[4/5]">
                <img
                  src={member.photo}
                  alt={member.name}
                  width={512}
                  height={640}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="p-5">
                <h3 className="font-heading text-lg font-semibold text-foreground">{member.name}</h3>
                <p className="text-primary text-sm font-medium mt-1">{member.specialty}</p>
                <p className="text-muted-foreground text-xs mt-1">{member.crm}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
