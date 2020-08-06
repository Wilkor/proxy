module.exports = {

  formalizacao:{
    baseUrl:'https://http.msging.net',
    uploads:'./download',
    pdf:'./save_file_path',
    urlAcompanhamento:'https://api-h.safrafinanceira.com.br/apl-api-formalizacao-consignado/api/v1/AcompanhamentoFormalizacao',
    urlToken:'https://api-h.safrafinanceira.com.br/apl-api-formalizacao-consignado/api/v1/Token',
    urlCancelmentoFormalizacao:'https://api-h.safrafinanceira.com.br/apl-api-formalizacao-consignado/api/v1/CancelarFormalizacao',
    urlArtefato:'https://api-h.safrafinanceira.com.br/apl-api-formalizacao-consignado/api/v1/Artefatos',
    urlValidaDadosCliente: 'https://api-h.safrafinanceira.com.br/apl-api-formalizacao-consignado/api/v1/ValidacaoDadosCliente',
    urlAssinaProposta: 'https://api-h.safrafinanceira.com.br/apl-api-formalizacao-consignado/api/v1/AssinarProposta',
    urlReabirFormalizacao: 'https://api-h.safrafinanceira.com.br/apl-api-formalizacao-consignado/api/v1/ReabrirFormalizacao'
  },
  contratacao:{
    baseUrl:'https://api-h.safrafinanceira.com.br/apl-api-cht-consig',
    uploads:'./download',
    pdf:'./save_file_path'
  },
  crivo: {
    baseUrl: 'https://api-h.safrafinanceira.com.br/apl-api-crivo-aqx'
  }

}
