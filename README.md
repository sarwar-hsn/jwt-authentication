# jwt_authentication with rs256

Understanding JWT Verification with Public and Private Keys
-----------------------------------------------------------

1. Private Key
--------------
- Used to create a unique signature based on the Header (H) and Payload (P) of the JWT.
- The signature (S) is sensitive to any changes in the Header or Payload.
- The process essentially "seals" the Header and Payload with this unique signature.

2. Public Key
-------------
- Used to verify the signature.
- It mathematically transforms the signature (S) back into a form that should match the original Header (H) and Payload (P).
  
3. Verification Process
------------------------
a) You receive a JWT consisting of Header (H), Payload (P), and Signature (S).
b) You separate these three components.
c) You take the received Header (H) and Payload (P) and keep them for comparison.
d) You apply the public key to the signature (S) to reveal what the Header and Payload should be if the token was legitimately created.
e) You compare:
  - If the revealed Header and Payload match the received Header and Payload, the token is valid and not tampered with.
  - If they do not match, the token is either invalid or has been tampered with.

By doing this, you ensure:
- Authenticity: The JWT was created by someone who possesses the private key.
- Integrity: The JWT has not been modified since it was signed.


Generate public private key in .pem format
------------------------------------------
1. openssl genpkey -algorithm RSA -out private_key.pem
2. openssl rsa -pubout -in private_key.pem -out public_key.pem
