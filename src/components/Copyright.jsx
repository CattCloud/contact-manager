export default function Copyright(){
    const year = new Date().getFullYear();
    return (
        <div className="text-text-secondary font-semibold text-md ">
            @{year} - Erick Verde
        </div>
    );
}