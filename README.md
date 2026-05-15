# Prime Mais Cred - Landing Page & Funil Inteligente

Página de alta conversão (Landing Page) desenvolvida para a **Prime Mais Cred**, focada no produto de **Empréstimo Consignado Privado para Trabalhadores CLT**. O projeto inclui uma página principal informativa e um questionário (funil) interativo para pré-qualificação de leads.

## 🚀 Recursos e Funcionalidades

- **Design Mobile-First**: Interface moderna, limpa e altamente responsiva, otimizada para a melhor experiência em dispositivos móveis.
- **Funil de Qualificação (Single Page)**: Questionário em 9 passos sem recarregamento de página, garantindo fluidez e velocidade na captação do lead.
- **Integração via WhatsApp**: O fluxo finaliza com a geração de um *prompt* inteligente, formatando as respostas do cliente e direcionando-o automaticamente para o WhatsApp de atendimento da Prime Mais Cred.
- **Filtro de Requisitos**: Bloqueio inteligente de leads restritos (não CLT, sem margem, ou com empresa recente) baseados nas regras de negócio, poupando tempo da equipe de vendas.
- **Máscaras e Validações**: Validação em tempo real de e-mail, telefone (WhatsApp), cálculo de idade (maiores de 18 anos) e máscaras de moeda/documentos, construídas com Vanilla JS.

## 🛠️ Tecnologias Utilizadas

Este projeto foi construído priorizando a mais alta performance de carregamento, dispensando o uso de frameworks complexos:

- **HTML5** (Semântico e estruturado)
- **CSS3** (Design System com variáveis, Flexbox, Grid e animações leves)
- **JavaScript (Vanilla JS)** (Lógica do funil, máscaras de input e geração de links de WhatsApp)

## 📂 Estrutura do Projeto

```text
/
├── index.html              # Landing page principal (Hero, Benefícios, Como Funciona, FAQ)
├── questionario.html       # Subpágina do funil de simulação e qualificação
├── css/
│   └── style.css           # Folha de estilos centralizada (Cores, Tipografia, Componentes)
├── js/
│   ├── main.js             # Scripts da página inicial (Accordion FAQ)
│   └── questionario.js     # Lógica do funil, máscaras de campo e integração WhatsApp
└── [imagens].webp          # Imagens otimizadas para carregamento rápido
```

## 🌐 Como Rodar Localmente

Por ser um projeto puramente *front-end* estático, nenhum servidor local complexo é exigido.

1. Clone o repositório:
   ```bash
   git clone https://github.com/bruno040986/prime-mais-cred-lp-clt-01.git
   ```
2. Abra a pasta do projeto no seu editor de código (ex: VS Code).
3. Utilize a extensão **Live Server** ou apenas abra o arquivo `index.html` em seu navegador.

## 📦 Deploy (Publicação)

O projeto é ideal para ser hospedado gratuitamente e com extrema velocidade em plataformas CDN para arquivos estáticos como **Vercel** ou **Netlify**:
1. Conecte sua conta do GitHub à Vercel.
2. Importe este repositório.
3. Faça o deploy. A página receberá automaticamente um certificado SSL (`https`) e ficará globalmente distribuída.

---
*Projeto desenvolvido para a Prime Consignados Ltda.*
