import { TCharacters } from "../../types/characters";
import { TData } from "../../types/Response";

const CharactersInitialState: TData<TCharacters> = {
    offset: 0,
    limit: 0, 
    total: 0,
    count: 0,
    results: []
}

export default CharactersInitialState;