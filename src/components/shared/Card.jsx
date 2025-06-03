import React from 'react';
import { FaEdit, FaTrash, FaBoxOpen } from 'react-icons/fa';

export function ContenedorTarjetas({ 
  elementos = [], 
  alRenderizarElemento, 
  estadoVacio = null,
  className = '',
  columnas = 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
  ...props 
}) {
  if (!elementos.length) {
    return estadoVacio || (
      <div className="col-span-full text-center py-12">
        <FaBoxOpen className="mx-auto text-4xl text-gray-300 mb-4" />
        <h3 className="text-lg font-medium text-gray-700">No se encontraron elementos</h3>
      </div>
    );
  }

  return (
    <div className={`grid ${columnas} gap-6 ${className}`} {...props}>
      {elementos.map((elemento) => (
        <React.Fragment key={elemento.id}>
          {alRenderizarElemento(elemento)}
        </React.Fragment>
      ))}
    </div>
  );
}

export function Tarjeta({ 
  elemento, 
  alEditar, 
  alEliminar, 
  alCambiarEstado,
  etiquetasEstado = { activo: 'Activo', inactivo: 'Inactivo' },
  enlaceVer = '#',
  mostrarContador = true,
  textoEnlace = 'Ver detalles',
  ...props 
}) {
  return (
    <div 
      className={`bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl ${
        !elemento.estado ? "opacity-70" : ""
      }`} 
      {...props}
    >
      <div className="p-6">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-4">
            {elemento.icono && (
              <div className="p-3 bg-blue-100 rounded-full">
                <elemento.icono className="text-2xl text-blue-600" />
              </div>
            )}
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                {elemento.nombre}
                {!elemento.estado && (
                  <span className="ml-2 text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full">
                    Inactiva
                  </span>
                )}
              </h3>
              {mostrarContador && elemento.productos !== undefined && (
                <p className="text-sm text-gray-500 mt-1">
                  {elemento.productos} {elemento.productos === 1 ? 'producto' : 'productos'}
                </p>
              )}
            </div>
          </div>
          <div className="flex gap-2">
            {alEditar && (
              <button
                onClick={() => alEditar(elemento)}
                className="text-blue-600 hover:text-blue-800 p-1"
                title="Editar"
              >
                <FaEdit />
              </button>
            )}
            {alEliminar && (
              <button
                onClick={() => alEliminar(elemento.id)}
                className="text-red-600 hover:text-red-800 p-1"
                title="Eliminar"
              >
                <FaTrash />
              </button>
            )}
          </div>
        </div>
        
        {elemento.descripcion && (
          <p className="mt-3 text-sm text-gray-600">
            {elemento.descripcion}
          </p>
        )}
        
        <div className="mt-4 pt-3 border-t border-gray-100 flex justify-between items-center">
          {alCambiarEstado && (
            <button
              onClick={() => alCambiarEstado(elemento.id)}
              className={`px-3 py-1 text-sm rounded-full ${
                elemento.estado
                  ? "bg-green-100 text-green-800 hover:bg-green-200"
                  : "bg-gray-100 text-gray-800 hover:bg-gray-200"
              }`}
            >
              {elemento.estado ? etiquetasEstado.activo : etiquetasEstado.inactivo}
            </button>
          )}
          
          {enlaceVer && (
            <a
              href={typeof enlaceVer === 'function' ? enlaceVer(elemento) : enlaceVer}
              className="text-blue-600 hover:underline text-sm"
            >
              {textoEnlace} →
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

// Componente de conveniencia para compatibilidad con el código existente
export default function TarjetaCategoria({ 
  categoriasFiltradas = [],
  alEliminarCategoria,
  alCambiarEstado
}) {
  return (
    <ContenedorTarjetas
      elementos={categoriasFiltradas}
      alRenderizarElemento={(categoria) => (
        <Tarjeta
          key={categoria.id}
          elemento={categoria}
          alEliminar={alEliminarCategoria}
          alCambiarEstado={alCambiarEstado}
          enlaceVer={`/productos?categoria=${categoria.id}`}
          textoEnlace="Ver productos"
        />
      )}
      estadoVacio={
        <div className="col-span-full text-center py-12">
          <FaBoxOpen className="mx-auto text-4xl text-gray-300 mb-4" />
          <h3 className="text-lg font-medium text-gray-700">No se encontraron categorías</h3>
          <p className="text-gray-500 mt-1">Intenta con otros términos de búsqueda o crea una nueva categoría</p>
        </div>
      }
    />
  );
}