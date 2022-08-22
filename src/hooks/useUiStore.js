import {useDispatch, useSelector } from "react-redux"
import {onOpenDateModal, onCloseDateModal} from '../store'


export const useUiStore = () => {

    const dispatch = useDispatch()

    useSelector(state => state.ui);

    const {
        isDateModalOpen
    } = useSelector(state => state.ui);

    //Abrir modal con doble click
    const openDateModal = () => {
        dispatch(onOpenDateModal())
    }

    //Cerrar modal
    const closeDateModal = () => {
        dispatch(onCloseDateModal())
    }


    return {
        //*properties
        isDateModalOpen,

        //*methods
        openDateModal,
        closeDateModal
    }




}