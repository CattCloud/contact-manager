function ListHeader({titulo,color}) {
    const colorDiv = () => {
    switch (color) {
        case "red":
        return "bg-secondary-red";
        case "green":
        return "bg-secondary-green";
        case "blue":
        return "bg-secondary-blue";
        default:
        return "bg-secondary-neutral"; // valor por defecto
    }
    };
    return (
        <div className="flex gap-2 items-center justify-start rounded-md border py-2 px-4 border-border bg-bg-primary">
            <div className={`rounded-full size-4 ${colorDiv()}`}></div>
            <p className="text-lg">{titulo}</p>
        </div>
      );
}

export default ListHeader ;