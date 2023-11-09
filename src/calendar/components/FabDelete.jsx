import { useCalendarStore } from "../../hooks";

export const FabDelete = () => {
    const { startDeletingEvent, hasEventSelected } = useCalendarStore();
    const handelClickDelete = () => {
        startDeletingEvent();
    };

    return (
        <button
            aria-label="btn-delete"
            className="btn btn-danger fab-danger"
            onClick={handelClickDelete}
            style={{ display: hasEventSelected ? "" : "none" }}
        >
            <i className="fas fa-trash-alt"></i>
        </button>
    );
};
