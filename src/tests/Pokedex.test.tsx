import {describe, expect, it, jest} from "@jest/globals";
import {render} from "@testing-library/react";
import {PokemonCards} from "../components/PokemonCards";

describe('works', () => {
    it('returns expected value', () => {
        expect(10).toBe(10);
    });
});

jest.mock("react-query", () => ({
    useQuery: () => {}
    })
)

describe("Pokedex test", () => {
    describe("filter test", () => {
        it('should show everything is filter is empty', () => {
            render(<PokemonCards filter={""}/>)
        });
    })
});
