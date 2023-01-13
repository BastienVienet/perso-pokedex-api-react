import {describe, it, jest} from "@jest/globals";
import {render} from "@testing-library/react";
import {PokemonCards} from "../components/PokemonCards";

jest.mock("react-query", () => ({
        useQuery: jest.fn()
    })
)

describe("Pokedex test", () => {
    describe("filter test", () => {
        it('should show everything is filter is empty', () => {
            render(<PokemonCards filter={""}/>)
        });
    })
});
