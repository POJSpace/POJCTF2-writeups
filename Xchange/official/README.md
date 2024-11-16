# Analysis
We recieve the following input:
```
DHKX
g = 895970199
p = 101537
A = 54861
B = 50808
HKDF
prep: itoa
alg = SHA256
len = 32
salt = 0xDEADBEEF
FERNET CONVERSATION START
b'gAAAAABnN8yIXcNldI8tjiRwzF97pMZhXmUw1QuZtCr-XTOlpsHbip67shWEEx-ADl5r4LfBv3H4AyVEUwGm_M1eOmY9t5dpJ4m2eWG3XKrOt9lwYrRUPls='
b'gAAAAABnN8yInXgG-OSD_BRd_U2oXONLMZBFzjOcdL795XmHXDXPDOepaxtDv2fh7TugDb0ek4pELFIjMdhEcEKTKCQZCKukQcQcPZ0eUgDMaBPvv1BpzMcfAP4Fq6GNg8ItwT2JK0BQ'
b'gAAAAABnN8yIrt8b_HQyf0pXrjUo_MZfWP3k5avXmoQVSEkxS6H6tz3POj8VQ004gCRxOqpL5rZ0psm3UuUap9KlnGg6ik8wlQ4ZcVsQTyaFy5EFfiUZSdTk30RdXt6HYtBz1INWOo-5O2LM5Q5PGXf2hfaq-yaW5yVqYYMrAbh1VczSPnACiVMgE7XPAnKaOeKR3U9Jv-db'
b'gAAAAABnN8yIvQwpqi5P-mpCBDehpzmBNrPBWRa9rk-VJZbHjaa5RMS0zWGrpHf8DGfgSBzOSXKv6m-Uj_mgyr6LbVQBBO039Q=='
```
It looks like some kind of protocol communication, sliced into 3 phases:
1. DHKX = Diffie helman key exchange, used to estabilish a shared secret between two sides, without any listeners picking out on it.
2. HKDF = HMAC key derivation function, used to generate a key from the created secret
3. FERNET, a type of symmetric encryption used for protecting following communication

## DHKX
DHKX is mathematically safe, since we need both `a` and `b` to derive it, and those are secret. We cant mathematically find it, since we only know `A = g ** a % p`.
However, we can brute force it, since `g`, `p`, `a` and `b` are all small. 
We can use the following script
```python
a = None
b = None
for i in range(1, 99999999):
  comp = g ** i % p
  if a is not None and comp == A:
    a = i
  if b is not None and comp == B:
    b = i
```
Now, we just need to figure out `s`, which can be derived by `s = A ** b % p = B ** a % p`.

## HKDF
Now we need to derive the key, so i used [](https://fotoventus.cz/tool/hkdf.html) for it. Set `Key format` to `ascii`, put my secret as pasword. Entered `DEADBEEF` as salt, and kept the rest to defaults.

## FERNET
I used [](https://8gwifi.org/fernet.jsp) to decrypt the messages with the base64 key from last step.
