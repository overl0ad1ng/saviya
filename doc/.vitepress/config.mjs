import { defineConfig } from 'vitepress'
import { rustSidebar } from "./sidebars/rust-sidebar";
import container from 'markdown-it-container'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Saviya Me",
  description: "A VitePress Site",
  lastUpdated: true,
  
  markdown: {
    config: (md) => {
      md.use(container, 'blockquote', {
        render: (tokens, idx) => {
          const m = tokens[idx].info.trim().match(/^blockquote\s*(.*)$/)
          if (tokens[idx].nesting === 1) {
            const title = m && m[1] ? md.utils.escapeHtml(m[1]) : ''
            return `<blockquote class="custom-blockquote">${title ? `<strong>${title}</strong><br>` : ''}\n`
          } else {
            return '</blockquote>\n'
          }
        }
      })
    },
    lineNumbers: true,
    codeTransformers: [
      {
        name: 'inline-highlight',
        postprocess(html) {
          return html.replace(/\*\*(.+?)\*\*/g, '<span class="highlighted-word">$1</span>')
        }
      }
    ]
  },
  
  themeConfig: {
    lastUpdatedText: "",
    
    outline: {
      level: [2, 3, 4, 5],
    },
    
    nav: [
      {
        text: "主页",
        link: "/"
      },
      {
        text: "后端",
        items: [
          { text: 'Rust', link: '/docs/backend/rust/primary/' },
        ]
      }
    ],

    sidebar: {
      '/docs/backend/rust/': rustSidebar
    }
  }
})
