import { database } from "lib/lab/game/iporker/firebase";
import React, { useEffect, useState } from "react";
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
  const [userData, setUserData] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    executeRecaptcha("iporker").then(async (token) => {
      const response = await fetch("/api/iporker", {
        method: "POST",
        body: JSON.stringify({
          userData: Object.values(userData),
          token,
        }),
      }).then((response) => response.text());

      alert(response);
    });
  };

  const addMember = (e) => {
    e.preventDefault();
    database.ref("iporker").push({
      name: e.target.name.value,
      mail: e.target.mail.value,
    });
  };

  const removeMember = (key) => {
    database.ref("iporker/" + key).remove();
  };

  useEffect(() => {
    database.ref("iporker").on("value", (snapshot) => {
      setUserData(snapshot.val());
    });
  }, []);

  return (
    <div>
      <form onSubmit={addMember}>
        <p>
          <input type="text" name="name" placeholder="name" />
        </p>
        <p>
          <input type="email" name="mail" placeholder="mail" />
        </p>
        <p>
          <button>メンバー追加</button>
        </p>
      </form>
      <ol>
        {userData &&
          Object.entries(userData).map(([key, user]) => (
            <li key={key}>
              {user.name}: {user.mail}{" "}
              <span onClick={() => removeMember(key)}>x</span>
            </li>
          ))}
      </ol>
      <form onSubmit={handleSubmit}>
        <button>ゲーム開始</button>
      </form>
    </div>
  );
};

export default SecureContact;
