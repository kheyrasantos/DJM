<?php
header('Access-Control-Allow-Origin: *');

// Write Info to CSV
if ( !isset($_POST['company_name']) || !isset($_POST['current_site']) || !isset($_POST['first_name']) || !isset($_POST['last_name']) || !isset($_POST['phone']) || !isset($_POST['email_hidden']) ) {

    echo "failure";

} else {
    $info = $_POST['email_hidden'] . "|" . $_POST['company_name'] . "|" . $_POST['current_site'] . "|"
        . $_POST['first_name'] . "|" . $_POST['last_name'] . "|"
        . $_POST['phone'] . "\n";

    $fp = fopen("data/rogue_shops_customers.csv","a");
    fwrite($fp, $info);
    fclose($fp);

    echo "success";
}
