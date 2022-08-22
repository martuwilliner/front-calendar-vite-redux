import { addHours, differenceInSeconds } from "date-fns";
import { useMemo, useState } from "react";

import Swal from "sweetalert2";
import 'sweetalert2/dist/sweetalert2.min.css';

import Modal from "react-modal"
import DatePicker, {registerLocale} from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import es from "date-fns/locale/es";
import { useUiStore } from "../../hooks";


registerLocale('es', es)


const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
};

Modal.setAppElement('#root');

export const CalendarModal = () => {
    

    const {isDateModalOpen, closeDateModal} = useUiStore();

    const [formSubmitted, setFormSubmitted] = useState(false);

    const [formValues, setFormValues] = useState({
        title: '',
        notes: '',
        start: new Date(),
        end: addHours(new Date(), 2),
    });

    const titleClass = useMemo(() => {
        if(!formSubmitted) return '';

        return (formValues.title.length > 0) ? 'is-valid' : 'is-invalid';
    
    }, [formValues.title, formSubmitted]);

    const onInputChanged = ({target}) => {
        setFormValues({
            ...formValues, 
            [target.name]: target.value, // name es el nombre del campo del formulario
        });
    };

    const onDateChanged = (event, changing) => {
        setFormValues({
            ...formValues, 
            [changing]: event, // start o end es changing
        });
    };


    const closeModal = () => {
        console.log('cerrar modal')
       
        closeDateModal(); 
        
    }

    const onSubmit = (event) => {
        event.preventDefault();
        console.log('submit')
        setFormSubmitted(true);

        const difference = differenceInSeconds(formValues.end, formValues.start);
        console.log(difference)

        if (isNaN(difference) || difference <= 0) {
            Swal.fire('Fechas incorrectas', 'La hora de finalización debe ser mayor a la hora de inicio', 'error');
            return;
        }

        if(!formValues.title || formValues.title.length <= 0) {
            
            return;
        }

        console.log(formValues)

        // TODO
        // cerrar modal
        // limpiar formulario

    }



    return(
        <Modal
        isOpen={isDateModalOpen}
        onRequestClose={closeModal}
        style={customStyles}
        className="modal"
        overlayClassName="modal-fondo"
        closeTimeoutMS={200}
        >
            <h1> Nuevo evento </h1>
<hr />
<form className="container" onSubmit={onSubmit}>

    <div className="form-group mb-2">
        <label>Fecha y hora inicio</label>
        <DatePicker
            selected={formValues.start}
            onChange={(event) => onDateChanged(event, 'start')}
            className="form-control"
            dateFormat="Pp" // Pp es para formatear la fecha y hora
            showTimeSelect
            locale="es"
        />
    </div>

    <div className="form-group mb-2">
        <label>Fecha y hora fin</label>
        <DatePicker
            minDate={formValues.start}
            selected={formValues.end}
            onChange={(event) => onDateChanged(event, 'end')}
            className="form-control"
            dateFormat="Pp" // Pp es para formatear la fecha y hora
            showTimeSelect
            locale="es"
        />
    </div>

    <hr />
    <div className="form-group mb-2">
        <label>Titulo y notas</label>
        <input 
            type="text" 
            className={`form-control ${ titleClass }`}
            placeholder="Título del evento"
            name="title"
            autoComplete="off"
            values={formValues.title}
            onChange={onInputChanged}
        />
        <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
    </div>

    <div className="form-group mb-2">
        <textarea 
            type="text" 
            className="form-control"
            placeholder="Notas"
            rows="5"
            name="notes"
            values={formValues.notes}
            onChange={onInputChanged}
        ></textarea>
        <small id="emailHelp" className="form-text text-muted">Información adicional</small>
    </div>

    <button
        type="submit"
        className="btn btn-outline-primary btn-block"
    >
        <i className="far fa-save"></i>
        <span> Guardar</span>
    </button>

</form>
        </Modal>
    )
}