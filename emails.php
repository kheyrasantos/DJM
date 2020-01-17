<?php
header('Access-Control-Allow-Origin: *');

// Write Info to CSV
if ( !isset($_POST['email']) ) {

    echo "failure";

} else {
    $info = $_POST['email'] . "\n";

    $fp = fopen("data/rogue_shops_emails.csv","a");
    fwrite($fp, $info);
    fclose($fp);

    echo "success";
}
