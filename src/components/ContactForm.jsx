import { useState, useRef } from "react";
import { notyf } from "../utils/notificacion";
import PhoneInput from "./PhoneInput";
import { validarTelefonoPorTexto, obtenerISODesdeTelefono } from "../utils/validacionTelefono";
import { phoneDescriptions } from "../utils/PhoneDescriptions";
import ConfirmationModal from "../utils/modalEditar";
import { useConfirmation } from "../utils/useConfirmation"; // 👈 Nuevo hook

function ContactForm({ onRegistrarContacto, modoForm = "crear", contactoActual = null }) {

    const [formData, setFormData] = useState(
        contactoActual ?? {
            nombre: "",
            telefono: "",
            correo: "",
            relacion: ""
        }
    );

    const [errors, setErrors] = useState({});
    const inputNombreRef = useRef(null);

    // 🟢 Reemplazar useModali con nuestro hook personalizado
    const [showConfirmation, confirmationModal] = useConfirmation();

    function obtenerDescripcionTelefono(valor) {
        const iso = obtenerISODesdeTelefono(valor);
        const datos = phoneDescriptions.find(p => p.iso === iso);
        return datos?.description ?? 'Formato de número no reconocido para este país.';
    }

    function validaRequerido(valor) {
        return valor.trim() !== '';
    }

    function validarTelefono(valor) {
        return validarTelefonoPorTexto(valor);
    }

    function validarCorreo(valor) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor.trim());
    }

    function validateForm() {
        const newErrors = {};
        if (!validaRequerido(formData.nombre)) newErrors.nombre = 'El nombre es requerido';
        if (!validaRequerido(formData.telefono)) {
            newErrors.telefono = 'El teléfono es requerido'
        } else {
            if (!validarTelefono(formData.telefono)) {
                newErrors.telefono = obtenerDescripcionTelefono(formData.telefono);
            }
        }
        if (!validaRequerido(formData.relacion)) newErrors.relacion = 'La relacion con el contacto es requerido';
        if (!validaRequerido(formData.correo)) {
            newErrors.correo = 'El correo es requerido';
        } else {
            if (!validarCorreo(formData.correo)) {
                newErrors.correo = 'El correo indicado no cumple con el formato de correo'
            }
        }
        return newErrors;
    }

    const camposRequeridos = ["nombre", "telefono", "relacion", "correo"];
    const totalCampos = camposRequeridos.length;
    let camposCompletos = camposRequeridos.filter(campo => esCampoValido(campo, formData[campo])).length;

    function esCampoValido(nombreCampo, valor) {
        switch (nombreCampo) {
            case "nombre":
                return validaRequerido(valor);
            case "telefono":
                return validarTelefono(valor);
            case "relacion":
                return validaRequerido(valor);
            case "correo":
                return validarCorreo(valor);
            default:
                return validaRequerido(valor);
        }
    }

    function handleCambios(event) {
        const { name, value } = event.target;
        if (errors[name]) {
            let esValido = false;
            switch (name) {
                case "nombre":
                case "relacion":
                    esValido = validaRequerido(value);
                    break;
                case "telefono":
                    esValido = validarTelefono(value);
                    break;
                case "correo":
                    esValido = validarCorreo(value);
                    break;
            }

            if (esValido) {
                const nuevosErrores = { ...errors };
                delete nuevosErrores[name];
                setErrors(nuevosErrores);
            }
        }

        setFormData({ ...formData, [name]: value });
    }

    // 🟢 Nuevas funciones para el modal personalizado
    function confirmarEdicion() {
        onRegistrarContacto(formData, true);
    }

    function mostrarConfirmacionEdicion() {
        showConfirmation({
            title: 'Confirmar edición',
            message: `¿Deseas actualizar el contacto "${formData.nombre}"?`,
            onConfirm: confirmarEdicion,
            onCancel: () => {} // No hacer nada al cancelar
        });
    }

    function handleSubmit(e) {
        e.preventDefault();
        const formErrors = validateForm();
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }
        setErrors({});
        
        if (modoForm === "editar") {
            if (comparadorDatos()) {
                mostrarConfirmacionEdicion(); // 🟢 Usar nuevo modal
            } else {
                onRegistrarContacto(formData, false);
            }
        } else {
            onRegistrarContacto(formData);
        }
    }

    function limpiarFormulario() {
        setFormData({
            nombre: "",
            telefono: "",
            correo: "",
            relacion: ""
        });
        notyf.success("Formulario limpio");
        setTimeout(() => {
            inputNombreRef.current?.focus();
        }, 0);
    }

    function comparadorDatos() {
        const { nombre, telefono, correo, relacion } = contactoActual;
        if (formData.nombre != nombre || formData.telefono != telefono || formData.correo != correo || formData.relacion != relacion) {
            return true
        }
        return false;
    }

    return (
        <>
            <div className="my-5 flex gap-1 flex-col">
                <p className="text-sm text-text-secondary">Completado: {camposCompletos}/{camposRequeridos.length} campos requeridos</p>
                <div className="w-full bg-gray-200 rounded-md h-2 ">
                    <div
                        className="bg-secondary-green h-full rounded-md transition-all duration-200"
                        style={{ width: `${(camposCompletos / totalCampos) * 100}%` }}
                    ></div>
                </div>
            </div>
            <form id="formContact" onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-3">

                <div className="flex flex-col gap-2">
                    <label className="font-semibold text-text-label">
                        Nombre<span className="text-secondary-red">*</span>
                    </label>
                    <input ref={inputNombreRef} className={`py-1.5 px-2 shadow-sm border rounded-md transition duration-150 ease-in-out focus:ring-1 focus:outline-none
                            ${errors.nombre ? 'border-secondary-red ring-secondary-red focus:ring-secondary-red focus:border-secondary-red' : 'border-border-form focus:ring-hover-input focus:border-hover-input'}
                        `}
                        type="text" name="nombre" value={formData.nombre} onChange={handleCambios} >
                    </input>
                    {errors.nombre && (
                        <div className="text-secondary-red flex items-center mt-0.5 gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3" stroke="currentColor" class="size-4">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                            </svg>
                            <span className="text-sm">{errors.nombre}</span>
                        </div>
                    )}
                </div>
                <div className="flex flex-col gap-2">
                    <label className="font-semibold text-text-label">
                        Relacion<span className="text-secondary-red">*</span>
                    </label>
                    <select className={`py-1.5 px-2 shadow-sm border rounded-md transition duration-150 ease-in-out focus:ring-1 focus:outline-none
                            ${errors.relacion ? 'border-secondary-red ring-secondary-red focus:ring-secondary-red focus:border-secondary-red' : 'border-border-form focus:ring-hover-input focus:border-hover-input'}
                        `}
                        name="relacion" value={formData.relacion} onChange={handleCambios} >
                        <option value="">Seleccione una opcion</option>
                        <option value="familia">Familia</option>
                        <option value="amistad">Amigo(a)</option>
                        <option value="personal">Personal</option>
                        <option value="trabajo">Trabajo</option>
                        <option value="social">Social</option>
                    </select>
                    {errors.relacion && (
                        <div className="text-secondary-red flex items-center mt-0.5 gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3" stroke="currentColor" class="size-4">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                            </svg>
                            <span className="text-sm">{errors.relacion}</span>
                        </div>
                    )}
                </div>
                {/*
                  <div className="flex flex-col gap-2">
                    <label className="font-semibold text-text-label">
                        Telefono<span className="text-secondary-red">*</span>
                    </label>
                    <input className={`py-1.5 px-2 shadow-sm border rounded-md transition duration-150 ease-in-out focus:ring-1 focus:outline-none
                            ${errors.telefono ? 'border-secondary-red ring-secondary-red focus:ring-secondary-red focus:border-secondary-red' : 'border-border-form focus:ring-hover-input focus:border-hover-input'}
                        `}
                        type="tel" name="telefono" value={formData.telefono} onChange={handleCambios}>
                    </input>
                    {errors.telefono && (
                        <div className="text-secondary-red flex items-center mt-0.5 gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3" stroke="currentColor" class="size-4">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                            </svg>
                            <span className="text-sm">{errors.telefono}</span>
                        </div>
                    )}
                </div>
                */}

                <PhoneInput
                    formData={formData}
                    setFormData={handleCambios}
                    errors={errors}
                    contactoActual={contactoActual}
                />
                <div className="flex flex-col gap-2">
                    <label className="font-semibold text-text-label">
                        Correo<span className="text-secondary-red">*</span>
                    </label>
                    <input className={`py-1.5 px-2 shadow-sm border rounded-md transition duration-150 ease-in-out focus:ring-1 focus:outline-none
                            ${errors.correo ? 'border-secondary-red ring-secondary-red focus:ring-secondary-red focus:border-secondary-red' : 'border-border-form focus:ring-hover-input focus:border-hover-input'}
                        `}
                        type="text" name="correo" value={formData.correo} onChange={handleCambios} >
                    </input>
                    {errors.correo && (
                        <div className="text-secondary-red flex items-center mt-0.5 gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3" stroke="currentColor" class="size-4">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                            </svg>
                            <span className="text-sm">{errors.correo}</span>
                        </div>
                    )}
                </div>
                {/*
                                <div className="flex flex-col gap-2">
                    <label className="font-semibold text-text-label">
                        Direccion
                    </label>
                    <input className="py-1.5 px-2 xshadow-sm border border-border-form text-text-label  focus:outline-none focus:ring-1 focus:ring-hover-input focus:border-hover-input rounded-md
    transition duration-150 ease-in-out"
                        type="text" name="direccion" value={formData.direccion} onChange={handleCambios}>
                    </input>
                    {errors.direccion && (
                        <div className="text-secondary-red flex items-center mt-0.5 gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3" stroke="currentColor" class="size-4">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                            </svg>
                            <span className="text-sm">{errors.direccion}</span>
                        </div>
                    )}
                </div>
                */}
            </form>
            
            <div className="mt-10 flex justify-between">
                <button form="formContact" type="reset" onClick={limpiarFormulario} className="bg-white font-bold text-center rounded-md hover:bg-secondary-red hover:text-white text-secondary-red px-4 py-2 border border-secondary-red">
                    Limpiar formulario
                </button>
                <button form="formContact" type="submit" className="bg-white font-bold text-center rounded-md px-4 py-2 border border-secondary-green text-secondary-green hover:bg-secondary-green hover:text-black">
                    {modoForm == "crear" ? "Agregar contacto" : "Actualizar contacto"}
                </button>
            </div>

            {/* 🟢 Reemplazar Modali.Modal con nuestro modal personalizado */}
            <ConfirmationModal {...confirmationModal} />
        </>
    );
}

export default ContactForm;