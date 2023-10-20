import { useDispatch, useSelector } from "react-redux";
import { onAddNewEvent, onSetActiveEvent } from "../store";

export const useCalendarStore = () => {
    const { events, activeEvent } = useSelector((state) => state.calendar);
    const dispatch = useDispatch();

    const setActiveEvent = (calendarEvent) => {
        dispatch(onSetActiveEvent(calendarEvent));
    };

    const startSavingEvent = async (calendarEvent) => {
        //Todo: llegar al backend

        //todo: ok
        if (calendarEvent._id) {
            //Actializando
        } else {
            //Creando
            dispatch(
                onAddNewEvent({ ...calendarEvent, _id: new Date().getTime() })
            );
        }
    };

    return {
        //*Properties
        events,
        activeEvent,

        //*Metods
        setActiveEvent,
        startSavingEvent,
    };
};
