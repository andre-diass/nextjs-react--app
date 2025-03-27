
<h3 align="center">Next.js, React E-commerce app</h3>
 
 ---
 
 <p align="center"> 
 Este projeto tem como objetivo o desenvolvimento de uma aplicação de E-commerce. O backend deste projeto está disponível no seguinte repositório:
 https://github.com/andre-diass/serverless-ts-microservice
 </p>
 
 ## 📝 Conteúdo <a name = "content"></a>
 - [Sobre](#about)
 - [Instalação](#getting_started)
 - [Estrutura do Projeto](#project_structure)
 - [Layout](#layout)
 - [Arquitetura do Back-end](#system_architecture)
 - [Contexto da solução](#solution_context)
 - [Requisitos Funcionais](#functionalities)
 - [Diagrama de Caso de Uso](#use_case_diagram)
 - [Deploy](#deployment)
 - [Desenvolvido com](#built_using)
 - [Autores](#authors)
 
 
 ## 📕 Sobre <a name = "about"></a>
 Esta documentação está orientada tanto para informações, que descrevem as funcionalidades do projeto, quanto para compreensão, 
 com o intuito de explicar as ferramentas e modelos utilizados em forma de explicação discursiva e visual. Esta documentação não abrange guias práticos ou tutoriais
 
 ## Instalação <a name = "getting_started"></a>
 
 First, run the development server:
 
 ```bash
 npm run dev
 # or
 yarn dev
 # or
 pnpm dev
 ```
 
 ## Estrutura do projeto <a name = "project_structure"></a>
 A estrutura deste projeto está descrita abaixo:
 
 | Nome                  | Descrição                                                                                       |
 | --------------------- | ----------------------------------------------------------------------------------------------- |
 | **components**        | Componentes React reutilizavéis. Estrutura interna segue padrão de Atomic Design                |
 | **lib**               | Código fonte para configuração de bibliotecas externas                                          |
 | **middlewares**       | Código fonte para proteção das rotas na aplicação                                               |
 | **node_modules**      | Contém todas as dependências npm.                                                               |
 | **pages**             | Rotas públicas da aplicação                                                                     |
 | **pages/api**         | Server side enpoints                                                                            |
 | **pages/app**         | Rotas privas da aplicação. (pós login)                                                          |
 | **public**            | Arquivos estáticos                                                                              |
 | **services**          | Funções de chamadas ao back-end                                                                 |
 | **styles**            | Código referente a configuração global de CSS                                                   |
 | **types**             | Tipos utilizados globalmente na aplicação                                                       |
 | **utils**             | Funções e classes utilitárias usadas em toda a aplicação                                        |
 | package.json          | Contém dependências npm, bem como [scripts de build](#o-que-fazer-se-uma-biblioteca-nao-estiver-no-definitelytyped). |
 | tsconfig.json         | Configurações para compilar apenas código-fonte escrito em TypeScript.                          |
 | tslint.json           | Configurações para a verificação de estilo de código com o TSLint.                              |
 | tailwind.config.js    | Configurações para a verificação de estilo de código com o TSLint.                              |
 
 ## 🎨 Layout <a name = "layout"></a>
 O layout dessa aplicação(front-end), está disponível em: <a href="https://www.figma.com/file/hrq37duWZOq54gsReKoIfN/Store-admin?type=design&node-id=0%3A1&mode=design&t=m98hujQXfZUr1MsG-1">Figma</a>
 
 ## 💻 Topologia do back-end <a name = "system_architecture"></a>
 ![Alt text](https://upload-png-4567.s3.us-west-1.amazonaws.com/Cloud+Formation+(8).jpg)
 
 ## Contexto da solução <a name = "solution_context"></a>
 O ecossistema Amazônia tem uma venda anual de $404,4 bilhões. Englobando setor da agricultura e florestas. A aplicação em questão tem como objetivo integrar produtos desse ecossistema ao mercado exterior, através de uma plataforma de marketplace simples, direta e confiavél.
 
 ## Requisitos Funcionais <a name = "functionalities"></a>
 
 - [x] CRUD de produtos;
 - [x] CRUD de categorias;
 - [ ] Gestão de pedidos;
 - [x] Autenticação de usuários;
 - [x] Autorização baseada em papéis;
 - [x] Geração de token de acesso (JWT);
 - [ ] Integração com serviços de pagamento;
 - [ ] Monitoramento e logs;
 - [x] Integração com provedores de armazenamento em nuvem;
 - [ ] Implementação de testes automatizados;
 - [ ] Documentação abrangente.
 
 ## ✏️ Diagrama de caso de uso <a name = "use_case_diagram"></a>
 <img src="https://upload-png-4567.s3.us-west-1.amazonaws.com/Use+case+diagram+(1).jpg" alt="Alt text">
 
 ## 🚀 Deploy <a name = "deployment"></a>
 O deploy é realizado através do push para um dos branches development ou main.
 
 ## ⚒️ Desenvolvido com <a name = "built_using"></a>
 - [React](https://reactjs.org/) - Biblioteca JavaScript para construção de interfaces de usuário
 - [Next.js](https://nextjs.org/) - Framework React para renderização do lado do servidor e criação de aplicativos da web
 - [Tailwind CSS](https://tailwindcss.com/) - Framework CSS utilitário de baixo nível
 - [axios](https://github.com/axios/axios) - Cliente HTTP baseado em Promise para o navegador e o Node.js
 - [Jest](https://jestjs.io/) - Framework de teste de JavaScript
 - [Flowbite](https://flowbite.com/) - Conjunto de ferramentas de design e componentes para construir interfaces da web rapidamente
 
 
 ## ✍️ Autores <a name = "authors"></a>
 - [@andredias](https://github.com/andre-diass) - Idea & Development
