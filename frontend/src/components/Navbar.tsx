import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { LOGO_SCALE } from "@/lib/logo";

const navLinks = [
  { label: "Início", href: "#inicio" },
  { label: "Serviços", href: "#servicos" },
  { label: "Equipe", href: "#equipe" },
  { label: "Depoimentos", href: "#depoimentos" },
  { label: "Localização", href: "#localizacao" },
  { label: "Contato", href: "#contato" },
];

const menuVariants = {
  closed: {
    height: 0,
    opacity: 0,
    transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
  },
  open: {
    height: "auto",
    opacity: 1,
    transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
  },
};

const linkVariants = {
  closed: { opacity: 0, x: -16 },
  open: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.06, duration: 0.3, ease: "easeOut" },
  }),
};

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("#inicio");
  const headerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const logoSize = Math.round(40 * (LOGO_SCALE / 100));

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    const sectionIds = navLinks.map((l) => l.href.slice(1));
    const observers = sectionIds
      .map((id) => {
        const el = document.getElementById(id);
        if (!el) return null;
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) setActiveSection(`#${id}`);
          },
          { threshold: 0.3 },
        );
        observer.observe(el);
        return observer;
      })
      .filter(Boolean) as IntersectionObserver[];

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target as Node;
      if (headerRef.current?.contains(target) || menuRef.current?.contains(target)) return;

      setOpen(false);
    };

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [open]);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-border/30"
    >
      <div ref={headerRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <a href="#inicio" className="flex items-center gap-0 shrink-0">
          <img
            src="/logo.png"
            alt="VidaPlena logo"
            width={logoSize}
            height={logoSize}
            style={{ width: logoSize, height: logoSize }}
            className="rounded-lg object-cover shrink-0"
            onError={(e) => {
              const t = e.currentTarget;
              t.style.display = "none";
              const fb = document.createElement("div");
              fb.style.width = `${logoSize}px`;
              fb.style.height = `${logoSize}px`;
              fb.className =
                "rounded-lg bg-primary flex items-center justify-center";
              fb.innerHTML =
                '<span class="text-primary-foreground font-heading font-bold text-xl">V</span>';
              t.parentElement?.insertBefore(fb, t);
            }}
          />
          <span className="font-heading font-bold text-xl text-foreground">
            VidaPlena
          </span>
        </a>

        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href;
            return (
              <a
                key={link.href}
                href={link.href}
                className={`relative px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                  isActive
                    ? "text-primary bg-accent"
                    : "text-muted-foreground hover:text-primary hover:bg-accent/50"
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-primary rounded-full" />
                )}
              </a>
            );
          })}
        </div>

        <div className="hidden lg:block">
          <a
            href="#agendar"
            className="group relative inline-flex items-center justify-center px-5 py-2.5 rounded-lg bg-primary text-white text-sm font-semibold overflow-hidden transition-all duration-300 hover:shadow-lg active:scale-[0.97]"
            style={{ boxShadow: "var(--shadow-button)" }}
          >
            <span className="relative z-10">Agendar Consulta</span>
            <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
          </a>
        </div>

        <motion.button
          className="lg:hidden relative w-10 h-10 flex items-center justify-center text-foreground rounded-lg hover:bg-accent transition-colors"
          onClick={() => setOpen(!open)}
          whileTap={{ scale: 0.9 }}
          aria-label={open ? "Fechar menu" : "Abrir menu"}
        >
          <motion.div
            animate={{ rotate: open ? 90 : 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </motion.div>
        </motion.button>
      </div>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 top-16 z-40 bg-foreground/10 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />
            <motion.div
              ref={menuRef}
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="relative z-50 lg:hidden overflow-hidden bg-card/95 backdrop-blur-lg border-t border-border/30 shadow-lg"
            >
              <div className="flex flex-col gap-1 px-4 pb-4 pt-2">
                {navLinks.map((link, i) => {
                  const isActive = activeSection === link.href;
                  return (
                    <motion.a
                      key={link.href}
                      href={link.href}
                      onClick={() => setOpen(false)}
                      custom={i}
                      variants={linkVariants}
                      initial="closed"
                      animate="open"
                      exit="closed"
                      whileHover={{
                        x: 6,
                        backgroundColor: "var(--accent)",
                        transition: { duration: 0.2 },
                      }}
                      whileTap={{ scale: 0.97 }}
                      className={`relative flex items-center gap-3 py-2.5 px-3 rounded-md text-sm font-medium transition-colors duration-200 ${
                        isActive
                          ? "text-primary bg-accent"
                          : "text-muted-foreground hover:text-primary"
                      }`}
                    >
                      {isActive && (
                        <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-primary rounded-full" />
                      )}
                      {link.label}
                    </motion.a>
                  );
                })}
                <motion.a
                  href="#agendar"
                  onClick={() => setOpen(false)}
                  custom={navLinks.length}
                  variants={linkVariants}
                  initial="closed"
                  animate="open"
                  exit="closed"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  className="group relative mt-3 inline-flex h-10 items-center justify-center px-5 py-0 rounded-lg bg-primary text-white text-sm font-semibold overflow-hidden transition-all duration-300 hover:shadow-lg"
                  style={{ boxShadow: "var(--shadow-button)" }}
                >
                  <span className="relative z-10">Agendar Consulta</span>
                  <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
                </motion.a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
