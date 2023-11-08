import {
    calendarSlice,
    onAddNewEvent,
    onDeleteEvent,
    onLoadEvents,
    onLogoutCalendar,
    onSetActiveEvent,
    onUpdateEvent,
} from "../../../src/store/calendar/calendarSlice";
import {
    calendarWithActiveEventState,
    calendarWithEventState,
    events,
    initialState,
} from "../../fixtures/calendarState";

describe("Pruebas en calendarSlice", () => {
    test("debe de regresar el estado por defecto", () => {
        const state = calendarSlice.getInitialState();
        expect(state).toEqual(initialState);
    });

    test("debe de activar el evento onActiveEvent", () => {
        const state = calendarSlice.reducer(
            calendarWithEventState,
            onSetActiveEvent(events[0])
        );
        expect(state.activeEvent).toEqual(events[0]);
    });
    test("onAddNewEvent debe de agregar el evento", () => {
        const newEvent = {
            id: "3",
            start: new Date("2023-07-19 13:00:00"),
            end: new Date("2023-07-20 00:00:00"),
            title: "Cumple del M",
            notes: "traer pastel",
        };
        const state = calendarSlice.reducer(
            calendarWithEventState,
            onAddNewEvent(newEvent)
        );
        expect(state.events).toEqual([...events, newEvent]);
    });
    test("onUpdateEvent debe de actualizar el evento", () => {
        const updateEvent = {
            id: "1",
            start: new Date("2024-07-19 13:00:00"),
            end: new Date("2024-07-20 00:00:00"),
            title: "acutalizar evento",
            notes: "traer guitarra",
        };
        const state = calendarSlice.reducer(
            calendarWithEventState,
            onUpdateEvent(updateEvent)
        );
        // expect(state.events).toEqual([...events, updateEvent]);
        expect(state.events).toContain(updateEvent);
    });

    test("onDeleteEvent debe de eliminar el evento", () => {
        const state = calendarSlice.reducer(
            calendarWithActiveEventState,
            onDeleteEvent()
        );
        expect(state.activeEvent).toBe(null);
        expect(state.events).not.toContain(events[0]);
    });

    test("onLoadEnvents debe de establecer los eventos", () => {
        const state = calendarSlice.reducer(initialState, onLoadEvents(events));

        expect(state.isLoadingEvents).toBeFalsy();
        expect(state.events).toEqual(events);

        const newState = calendarSlice.reducer(state, onLoadEvents(events));
        expect(newState.length).toBe(state.length);
    });

    test("onLogoutCalendar debe de limpear el estado", () => {
        const state = calendarSlice.reducer(
            calendarWithActiveEventState,
            onLogoutCalendar()
        );
        expect(state).toEqual(initialState);
    });
});
