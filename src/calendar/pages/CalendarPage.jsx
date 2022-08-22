// Se van a mostrar aca ls diferentes componentes del calendario
import { Calendar } from 'react-big-calendar'
import { useState } from 'react'
import 'react-big-calendar/lib/css/react-big-calendar.css'

import { Navbar, CalendarEvent, CalendarModal } from "../"

import {addHours} from 'date-fns'
import { getMessages, localizer } from '../../helpers'
import { useUiStore } from '../../hooks'



const events = [{
  title: 'Entrega Proyecto',
  notes: ' Entrega Proyecto si o si',
  start: new Date(),
  end: addHours(new Date(), 2),
  bgColor: '#fafafa',
  user: {
    _id: '123',
    name: 'Martin'
  }
}]

export const CalendarPage = () => {

  const { openDateModal } = useUiStore()



  const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'month')

  const eventStyleGetter = (event, start, end, isSelected) => {
    /* console.log(event, start, end, isSelected); */

    const style = {
      backgroundColor: '#347CF7',
      borderRadius: '0px',
      opacity: 0.8,
      color: 'white',
    }

    return {
      style: style
    }
  }

  const onDoubleClickEvent = (event) => {
    console.log({doubleClick: event})
    openDateModal()
  }

  const onSelectEvent = (event) => {
    console.log({click: event})
  }

  const onViewChanged = (event) => {
    console.log({viewChanged: event})
    localStorage.setItem('lastView', event) // guardamos la ultima vista que se ha seleccionado
    setLastView(event)
  }

  return (
    <>
    <Navbar/>

    <Calendar
      culture='es'
      localizer={localizer}
      events={events}
      defaultView={lastView} 
      startAccessor="start" 
      endAccessor="end"
      style={{ height: 'calc(100vh - 80px)' }}
      messages={getMessages()}
      eventPropGetter={eventStyleGetter}
      components={{ 
        event: CalendarEvent 
      }}
      onDoubleClickEvent={onDoubleClickEvent}
      onSelectEvent={onSelectEvent}
      onView={onViewChanged}
    />

    <CalendarModal /> // modal para agregar eventos
    </>
  )
}
