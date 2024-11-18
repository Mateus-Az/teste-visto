# 📦 Visto Sistemas - Teste Mateus

## 🚀 Visão Geral
Aplicação CRUD para gerenciamento de produtos.

## 🛠️ Tecnologias Utilizadas
- **Backend**: Java Spring Boot
- **Frontend**: Angular e Angular Material
- **Banco de Dados**: H2
- **Documentação API**: Swagger

## 📋 Funcionalidades
- Cadastro de produtos
- Listagem de produtos
- Atualização de produtos
- Exclusão de produtos
- Validação de dados
- Documentação de API

## 🔧 Pré-requisitos
- Java JDK
- Node.js 
- Angular CLI
- Maven

## 📦 Instalação e 🚀 Execução 

### Backend (Spring Boot)
```bash
# Clonar repositório
git clone https://github.com/Mateus-Az/teste-pratico-java-angular.git

# Navegar para pasta do backend
cd backend

# Instalar dependências e compilar
mvn clean install

#Executar projeto
mvn spring-boot:run 
```

### Frontend (Angular)
```bash
# Navegar para pasta do frontend
cd frontend

# Instalar dependências
npm install

# Servir aplicação
ng serve
```

## 🌐 URL Frontend
| Endpoint | Descrição |
|----------|-----------|
|`/painel` | Painel Geral da aplicação |
| `/products/form` | Criar novo produto |
| `/products/edit/:id` | Editar produto |



## 🌐 Endpoints API
| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET    | `/products` | Listar todos produtos |
| POST   | `/produts` | Criar novo produto |
| PUT    | `/products/{id}` | Atualizar produto |
| DELETE | `/products{id}` | Excluir produto |

## 🔍 URLs Importantes Backend
- **Swagger UI**: `http://localhost:8085/swagger-ui/index.html`
- **Banco de Dados H2**: `http://localhost:8085/h2`

## 📘 Documentação da API
Utilize o Swagger UI para explorar e testar os endpoints da aplicação.
