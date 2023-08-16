const profileData = require("./profileData");

module.exports = function(wage, investment, expense){
    function Admin(userTotal, userPercentage){

        if (userPercentage.aboutSalary[0] <= 50 && userPercentage.aboutSalary[1] <= 50) {
            return profileData(0);

        } else if (userPercentage.aboutSalary[0] <= 10 && userPercentage.aboutSalary[1] <= 90) {
            return profileData(1);

        } else if (userPercentage.aboutSalary[0] <= 30 && userPercentage.aboutSalary[1] <= 70) {
            return profileData(2);

        } else if (userPercentage.aboutSalary[0] <= 90 && userPercentage.aboutSalary[1] <= 10) {
            return profileData(3);

        } else if (userPercentage.aboutSalary[0] <= 70 && userPercentage.aboutSalary[1] <= 30) {
            return profileData(4);

        } else if (userPercentage.aboutSalary[0] <= 50 && userPercentage.aboutSalary[1] <= 100) {
            return profileData(5);

        } else if (userPercentage.aboutSalary[0] <= 100 && userPercentage.aboutSalary[1] <= 50) {
            return profileData(6);

        } else if (userPercentage.aboutSalary[0] >= 100 && userPercentage.aboutSalary[1] >= 100) {
            return profileData(7);

        } else {
            //Perfil não identificado
            return {
                Positives: "Não há pontos positivos para este perfil financeiro no nosso banco de dados.",
                Demerits: "Não há pontos negativos para este perfil financeiro no nosso banco de dados.",
                Improvements: "Não há dicas sobre o que melhorar para este perfil financeiro no nosso banco de dados.",
                tips: [
                    "Defina Metas Claras para seus Investimentos. Estabeleça objetivos específicos e mensuráveis para orientar suas decisões financeiras.",
                    "Diversifique seus Investimentos. Aloque seu dinheiro em diferentes tipos de ativos para reduzir riscos e buscar melhores retornos.",
                    "Avalie os Custos e Taxas dos Investimentos. Fique atento às taxas e custos associados aos seus investimentos para maximizar seus ganhos.",
                    "Crie uma Reserva de Emergência. Antes de aumentar seus investimentos, tenha uma reserva financeira para lidar com imprevistos.",
                    "Acompanhe o Desempenho de seus Investimentos. Monitore regularmente como seus investimentos estão performando e faça ajustes se necessário.",
                    "Busque Educação Financeira. Invista em seu conhecimento financeiro para tomar decisões mais informadas e conscientes.",
                    "Evite Tomar Decisões por Impulso. Mantenha-se fiel ao seu plano de investimento de longo prazo e evite decisões precipitadas.",
                    "Aproveite Benefícios Fiscais. Pesquise sobre investimentos com benefícios fiscais para otimizar seus ganhos.",
                    "Busque Assessoria Financeira Profissional. Caso não se sinta confiante, consulte um profissional financeiro para orientações personalizadas.",
                    "Aumente Gradualmente seus Investimentos. Comece com valores menores e vá aumentando conforme ganha mais confiança no mercado financeiro."
                ]
            };

        };
    };

    const percentage = (value, total) => parseFloat((value * (100 / total)).toFixed(0));

    return new Promise((resolve, reject) => {
        if(typeof wage === typeof 1 && typeof investment === typeof [] && typeof expense === typeof []){

            const filterInvestment = investment.filter(item => typeof item[0] === typeof "" && typeof item[1] === typeof 1);
            const filterExpense = expense.filter(item => typeof item[0] === typeof "" && typeof item[1] === typeof 1);

            if(filterInvestment.length == investment.length && filterExpense.length == expense.length){

                const userTotal = {
                    investment: investment.reduce((acc, cur) => acc + cur[1], 0),
                    expense: expense.reduce((acc, cur) => acc + cur[1], 0),
                    get spend(){ return this.investment + this.expense}
                };
                const userPercentage = {
                    aboutSpending: [percentage(userTotal.investment, userTotal.spend), percentage(userTotal.expense, userTotal.spend)],
                    aboutSalary: [percentage(userTotal.investment, wage), percentage(userTotal.expense, wage)]
                };

                resolve(Admin(userTotal, userPercentage));
            }else{
                reject(`Erro no formato do array! Verifique se o array segue essa ordem: [[string, number], [string, number] ...]`);
            };

        }else{
            reject(`Erro na entrada de dados! Verifique se os parâmetros estão corretos e nessa ordem, (${typeof 1}, ${typeof []}, ${typeof []})`);
        };
    });
};