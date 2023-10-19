import { useDispatch, useSelector } from "react-redux";
import { onCloseDateModal, onOpenDateModal } from "../store/ui/uiSlice";

export const useUiStore = () => {
    const dispatch = useDispatch();
    const { isDateModalOpen } = useSelector((state) => state.ui);

    const openDateModal = () => {
        dispatch(onOpenDateModal());
    };

    const closeDateModal = () => {
        // TODO: implement closing date modal logic
        dispatch(onCloseDateModal());
    };

    return {
        //*Proppiedades
        isDateModalOpen,
        //*Metodos
        openDateModal,
        closeDateModal,
    };
};
