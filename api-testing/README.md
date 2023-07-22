# Preparando o ambiente pra usar o Supertest

npm init

npm install jest supertest

npm install @types/jest

    adicionar arquivo jsconfig.json dentro da pasta "api-testing" e inserir o body abaixo no arquivo:
    {
        "typeAcquisition": {
            "include": ["jest"]
        }
    }

npm install dotenv
    adicionar arquivo jest.config.json dentro da pasta "api-testing" e inserir o body abaixo no arquivo:
    {
        "setupFiles":["dotenv/config"],
        "reporters":["default","jest-html-reporters"]
    }

    criar arquivo .env dentro da pasta "api-testing" e inserir o body abaixo no arquivo:
    API_URL= http://localhost:3000/api

# Criando relatórios

 npm install jest-html-reporters