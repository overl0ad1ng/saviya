import { defineConfig } from 'vitepress'
import { rustSidebar } from "./sidebars/rust-sidebar";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Saviya Me",
  description: "A VitePress Site",
  lastUpdated: true,
  themeConfig: {
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
