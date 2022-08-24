import { useDispatch, useSelector } from "react-redux"
import { onSetActiveEvent } from "../store";


export const useCalendarStore = () => {

    const dispatch = useDispatch();
    const {events, activeEvent} = useSelector(state => state.calendar);

    const setActiveEvent = (calendarEvent) => {
        dispatch(onSetActiveEvent(calendarEvent))
    }


  return {
    //!Propiedades de la clase CalendarStore
    events,
    activeEvent,

    //* Metodos de la clase CalendarStore
    setActiveEvent
    }

  
}
