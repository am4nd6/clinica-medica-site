import { motion } from "framer-motion";
import { Box } from "lucide-react";

const Footer = () => {
  return (
    <footer id="contato" className="bg-secondary pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-heading font-bold text-lg">V</span>
              </div>
              <span className="font-heading font-bold text-xl text-secondary-foreground">VidaPlena</span>
            </div>
            <p className="text-secondary-foreground/60 text-sm leading-relaxed">
              Saúde inteligente com cuidado humano. Tecnologia e acolhimento para cuidar de você.
            </p>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-secondary-foreground mb-4">Links Rápidos</h4>
            <ul className="space-y-2">
              {[
                { label: "Início", href: "#inicio" },
                { label: "Serviços", href: "#servicos" },
                { label: "Equipe", href: "#equipe" },
                { label: "Depoimentos", href: "#depoimentos" },
              ].map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-sm text-secondary-foreground/60 hover:text-primary transition-colors duration-200">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-secondary-foreground mb-4">Serviços</h4>
            <ul className="space-y-2">
              {["Cardiologia", "Pediatria", "Ortopedia", "Telemedicina"].map((item) => (
                <li key={item}>
                  <span className="text-sm text-secondary-foreground/60">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-secondary-foreground mb-4">Contato</h4>
            <ul className="space-y-2 text-sm text-secondary-foreground/60">
              <li>Av. Paulista, 1000</li>
              <li>São Paulo - SP</li>
              <li>(11) 3000-0000</li>
              <li>contato@vidaplena.com.br</li>
            </ul>
          </div>
        </div>

        {/* ── Créditos de Modelos 3D ── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          id="creditos-3d"
          className="border-t border-secondary-foreground/10 pt-8 mb-6"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 p-4 rounded-xl bg-secondary-foreground/5 border border-secondary-foreground/8">
            <div className="flex items-center gap-2 flex-shrink-0">
              <Box size={16} className="text-primary" />
              <span className="text-xs font-semibold text-secondary-foreground/70 uppercase tracking-wide">
                Créditos — Modelos 3D
              </span>
            </div>
            <div className="w-px h-4 bg-secondary-foreground/20 hidden sm:block" />
            <p className="text-xs text-secondary-foreground/50 leading-relaxed">
              Modelo 3D do coração humano por{" "}
              {/* 👇 Substitua pelo nome e link do autor real */}
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline font-medium"
              >
                [neshallads]
              </a>
            </p>
          </div>
        </motion.div>

        {/* ── Rodapé final ── */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-secondary-foreground/40">
            © 2026 VidaPlena. Todos os direitos reservados.
          </p>
          <div className="flex gap-4">
            {["Facebook", "Instagram", "LinkedIn", "YouTube"].map((s) => (
              <a key={s} href="#" className="text-xs text-secondary-foreground/40 hover:text-primary transition-colors duration-200">
                {s}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
