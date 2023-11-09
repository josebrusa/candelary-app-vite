export const events = [
    {
        id: "1",
        start: new Date("2023-11-07 13:00:00"),
        end: new Date("2023-11-08 00:00:00"),
        title: "Cumple del jefe",
        notes: "comprar pastel",
    },
    {
        id: "2",
        start: new Date("2023-07-19 13:00:00"),
        end: new Date("2023-07-20 00:00:00"),
        title: "Cumple del jose",
        notes: "comprar pastel",
    },
];

export const initialState = {
    isLoadingEvents: true,
    events: [],
    activeEvent: null,
};
export const calendarWithEventState = {
    isLoadingEvents: false,
    events: [...events],
    activeEvent: null,
};

export const calendarWithActiveEventState = {
    isLoadingEvents: false,
    events: [...events],
    activeEvent: { ...events[0] },
};
