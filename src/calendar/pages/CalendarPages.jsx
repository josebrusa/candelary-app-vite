import { Calendar } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";

import { useState } from "react";
import {
    CalendarEvent,
    CalendarModal,
    NavBar,
    FabAddNew,
    FabDelete,
} from "../";
import { localizer, getMessagesES } from "../../helpers";
import { useUiStore, useCalendarStore, useAuthStore } from "../../hooks";
import { useEffect } from "react";

export const CalendarPages = () => {
    const { user } = useAuthStore();
    const { events, setActiveEvent, startLoadingEvents } = useCalendarStore();
    const { openDateModal } = useUiStore();
    const [lastView, setLastView] = useState(
        localStorage.getItem("lastView") || "week"
    );
    const eventStyleGetter = (event, start, end, isSelected) => {
        const isMyEvent =
            user.uid === event.user._id || user.uid === event.user.uid;
        const style = {
            backgroundColor: isMyEvent ? "#347CF7" : "#313131",
            borderRadius: "0px",
            opacity: 0.8,
            color: "white",
        };

        return {
            style,
        };
    };

    const onDoubleClick = (event) => {
        openDateModal(event);
    };

    const onSelect = (event) => {
        setActiveEvent(event);
    };

    const onViewChanged = (event) => {
        localStorage.setItem("lastView", event);
        setLastView(event);
    };

    useEffect(() => {
        startLoadingEvents();
    }, []);

    return (
        <>
            <NavBar />
            <Calendar
                culture="es"
                localizer={localizer}
                events={events}
                defaultView={lastView}
                startAccessor="start"
                endAccessor="end"
                style={{ height: "calc(100vh - 80px)" }}
                messages={getMessagesES()}
                eventPropGetter={eventStyleGetter}
                components={{
                    event: CalendarEvent,
                }}
                onDoubleClickEvent={onDoubleClick}
                onSelectEvent={onSelect}
                onView={onViewChanged}
            />
            <CalendarModal />
            <FabAddNew />
            <FabDelete />
        </>
    );
};
