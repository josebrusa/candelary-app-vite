import { authSlice } from "../../src/store";
import { configureStore } from "@reduxjs/toolkit";
import { initialState, notAuthenticatedState } from "../fixtures/authState";
import { Provider } from "react-redux";
import { renderHook, act } from "@testing-library/react";
import { testUserCredentials } from "../fixtures/testUser";
import { useAuthStore } from "../../src/hooks/useAuthStore";

const getMockStore = (initialState) => {
    return configureStore({
        reducer: {
            auth: authSlice.reducer,
        },
        preloadedState: {
            auth: { ...initialState },
        },
    });
};

describe("Pruebas en useAuthStore", () => {
    test("debe de regresar los valores por defecto", () => {
        const mockStore = getMockStore({ ...initialState });
        const { result } = renderHook(() => useAuthStore(), {
            wrapper: ({ children }) => (
                <Provider store={mockStore}>{children}</Provider>
            ),
        });

        expect(result.current).toEqual({
            status: "checking",
            user: {},
            errorMessage: undefined,
            startLogin: expect.any(Function),
            startRegister: expect.any(Function),
            checkAuthToken: expect.any(Function),
            startLogout: expect.any(Function),
        });
    });

    test("strtLogin debe de realizar el login correctamente", async () => {
        localStorage.clear();

        const mockStore = getMockStore({
            ...notAuthenticatedState,
        });
        const { result } = renderHook(() => useAuthStore(), {
            wrapper: ({ children }) => (
                <Provider store={mockStore}>{children}</Provider>
            ),
        });

        await act(async () => {
            await result.current.startLogin(testUserCredentials);
        });

        const { errorMessage, user, status } = result.current;
        expect({ errorMessage, user, status }).toEqual({
            status: "authenticated",
            user: { name: "Test user", uid: "6546745686311b14176ac51b" },
            errorMessage: undefined,
        });
        expect(localStorage.getItem("token")).toEqual(expect.any(String));
        expect(localStorage.getItem("token-init-date")).toEqual(
            expect.any(String)
        );
    });
});
