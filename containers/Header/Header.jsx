import React, { useState, useContext } from "react";
import { useRouter } from "next/router";
import { Nav, SearchBar } from "../../components";
import { HomeContext } from "../../pages";
import { Search } from "react-feather";
import acronym, { placeholder } from "../../logic";
import { Router } from "next/router";

const Header = ({ generate }) => {
  const [keyword, setKeyword] = useState(null);
  const [error, setError] = useState("");
  const { width } = useContext(HomeContext);
  const router = useRouter();

  let size = 24;
  if (width < 1600) size = 20;
  else if (width < 1300) size = 18;
  else if (width < 1100) size = 16;

  const search = () => {
    let result;

    if (!keyword) return { result: "Invalid", keyword };
    else result = acronym(keyword);
    if (result) {
      const { complicated, extended, offensive } = result;
      if (complicated.length || extended.length || offensive.length) {
        return { result, keyword };
      }
    }
    return { result: "Not Found", keyword };
  };

  const getRes = ({ result, keyword }) => {
    switch (result) {
      case "Not Found":
        setError("error__input v");
        break;
      case "Invalid":
        setError("error__input");
        break;
      default:
        router.push({ pathname: "/search", query: { q: keyword } });
        break;
    }
  };

  return (
    <header className="main__header">
      <Nav width={width} />
      <h1 className="header__heading">
        Welcome to <span>init</span>, where you can the meaning of any{" "}
        <span>acronym</span>
      </h1>
      <SearchBar
        getRes={getRes}
        search={search}
        size={size}
        setKeyword={setKeyword}
        error={error}
        setError={setError}
        placeholder={placeholder}
      />
      {error != "" && (
        <p className="error__message">
          {error === "error__input"
            ? "Please Write Something"
            : "Acronym not found"}
        </p>
      )}
    </header>
  );
};

export default Header;
