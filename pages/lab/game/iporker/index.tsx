import React from "react";
import {
  GoogleReCaptchaProvider,
  useGoogleReCaptcha,
} from "react-google-recaptcha-v3";

const SecureContact: React.FC = () => {
  return (
    <GoogleReCaptchaProvider reCaptchaKey={process.env.RECAPCHA_SITEKEY}>
      <Contact />
    </GoogleReCaptchaProvider>
  );
};

const Contact: React.FC = () => {
  const { executeRecaptcha } = useGoogleReCaptcha();

  const handleSubmit = (e) => {
    e.preventDefault();

    const userData = [
      {
        name: "a",
        mail: "bhbstar.me+a@gmail.com",
      },
      {
        name: "b",
        mail: "bhbstar.me+b@gmail.com",
      },
      {
        name: "c",
        mail: "bhbstar.me+c@gmail.com",
      },
    ];

    executeRecaptcha("iporker").then(async (token) => {
      const response = await fetch("/api/iporker", {
        method: "POST",
        body: JSON.stringify({
          userData,
          token,
        }),
      }).then((response) => response.text());

      alert(response);
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <button>送信</button>
      </form>
    </div>
  );
};

export default SecureContact;
