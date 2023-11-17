/****************************************************************************************************************************************************
* Objetivo: Cria uma API para respoder dados de Estados e Cidades
* Data: 10/11/2023
* Autor: Ryan Alves
* Versão: 1.0
****************************************************************************************************************************************************/

/****************************************************************************************************************************************************
* Instalações da dependência para criação da API
* -> express (npm install express -save)
*    - Dependência do node para auxiliar na criação da API
*
* -> cors (npm install cors -save) 
*    - Dependência para manipular recursos de acesso, permissões, etc. da API
*
* -> body-parser (npm install body-parser -save)
*    - Dependência para auxiliar na chegada de dados na API
****************************************************************************************************************************************************/

/****************************************************************************************************************************************************
* Métodos de requisão de dados
* -> GET - Pegar dados
* -> POST - Enviar dados novos
* -> PUT - Alterar dados existentes
* -> DELETE - Deleta dados
*
*  Na requisão são enviados:
*  -> Header (Endereçamento dos dados)
*  -> Body (Conteúdo dos dados)
****************************************************************************************************************************************************/

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const funcoes = require('./model/funcoesEstado.js')

// Cria um objeto app tendo como referência a biblioteca do express
const app = express()

// request - Receber dados
// response - Devolve dados

// Função para configurar as permissões do cors
app.use((request, response, next) => {

    // Configura quem poderá fazer requisições na API (* -> Todos, IP  -> Restringir acesso)
    response.header('Acess-Control-Allow-Origin', '*')

    // Configura os métodos que poderão se utilizados na API (GET, POST, PUT e DELETE)
    response.header('Acess-Control-Allow-Methods', 'GET')

    app.use(cors)

    next()

})  

// EndPoints: Listar a sigla de todos os Estados
app.get('/estados/sigla', cors(), async (request, response, next) => {

    response.json(funcoes.getListaDeEstados())
    response.status(200)
    
})

// EndPoints: Listar os dados de um estado
app.get('/estado/dados/:sigla', cors(), async (request, response, next) => {

    let sigla = request.params.sigla

    if(funcoes.getDadosEstado(sigla)){
        response.json(funcoes.getDadosEstado(sigla))
        response.status(200)
    }else{
        response.json({erro: 'Não foi possível encontrar um item'})
        response.status(404)
    }
    
})

// EndPoints: Listar a capital de um estado
app.get('/estado/capital/', cors(), async (request, response, next) => {

    let sigla = request.query.sigla

    if(funcoes.getCapitalEstado(sigla)){
        response.json(funcoes.getCapitalEstado(sigla))
        response.status(200)
    }else{
        response.json({erro: 'Não foi possível encontrar um item'})
        response.status(404)
    }
    
})

// EndPoints: Listar os estados de uma regiao
app.get('/estados/regiao/:regiao', cors(), async (request, response, next) => {

    let regiao = request.params.regiao
    
    if(funcoes.getEstadosRegiao(regiao)){
        response.json(funcoes.getEstadosRegiao(regiao))
        response.status(200)
    }else{
        response.json({erro: 'Não foi possível encontrar um item'})
        response.status(404)
    }

})

// EndPoints: Listar as capitais do Brasil
app.get('/capitais', cors(), async (request, response, next) => {

    response.json(funcoes.getCapitalPais())
    response.status(200)
    
})

// EndPoints: Listar as cidades de um estado
app.get('/estado/cidades/:sigla', cors(), async (request, response, next) => {

    let sigla = request.params.sigla

    if(funcoes.getCidades(sigla)){
        response.json(funcoes.getCidades(sigla))
        response.status(200)
    }else{
        response.json({erro: 'Não foi possível encontrar um item'})
        response.status(404)
    }
    
})

//Executa a API e faz ela ficar aguardando requisições
app.listen(8080, () => {})

