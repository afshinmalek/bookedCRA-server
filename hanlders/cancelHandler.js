const { MyData } = require("../database");
const emailTemplate2 = require("../emailTemplate2");

const cancelHandler = (req, res) => {
  var documentId = req.query.documentId;
  deleteDocument(documentId);

  const html = emailTemplate2();
  res.send(html);
};

function deleteDocument(documentId) { 
  MyData.findByIdAndDelete({ _id: documentId }, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
    }
  });
}

module.exports = cancelHandler;
