/*
  Form send to gmail and google sheet using google app script.
*/

function doPost(e) {
  try {
    // Create object with keys = labels
    var rowData = {
      "Timestamp": new Date(),
      "Name": e.parameter.name || "",
      "Email": e.parameter.email || "",
      "Phone": e.parameter.phone || "",
      "Date": e.parameter.date || "",
      "Time": e.parameter.time || "",
      "Guests": e.parameter.guests || "",
      "Message": e.parameter.message || ""
    };

    // Send to google sheet
    SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Sheet1").appendRow(Object.values(rowData));

    // Send to gmail
    var subject = "New Booking Request";
    var body = "📩 New Booking Submission:\n\n";
    for (var key in rowData) {
      body += key + ": " + rowData[key] + "\n";
    }
    MailApp.sendEmail("YOUR_EMAIL@gmail.com", subject, body);

    // JSON response
    return ContentService
      .createTextOutput(JSON.stringify({status: "success", data: rowData}))
      .setMimeType(ContentService.MimeType.JSON);
  }
  
  // error response
  catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({status: "error", message: error.message}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
