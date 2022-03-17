import { useSelector } from "react-redux";
import { GET_CHARACTERS_STATE } from "../store/selectors/characters.selector";
import { TCharacters } from "../types/characters";

export const Characters = () => {
  const { loading, results } = useSelector(GET_CHARACTERS_STATE);

  return (
    <div id="about">
      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-md-6">
            {" "}
            <img src="img/about.jpg" className="img-responsive" alt="" />{" "}
          </div>
          <div className="col-xs-12 col-md-6">
            <div className="about-text">
              <h2>Characters</h2>
              <h3>List of characters</h3>
              <div className="list-style">
                <div className="col-lg-6 col-sm-6 col-xs-12">
                  <ul>
                    {(!loading &&
                      results?.map( (c: TCharacters, i: number) => <li key={`${c.name}-${i}`}> {`${c.name}`}</li> )) || "loading"}
                  </ul>
                </div>

                <div className="col-lg-6 col-sm-6 col-xs-12"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
