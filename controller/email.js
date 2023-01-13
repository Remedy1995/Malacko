const SibApiV3Sdk = require('sib-api-v3-sdk');
require('dotenv').config();
let defaultClient = SibApiV3Sdk.ApiClient.instance;
const apiKey = defaultClient.authentications['api-key']
apiKey.apiKey = process.env.EMAIL_API;
exports.sendMail=(emailInfo)=>{
  //emailInfo data is been derived from shipping information 
  const replace=emailInfo.email.replace("@gmail.com","");//trim our email address for the username
    let apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
    let sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail(); 
    sendSmtpEmail.subject = "My {{params.subject}}";
    sendSmtpEmail.htmlContent = "<html><body><h3>Hello {{params.username}},</h3><p>Thank you for your recent order your consignment code is {{params.consignment}}.</p><p>You can track your goods using this consignment code.</p><p>Click on the web link to track your goods <a href='https://malarkglobal.com/view-map'>MalarkGlobal</a><p>{{params.items}}</p><strong style='color:red;'>Best Wishes</strong></body></html>";
    sendSmtpEmail.sender = {"name":"MalarkGlobal Shipping Company","email":"info@malarktranslogistics.com"};
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

exports.contactUsEmail=async(req,res)=>{
  const fullname=req.body.fullname.replace(/[^a-zA-Z0-9 ]/g, '');
  const message=req.body.message.replace(/[^a-zA-Z0-9 ]/g, '');
  const email=req.body.email;
  const subject=req.body.subject.replace(/[^a-zA-Z0-9 ]/g, '');

  var data=[];
  data[0]=fullname;
  data[1]=message;
  data[2]=email;
  data[3]=subject;
  let apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
    let sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail(); 
    sendSmtpEmail.subject = "My {{params.subject}}";
    sendSmtpEmail.htmlContent = "<html><body><h3>Hello {{params.fullname}},</h3><p>We have recieived your message, a customer representative will be in touch with you shortly.<p>{{params.message}}</p></body></html>";
    sendSmtpEmail.sender = {"name":"MalarkGlobal Shipping Company","email":"info@malarktranslogistics.com"};
    sendSmtpEmail.to = [{"email":data[2],"name":data[0]}];
    sendSmtpEmail.cc = [{"email":"info@malarktranslogistics.com","name":"Malark Global"}];
    // sendSmtpEmail.bcc = [{"email":"John Doe","name":"@example.com"}];
    // sendSmtpEmail.replyTo = {"email":"replyto@domain.com","name":"John Doe"};
    sendSmtpEmail.headers = {"Some-Custom-Name":"unique-id-1234"};
    sendSmtpEmail.params = {"subject":data[3],"fullname":data[0],"message":data[1]};
    apiInstance.sendTransacEmail(sendSmtpEmail).then(function(data) {
      console.log(data)
    res.json("We have  recieved your message and we will get back to you shortly");
    }, function(error) {
      res.json(error.status);
    });



}

//get data from the update tracking order
exports.updateTrackingCodeEmail=(docs)=>{
  let apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
    let sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail(); 
    sendSmtpEmail.subject = "Update On Tracking Status";
    sendSmtpEmail.htmlContent = "<html><body><h3>Hello {{params.email}},</h3><p>Your tracking order has been updated to {{params.subject}}.<p>Your goods will be delivered in the next few days.Thanks</p></body></html>";
    sendSmtpEmail.sender = {"name":"MalarkGlobal Shipping Company","email":"info@malarktranslogistics.com"};
    sendSmtpEmail.to = [{"email":docs.email,"name":docs.email}];
    sendSmtpEmail.cc = [{"email":"info@malarktranslogistics.com","name":"Malark Global"}];
    // sendSmtpEmail.bcc = [{"email":"John Doe","name":"@example.com"}];
    // sendSmtpEmail.replyTo = {"email":"replyto@domain.com","name":"John Doe"};
    sendSmtpEmail.headers = {"Some-Custom-Name":"unique-id-1234"};
    sendSmtpEmail.params = {"subject":docs.trackingstatus,"consignment":docs.consignment_number,"email":docs.email};
    apiInstance.sendTransacEmail(sendSmtpEmail).then(function(data) {
      console.log(data)
    }, function(error) {
      (console.log(error));
    });



}


