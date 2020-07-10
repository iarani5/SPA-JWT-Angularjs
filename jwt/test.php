<?php
require '../vendor/autoload.php';

use Emarref\Jwt\Claim;
$payload = new Emarref\Jwt\Token();
$payload->addClaim(new Claim\Expiration(new \DateTime('1 week')));
$payload->addClaim(new Claim\Issuer('Confesiones'));
$jwt = new Emarref\Jwt\Jwt();
$algorithm = new Emarref\Jwt\Algorithm\Hs256('oiAGkvbl324wpoefvklsfSD/AF_SDcvs');
$encryption = Emarref\Jwt\Encryption\Factory::create($algorithm);
$serializedToken = $jwt->serialize($payload, $encryption);
$token = $jwt->deserialize($serializedToken . "a");
$algorithm = new Emarref\Jwt\Algorithm\Hs256('oiAGkvbl324wpoefvklsfSD/AF_SDcvs');
$encryption = Emarref\Jwt\Encryption\Factory::create($algorithm);
$context = new Emarref\Jwt\Verification\Context($encryption);
$context->setIssuer('Confesiones');
try {
    $jwt->verify($token, $context);
    echo "El token es válido";
} 
catch (Emarref\Jwt\Exception\VerificationException $e) {
    echo $e->getMessage();
    echo "El token es inválido";
}