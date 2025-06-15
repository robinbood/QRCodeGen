import { useState } from "react";
import qrcode from "qrcode-generator";
import "./App.css";

function App() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [twit, setTwit] = useState<string>("");
  const [hub, setHub] = useState<string>("");
  const [value, setValue] = useState<string>("");
  const [code, setCode] = useState<string>("");

  const onCancel = () => {
    setName("");
    setEmail("");
    setTwit("");
    setHub("");
  };

  const maker = (event: React.FormEvent) => {
    event.preventDefault();
    setValue(`${name}, ${email},${twit},${hub}`);
    const qr = qrcode(0, "L");
    qr.addData(value);
    qr.make();
    const data = qr.createDataURL();
    setCode(data);
  };

  return (
    <>
      <form onSubmit={maker}>
        <label htmlFor="name">
          <pre>Name</pre>
        </label>
        <input
          type="text"
          name="name"
          onChange={({ target }) => setName(target.value)}
          required
        />{" "}
        <br />
        <label htmlFor="email">
          <pre>Email:</pre>
        </label>
        <input
          type="email"
          name="email"
          onChange={({ target }) => setEmail(target.value)}
          required
        />{" "}
        <br />
        <label htmlFor="twit">
          <pre>Twitter</pre>
        </label>
        <input
          type="text"
          name="twit"
          onChange={({ target }) => setTwit(target.value)}
          defaultValue="@"
          prefix="@"
          onKeyDown={(e) => {
            if (e.key === "Backspace" && twit.length === 1 && twit === "@") {
              e.preventDefault();
            }
          }}
          value={twit || "@"}
        />{" "}
        <br />
        <label htmlFor="hub">
          <pre>Github:</pre>
        </label>
        <input
          type="text"
          name="hub"
          onChange={({ target }) => setHub(target.value)}
          defaultValue="https://github.com/"
          prefix="https://github.com/"
          onKeyDown={(e) => {
            if (
              e.key === "Backspace" &&
              hub === "https://github.com/" &&
              hub.length === 19
            ) {
              e.preventDefault();
            }
          }}
          value={hub || "https://github.com/"}
        />{" "}
        <br />
        <div>
          <button type="submit">Create</button>
          <button type="button" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>

      <div><img src={code} alt="" /></div>
    </>
  );
}

export default App;
