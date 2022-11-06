<?php
if (isset($_POST['email'])) {
 
  # Email address and subject line
  ## info@sans35.com
  $email_to = "jayskywalker1985@gmail.com";
  $email_subject = "A and J comment!";
  
  # Handles error message
  function died ($error) {
      echo $error;
      die(); // So what if it breaks the site?
  }

  # Validates that fields have values
  if ( !isset($_POST['email']) ) {
    died('<div class="contact-form_div">Email address required.</div>'); // Generic error message
  }

  # Post values connected to HTML form names
  $email_from = $_POST['email'];
  
  # Defining specific error message variables
  $error_message = "";
  # Validates email address for xxx@yyy.zzz
  $email_exp = '/^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/';
  
  # Evalues email against RegEx
  if (!preg_match($email_exp, $email_from)) {
    $error_message = '<div class="contact-form_div2 red">Valid email address required.</div>'; // Concatenate to general error message
  }
 
  # Reject if no content
  if (strlen($error_message) > 0) {
    died($error_message);
  }

  # Content for the automated email
  $email_message = "Form details submited from J and A email page:\n\n";

  function clean_string ($string) {
    $bad = array("content-type", "bcc:", "to:", "cc:", "href");
    return str_replace($bad, "", $string);
  }

  $email_message .= "Email: " . clean_string($email_from) . "\n";
 
// Email headers
$headers = 'From: ' . "doNotReply@jamesgoatcher.com\r\n" .
           'Reply-To: ' . "doNotReply@jamesgoatcher.com\r\n" .
           'X-Mailer: PHP/' . phpversion();
            @mail($email_to, $email_subject, $email_message, $headers);  
?>
 
<!-- Submission success! -->
 
Received - thank you for joining us on our adventure!
 
<?php
 
}
?>