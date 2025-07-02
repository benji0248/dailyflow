import React from "react";

const ItemList = () => {

    const [selectedItems, setSelectedItems] = React.useState<string[]>([]);

    const toggleItemSelection = (item: string) => {
        setSelectedItems(prev => 
            prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]
        );
    }

    const handleFinishBuying = () => {
        if (selectedItems.length === 0) {
            alert("No has seleccionado ningún artículo para comprar.");
            return;
        }
        setSelectedItems([]);
    }

    const items = [
        { name: "Manzanas", amount: "1 kg" },
        { name: "Pan", amount: "2 unidades" },
        { name: "Leche", amount: "1 litro" }
      ];

    return (
        <div>
            <h1 className="text-3xl font-bold tracking-tight">Lista de Compras</h1>
            <p className="text-muted-foreground text-gray-600">Aquí puedes administrar tus compras</p>

            <section className="mt-5 mb-8">
                <div className="bg-white shadow-md rounded-2xl p-4">
                    <button className="w-sm bg-black text-white py-2 rounded-lg hover:bg-blue-700 transition-colors mb-4 me-4">
                        Agregar Artículo
                    </button>
                    
                    <button className="w-sm bg-black text-white py-2 rounded-lg hover:bg-blue-700 transition-colors mb-4"
                            onClick={handleFinishBuying}>
                        Finalizar Compra
                    </button>
                    
                    <div className="mt-2 mb-6">
                        <h2 className="text-xl font-semibold mb-4">Filtros</h2>
                        <div className="space-y-3 flex gap-4">
                            <label className="">
                                <input type="checkbox" className="mr-2" />
                                Super
                            </label>
                            <label className="">
                                <input type="checkbox" className="mr-2" />
                                Farmacia
                            </label>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-xl font-semibold mb-4">Artículos</h2>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {items.map(({ name, amount }) => {
                            const selected = selectedItems.includes(name);
                            return (
                            <li
                                key={name}
                                onClick={() => toggleItemSelection(name)}
                                className={`cursor-pointer p-3 rounded-lg border transition-colors ${
                                selected
                                    ? "bg-green-100 border-green-500"
                                    : "bg-gray-50 hover:bg-gray-100 border-gray-200"
                                }`}
                            >
                                <div className="flex justify-between items-center">
                                <span className={`font-medium ${selected ? "text-green-800" : ""}`}>{name}</span>
                                <span className="text-gray-500">{amount}</span>
                                </div>
                            </li>
                            );
                        })}
                        </ul>
                    </div>
                </div>
            </section>
        </div>
    );
}
export default ItemList;