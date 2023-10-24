
const enviarEmail = require('./envia-email');   
const { getDay } = require('date-fns');

function getWeekday() {
    const dia_de_hoje = new Date();
    return getDay(dia_de_hoje);
}

function escopo_email(novos_carros,mais_vendidos,condicao){

    function formatar(itens) {
        return itens.map((item, index) => `${index + 1}. ${item}`);
    }
    const lista_carros = formatar(novos_carros);
    const lista_maisvendidos = formatar(mais_vendidos);

    const formato_email =
    `
    Caro Cliente,
    
    Esperamos que esteja bem!

    Viemos a partir desse email para notifica-lo que temos novidades em nossa loja, segue abaixo nossos novos produtos:

    Veículos novos:
    ${lista_carros};

    Veículos mais vendidos:
    ${lista_maisvendidos};

    Porém é necessário algumas condições para ser possível a aquisição edles, sendo elas:

    ${condicao};
    
    `;
    return formato_email;
};

function dias(dia){
    dias = ["Domingo","Segunda-Feira","Terça-Feira","Quarta-Feira","Quinta-Feira","Sexta-Feira","Sabádo"];
    return dias[dia];
}

function enviar_email() {
    if (getWeekday() === 1) {
        const condicao = ["É necessário passar por um teste de conhecimento do carro que você escolher, para ver se você realmente conhece o que está comprando!! Boa sorte"];
        const novos_carros = ["Tesla", "BMW", "Ford GT", "Ferrari 2024"];
        const mais_vendidos = ["Fusca 1970", "Chevrolet Onix", "Fiat Mobi"];

        const listaEmails = [
            {
                email: 'cliente1_carstore@email.com',
                receber_email: true,
            },
            {
                email: 'cliente2_carstore@email.com',
                receber_email: false,
            },
        ];

        const corpo_email = escopo_email(novos_carros, mais_vendidos, condicao);

        listaEmails.forEach((cliente) => {
            if (cliente.receber_email) {
                const destinatario = cliente.email;
                const assunto = 'Novidades da CarStore';
    
                const resultadoEnvio = enviarEmail(destinatario, assunto, corpo_email);
    
                if (resultadoEnvio.status === "Success") {
                    console.log(`E-mail enviado com sucesso para ${destinatario}`);
                } else {
                    console.error(`Erro ao enviar e-mail para ${destinatario}: ${resultadoEnvio.message}`);
                }
            } else {
                console.log(`Cliente ${cliente.email} não deseja receber comunicações de marketing.`);
            }
        });
    } else {
        const dia = getWeekday();
        console.log(`Hoje não haverá email pois é ${dias(dia)}`);
    }
}

enviar_email();
