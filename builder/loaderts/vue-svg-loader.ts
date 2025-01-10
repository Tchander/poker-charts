import { parse } from 'path';
import { compileTemplate } from 'vue/compiler-sfc';
import type { LoaderContext } from 'webpack';

function vueSvgLoader(this: LoaderContext<unknown>, svgContent: string) {
  const { name: filename } = parse(this.resourcePath);

  const { code } = compileTemplate({
    id: Math.random() + filename,
    filename: this.resourcePath,
    source: svgContent,
  });

  return `${code}\n export default { render, name: '${filename}' };`;
}

export default vueSvgLoader;
