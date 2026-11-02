# Amanpreet Singh | Portfolio Architecture

This repository contains the source code for my multi-page digital portfolio. Instead of relying on heavy frontend abstractions or JavaScript frameworks, this platform is engineered from scratch using raw HTML5, CSS3, and vanilla JavaScript. 

The design language is intentionally brutalist and information-dense, reflecting systems-level engineering principles. It deliberately avoids modern web bloat—no pill-shaped buttons, no purple gradients, and no scroll-jacking.

## Core Architecture

* **Zero-Dependency Frontend:** The entire user interface is built without React, Vue, or utility-class frameworks outside of standard CSS Grid and Flexbox layouts. 
* **Offline-First Delivery:** Engineered to load instantly across global networks with sub-second latency, utilizing strict asset optimization and semantic DOM structuring.
* **Segmented Routing:** Divided into distinct routing spaces (Index, Work, System, Contact) to isolate project documentation, technical stack breakdowns, and direct communications telemetry.

## Local Deployment

Because the architecture relies entirely on static, native web technologies, no build steps, node modules, or bundlers are required to run the environment.

```bash
git clone [https://github.com/Amanpreet6656/My-Portfolio.git](https://github.com/Amanpreet6656/My-Portfolio.git)
cd My-Portfolio

# Serve directly via Python's built-in HTTP module
python3 -m http.server 8000