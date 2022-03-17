import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import routesConfig from "../config/routesConfig";
import { RETRIEVE_CHARACTERS } from "../store/actions/characters.action";

const Layout = (props) => {
  const dispatch = useDispatch();
  const urls = routesConfig();

  useEffect(() => {
    dispatch(RETRIEVE_CHARACTERS())
  }, [dispatch])

  return (
    <div>
      <nav id="menu" className="navbar navbar-default navbar-fixed-top">
        <div className="container">
          <div className="navbar-header">
            <button
              type="button"
              className="navbar-toggle collapsed"
              data-toggle="collapse"
              data-target="#bs-example-navbar-collapse-1"
            >
              {" "}
              <span className="sr-only">Toggle navigation</span>{" "}
              <span className="icon-bar"></span>{" "}
              <span className="icon-bar"></span>{" "}
              <span className="icon-bar"></span>{" "}
            </button>
            <a className="navbar-brand page-scroll" href="#page-top">
              Marvel
            </a>{" "}
          </div>

          <div
            className="collapse navbar-collapse"
            id="bs-example-navbar-collapse-1"
          >
            <ul className="nav navbar-nav navbar-right">
              {urls?.length && urls?.map((url, index) => (
                  <li key={index}>
                    <Link to={url.path} className="page-scroll">
                      {url.title}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </nav>

      <Outlet />
    </div>
  );
};

export default Layout;