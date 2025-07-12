import Modali, { useModali } from 'modali';

function ModalConfirmaccion({ onAction, contacto, triggerButton }) {
    const [confirmEliminar, toggleEliminarModal] = useModali({
        animated: true,
        title: '¿Estás seguro?',
        message: contacto ? `Esta acción eliminará a ${contacto.nombre} permanentemente.` : "Esta accion eliminara a todos los contactos",
        buttons: [
            <Modali.Button
                label="Cancelar"
                isStyleCancel
                onClick={() => toggleEliminarModal()}
            />,
            <Modali.Button
                label="Eliminar"
                isStyleDestructive
                onClick={() => {
                    onAction();
                    toggleEliminarModal(); 
                }}
            />

        ]
    });


    return (
        <>
            {triggerButton(toggleEliminarModal)}
            <Modali.Modal {...confirmEliminar} />
        </>
    );
}

export { ModalConfirmaccion }