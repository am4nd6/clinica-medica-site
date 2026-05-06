# 🏥 VidaPlena | Saúde Inteligente com Cuidado Humano

![Banner](https://img.shields.io/badge/Status-Desenvolvimento-blue?style=for-the-badge)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Node](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)

Bem-vindo ao repositório da **VidaPlena**, uma plataforma médica moderna que combina tecnologia de ponta com atendimento humanizado. Este sistema foi projetado com uma arquitetura escalável e profissional, separando o ecossistema de interface do motor de processamento.

---

## 🏗️ Arquitetura do Sistema

O projeto utiliza um modelo de **Monorepo**, garantindo que frontend e backend coexistam de forma organizada e eficiente.

```text
/
├── 🎨 frontend/          # Interface do usuário (React + Vite + Tailwind)
│   ├── src/
│   │   ├── components/   # Componentes modulares (Hero, 3D Sections, etc)
│   │   ├── features/     # Lógica por contexto
│   │   └── services/     # Integração com a API
│   └── package.json
│
├── ⚙️ backend/           # API e Lógica de Negócio (Node.js + Express)
│   ├── src/
│   │   ├── controllers/  # Gerenciamento de rotas
│   │   ├── services/     # Regras de negócio
│   │   └── models/       # Definição de dados
│   └── package.json
│
└── package.json          # Orquestrador de Workspaces
```

---

## ✨ Principais Funcionalidades (Frontend)

- **🚀 Experiência Premium**: Interface fluida com animações modernas e design responsivo.
- **❤️ Visualização 3D**: Seção interativa com modelagem de coração para uma experiência imersiva.
- **🧬 DNA Tech Section**: Apresentação visual da tecnologia genética utilizada na clínica.
- **📊 Métricas em Tempo Real**: Dashboard visual com dados de atendimento e satisfação.
- **📍 Localização Integrada**: Mapa e informações de contato dinâmicas.

---

## 🛠️ Tecnologias Utilizadas

### Frontend
- **React 18** + **Vite** (Velocidade e performance)
- **Tailwind CSS** (Estilização moderna e utilitária)
- **Framer Motion** (Animações fluidas)
- **Three.js** (Elementos 3D)
- **Shadcn/UI** (Componentes de alta fidelidade)

### Backend
- **Node.js** + **Express**
- **Dotenv** (Gerenciamento de ambiente)
- **CORS** (Segurança de acesso)

---

## 🚀 Como Executar o Projeto

### Pré-requisitos
- Node.js instalado
- NPM ou Bun

### 1. Clonar e Instalar
```bash
git clone https://github.com/am4nd6/clinica-medica-site.git
cd clinica-medica-site
npm run install:all
```

### 2. Rodar os Ambientes
Você pode rodar ambos os serviços de forma independente a partir da raiz:

**Para o Frontend:**
```bash
npm run frontend
```

**Para o Backend:**
```bash
npm run backend
```

---

## 📄 Licença

Este projeto é de uso exclusivo para a clínica **VidaPlena**. Todos os direitos reservados.

---
<p align="center">
  Desenvolvido com ❤️ para uma saúde melhor.
</p>
