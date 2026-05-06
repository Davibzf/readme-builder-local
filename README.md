# ✦ README Builder v2.0

> Gerador de README para GitHub **100% local** — sem APIs externas, sem CDN, sem internet obrigatória.

Feito por [Davibzf](https://github.com/Davibzf) · [Ver repositório](https://github.com/Davibzf/Readme-Builder)

---

## 🚀 Funcionalidades

| Recurso | Status |
|---------|--------|
| Typing SVG animado gerado localmente | ✅ 100% local |
| 125+ ícones SVG locais (sem skillicons.dev) | ✅ 100% local |
| Badges gerados localmente (sem shields.io) | ✅ 100% local |
| Wave Header/Footer SVG local | ✅ 100% local |
| Preview GitHub Light / Dark | ✅ |
| Templates prontos (6 perfis) | ✅ |
| Seção "Sobre mim" com fatos | ✅ |
| Projetos em destaque personalizáveis | ✅ |
| Cards de Estatísticas GitHub gerados localmente | ✅ 100% local |
| 13 plugins (Snake, Stats, LeetCode...) | ✅ |
| Multi-idioma PT / EN | ✅ |
| Persistência via localStorage | ✅ |
| Export / Import JSON config | ✅ |
| Download README.md | ✅ |
| Download typing.svg | ✅ |
| Zero dependências externas em runtime | ✅ |

---

## 📦 Como rodar

### Pré-requisitos
- [Node.js](https://nodejs.org) 18+ (apenas para desenvolvimento)

### Instalação e desenvolvimento

```bash
# Clone o repositório
git clone https://github.com/Davibzf/Readme-Builder.git
cd Readme-Builder

# Instale as dependências
npm install

# Rode em modo desenvolvimento
npm run dev
```

Abra `http://localhost:5173` no navegador.

### Build para produção

```bash
npm run build
```

A pasta `dist/` gerada pode ser servida por qualquer servidor estático,
ou simplesmente aberta com `npm run preview`.

### Sem Node.js (só abrir no navegador)

Se não quiser instalar Node.js, use a pasta `dist/` já compilada:

```bash
# Serve a pasta dist com qualquer servidor estático, ex:
npx serve dist
# ou
python3 -m http.server 8080 --directory dist
```

---

## 📁 Estrutura do projeto

```
readme-builder/
├── public/
│   └── assets/
│       └── icons/          ← 125+ ícones SVG locais
├── src/
│   ├── components/
│   │   ├── Sidebar/        ← Painel de configuração
│   │   │   ├── index.tsx
│   │   │   ├── ProfileSection.tsx
│   │   │   ├── TypingSection.tsx
│   │   │   ├── IconsSection.tsx
│   │   │   ├── PluginsSection.tsx
│   │   │   ├── SocialSection.tsx
│   │   │   ├── AboutSection.tsx
│   │   │   ├── ProjectsSection.tsx
│   │   │   └── TemplatesSection.tsx
│   │   ├── Preview/        ← Preview fiel ao GitHub
│   │   ├── CodePanel/      ← Painel de Markdown gerado
│   │   ├── Toolbar/        ← Barra de ações
│   │   └── Toast/          ← Notificações
│   ├── generators/
│   │   ├── typing-svg.ts   ← Gerador de SVG animado (local)
│   │   └── markdown.ts     ← Gerador de Markdown (local)
│   ├── hooks/
│   │   ├── useAppState.ts  ← Estado centralizado + localStorage
│   │   └── useToast.ts
│   ├── data/
│   │   ├── icons.ts        ← Banco de 125+ ícones
│   │   ├── fonts.ts        ← Fontes do sistema (sem Google Fonts)
│   │   ├── defaults.ts     ← Estado padrão + templates
│   │   ├── i18n.ts         ← PT / EN
│   │   └── palette.ts      ← Paleta de cores
│   ├── types/index.ts      ← Todos os tipos TypeScript
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── dist/                   ← Build de produção (gerado com npm run build)
├── index.html
├── package.json
├── vite.config.ts
└── tsconfig.json
```

---

## ✅ Checklist de dependências removidas

| Dependência externa | Substituído por |
|---------------------|-----------------|
| `readme-typing-svg.demolab.com` | Gerador SVG próprio em `generators/typing-svg.ts` |
| `skillicons.dev` | 125 ícones SVG locais em `public/assets/icons/` |
| `shields.io` | Gerador de badges SVG local em `generators/typing-svg.ts` |
| `capsule-render.vercel.app` | `generateWaveSVG()` local |
| `komarev.com` (visitor badge) | Badge SVG gerado localmente |
| `fonts.googleapis.com` | Fontes do sistema via CSS font-stack |
| `fonts.gstatic.com` | Removido |
| Qualquer CDN externo | Removido |

> **Nota:** GitHub Stats, Streak, Trophies e Activity Graph ainda requerem
> internet pois dependem da API do GitHub para buscar dados em tempo real.
> O README gerado os inclui com comentários explicativos.

---

## 🛠 Stack

- **React 18** + **TypeScript**
- **Vite 5** (bundler, sem servidor obrigatório)
- **Zero dependências de runtime** além de React

---

## 📄 Licença

MIT — use, modifique e distribua à vontade.
