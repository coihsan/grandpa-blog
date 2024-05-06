/* empty css                          */
import { e as createAstro, f as createComponent, r as renderTemplate, m as maybeRenderHead, h as addAttribute, i as renderComponent, q as renderHead } from '../astro_C0VA0hLr.mjs';
import 'kleur/colors';
import { t as topic, $ as $$BaseHead, a as $$Header, b as $$Footer, S as SITE_TITLE, c as SITE_DESCRIPTION } from './about_DZ5vy59n.mjs';
import 'clsx';

const $$Astro$1 = createAstro("https://example.com");
const $$Buttons = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Buttons;
  const { text, href, iconName, className } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<svg${addAttribute(className, "class")} width="123" height="42" fill="white" viewBox="0 0 123 42" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"> <a style="display:flex;align-items: center;"${addAttribute(href, "href")}> <path d="M0 5C0 2.23858 2.23858 0 5 0H106.498C107.924 0 109.282 0.608739 110.23 1.67315L121.733 14.578C122.549 15.4939 123 16.678 123 17.9049V37C123 39.7614 120.761 42 118 42H5C2.23858 42 0 39.7614 0 37V31.5V5Z" fill="#F7F7F7"></path> <image${addAttribute(iconName, "href")} x="10" y="9"${addAttribute(24, "width")}${addAttribute(24, "height")}></image> <text fill="black" x="40" y="26" font-size="1rem" font-weight="600">${text}</text> </a> </svg>`;
}, "/home/coihsan/grandpa-blog/src/components/design/Buttons.astro", void 0);

const $$Astro = createAstro("https://example.com");
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  return renderTemplate`<html lang="en"> <head>${renderComponent($$result, "BaseHead", $$BaseHead, { "title": SITE_TITLE, "description": SITE_DESCRIPTION })}${renderHead()}</head> <body class="overflow-hidden relative"> <div class="absolute inset-0 -z-10 h-full w-full bg-[radial-gradient(#181d2a_1px,transparent_1px)] [background-size:1rem_1rem] z-[-1]"></div> <main class="w-full"> <div class="absolute top-0 left-0 w-full"> ${renderComponent($$result, "Header", $$Header, {})} </div> <div class="flex items-center justify-center flex-col w-full h-[100vh] max-w-screen-md mx-auto px-6"> <h1 class="font-bold text-4xl lg:text-6xl text-center text-white font-bold pb-6">Hello kids, <br> I'm your Grandpa!</h1> <ul class="flex flex-wrap items-center justify-center gap-3"> ${topic.map((item) => renderTemplate`<li${addAttribute(`${item.style} px-4 py-1 rounded-full border backdrop-blur-lg`, "class")}>${item.text}</li>`)} </ul> ${renderComponent($$result, "Buttons", $$Buttons, { "className": "mt-6", "iconName": "/src/assets/icons/explore.svg", "href": "/blog", "text": "Explore" })} <!-- <a class="px-6 py-3 mt-6 rounded-full bg-onyx-50 text-onyx-800 flex items-center justify-center gap-1" href="/blog">
					<Icon name="explore" width={24} height={24} />
					<span class="font-bold">Explore</span>
				</a> --> </div> <div class="absolute bottom-0 left-0 w-full"> ${renderComponent($$result, "Footer", $$Footer, {})} </div> </main>  </body> </html>`;
}, "/home/coihsan/grandpa-blog/src/pages/index.astro", void 0);

const $$file = "/home/coihsan/grandpa-blog/src/pages/index.astro";
const $$url = "";

export { $$Index as default, $$file as file, $$url as url };
