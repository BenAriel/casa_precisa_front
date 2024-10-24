/** @type {import('next').NextConfig} */

// Variável que verifica se está no ambiente do GitHub Actions
const isGithubActions = process.env.GITHUB_ACTIONS || false;

let assetPrefix = '';
let basePath = '';

// Se estiver no GitHub Actions, configura os paths corretamente
if (isGithubActions) {
  const repo = process.env.GITHUB_REPOSITORY.replace(/.*?\//, '');
  assetPrefix = `/${repo}/`;
  basePath = `/${repo}`;
}

const nextConfig = {
  assetPrefix: assetPrefix,
  basePath: basePath,
  images: {
    loader: 'imgix', // Pode usar outros carregadores, como 'cloudinary', se preferir
    path: `${basePath}/`, // Usa o basePath como caminho das imagens
  },
};

export default nextConfig;
