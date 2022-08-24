import {createSlice} from '@reduxjs/toolkit'
import { addHours } from 'date-fns';

const tempEvent = {
    _id: new Date().getTime(),
    title: 'Entrega Proyecto',
    notes: ' Entrega demo de la app CRAFT',
    start: new Date(),
    end: addHours(new Date(), 2),
    bgColor: '#fafafa',
    user: {
      _id: '123',
      name: 'Martin'
    }
}

export const calendarSlice = createSlice({
    name: 'calendar',
    initialState: {
        events: [
            tempEvent
        ],
        activeEvent:null,
    },
    reducers: {
        onSetActiveEvent : (state,{payload}) => {
            state.activeEvent = payload //payload es el id del evento
        }
    }
});

export const {onSetActiveEvent} = calendarSlice.actions;

