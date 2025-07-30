// ConfirmationModal.jsx
import { useEffect } from 'react';

function ConfirmationModal({ isOpen, onClose, onConfirm, title, message, confirmText = "Confirmar", cancelText = "Cancelar" }) {
    // Prevenir scroll del body cuando el modal está abierto, pero SIN resetear la posición
    useEffect(() => {
        if (isOpen) {
            // Guardar la posición actual del scroll
            const scrollY = window.scrollY;

            // Prevenir scroll pero mantener posición
            document.body.style.position = 'fixed';
            document.body.style.top = `-${scrollY}px`;
            document.body.style.width = '100%';

            return () => {
                // Restaurar scroll a la posición exacta
                document.body.style.position = '';
                document.body.style.top = '';
                document.body.style.width = '';
                window.scrollTo(0, scrollY);
            };
        }
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black bg-opacity-10 backdrop-blur-sm"
                onClick={onClose}
            />


            {/* Modal */}
            <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full mx-4 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    {title}
                </h3>

                <p className="text-gray-600 mb-6">
                    {message}
                </p>

                <div className="flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                    >
                        {cancelText}
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ConfirmationModal;