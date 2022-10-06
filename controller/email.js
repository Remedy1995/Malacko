const SibApiV3Sdk = require('sib-api-v3-sdk');
require('dotenv').config();
let defaultClient = SibApiV3Sdk.ApiClient.instance;
const apiKey = defaultClient.authentications['api-key']
apiKey.apiKey = process.env.EMAIL_API

exports.sendMail=(emailInfo)=>{
  //emailInfo data is been derived from shipping information 
  const replace=emailInfo.email.replace("@gmail.com","");//trim our email address for the username
    let apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
    let sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail(); 
    sendSmtpEmail.subject = "My {{params.subject}}";
    sendSmtpEmail.htmlContent = "<html><body><h3>Hello {{params.username}},</h3><p>Thank you for your recent order your consignment code is {{params.consignment}}.</p><p>You can track your goods using this consignment code.</p><p>{{params.items}}</p><strong style='color:red;'>Best Wishes</strong></body></html>";
    sendSmtpEmail.sender = {"name":"Malacko Shipping Company","email":"malackshipping@gmail.com"};
    sendSmtpEmail.to = [{"email":emailInfo.email,"name":replace}];
    // sendSmtpEmail.cc = [{"email":"example2@example2.com","name":"Janice Doe"}];
    // sendSmtpEmail.bcc = [{"email":"John Doe","name":"@example.com"}];
    // sendSmtpEmail.replyTo = {"email":"replyto@domain.com","name":"John Doe"};
    sendSmtpEmail.headers = {"Some-Custom-Name":"unique-id-1234"};
    sendSmtpEmail.params = {"consignment":emailInfo.consignment_number,"username":replace,"subject":"Malacko Tracking Order","items":emailInfo.itemsDescription,"email":emailInfo.email};
    apiInstance.sendTransacEmail(sendSmtpEmail).then(function(data) {
      console.log('API called successfully. Returned data: ' + JSON.stringify(data));
    }, function(error) {
      console.error(error);
    });
 
}