import { authSlice } from "../../src/store";
import { configureStore } from "@reduxjs/toolkit";
import { initialState, notAuthenticatedState } from "../fixtures/authState";
import { Provider } from "react-redux";
import { renderHook, act, waitFor } from "@testing-library/react";
import { testUserCredentials } from "../fixtures/testUser";
import { useAuthStore } from "../../src/hooks/useAuthStore";
import { calendarApi } from "../../src/api";

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

    test("startLogin debe de realizar el login correctamente", async () => {
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

    test("startLogin debe de fallar la autenticacion", async () => {
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
            await result.current.startLogin({
                email: "algo@test.com",
                password: "qweasd123",
            });
        });

        const { errorMessage, user, status } = result.current;

        expect(localStorage.getItem("token")).toBe(null);
        expect({ errorMessage, status, user }).toEqual({
            errorMessage: "credenciales incorrectas",
            user: {},
            status: "not-authenticated",
        });

        await waitFor(() =>
            expect(result.current.errorMessage).toBe(undefined)
        );
    });

    test("startRegister debe de crear un nuevo usuario", async () => {
        localStorage.clear();
        const mockStore = getMockStore({
            ...notAuthenticatedState,
        });
        const { result } = renderHook(() => useAuthStore(), {
            wrapper: ({ children }) => (
                <Provider store={mockStore}>{children}</Provider>
            ),
        });

        const spy = jest.spyOn(calendarApi, "post").mockReturnValue({
            data: {
                ok: true,
                token: "eyJhbGciOiJIUzI1NiIsInR5cCI6Ikp",
                name: "user77",
                uid: "user-77",
            },
        });

        await act(async () => {
            await result.current.startRegister({
                name: "eva",
                email: "eva@test.com",
                password: "123456",
            });
        });

        const { errorMessage, user, status } = result.current;

        expect({ errorMessage, user, status }).toEqual({
            errorMessage: undefined,
            user: { name: "user77", uid: "user-77" },
            status: "authenticated",
        });

        spy.mockRestore();
    });

    test("startRegister debe fallar la creacion de un usuario", async () => {
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
            await result.current.startRegister(testUserCredentials);
        });

        const { errorMessage, user, status } = result.current;

        expect({ errorMessage, user, status }).toEqual({
            errorMessage: "Este correo ya esta registrado",
            user: {},
            status: "not-authenticated",
        });
    });

    test("checkAuthToken debe de fallar si no hay token", async () => {
        localStorage.clear();
        const mockStore = getMockStore({
            ...initialState,
        });
        const { result } = renderHook(() => useAuthStore(), {
            wrapper: ({ children }) => (
                <Provider store={mockStore}>{children}</Provider>
            ),
        });

        await act(async () => {
            await result.current.checkAuthToken(testUserCredentials);
        });

        const { errorMessage, user, status } = result.current;

        expect({ errorMessage, user, status }).toEqual({
            errorMessage: undefined,
            user: {},
            status: "not-authenticated",
        });
    });

    test("checkAuthToken debe de autenticar el usuario si hay un token", async () => {
        const { data } = await calendarApi.post("/auth", testUserCredentials);
        localStorage.setItem("token", data.token);

        const mockStore = getMockStore({
            ...initialState,
        });
        const { result } = renderHook(() => useAuthStore(), {
            wrapper: ({ children }) => (
                <Provider store={mockStore}>{children}</Provider>
            ),
        });

        await act(async () => {
            await result.current.checkAuthToken();
        });

        const { errorMessage, user, status } = result.current;

        expect({ errorMessage, user, status }).toEqual({
            errorMessage: undefined,
            user: { name: "Test user", uid: "6546745686311b14176ac51b" },
            status: "authenticated",
        });
    });
});
