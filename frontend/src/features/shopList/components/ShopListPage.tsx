import React from "react";
import ItemList from "./ItemList";

const ShopListPage = () => {
    return (
        <div className="min-h-screen">
        <main className="max-w-screen-xl mx-auto p-4">
            <section className="mb-8">
                <ItemList/>
            </section>
        </main>
        </div>
    );
}
export default ShopListPage;