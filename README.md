🎬 Cine Tascom - Interface de Cinema
Cine Tascom  é uma aplicação web de front-end moderna  que simula a interface de um site de compra de ingressos de cinema. O projeto foi desenvolvido com foco em criar uma experiência de usuário fluida e interativa, utilizando as melhores práticas de desenvolvimento com React e TypeScript.

✨ Funcionalidades Principais
Listagem de Filmes: Carrossel interativo na página inicial para exibir os filmes populares, com efeitos visuais e responsividade.

Busca em Tempo Real: Um campo de busca inteligente que consulta a API do TMDb e exibe os resultados instantaneamente em uma lista flutuante, sem a necessidade de um botão.

Detalhes e Horários: Ao selecionar um filme (seja no carrossel ou na busca), um modal exibe os horários disponíveis para a sessão.

Seleção de Assentos: Interface gráfica para o usuário selecionar visualmente os assentos desejados.

Autenticação Simplificada: Integração com Firebase Authentication para um login rápido com o Google, pegando apenas o nome do usuário para personalizar a experiência.

Fluxo de Compra: Um fluxo de usuário completo, desde a escolha do filme até a página de pagamento e a geração de um ingresso virtual.

Gerenciamento de Estado Avançado: Utilização de dois Contextos React distintos (AuthContext e ReservationContext) para uma clara separação de responsabilidades entre autenticação e o processo de reserva.

Persistência de Dados: Uso do localStorage para salvar o estado da autenticação e da reserva, permitindo que o usuário recarregue a página sem perder seu progresso.

Páginas Dedicadas: Inclui uma página 404 profissional e uma página de Ingresso com funcionalidade de impressão.


🛠️ Tecnologias Utilizadas
Framework: React

Linguagem: TypeScript

Build Tool: Vite

Roteamento: React Router DOM

Estilização: CSS Modules

Componentes de UI:

Swiper.js (v11.2.8): Para a criação de carrosséis de filmes modernos e responsivos.

React-Modal (v3.16.3): Para a exibição de pop-ups e modais.

Autenticação: Firebase Authentication

Carrossel: Swiper.js

Cliente HTTP: Axios (v1.10.0) para realizar chamadas à API do TMDb de forma robusta.

API de Filmes: The Movie Database (TMDb)

🚀 Como Iniciar o Projeto Localmente
Para executar este projeto na sua máquina, siga os passos abaixo.

Pré-requisitos
Node.js (versão 16 ou superior)

npm ou yarn

Passos para Instalação
Clone o repositório:

Bash

git clone https://github.com/Klaudio0707/CineTascom
cd seu-repositorio
Instale as dependências:

Bash

npm install
ou

Bash

yarn install
Configure as Variáveis de Ambiente:
Este passo é crucial. Crie um arquivo chamado .env na raiz do seu projeto e adicione as seguintes variáveis, substituindo os valores pelos seus próprios tokens e chaves:

Snippet de código

# Sua chave da API do The Movie Database (TMDb) v3
VITE_API_TMDB_KEY=SUA_CHAVE_AQUI - #Solicitação ao desenvolvedor#

# Seu TOKEN de acesso do The Movie Database (TMDb) v4 (usado no header 'Authorization: Bearer')
VITE_TMDB_TOKEN=SEU_TOKEN_BEARER_AQUI 

# Suas credenciais do projeto Firebase
VITE_APIFIREBASE_KEY=SUA_CHAVE_DE_API_DO_FIREBASE
Você obtém essas chaves nos painéis do TMDb e do Firebase.  -  #Solicitação ao desenvolvedor#

Execute o projeto:

Bash

npm run dev
Após executar o comando, o servidor de desenvolvimento será iniciado. Abra seu navegador e acesse http://localhost:5173 (ou o endereço que aparecer no seu terminal).