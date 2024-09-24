const SibApiV3Sdk = require('sib-api-v3-sdk');
require('dotenv').config();
const fs = require('fs');
let defaultClient = SibApiV3Sdk.ApiClient.instance;
const apiKey = defaultClient.authentications['api-key']
apiKey.apiKey = process.env.EMAIL_API;
// exports.sendMail = (emailInfo) => {
//   const replace = emailInfo.email.replace("@gmail.com", "");//trim our email address for the username
//   let apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
//   let sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
//   sendSmtpEmail.subject = "My {{params.subject}}";
//   sendSmtpEmail.htmlContent = "<html><body><h3>Hello {{params.username}},</h3><p>Thank you for your recent order your consignment code is {{params.consignment}}.</p><p>You can track your goods using this consignment code.</p><p>Click on the web link to track your goods <a href='https://www.cargomoverpro.com/view-map'>CargoMoverPro</a><p>{{params.items}}</p><strong style='color:red;'>Best Wishes</strong></body></html>";
//   sendSmtpEmail.sender = { "name": "CARGO MOVER PRO  COMPANY, LTD", "email": "cargomoverpro@gmail.com" };
//   sendSmtpEmail.to = [{ "email": emailInfo.email, "name": replace }];
//   sendSmtpEmail.headers = { "Some-Custom-Name": "unique-id-1234" };
//   sendSmtpEmail.params = 
//   { "consignment": emailInfo.consignment_number, "username": replace, "subject": "CARGO MOVER PRO Tracking Order", "items": emailInfo.itemsDescription, "email": emailInfo.email };
//   apiInstance.sendTransacEmail(sendSmtpEmail).then(function (data) {
//     console.log('API called successfully. Returned data: ' + JSON.stringify(data));
//   }, function (error) {
//     console.error(error);
//   });

// }



//send email using template 



exports.sendMail = (emailInfo) => {
  console.log('params username',emailInfo)
  let apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
  let sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
  const email = emailInfo.email.replace("@gmail.com", "");
  const htmlContent = fs.readFileSync('helpers/EmailTemplate.html', 'utf8');
  const dynamicHtmlContent = htmlContent
    .replace('{{params.subject}}', 'CARGO MOVER PRO Tracking Order')
    .replace('{{params.username}}',emailInfo.RecieverName)
    .replace('{{params.consignment}}', emailInfo.consignment_number)
    .replace('{{params.items}}', emailInfo.itemsDescription);

  // Rest of your code remains the same...
  sendSmtpEmail.subject = "My {{params.subject}}";
  sendSmtpEmail.htmlContent = dynamicHtmlContent;
    const replace = emailInfo.email.replace("@gmail.com", "");
  //   sendSmtpEmail.htmlContent = "<html><body><h3>Hello {{params.username}},</h3><p>Thank you for your recent order your consignment code is {{params.consignment}}.</p><p>You can track your goods using this consignment code.</p><p>Click on the web link to track your goods <a href='https://www.cargomoverpro.com/view-map'>CargoMoverPro</a><p>{{params.items}}</p><strong style='color:red;'>Best Wishes</strong></body></html>";
    sendSmtpEmail.sender = { "name": "CARGO MOVER PRO  COMPANY, LTD", "email": "cargomoverpro@gmail.com" };
   sendSmtpEmail.to = [{ "email": emailInfo.email, "name": replace }];
    sendSmtpEmail.headers = { "Some-Custom-Name": "unique-id-1234" };
     sendSmtpEmail.params = { "subject":"CARGO MOVER PRO Tracking Order"};
    apiInstance.sendTransacEmail(sendSmtpEmail).then(function (data) {
      console.log('API called successfully. Returned data: ' + JSON.stringify(data));
    }, function (error) {
      console.error(error);
    });

   console.log('html ',htmlContent);

}



















// exports.contactUsEmail = async (req, res) => {

//   console.log('my request body',req.body);
//   const fullname = req.body.fullname.replace(/[^a-zA-Z0-9 ]/g, '');
//   const message = req.body.message.replace(/[^a-zA-Z0-9 ]/g, '');
//   const email = req.body.email;
//   const subject = req.body.subject.replace(/[^a-zA-Z0-9 ]/g, '');

//   var data = [];
//   data[0] = fullname;
//   data[1] = message;
//   data[2] = email;
//   data[3] = subject; 
//   let apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
//   let sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
//   sendSmtpEmail.subject = "My {{params.subject}}";
//   sendSmtpEmail.htmlContent = "<html><body><h3>Hello {{params.fullname}},</h3><p>We have recieived your message, a customer representative will be in touch with you shortly.<p>{{params.message}}</p></body></html>";
//   sendSmtpEmail.sender = { "name": "CARGO MOVER PRO  COMPANY, LTD", "email": "cargomoverpro@gmail.com" };
//   sendSmtpEmail.to = [{ "email": data[2], "name": data[0] }];
//   sendSmtpEmail.cc = [{ "email": "cargomoverpro@gmail.com", "name": "CARGO MOVER PRO" }];
//   sendSmtpEmail.headers = { "Some-Custom-Name": "unique-id-1234" };
//   sendSmtpEmail.params = { "subject": data[3], "fullname": data[0], "message": data[1] };

//   apiInstance.sendTransacEmail(sendSmtpEmail).then(function (data) {
//     console.log(data)
//     res.json("We have  recieved your message and we will get back to you shortly");
//   }, function (error) {
//     res.json(error.status);
//   });



// }






exports.contactUsEmail = async (req,res) => {

  const fullname = req.body.fullname.replace(/[^a-zA-Z0-9 ]/g, '');
  const message = req.body.message.replace(/[^a-zA-Z0-9 ]/g, '');
  const email = req.body.email;
  const subject = req.body.subject.replace(/[^a-zA-Z0-9 ]/g, '');
  const phone = req.body.phone.replace(/[^a-zA-Z0-9 ]/g, '');
  
  let apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
  let sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
  const htmlContent = fs.readFileSync('helpers/EmailTemplateContact.html', 'utf8');
  const dynamicHtmlContent = htmlContent
    .replace('{{params.subject}}',subject)
    .replace('{{params.fullname}}',fullname);
  // Rest of your code remains the same...
  sendSmtpEmail.subject = "My {{params.subject}}";
  sendSmtpEmail.htmlContent = dynamicHtmlContent;
  //   sendSmtpEmail.htmlContent = "<html><body><h3>Hello {{params.username}},</h3><p>Thank you for your recent order your consignment code is {{params.consignment}}.</p><p>You can track your goods using this consignment code.</p><p>Click on the web link to track your goods <a href='https://www.cargomoverpro.com/view-map'>CargoMoverPro</a><p>{{params.items}}</p><strong style='color:red;'>Best Wishes</strong></body></html>";
    sendSmtpEmail.sender = { "name": "CARGO MOVER PRO  COMPANY, LTD", "email": "cargomoverpro@gmail.com" };
   sendSmtpEmail.to = [{ "email": email, "name": fullname}];
    sendSmtpEmail.headers = { "Some-Custom-Name": "unique-id-1234" };
     sendSmtpEmail.params = { "subject":subject};
     apiInstance.sendTransacEmail(sendSmtpEmail).then(function (data) {
          sendEmailToAdmin(fullname,message,email,subject,phone)
          console.log(data)
          res.json("We have  recieved your message and we will get back to you shortly");
        }, function (error) {
          res.json(error.status);
        })
   console.log('html ',htmlContent);

}










function sendEmailToAdmin(fullname,message,email,subject,phone){
  let apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
  let sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
  const htmlContent = fs.readFileSync('helpers/EmailTemplateContactAdmin.html', 'utf8');
  
  const dynamicHtmlContent = htmlContent
    .replace('{{params.subject}}', subject)
    .replace('{{params.fullname}}',fullname)
    .replace('{{params.email}}',email)
    .replace('{{params.phone}}',phone)
    .replace('{{params.message}}',message);

  // Rest of your code remains the same...
  sendSmtpEmail.subject = "My {{params.subject}}";
  sendSmtpEmail.htmlContent = dynamicHtmlContent;
  //   sendSmtpEmail.htmlContent = "<html><body><h3>Hello {{params.username}},</h3><p>Thank you for your recent order your consignment code is {{params.consignment}}.</p><p>You can track your goods using this consignment code.</p><p>Click on the web link to track your goods <a href='https://www.cargomoverpro.com/view-map'>CargoMoverPro</a><p>{{params.items}}</p><strong style='color:red;'>Best Wishes</strong></body></html>";
    sendSmtpEmail.sender = { "name": "CARGO MOVER PRO  COMPANY, LTD", "email": "cargomoverpro@gmail.com" };
   sendSmtpEmail.to = [{ "email": "cargomoverpro@gmail.com", "name": fullname}];
    sendSmtpEmail.headers = { "Some-Custom-Name": "unique-id-1234" };
     sendSmtpEmail.params = { "subject":subject};
     apiInstance.sendTransacEmail(sendSmtpEmail).then(function (data) {
          console.log(data)
        }, function (error) {
          console.log('This is the error',error)
        })
      

   console.log('html ',htmlContent);

}

















//get data from the update tracking order
// exports.updateTrackingCodeEmail = (docs) => {
//   let apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
//   let sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
//   sendSmtpEmail.subject = "Update On Tracking Status";
//   sendSmtpEmail.htmlContent = "<html><body><h3>Hello {{params.email}},</h3><p>Your tracking order has been updated to {{params.subject}}.<p>Your goods will be delivered in the next few days.Thanks</p></body></html>";
//   sendSmtpEmail.sender = { "name": "CARGO MOVER PRO  COMPANY, LTD", "email": "cargomoverpro@gmail.com" };
//   sendSmtpEmail.to = [{ "email": docs.email, "name": docs.email }];
//   sendSmtpEmail.cc = [{ "email": "cargomoverpro@gmail.com", "name": "CARGO MOVER PRO  COMPANY, LTD" }];
//   sendSmtpEmail.headers = { "Some-Custom-Name": "unique-id-1234" };
//   sendSmtpEmail.params = { "subject": docs.trackingstatus, "consignment": docs.consignment_number, "email": docs.email };
//   apiInstance.sendTransacEmail(sendSmtpEmail).then(function (data) {
//     console.log(data)
//   }, function (error) {
//     (console.log(error));
//   });



//}



exports.updateTrackingCodeEmail = (emailInfo) => {
  console.log('params username',emailInfo)
  let apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
  let sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
  const email = emailInfo.email.replace("@gmail.com", "");
  const htmlContent = fs.readFileSync('helpers/EmailTemplateUpdate.html', 'utf8');
  const dynamicHtmlContent = htmlContent
    .replace('{{params.subject}}', 'Update On Tracking Status')
    .replace('{{params.username}}',emailInfo.RecieverName)
    .replace('{{params.consignment}}', emailInfo.consignment_number)
    .replace('{{params.update}}', emailInfo.trackingstatus);

  // Rest of your code remains the same...
  sendSmtpEmail.subject = "My {{params.subject}}";
  sendSmtpEmail.htmlContent = dynamicHtmlContent;
    const replace = emailInfo.email.replace("@gmail.com", "");
  //   sendSmtpEmail.htmlContent = "<html><body><h3>Hello {{params.username}},</h3><p>Thank you for your recent order your consignment code is {{params.consignment}}.</p><p>You can track your goods using this consignment code.</p><p>Click on the web link to track your goods <a href='https://www.cargomoverpro.com/view-map'>CargoMoverPro</a><p>{{params.items}}</p><strong style='color:red;'>Best Wishes</strong></body></html>";
    sendSmtpEmail.sender = { "name": "CARGO MOVER PRO  COMPANY, LTD", "email": "cargomoverpro@gmail.com" };
   sendSmtpEmail.to = [{ "email": emailInfo.email, "name": replace }];
    sendSmtpEmail.headers = { "Some-Custom-Name": "unique-id-1234" };
     sendSmtpEmail.params = { "subject":"CARGO MOVER PRO Tracking Order"};
    apiInstance.sendTransacEmail(sendSmtpEmail).then(function (data) {
      console.log('API called successfully. Returned data: ' + JSON.stringify(data));
    }, function (error) {
      console.error(error);
    });

   console.log('html ',htmlContent);

}

