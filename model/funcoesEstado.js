/****************************************************************************************************************************************************
* Objetivo: Arquivo de funções para selecionar características de diferentes estados
* Data: 20/10/2023
* Autor: Ryan Alves
* Versão: 1.0
****************************************************************************************************************************************************/

var pais = require('./estados_cidades')

const getListaDeEstados = () => {

    const estados = pais.estadosCidades.estados
    let siglas = {}
    let uf = []
    
    estados.forEach( (estado) => {
        
        uf.push(estado.sigla)

    })
    
    siglas.uf = uf
    siglas.quantidade = estados.length

    return siglas

}

const getDadosEstado = (sigla) => {
    
    const uf = sigla.toUpperCase()
    const estados = pais.estadosCidades.estados

    let descricaoEstado = {}
    let status = false

    estados.forEach( (estado) => {
        
        if(estado.sigla.includes(uf)){

            descricaoEstado.uf = estado.sigla
            descricaoEstado.descricao = estado.nome
            descricaoEstado.capital = estado.capital
            descricaoEstado.regiao = estado.regiao
            status = true

        }

    })

    if(status)
        return descricaoEstado
    else
        return false

}

const getCapitalEstado = (sigla) => {

    const uf = sigla.toUpperCase()
    const estados = pais.estadosCidades.estados

    let capitalEstado = {}
    let status = false
    
    estados.forEach( (estado) => {
        
        if(estado.sigla.includes(uf)){
            
            status = true
            capitalEstado.uf = estado.sigla
            capitalEstado.descricao = estado.nome
            capitalEstado.capital = estado.capital

        }

    })

    if(status)
        return capitalEstado
    else
        return false
}

const getEstadosRegiao = (regiaoSelecionada) => {

    const regiao = regiaoSelecionada.toUpperCase()

    const estados = pais.estadosCidades.estados
    
    let estadoRegiao = {}
    let status = false

    estadoRegiao.regiao = regiao

    let estadosRegiaoSelecionada = []
    
    estados.forEach( (estado) => {

        if((estado.regiao.toUpperCase()).includes(regiao)){

            let estadoRegiaoSelecionada = {
                uf: estado.sigla,
                descricao: estado.nome,
            }

            status = true

            estadosRegiaoSelecionada.push(estadoRegiaoSelecionada)


        }

    })

    estadoRegiao.estados = estadosRegiaoSelecionada

    if(status)
        return estadoRegiao
    else
        return false
        
}

const getCapitalPais = () => {

    const estados = pais.estadosCidades.estados

    let capitaisPais = {}
    let capitais = []

    estados.forEach( (estado) => {

        if(estado.capital_pais != undefined){

            let estadoInfo = {}

            
            estadoInfo.capital_atual = estado.capital_pais.capital
            estadoInfo.uf = estado.sigla
            estadoInfo.descricao = estado.nome
            estadoInfo.capital = estado.capital
            estadoInfo.regiao = estado.regiao
            estadoInfo.capital_pais_ano_inicio =  estado.capital_pais.ano_inicio
            estadoInfo.capital_pais_ano_termino =  estado.capital_pais.ano_fim

            capitais.push(estadoInfo)

        }

    })

    capitaisPais.capitais = capitais

    return capitaisPais

}

const getCidades = (sigla) => {

    const uf = sigla.toUpperCase()
    const estados = pais.estadosCidades.estados

    let estadoCidades = {}
    let cidades = []
    let status = false

    estados.forEach( (estado) => {

        if(estado.sigla.toUpperCase().includes(uf)){
        
            estadoCidades.uf = estado.sigla
            estadoCidades.descricao = estado.nome
            estadoCidades.quantidade_cidades = estado.cidades.length
    
            let status = true

            estado.cidades.forEach( (cidade) => {
                cidades.push(cidade.nome)
            })
    
        }

    })

    estadoCidades.cidades = cidades

    if(status)
        return estadoCidades
    else
        return false

}

module.exports = {
    getListaDeEstados,
    getDadosEstado,
    getCapitalEstado,
    getEstadosRegiao,
    getCapitalPais,
    getCidades
}
