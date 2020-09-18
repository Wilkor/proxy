

answers =  (req, res) => {

const {TicketId} = req.body;

console.log(TicketId);


let retorno = {

  "DocInfo": {},
  "TicketId": "2AFAE3DA_73D4_4C95_82E0_A43D1A932501",
  "ResultCode": 1,
  "ResultMessage": "Validated",
  "Questions": []

}
  
    const jsonText = JSON.stringify(retorno);
    const responseObject = JSON.parse(jsonText);
    res.json(responseObject);



}
module.exports = {
  answers
}