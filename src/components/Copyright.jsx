export default function Copyright() {
    const year = new Date().getFullYear();
    return (
        <>
            <div className="text-text-secondary font-semibold text-md mb-2">
                {year} - Erick Verde
            </div>
            <div className="text-text-secondary text-sm">
                Desarrollado para una mejor gestión de contactos
            </div>
        </>
    );
}