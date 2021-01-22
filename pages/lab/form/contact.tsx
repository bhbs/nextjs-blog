import React from "react";
import {
  GoogleReCaptchaProvider,
  useGoogleReCaptcha,
} from "react-google-recaptcha-v3";

const SecureContact: React.FC = () => {
  return (
    <GoogleReCaptchaProvider reCaptchaKey="6Lea7DUaAAAAAIXSUT4AWLG6tdZOpnd5YqWeM-Pk">
      <Contact />
    </GoogleReCaptchaProvider>
  );
};

const Contact: React.FC = () => {
  const { executeRecaptcha } = useGoogleReCaptcha();

  const handleSubmit = (e) => {
    e.preventDefault();
    executeRecaptcha("contact").then(async (token) => {
      const response = await fetch("/api/contact", {
        method: "POST",
        body: JSON.stringify({
          title: e.target.title.value,
          message: e.target.message.value,
          token,
        }),
      }).then((response) => response.text());
      alert(response);
    });
  };

  return (
    <div
      style={{
        width: "320px",
        margin: "32px auto",
        padding: "16px",
        textAlign: "center",
        boxShadow: "1px 1px 4px #ccc",
      }}
    >
      <form onSubmit={handleSubmit}>
        <p>
          <input name="title" type="text" placeholder="title" />
        </p>
        <p>
          <input name="message" type="text" placeholder="message" />
        </p>
        <p>
          <button>submit</button>
        </p>
      </form>
    </div>
  );
};

export default SecureContact;
