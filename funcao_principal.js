
const enviarEmail = require('./envia-email');   
const { getDay } = require('date-fns');

function getWeekday() {
    const dia_de_hoje = new Date();
    return getDay(dia_de_hoje);
} // Função para obter o dia da semana que estamos

function escopo_email(novos_carros,mais_vendidos,condicao){ // Função para formatar o escopo do email que será enviado

    function formatar(itens) {
        return itens.map((item, index) => `${index + 1}. ${item}`);
    } // Faz com que cada item tenha um indice 
    const lista_carros = formatar(novos_carros);
    const lista_maisvendidos = formatar(mais_vendidos);

    const formato_email =
    `
    Caro Cliente,
    
    Esperamos que esteja bem!

    Viemos a partir desse email para notifica-lo que temos novidades em nossa loja, segue abaixo nossos novos produtos:

    Veículos novos:
    ${lista_carros}

    Veículos mais vendidos:
    ${lista_maisvendidos}

    Porém é necessário algumas condições para ser possível a aquisição deles, sendo elas:

    ${condicao};
    
    `;
    return formato_email; // Retorna o escopo
};

function dias(dia){
    dias = ["Domingo","Segunda-Feira","Terça-Feira","Quarta-Feira","Quinta-Feira","Sexta-Feira","Sabádo"];
    return dias[dia];
} // Faz com que os dias fiquem em formato oficial e não apenas em números

function enviar_email() {
    if (getWeekday() === 5) {
        const condicao = ["É necessário passar por um teste de conhecimento do carro que você escolher, para ver se você realmente conhece o que está comprando!! Boa sorte"];
        const novos_carros = ["Tesla", "BMW", "Ford GT", "Ferrari 2024"];
        const mais_vendidos = ["Fusca 1970", "Chevrolet Onix", "Fiat Mobi"];

        // Acima declarei a condição para obter o carro, além de uma lista com os novos carros e os mais vendidos

        const listaEmails = [
            {
                email: 'cliente1_carstore@email.com',
                receber_email: true,
            },
            {
                email: 'cliente2_carstore@email.com',
                receber_email: false, // Condição se quer receber ou não emails de promoções
            },
        ]; // Lista de emails teste para eu poder enviar email

        const corpo_email = escopo_email(novos_carros, mais_vendidos, condicao); // Passa os parâmetros para criação do escopo

        listaEmails.forEach((cliente) => { // Percorre todos os clientes da listaEmails
            if (cliente.receber_email) {
                const destinatario = cliente.email; // Define o destinatário a partir da lista.email
                const assunto = 'Novidades da CarStore';
    
                const resultadoEnvio = enviarEmail(destinatario, assunto, corpo_email); // Faz o envio utilizando envia-email.js e retorna 
                
            if (resultadoEnvio.status === "Success") { // Se retornar Success ele envia um feedback para o cliente que o email que ele queria foi enviado com sucesso
                setTimeout(() => {
                const feedbackEmail = `Prezado cliente,

                Gostaríamos de informar que o e-mail com as últimas novidades da CarStore foi enviado com sucesso para o endereço ${destinatario}.

                Agradecemos por escolher a CarStore e estamos à disposição para quaisquer dúvidas ou informações adicionais. Caso não tenha recebido o email confirme a caixa de spam, caso não apareça responda essa mensagem por favor!

                Atenciosamente,
                Equipe CarStore`;

                enviarEmail(destinatario, "Confirmação de Envio de E-mail", feedbackEmail);
                }, 4000);
            }

            setTimeout(() => {
                if (resultadoEnvio.status === "Success") { // Oferece uma confirmação de envio para nós que fizemos o envio sabermos que foi tudo correto.
                    console.log(`E-mail enviado com sucesso para ${destinatario}`);
                } else {
                    console.error(`Erro ao enviar e-mail para ${destinatario}: ${resultadoEnvio.message}`); // Retorna erro caso der algum problema
                }
            }, 6000); 

            }else {
                console.log(`Cliente ${cliente.email} não deseja receber comunicações de marketing.`); // Se tiver false na lista que eu criei ele aparece essa mensagem
            }
        });
        
    } else { // Caso não seja segunda ele não fará nenhuma ação
        const dia = getWeekday();
        console.log(`Hoje não haverá email pois é ${dias(dia)}`);
    }
    
}

enviar_email();
