import React from 'react';

const Home = () => {
  return (
    <main className="container mx-auto p-4">
      <section className="hero-section bg-blue-500 text-white p-4">
        <h1 className="text-3xl font-bold">Bienvenido al sistema de inventarios</h1>
        <p className="text-lg">Resumen de indicadores clave y noticias importantes</p>
      </section>
      <section className="dashboard-section mt-4">
        <h2 className="text-2xl font-bold">Resumen de indicadores clave</h2>
        <div className="grid grid-cols-3 gap-4">
          <div className="card bg-white shadow-md p-4">
            <h3 className="text-lg font-bold">Total de ventas del día</h3>
            <p className="text-lg">$1000</p>
          </div>
          <div className="card bg-white shadow-md p-4">
            <h3 className="text-lg font-bold">Total de inventario disponible</h3>
            <p className="text-lg">1000 unidades</p>
          </div>
          <div className="card bg-white shadow-md p-4">
            <h3 className="text-lg font-bold">Número de pedidos pendientes</h3>
            <p className="text-lg">5 pedidos</p>
          </div>
        </div>
      </section>
      <section className="news-section mt-4">
        <h2 className="text-2xl font-bold">Noticias y alertas</h2>
        <ul className="list-none p-0">
          <li className="py-2">
            <i className="fas fa-bell mr-2"></i>
            Nuevo producto agregado: "Producto X"
          </li>
          <li className="py-2">
            <i className="fas fa-tag mr-2"></i>
            Oferta especial: 10% de descuento en todos los productos
          </li>
          <li className="py-2">
            <i className="fas fa-exclamation-triangle mr-2"></i>
            Problema de stock: "Producto Y" no disponible
          </li>
        </ul>
      </section>
      <section className="quick-access-section mt-4">
        <h2 className="text-2xl font-bold">Accesos directos</h2>
        <ul className="list-none p-0">
          <li className="py-2">
            <a href="#" className="text-blue-500 hover:text-blue-700">
              Inventario
            </a>
          </li>
          <li className="py-2">
            <a href="#" className="text-blue-500 hover:text-blue-700">
              Ventas
            </a>
          </li>
          <li className="py-2">
            <a href="#" className="text-blue-500 hover:text-blue-700">
              Compras
            </a>
          </li>
          <li className="py-2">
            <a href="#" className="text-blue-500 hover:text-blue-700">
              Reportes
            </a>
          </li>
        </ul>
      </section>
      <section className="charts-section mt-4">
        <h2 className="text-2xl font-bold">Gráficos y estadísticas</h2>
        <div className="chart-container">
          <h3 className="text-lg font-bold">Ventas por mes</h3>
          <div className="chart"></div>
        </div>
      </section>
    </main>
  );
};

export default Home;