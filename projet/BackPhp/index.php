<?php
require '../projet/vendor/autoload.php';

use Tuupola\Middleware\JwtAuthentication;
use Firebase\JWT\JWT;
use Slim\Factory\AppFactory;

const JWT_SECRET = "makey1234567";

$options = [
    "attribute" => "token",
    "header" => "Authorization",
    "regexp" => "/Bearer\s+(.*)$/i",
    "secure" => false,
    "algorithm" => ["HS256"],
    "secret" => JWT_SECRET,
    "path" => ["/api"],
    "ignore" => ["/api/login"],
    "error" => function ($response, $arguments) {
        $data["status"] = "error";
        $data["message"] = $arguments["message"];
        return $response
            ->withHeader("Content-Type", "application/json")
            ->getBody()->write(json_encode($data, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT));
    }
];

function addHeaders($response) {


    $response = $response->withHeader("Content-Type", "application/json")
        ->withHeader("Access-Control-Allow-Origin", "https://tp05-zeamari-hamza.herokuapp.com")
        ->withHeader("Access-Control-Allow-Headers", "Content-Type, Authorization")
        ->withHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS")
        ->withHeader("Access-Control-Expose-Headers", "Authorization");

    return $response;
}

function createJWT($response, $login) {
    $issuedAt = time();
    $expirationTime = $issuedAt + 600;
    $payload = array(
        'login' => $login,
        'iat' => $issuedAt,
        'exp' => $expirationTime
    );

    $token_jwt = JWT::encode($payload, JWT_SECRET, "HS256");
    $response = $response->withHeader("Authorization", "Bearer {$token_jwt}");
    return $response;
}


function getAuth($request, $response, $args) {
    $login = $args['login'];
    if ($login) {
        $data["login"] = $login;
        $response = addHeaders($response);
        $response = createJWT($response, $login);
        $response->getBody()->write(json_encode($data, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT));
    }
    else {
        $response = $response->withStatus(401);
    }

    return $response;
}

function postLogin($request, $response, $args) {
    $body = $request->getParsedBody();
    $login = $body['login'] ?? "";
    $password = $body['password'] ?? "";

    $err = $login == "" || $password == "";
    if (!$err){
        $data["login"] = $login;
        $response = addHeaders($response);
        $response = createJWT($response, $login);
        $response->getBody()->write(json_encode($data, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT));
    }
    else {
        $response = $response->withStatus(401);
    }

    return $response;
}

$app = AppFactory::create();
$app->post('/api/login', 'postLogin');
$app->get('/api/auth/{login}', 'getAuth');

$app->add(new JwtAuthentication($options));

$app->run();


?>