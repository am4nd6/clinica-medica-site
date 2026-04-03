import { motion } from "framer-motion";

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
              {["Início", "Serviços", "Equipe", "Depoimentos"].map((item) => (
                <li key={item}>
                  <a href={`#${item.toLowerCase()}`} className="text-sm text-secondary-foreground/60 hover:text-primary transition-colors duration-200">
                    {item}
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

        <div className="border-t border-secondary-foreground/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
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
