import PropTypes from "prop-types";

export const CalendarEvent = ({ event }) => {
    const { title, user } = event;
    return (
        <>
            <strong>{title}</strong>
            <p>{user.name}</p>
        </>
    );
};

CalendarEvent.propTypes = {
    event: PropTypes.object,
};
