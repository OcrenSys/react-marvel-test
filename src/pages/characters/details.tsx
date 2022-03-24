import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { json } from "stream/consumers";
import { RETRIEVE_CHARACTER_DETAILS } from "../../store/actions/characters.action";
import { GET_CHARACTERS_DETAILS_SELECTOR } from "../../store/selectors/characters.selector";
import TCharacter from "../../types/character";

export const CharacterDetails = (): React.ReactElement => {
  let { id } = useParams();

  const dispatch = useDispatch();
  const [character, setCharacter] = useState<TCharacter>()
  const { loading, results, total } = useSelector(
    GET_CHARACTERS_DETAILS_SELECTOR
  );

  useEffect(() => {
    const [first, ...rest] = results;
    setCharacter(first) 
  }, [results]);

  useEffect(() => {
    dispatch(RETRIEVE_CHARACTER_DETAILS(id));
  }, [dispatch, id]);

  return (
    <div id="about">
      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-md-6">
            {" "}
            <img  src={`${character?.thumbnail?.path}.${character?.thumbnail?.extension}`} className="img-responsive" alt="" />{" "}
          </div>
          <div className="col-xs-12 col-md-6">
            <div className="about-text">
              <h2>{character?.name}</h2>
              <h3>{character?.description}</h3>
              <div className="list-style">
                <div className="col-lg-6 col-sm-6 col-xs-12">
                  <ul>
                    <li>asdfasdsdfsdfsd</li>
                    <li>asdfasdsdfsdfsd</li>
                    <li>asdfasdsdfsdfsd</li>
                  </ul>
                </div>
                <div className="col-lg-6 col-sm-6 col-xs-12">
                  <ul>{results?.map((c: TCharacter) => (
                    <li>{c?.name}</li>
                  ))}</ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
