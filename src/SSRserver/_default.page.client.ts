export { render };
import { createSSRApp, h } from "vue";
async function render(pageContext: any) {
  const { Page, pageProps } = pageContext;
  const app = createSSRApp({
    render: () => h(Page, pageProps),
  });
  app.mount("#app");
}
