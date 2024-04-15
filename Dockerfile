# Usa a imagem oficial do Node.js como base
FROM node:latest

# Define o diretório de trabalho dentro do contêiner
WORKDIR /usr/src/app

# Copia o arquivo package.json e package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instala as dependências do projeto
RUN npm install

# Copia todo o código-fonte para o diretório de trabalho
COPY . .

# Compila o código TypeScript para JavaScript
RUN npm run build

# Expõe a porta 3000
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["node", "./dist/server.js"]
