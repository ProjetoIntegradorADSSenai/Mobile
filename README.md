# Documentação do Mobile

## Descrição
O repositório **Mobile** contém o código-fonte de um aplicativo móvel desenvolvido como parte do Projeto Integrador do curso de Análise e Desenvolvimento de Sistemas (ADS) da Faculdade SENAI. O aplicativo é construído utilizando **React Native** com **TypeScript** (arquivos `.tsx`), um framework para desenvolvimento de aplicativos multiplataforma para Android e iOS. Ele serve como uma interface móvel para interagir com a API do projeto [API](https://github.com/ProjetoIntegradorADSSenai/API), complementando o frontend web [Dashboard-Front](https://github.com/ProjetoIntegradorADSSenai/Dashboard-Front). O aplicativo permite aos usuários acessar funcionalidades do sistema, como visualização de dados, gerenciamento de informações ou outras interações, diretamente de dispositivos móveis.

## Pré-requisitos
Para executar o projeto localmente, você precisará dos seguintes itens:
- **Node.js** (versão 16 ou superior recomendada)
- **npm** ou **yarn** (gerenciadores de pacotes)
- Um ambiente de desenvolvimento configurado para React Native:
  - **Android Studio** (para emulador Android)
  - **Xcode** (para emulador iOS, necessário em macOS)
- Emulador Android/iOS ou dispositivo físico para testes
- **Git** (para clonar o repositório)
- Acesso à API backend correspondente (configure a URL da API no projeto, se necessário)

## Instalação
Siga os passos abaixo para configurar e executar o aplicativo localmente:

1. **Clone o repositório** (branch `develop`):
   ```bash
   git clone --branch develop https://github.com/ProjetoIntegradorADSSenai/Mobile.git
   ```

2. **Acesse o diretório do projeto**:
   ```bash
   cd Mobile
   ```

3. **Instale as dependências**:
   ```bash
   npm install
   ```
   Ou, se preferir usar yarn:
   ```bash
   yarn install
   ```

4. **Configure as variáveis de ambiente** (se necessário):
   - Crie um arquivo `.env` na raiz do projeto ou edite o arquivo de configuração (ex.: `src/config.ts`) para definir a URL da API backend. Exemplo:
     ```typescript
     export const API_URL = 'http://localhost:8080/api';
     ```
   - Verifique se o backend ([API](https://github.com/ProjetoIntegradorADSSenai/API)) está em execução.

5. **Configure o ambiente React Native**:
   - Para Android, certifique-se de que o Android Studio e o SDK estão configurados.
   - Para iOS, configure o Xcode (apenas em macOS).
   - Siga as instruções oficiais do [React Native](https://reactnative.dev/docs/environment-setup) para configurar o ambiente.

6. **Execute o aplicativo**:
   - Inicie o servidor Metro Bundler:
     ```bash
     npm start
     ```
     Ou, com yarn:
     ```bash
     yarn start
     ```
   - Em outra janela do terminal, execute o aplicativo no emulador/dispositivo:
     - Para Android:
       ```bash
       npm run android
       ```
     - Para iOS:
       ```bash
       npm run ios
       ```

   O aplicativo será compilado e executado no dispositivo/emulador selecionado.

## Uso
O aplicativo móvel permite que os usuários interajam com as funcionalidades do sistema diretamente de dispositivos Android ou iOS. As principais funcionalidades incluem:
- Visualização de dados em formato adaptado para dispositivos móveis.
- Interação com recursos como login, monitoramento e dashboards ou envio de dados para a API.
- Navegação otimizada para telas de dispositivos móveis.

**Exemplo de uso**:
1. Inicie o aplicativo no emulador ou dispositivo físico.
2. Faça login.
3. Navegue pelas telas para acessar as funcionalidades do dashboard ou outras seções.

## Estrutura do Projeto
A estrutura do repositório segue o padrão de projetos React Native com TypeScript. Abaixo está uma visão geral dos principais diretórios e arquivos:

## Contribuição
Para contribuir com o projeto:
1. Faça um fork do repositório.
2. Crie uma branch para sua feature ou correção a partir da branch `develop`:
   ```bash
   git checkout -b minha-nova-feature
   ```
3. Realize as alterações e faça commit:
   ```bash
   git commit -m "Adiciona minha nova feature"
   ```
4. Envie para o repositório remoto:
   ```bash
   git push origin minha-nova-feature
   ```
5. Abra um Pull Request no GitHub, direcionado à branch `develop`, com uma descrição clara das alterações.

Certifique-se de seguir as convenções de código do React Native e TypeScript (ex.: padrões de nomenclatura e tipagem) e testar suas alterações em dispositivos Android e/ou iOS.
