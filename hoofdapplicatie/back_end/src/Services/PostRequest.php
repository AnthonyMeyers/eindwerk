<?php

namespace App\Services;

class PostRequest
{
    static function get_data(String $url, Array $post_parameters)
    {
        //url-ify the data for the POST
        $parameters_string = "";

        foreach($post_parameters as $key=>$value) {
            $parameters .= $key.'='.$value.'&';
        }

        //open connection
        $ch = curl_init();

        //set the url, number of POST vars, POST data
        curl_setopt($ch,CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch,CURLOPT_POST, count($post_parameters));
        curl_setopt($ch,CURLOPT_POSTFIELDS, $parameters);

        //execute post
        $result = curl_exec($ch);

        curl_close($ch);

        return $result;
    }
}
?>