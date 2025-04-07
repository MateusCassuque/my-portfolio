# 🌐 Meu Site Pessoal – Portfólio & Serviços Web

Este é o código-fonte do meu site pessoal, desenvolvido com **Next.js**. O objetivo deste projeto é apresentar meu perfil profissional, exibir meus principais projetos e facilitar o contato com clientes interessados em **serviços de desenvolvimento de websites e aplicações web**.

---

## 🚀 Tecnologias Utilizadas

- **Next.js** – Framework fullstack em React.
- **Shadcn UI** – Componentes UI modernos e acessíveis.
- **Lucide Icons** – Ícones elegantes e personalizáveis.
- **PostgreSQL** – Banco de dados relacional robusto.
- **Prisma ORM** – Mapeamento objeto-relacional para o banco.
- **Zustand** – Gerenciamento de estado simples e eficiente.
- **Next.js Server Actions** – Para manipulação de formulários sem API Routes.

---

## 🧱 Estrutura do Site

### 🏠 Home
- Foto de perfil + bio profissional.
- Chamada para ação: **"Vamos criar algo juntos?"**
- Botões de **Contato** e **Agendar Reunião**.

### 👨‍💻 Sobre Mim
- Apresentação pessoal, trajetória e stack.
- Valores: qualidade, agilidade, foco no cliente.

### 🗂️ Portfólio
- Lista dos principais projetos com:
  - Nome
  - Descrição
  - Tecnologias
  - Link do GitHub
  - Link do deploy

### 📬 Contacte-me
- Formulário com os campos:
  - Nome
  - Email
  - Mensagem
- Validação de formulário
- Gerenciamento de estado com Zustand
- Envio de dados via **server actions**
- Feedback visual (toast/modal)
- Armazenamento das mensagens no banco de dados (PostgreSQL via Prisma)

### 🛠️ Dashboard (Admin)
- Área restrita para leitura e gestão de mensagens recebidas.
- Visualização com filtros (lidas / não lidas)
- Autenticação simples

---

## 📎 Rodapé

- Direitos autorais © [Seu Nome] – [Ano Atual]
- Links para redes sociais:
  - GitHub
  - LinkedIn
  - Instagram (ou outras)
- Ações rápidas:
  - 📩 **Contacte-me**
  - 📅 **Agende uma Reunião**

---

## 📈 Objetivo Final

Este projeto é a base para minha presença digital profissional e ponto de contato com futuros clientes. Ele também serve como vitrine do meu trabalho e habilidades com tecnologias modernas do ecossistema JavaScript/TypeScript.

---

## 📌 Como Rodar o Projeto

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/seu-repositorio.git

# Acesse a pasta do projeto
cd seu-repositorio

# Instale as dependências
npm install

# Rode o projeto em modo desenvolvimento
npm run dev