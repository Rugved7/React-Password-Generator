import React, { useCallback, useEffect, useRef, useState } from "react";

const Header = () => {
  const [length, setLength] = useState(8);
  const [numbers, setNumbers] = useState(false);
  const [char, setChar] = useState(false);
  const [password, setPassword] = useState("");

  // UseRef Hook to copy the password
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numbers) str += "0123456789";
    if (char) str += "~`!@#$%^&*()_=+-/*<>,.?/{}[];:";

    for (let i = 0; i < length; i++) {
      const character = Math.floor(Math.random() * str.length);
      pass += str.charAt(character);
    }
    setPassword(pass);
  }, [length, numbers, char, setPassword]);

  // Copy Logic

  const copyPassword = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numbers, char, passwordGenerator]);

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-purple-500 to-indigo-500">
      <div className="w-full max-w-md mx-auto bg-white shadow-md rounded-lg px-8 py-6 text-orange-700">
        <h1 className="text-2xl text-center font-bold mb-4">
          Password Generator
        </h1>
        <div className="flex mb-4">
          <input
            type="text"
            value={password}
            className="w-full py-2 px-3 border rounded-lg outline-none"
            placeholder="Password"
            readOnly
            ref={passwordRef}
          />
          <button
            onClick={copyPassword}
            className="ml-2 px-4 py-2 bg-blue-700 text-white rounded-lg cursor-pointer"
          >
            Copy
          </button>
        </div>
        <div className="flex text-sm mb-4">
          <div className="flex items-center mr-4">
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className="cursor-pointer"
              onChange={(e) => {
                setLength(parseInt(e.target.value));
              }}
            />
            <label className="ml-2">Length: {length}</label>
          </div>
          <div className="flex items-center mr-4">
            <input
              type="checkbox"
              checked={numbers}
              id="numberInput"
              onChange={() => {
                setNumbers(!numbers);
              }}
            />
            <label htmlFor="numberInput" className="ml-2">
              Numbers
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              checked={char}
              id="charInput"
              onChange={() => {
                setChar(!char);
              }}
            />
            <label htmlFor="charInput" className="ml-2">
              Character
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
