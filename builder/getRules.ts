import { loader as MiniCssExtractLoader } from 'mini-css-extract-plugin';
import { vueSvgLoaderDir } from './paths';
import type { Target } from '@/types/builder';
import type { RuleSetRule, RuleSetUseItem } from 'webpack';

function getCssLoaders(isDev: boolean): RuleSetUseItem[] {
  return [
    ...[isDev ? 'vue-style-loader' : MiniCssExtractLoader],
    'css-loader',
    'postcss-loader',
  ];
}

export default function getRules(target: Target): Rules {
  const isDev = target.mode === 'development';

  const rules: Rules = [{
    test: /\.[jt]s$/,
    exclude: /node_modules/,
    loader: 'swc-loader',
    options: {
      env: {
        mode: 'usage',
        coreJs: '3.40.0',
      },
      jsc: {
        parser: {
          syntax: 'typescript',
          tsx: false,
        },
      },
    },
  }];

  rules.push({
    test: /\.vue$/,
    loader: 'vue-loader',
    options: {
      compilerOptions: {
        comments: isDev,
      },
    },
  });

  rules.push({
    test: /\.(?:ico|gif|png|jpg|jpeg|webp)$/i,
    type: 'asset/resource',
    generator: {
      filename: 'img/[name].[hash:8].[ext]',
    },
  });

  rules.push({
    test: /\.(svg)$/i,
    oneOf: [
      {
        loader: vueSvgLoaderDir,
        resourceQuery: /inline/,
      },
      {
        type: 'asset/resource',
        generator: {
          filename: 'img/[name].[hash:8].[ext]',
        },
      },
    ],
  });

  rules.push({
    test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
    type: 'asset/resource',
    generator: {
      filename: 'fonts/[name].[hash:8].[ext]',
    },
  });

  rules.push({
    test: /\.css$/,
    use: getCssLoaders(isDev),
  });

  rules.push({
    test: /\.s[ac]ss$/,
    use: [
      ...getCssLoaders(isDev),
      {
        loader: 'sass-loader',
        options: {
          additionalData: `
            @use "@/assets/scss/variables" as *;
            @use "@/assets/scss/functions" as *;
            @use "@/assets/scss/mixins" as *;
          `,
        },
      },
    ],
  });

  return rules;
}

type Rules = (RuleSetRule | '...')[];
