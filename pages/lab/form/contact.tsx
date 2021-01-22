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
    executeRecaptcha("contact_page").then(async (token) => {
      await fetch("/api/contact", {
        method: "POST",
        body: JSON.stringify({ text: e.target.tex.value, token }),
      });
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input name="tex" type="text" />
        <button>submit</button>
      </form>
    </>
  );
};

export default SecureContact;
