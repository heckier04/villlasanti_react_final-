// Importaciones necesarias
import React from "react"; // React para crear el componente
import { useForm } from "react-hook-form"; // Hook para manejar el formulario
import { ToastContainer, toast } from 'react-toastify'; // Para mostrar notificaciones
import 'react-toastify/dist/ReactToastify.css'; // Estilos de las notificaciones

const Contacto = () => {
    // Hook useForm para la gestión del formulario y validación
    const { register, handleSubmit, formState: { errors } } = useForm();

    // Función para manejar el envío del formulario
    const enviar = (data) => {
        // Verificar si todos los campos están completos
        if (data.nombre && data.email && data.mensaje) {
            try {
                // Si todo está bien, mostrar mensaje de éxito
                toast.success("Mensaje enviado con éxito");
            } catch (error) {
                // En caso de error, mostrar mensaje de error
                toast.error("Error al enviar el mensaje: " + error.message);
            }
        } else {
            // Si falta algún campo, mostrar error
            toast.error("Por favor, complete todos los campos");
        }
    };

    return (
        <div className="contacto-container">
            <h1 className="contacto-title">Contacto</h1>
            <form className="contacto-form" onSubmit={handleSubmit(enviar)}>
                {/* Campo de nombre */}
                <div className="contacto-field">
                    <input
                        type="text"
                        placeholder="Ingresá tu nombre"
                        className="contacto-input"
                        {...register("nombre", { required: "El nombre es obligatorio" })} // Validación: obligatorio
                    />
                    {/* Mostrar mensaje de error si el campo está vacío */}
                    {errors.nombre && <span className="contacto-error">{errors.nombre.message}</span>}
                </div>
                
                {/* Campo de email */}
                <div className="contacto-field">
                    <input
                        type="email"
                        placeholder="Ingresá tu e-mail"
                        className="contacto-input"
                        {...register("email", { required: "El email es obligatorio" })} // Validación: obligatorio
                    />
                    {/* Mostrar mensaje de error si el campo está vacío */}
                    {errors.email && <span className="contacto-error">{errors.email.message}</span>}
                </div>

                {/* Campo de teléfono (opcional) */}
                <div className="contacto-field">
                    <input
                        type="phone"
                        placeholder="Ingresá tu teléfono"
                        className="contacto-input"
                        {...register("telefono")} // Sin validación, es opcional
                    />
                </div>

                {/* Campo de mensaje */}
                <div className="contacto-field">
                    <textarea
                        placeholder="Ingrese su mensaje"
                        className="contacto-textarea"
                        {...register("mensaje", { required: "El mensaje es obligatorio" })} // Validación: obligatorio
                    />
                    {/* Mostrar mensaje de error si el campo está vacío */}
                    {errors.mensaje && <span className="contacto-error">{errors.mensaje.message}</span>}
                </div>

                {/* Botón de envío */}
                <button className="contacto-button" type="submit">Enviar</button>
            </form>
            <ToastContainer /> {/* Contenedor de notificaciones */}
        </div>
    );
}

export default Contacto;
