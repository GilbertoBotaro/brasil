var utils = require('gammautils'),
    path = require('path'),
    bancosArray = path.join(__dirname, './dados/bancos-array.json');

module.exports.regioes = path.join(__dirname, './dados/regioes.json');
module.exports.municipiosDicionario = path.join(__dirname, './dados/municipios-dicionario.json');
module.exports.municipiosArray = path.join(__dirname, './dados/municipios-array.json');
module.exports.cfopsDicionario = path.join(__dirname, './dados/cfops-dicionario.json');
module.exports.cfopsArray = path.join(__dirname, './dados/cfops-array.json');
module.exports.bancosArray = bancosArray;

var naturezasJuridicas = [
    //fonte: http://www.receita.fazenda.gov.br/pessoajuridica/cnpj/tabelas/natjurqualificaresponsavel.htm
    { tipo: 'Administração Pública', codigo: '1015', descricao: 'Órgão Público do Poder Executivo Federal', representante: ['Administrador'], qualificacao: ['05'] },
    { tipo: 'Administração Pública', codigo: '1023', descricao: 'Órgão Público do Poder Executivo Estadual ou do Distrito Federal', representante: ['Administrador'], qualificacao: ['05'] },
    { tipo: 'Administração Pública', codigo: '1031', descricao: 'Órgão Público do Poder Executivo Municipal', representante: ['Administrador'], qualificacao: ['05'] },
    { tipo: 'Administração Pública', codigo: '1040', descricao: 'Órgão Público do Poder Legislativo Federal', representante: ['Administrador'], qualificacao: ['05'] },
    { tipo: 'Administração Pública', codigo: '1058', descricao: 'Órgão Público do Poder Legislativo Estadual ou do Distrito Federal', representante: ['Administrador'], qualificacao: ['05'] },
    { tipo: 'Administração Pública', codigo: '1066', descricao: 'Órgão Público do Poder Legislativo Municipal', representante: ['Administrador'],  qualificacao: ['05'] },
    { tipo: 'Administração Pública', codigo: '1074', descricao: 'Órgão Público do Poder Judiciário Federal', representante: ['Administrador'],  qualificacao: ['05'] },
    { tipo: 'Administração Pública', codigo: '1082', descricao: 'Órgão Público do Poder Judiciário Estadual', representante: ['Administrador'], qualificacao: ['05'] },
    { tipo: 'Administração Pública', codigo: '1104', descricao: 'Autarquia Federal', representante: ['Administrador', 'Presidente'], qualificacao: ['05', '16'] },
    { tipo: 'Administração Pública', codigo: '1112', descricao: 'Autarquia Estadual ou do Distrito Federal', representante: ['Administrador', 'Presidente'], qualificacao: ['05', '16'] },
    { tipo: 'Administração Pública', codigo: '1120', descricao: 'Autarquia Municipal', representante: ['Administrador', 'Presidente'], qualificacao: ['05', '16'] },
    { tipo: 'Administração Pública', codigo: '1139', descricao: 'Fundação Federal', representante: ['Presidente'], qualificacao: ['16'] },
    { tipo: 'Administração Pública', codigo: '1147', descricao: 'Fundação Estadual ou do Distrito Federal', representante: ['Presidente'], qualificacao: ['16'] },
    { tipo: 'Administração Pública', codigo: '1155', descricao: 'Fundação Municipal', representante: ['Presidente'], qualificacao: ['16'] },
    { tipo: 'Administração Pública', codigo: '1163', descricao: 'Órgão Público Autônomo Federal', representante: ['Administrador'],  qualificacao: ['05'] },
    { tipo: 'Administração Pública', codigo: '1171', descricao: 'Órgão Público Autônomo Estadual ou do Distrito Federal', representante: ['Administrador'],  qualificacao: ['05'] },
    { tipo: 'Administração Pública', codigo: '1180', descricao: 'Órgão Público Autônomo Municipal', representante: ['Administrador'],  qualificacao: ['05'] },
    { tipo: 'Administração Pública', codigo: '1198', descricao: 'Comissão Polinacional', representante: ['Administrador'],  qualificacao: ['05'] },
    { tipo: 'Administração Pública', codigo: '1201', descricao: 'Fundo Público', representante: ['Administrador'],  qualificacao: ['05'] },
    { tipo: 'Administração Pública', codigo: '1210', descricao: 'Associação Pública', representante: ['Presidente'], qualificacao: ['16'] },
    { tipo: 'Entidades Empresariais', codigo: '2011', descricao: 'Empresa Pública', representante: ['Administrador', 'Diretor', 'Presidente']    , qualificacao: ['05', '10', '16'] },
    { tipo: 'Entidades Empresariais', codigo: '2038', descricao: 'Sociedade de Economia Mista', representante: ['Diretor', 'Presidente'], qualificacao: ['10', '16'] },
    { tipo: 'Entidades Empresariais', codigo: '2046', descricao: 'Sociedade Anônima Aberta', representante: ['Administrador', 'Diretor', 'Presidente']    , qualificacao: ['05', '10', '16'] },
    { tipo: 'Entidades Empresariais', codigo: '2054', descricao: 'Sociedade Anônima Fechada', representante: ['Administrador', 'Diretor', 'Presidente']    , qualificacao: ['05', '10', '16'] },
    { tipo: 'Entidades Empresariais', codigo: '2062', descricao: 'Sociedade Empresária Limitada', representante: ['Administrador', 'Sócio-Administrador'], qualificacao: ['05', '49'] },
    { tipo: 'Entidades Empresariais', codigo: '2070', descricao: 'Sociedade Empresária em Nome Coletivo', representante: ['Sócio-Administrador'], qualificacao: ['49'] },
    { tipo: 'Entidades Empresariais', codigo: '2089', descricao: 'Sociedade Empresária em Comandita Simples', representante: ['Sócio Comanditado'], qualificacao: ['24'] },
    { tipo: 'Entidades Empresariais', codigo: '2097', descricao: 'Sociedade Empresária em Comandita por Ações', representante: ['Diretor', 'Presidente'], qualificacao: ['10', '16'] },
    { tipo: 'Entidades Empresariais', codigo: '2127', descricao: 'Sociedade em Conta de Participação', representante: ['Procurador', 'Sócio Ostensivo'], qualificacao: ['17', '31'] },
    { tipo: 'Entidades Empresariais', codigo: '2135', descricao: 'Empresário (Individual)', representante: ['Empresário'], qualificacao: ['50'] },
    { tipo: 'Entidades Empresariais', codigo: '2143', descricao: 'Cooperativa', representante: ['Diretor', 'Presidente'], qualificacao: ['10', '16'] },
    { tipo: 'Entidades Empresariais', codigo: '2151', descricao: 'Consórcio de Sociedades', representante: ['Administrador'], qualificacao: ['05'] },
    { tipo: 'Entidades Empresariais', codigo: '2160', descricao: 'Grupo de Sociedades', representante: ['Administrador'], qualificacao: ['05'] },
    { tipo: 'Entidades Empresariais', codigo: '2178', descricao: 'Estabelecimento, no Brasil, de Sociedade Estrangeira', representante: ['Procurador'], qualificacao: ['17'] },
    { tipo: 'Entidades Empresariais', codigo: '2194', descricao: 'Estabelecimento, no Brasil, de Empresa Binacional Argentino-Brasileira', representante: ['Procurador'], qualificacao: ['17'] },
    { tipo: 'Entidades Empresariais', codigo: '2216', descricao: 'Empresa Domiciliada no Exterior', representante: ['Procurador'], qualificacao: ['17'] },
    { tipo: 'Entidades Empresariais', codigo: '2224', descricao: 'Clube/Fundo de Investimento', representante: ['Responsável'], qualificacao: ['43'] },
    { tipo: 'Entidades Empresariais', codigo: '2232', descricao: 'Sociedade Simples Pura', representante: ['Administrador', 'Sócio-Administrador'], qualificacao: ['05', '49'] },
    { tipo: 'Entidades Empresariais', codigo: '2240', descricao: 'Sociedade Simples Limitada', representante: ['Administrador', 'Sócio-Administrador'], qualificacao: ['05', '49'] },
    { tipo: 'Entidades Empresariais', codigo: '2259', descricao: 'Sociedade Simples em Nome Coletivo', representante: ['Sócio-Administrador'], qualificacao: ['49'] },
    { tipo: 'Entidades Empresariais', codigo: '2267', descricao: 'Sociedade Simples em Comandita Simples', representante: ['Sócio Comanditado'], qualificacao: ['24'] },
    { tipo: 'Entidades Empresariais', codigo: '2275', descricao: 'Empresa Binacional', representante: ['Diretor'], qualificacao: ['10'] },
    { tipo: 'Entidades Empresariais', codigo: '2283', descricao: 'Consórcio de Empregadores', representante: ['Administrador'], qualificacao: ['05'] },
    { tipo: 'Entidades Empresariais', codigo: '2291', descricao: 'Consórcio Simples', representante: ['Administrador'], qualificacao: ['05'] },
    { tipo: 'Entidades Empresariais', codigo: '2305', descricao: 'Empresa Individual de Responsabilidade Limitada (de Natureza Empresária)', representante: ['Administrador', 'Procurador', 'Titular Pessoa Física Residente ou Domiciliado no Brasil'], qualificacao: ['05', '17', '65'] },
    { tipo: 'Entidades Empresariais', codigo: '2313', descricao: 'Empresa Individual de Responsabilidade Limitada (de Natureza Simples)', representante: ['Administrador', 'Procurador', 'Titular Pessoa Física Residente ou Domiciliado no Brasil'], qualificacao: ['05', '17', '65'] },
    { tipo: 'Entidades Sem Fins Lucrativos', codigo: '3034', descricao: 'Serviço Notarial e Registral (Cartório)', representante: ['Tabelião ou Oficial de Registro'], qualificacao: ['32', '42'] },
    { tipo: 'Entidades Sem Fins Lucrativos', codigo: '3069', descricao: 'Fundação Privada', representante: ['Administrador', 'Diretor', 'Presidente', 'Fundador'], qualificacao: ['05', '10', '16', '54'] },
    { tipo: 'Entidades Sem Fins Lucrativos', codigo: '3077', descricao: 'Serviço Social Autônomo', representante: ['Administrador'], qualificacao: ['05'] },
    { tipo: 'Entidades Sem Fins Lucrativos', codigo: '3085', descricao: 'Condomínio Edilício', representante: ['Administrador ou Síndico (Condomínio)'], qualificacao: ['05', '19'] },
    { tipo: 'Entidades Sem Fins Lucrativos', codigo: '3107', descricao: 'Comissão de Conciliação Prévia', representante: ['Administrador'], qualificacao: ['05'] },
    { tipo: 'Entidades Sem Fins Lucrativos', codigo: '3115', descricao: 'Entidade de Mediação e Arbitragem', representante: ['Administrador'], qualificacao: ['05'] },
    { tipo: 'Entidades Sem Fins Lucrativos', codigo: '3123', descricao: 'Partido Político', representante: ['Administrador', 'Presidente'], qualificacao: ['05', '16'] },
    { tipo: 'Entidades Sem Fins Lucrativos', codigo: '3131', descricao: 'Entidade Sindical', representante: ['Administrador', 'Presidente'], qualificacao: ['05', '16'] },
    { tipo: 'Entidades Sem Fins Lucrativos', codigo: '3204', descricao: 'Estabelecimento, no Brasil, de Fundação ou Associação Estrangeiras', representante: ['Procurador'], qualificacao: ['17'] },
    { tipo: 'Entidades Sem Fins Lucrativos', codigo: '3212', descricao: 'Fundação ou Associação domiciliada no exterior', representante: ['Procurador'], qualificacao: ['17'] },
    { tipo: 'Entidades Sem Fins Lucrativos', codigo: '3220', descricao: 'Organização Religiosa', representante: ['Administrador', 'Diretor', 'Presidente']    , qualificacao: ['05', '10', '16'] },
    { tipo: 'Entidades Sem Fins Lucrativos', codigo: '3239', descricao: 'Comunidade Indígena', representante: ['Responsável Indígena'], qualificacao: ['61'] },
    { tipo: 'Entidades Sem Fins Lucrativos', codigo: '3247', descricao: 'Fundo Privado', representante: ['Administrador'], qualificacao: ['05'] },
    { tipo: 'Entidades Sem Fins Lucrativos', codigo: '3999', descricao: 'Associação Privada', representante: ['Administrador', 'Diretor', 'Presidente']    , qualificacao: ['05', '10', '16'] },
    { tipo: 'Pessoas Físicas', codigo: '4014', descricao: 'Empresa Individual Imobiliária', representante: ['Titular'], qualificacao: ['34'] },
    { tipo: 'Pessoas Físicas', codigo: '4081', descricao: 'Contribuinte Individual', representante: ['Produtor Rural'], qualificacao: ['59'] },
    { tipo: 'Pessoas Físicas', codigo: '4090', descricao: 'Candidato a Cargo Político Eletivo', representante: ['Candidato a Cargo Político Eletivo'], qualificacao: ['51'] },
    { tipo: 'Instituições Extraterritoriais', codigo: '5010', descricao: 'Organização Internacional', representante: ['Representante de Organização Internacional'], qualificacao: ['41'] },
    { tipo: 'Instituições Extraterritoriais', codigo: '5029', descricao: 'Representação Diplomática Estrangeira', representante: ['Diplomata', 'Cônsul', 'Ministro de Estado das Relações Exteriores', 'Cônsul Honorário'], qualificacao: ['39', '40', '46', '60'] },
    { tipo: 'Instituições Extraterritoriais', codigo: '5037', descricao: 'Outras Instituições Extraterritoriais', representante: ['Representante da Instituição Extraterritorial'], qualificacao: ['62'] }
];

var siglasDosEstados =
    ['AC', 'AL', 'AM',
    'AP', 'BA', 'CE',
    'DF', 'ES', 'GO',
    'MA', 'MG', 'MS',
    'MT', 'PA', 'PB',
    'PE', 'PI', 'PR',
    'RJ', 'RN', 'RO',
    'RR', 'RS', 'SC',
    'SE', 'SP', 'TO' ];

var tabelaIbgeDeEstados = [
    { codigo: 12,  regiao: 'Norte', nome: 'Acre', abreviacao: 'AC' },
    { codigo: 27, regiao: 'Nordeste', nome: 'Alagoas', abreviacao: 'AL' },
    { codigo: 16, regiao: 'Norte', nome: 'Amapá', abreviacao: 'AP' },
    { codigo: 13, regiao: 'Norte', nome: 'Amazonas', abreviacao: 'AM' },
    { codigo: 29, regiao: 'Nordeste', nome: 'Bahia', abreviacao: 'BA' },
    { codigo: 23, regiao: 'Nordeste', nome: 'Ceará', abreviacao: 'CE' },
    { codigo: 53, regiao: 'Centro-Oeste', nome: 'Distrito Federal', abreviacao: 'DF' },
    { codigo: 32, regiao: 'Sudeste', nome: 'Espírito Santo', abreviacao: 'ES' },
    { codigo: 52, regiao: 'Centro-Oeste', nome: 'Goiás', abreviacao: 'GO' },
    { codigo: 21, regiao: 'Nordeste', nome: 'Maranhão', abreviacao: 'MA' },
    { codigo: 51, regiao: 'Centro-Oeste', nome: 'Mato Grosso', abreviacao: 'MT' },
    { codigo: 50, regiao: 'Centro-Oeste', nome: 'Mato Grosso do Sul', abreviacao: 'MS' },
    { codigo: 31, regiao: 'Sudeste', nome: 'Minas Gerais', abreviacao: 'MG' },
    { codigo: 41, regiao: 'Sul', nome: 'Paraná', abreviacao: 'PR' },
    { codigo: 25, regiao: 'Nordeste', nome: 'Paraíba', abreviacao: 'PB' },
    { codigo: 15, regiao: 'Norte', nome: 'Pará', abreviacao: 'PA' },
    { codigo: 26, regiao: 'Nordeste', nome: 'Pernambuco', abreviacao: 'PE' },
    { codigo: 22, regiao: 'Nordeste', nome: 'Piauí', abreviacao: 'PI' },
    { codigo: 24, regiao: 'Nordeste', nome: 'Rio Grande do Norte', abreviacao: 'RN' },
    { codigo: 43, regiao: 'Sul', nome: 'Rio Grande do Sul', abreviacao: 'RS' },
    { codigo: 33, regiao: 'Sudeste', nome: 'Rio de Janeiro', abreviacao: 'RJ' },
    { codigo: 11, regiao: 'Norte', nome: 'Rondônia', abreviacao: 'RO' },
    { codigo: 14, regiao: 'Norte', nome: 'Roraima', abreviacao: 'RR' },
    { codigo: 42, regiao: 'Sul', nome: 'Santa Catarina', abreviacao: 'SC' },
    { codigo: 28, regiao: 'Nordeste', nome: 'Sergipe', abreviacao: 'SE' },
    { codigo: 35, regiao: 'Sudeste', nome: 'São Paulo', abreviacao: 'SP' },
    { codigo: 17, regiao: 'Norte', nome: 'Tocantins', abreviacao: 'TO' } ];

module.exports.obterEstadosPorRegiao = function(regiao){
    var estados = [];
    tabelaIbgeDeEstados.forEach(function(estado){
        if(estado.regiao.toLowerCase() === regiao.toLowerCase()) 
            estados.push(estado);
    });
    
    return estados;
};

function obterBancosPorNome(nomeBuscado) {
    var bancosEncontrados = [],
        bancos = require(bancosArray),
        nomeBuscado = utils.string.getSearchString(nomeBuscado);

    bancos.forEach(function(banco) {
        var nomeParaBusca = utils.string.getSearchString(banco.nome);

        if(nomeParaBusca.indexOf(nomeBuscado) > -1) {
            bancosEncontrados.push(banco);
        }
    });

    return bancosEncontrados;
}
module.exports.obterBancosPorNome = obterBancosPorNome;

function obterBancoPorCodigo(codigo) {
    if(codigo === '') {
        return null;
    }

    var bancoEncontrado = null,
        bancos = require(bancosArray);

    bancos.forEach(function(banco) {
        if(banco.codigo === codigo) {
            bancoEncontrado = banco; 
        }
    });

    return bancoEncontrado;
};
module.exports.obterBancoPorCodigo = obterBancoPorCodigo;

module.exports.obterEstado = obterEstado;
function obterEstado(id){
    if(typeof id === 'number' || !isNaN(parseInt(id, 10))){
        id = id.length && id.length === 7 ? parseInt(id.substr(0, 2), 10) : parseInt(id, 10);

        for(var estado in tabelaIbgeDeEstados){
            if(tabelaIbgeDeEstados.hasOwnProperty(estado)){
                estado = tabelaIbgeDeEstados[estado];
                if(estado.codigo === id)
                    return estado;
            };
        }
    }
    else if(typeof id === 'string'){
        for(var estado in tabelaIbgeDeEstados){
            if(tabelaIbgeDeEstados.hasOwnProperty(estado)){
                estado = tabelaIbgeDeEstados[estado];
                if(estado.nome.toLowerCase() === id.toLowerCase() || estado.abreviacao.toLowerCase() === id.toLowerCase())
                    return estado;
            };
        }
    }
    
    return null;
};

module.exports.naturezasJuridicas = naturezasJuridicas;
module.exports.siglasDosEstados = siglasDosEstados;
module.exports.tabelaIbgeDeEstados = tabelaIbgeDeEstados;