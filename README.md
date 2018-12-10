# Aplicação para emissão de pedidos

## Tecnologias
* Node v7.10.0
* Npm v6.1.0
* React v16.6.3
* WebPack v3.1.2
* Bootstrap v4

## Utilização
### Requisitos necessários:
* [NodeJS](http://nodejs.org/) (with [NPM](https://www.npmjs.org/))

### Instalação
1. Clone o repositório: `git clone https://github.com/eduardobarbiero/temer_front.git`;
2. Instale as dependências: `npm install`;
3. A configuração do caminho do servidor de API, deve ser feito em `/src/app/config/index` e modificar o parâmetro `apiUrl`;
5. Execute `npm start` para iniciar o servidor em desenvolvimento;
6. Abra o navegador com o endereço `http://localhost:8080/`.

### Comandos 
#### Gulp
* `gulp dev` -> modifica parametros para desenvolvimento;
* `gulp production` -> modifica parametros para produção.

Obs: Os comandos gulps precisam ser configurados para as URLs desejadas.

#### Webpack Build
* `npm run build` -> compila os arquivos para produção e manda para uma pasta `/dist` na raiz do projeto (para execução deve ser utilizado um servidor de aplicação);
* `npm run dev` -> executa em desenvolvimento;

