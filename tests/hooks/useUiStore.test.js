const { renderHook } = require("@testing-library/react");
const { useUiStore } = require("../../src/hooks/useUiStore");
const { Provider } = require("react-redux");
const { store, uiSlice } = require("../../src/store");
const { configureStore } = require("@reduxjs/toolkit");
const { act } = require("@testing-library/react");

const getMockStore = (initialState) => {
    return configureStore({
        reducer: {
            ui: uiSlice.reducer,
        },
        preloadedState: {
            ui: { ...initialState },
        },
    });
};

describe("Pruebas en el hook useUiStore", () => {
    test("debe de regresar los valores por defecto", () => {
        const mockStore = getMockStore({ isDateModalOpen: false });
        const { result } = renderHook(() => useUiStore(), {
            wrapper: ({ children }) => (
                <Provider store={mockStore}>{children}</Provider>
            ),
        });
        expect(result.current).toEqual({
            isDateModalOpen: false,
            openDateModal: expect.any(Function),
            closeDateModal: expect.any(Function),
        });
    });
    test("openDateModal debe de colocar true en el isDateModalOpen", () => {
        const mockStore = getMockStore({ isDateModalOpen: false });
        const { result } = renderHook(() => useUiStore(), {
            wrapper: ({ children }) => (
                <Provider store={mockStore}>{children}</Provider>
            ),
        });
        const { openDateModal } = result.current;
        act(() => {
            openDateModal();
        });
        expect(result.current.isDateModalOpen).toBeTruthy();
    });
    test("closeDateModal debe de colocar false en isDateModalOpen", () => {
        const mockStore = getMockStore({ isDateModalOpen: true });
        const { result } = renderHook(() => useUiStore(), {
            wrapper: ({ children }) => (
                <Provider store={mockStore}>{children}</Provider>
            ),
        });

        act(() => {
            result.current.closeDateModal();
        });

        expect(result.current.isDateModalOpen).toBeFalsy();
    });
});
