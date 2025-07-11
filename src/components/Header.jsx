export default function Header({cantidadFavoritos,cantidadContactos}) {
  return (
    <header className="w-full pt-4 pb-2">
      <div className="mx-4 border-b-2 border-border flex items-center justify-between">
      <h1 className="text-2xl text-text-primary font-bold ">Contact Manager</h1>
      <p className='text-text-secondary '>Total: {cantidadContactos} / Favorito: {cantidadFavoritos}</p>
      </div>
    </header>
  );
}