
questions =  (req, res) => {

  const {Parameters} = req.body;

  console.log(Parameters);
  
  let retorno = {

    "DocInfo": {},
    "TicketId": "2AFAE3DA_73D4_4C95_82E0_A43D1A932501",
    "ResultCode": 0,
    "ResultMessage": "Generated",
    "Questions": [
        {
        "Question": "Qual destes bancos você utiliza para a restituição do Imposto de Renda?",
        "Answers": [
            "BANCO RENDIMENTO",
            "BANCO ITAU",
            "BANCO PROSPER",
            "BANCO INDUSTRIAL E COMERCIAL (BICBANCO)"
        ]
        },
        {
        "Question": "Qual desses e-mails é mais familiar para você?",
        "Answers": [
            "FULANO.CILCNO@GMAIL.COM",
            "FULANO84@GMAIL.COM",
            "FULANO93@GMAIL.COM",
            "FULANO_CILCNO@GMAIL.COM"
        ]
        },
        {
        "Question": "Qual dessas empresas você trabalha ou já trabalhou?",
        "Answers": [
            "BIG DATA CORP",
            "PANIFICADORA E MERCEARIA PADRE CICERO",
            "TRANSPORTADORA DAVID & JUNIOR",
            "ERU REPRESENTACOES ME"
        ]
        }
    ]
  }
  
     const jsonText = JSON.stringify(retorno);
     const responseObject = JSON.parse(jsonText);
     res.json(responseObject);

 }
 module.exports = {
  questions
 }