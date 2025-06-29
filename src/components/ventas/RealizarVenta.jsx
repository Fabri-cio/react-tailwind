import { useState, useEffect, useRef, useCallback } from 'react';
import { useSearchProducts, useCategorias } from '../../hooks/useEntities';

// Componente de teclado numérico
const TecladoNumerico = ({ onKeyPress }) => (
  <div className="grid grid-cols-3 gap-2 mt-2">
    {[1, 2, 3, 4, 5, 6, 7, 8, 9, '.', 0, '⌫'].map((key) => (
      <button
        key={key}
        onClick={() => onKeyPress(key)}
        className={`p-3 text-lg font-medium rounded-lg ${
          key === '⌫' 
            ? 'bg-red-100 text-red-600 hover:bg-red-200' 
            : 'bg-gray-100 hover:bg-gray-200'
        }`}
      >
        {key}
      </button>
    ))}
  </div>
);

const RealizarVenta = () => {
  // Estados principales
  const [busqueda, setBusqueda] = useState('');
  const [terminoBusqueda, setTerminoBusqueda] = useState('');
  const [carrito, setCarrito] = useState([]);
  const [cantidadActual, setCantidadActual] = useState('1');
  const [metodoPago, setMetodoPago] = useState('efectivo');
  const [efectivoRecibido, setEfectivoRecibido] = useState('');
  const [cambio, setCambio] = useState(0);
  const [categoriaActiva, setCategoriaActiva] = useState('todos');
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  
  // Referencias
  const inputBusqueda = useRef(null);
  const inputEfectivo = useRef(null);
  
  // Obtener datos
  const { data: response = {} } = useSearchProducts(terminoBusqueda || undefined);
  const { data: categoriasData = [] } = useCategorias(true, 1);
  const categorias = [{ id: 'todos', nombre: 'Todos' }, ...(categoriasData.data || [])];
  
  // Filtrar productos por categoría
  const productos = Array.isArray(response.data) 
    ? categoriaActiva === 'todos' 
      ? response.data 
      : response.data.filter(p => p.id_categoria?.toString() === categoriaActiva)
    : [];

  // Efectos
  useEffect(() => {
    inputBusqueda.current.focus();
    
    // Manejar escaneo de código de barras
    const handleKeyDown = (e) => {
      if (e.key === 'Enter' && busqueda.trim()) {
        const producto = productos.find(p => p.codigo_barras === busqueda.trim());
        if (producto) {
          agregarAlCarrito(producto);
          setBusqueda('');
        }
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [busqueda, productos]);
  
  // Calcular totales
  const subtotal = carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
  const igv = subtotal * 0.18; // 18% IGV
  const total = subtotal + igv;
  
  // Funciones de utilidad
  const handleBuscar = (e) => {
    e.preventDefault();
    setTerminoBusqueda(busqueda.trim());
  };
  
  const agregarAlCarrito = useCallback((producto) => {
    const cantidad = parseFloat(cantidadActual) || 1;
    
    setCarrito(prevCarrito => {
      const existe = prevCarrito.find(p => p.id_producto === producto.id_producto);
      
      if (existe) {
        return prevCarrito.map(item => 
          item.id_producto === producto.id_producto
            ? { ...item, cantidad: item.cantidad + cantidad }
            : item
        );
      }
      return [...prevCarrito, { ...producto, cantidad }];
    });
    
    setCantidadActual('1');
    inputBusqueda.current.focus();
  }, [cantidadActual]);
  
  const quitarDelCarrito = (id) => {
    setCarrito(prev => prev.filter(p => p.id_producto !== id));
  };
  
  const actualizarCantidad = (id, nuevaCantidad) => {
    if (nuevaCantidad < 1) return;
    setCarrito(prev => 
      prev.map(p => 
        p.id_producto === id ? { ...p, cantidad: nuevaCantidad } : p
      )
    );
  };
  
  const handleTeclaNumerica = (tecla) => {
    if (tecla === '⌫') {
      setCantidadActual(prev => prev.slice(0, -1) || '1');
    } else if (tecla === '.' && !cantidadActual.includes('.')) {
      setCantidadActual(prev => prev + '.');
    } else if (tecla !== '.') {
      setCantidadActual(prev => prev === '1' ? tecla.toString() : prev + tecla);
    }
  };
  
  const calcularCambio = (monto) => {
    const montoNum = parseFloat(monto) || 0;
    setEfectivoRecibido(monto);
    setCambio(Math.max(0, montoNum - total).toFixed(2));
  };
  
  const finalizarVenta = () => {
    // Aquí iría la lógica para guardar la venta
    alert('Venta realizada con éxito!');
    setCarrito([]);
    setEfectivoRecibido('');
    setCambio(0);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Barra superior */}
      <div className="bg-blue-600 text-white p-3 flex justify-between items-center">
        <h1 className="text-xl font-bold">Sistema de Punto de Venta</h1>
        <div className="text-sm">
          <span className="mr-4">Caja #1</span>
          <span>{new Date().toLocaleDateString('es-PE')}</span>
        </div>
      </div>
      
      <div className="flex flex-1 overflow-hidden">
        {/* Columna de Productos */}
        <div className="w-3/5 flex flex-col">
          {/* Barra de búsqueda */}
          <div className="p-3 bg-white border-b">
            <form onSubmit={handleBuscar} className="flex gap-2">
              <div className="relative flex-1">
                <input
                  ref={inputBusqueda}
                  type="text"
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                  placeholder="Buscar por código o nombre..."
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  autoComplete="off"
                />
                <span className="absolute right-2 top-3 text-gray-400 text-xs">
                  {busqueda ? 'Presiona Enter para escanear' : 'Usa el lector de códigos de barras'}
                </span>
              </div>
              <button 
                type="submit" 
                className="px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Buscar
              </button>
            </form>
          </div>
          
          {/* Categorías */}
          <div className="bg-white p-2 overflow-x-auto">
            <div className="flex space-x-2">
              {categorias.map(cat => (
                <button
                  key={cat.id_categoria}
                  onClick={() => setCategoriaActiva(cat.id_categoria)}
                  className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${
                    categoriaActiva === cat.id_categoria
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  {cat.nombre_categoria}
                </button>
              ))}
            </div>
          </div>
          
          {/* Lista de productos */}
          <div className="flex-1 overflow-y-auto p-3 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {productos.map((producto) => (
              <div 
                key={producto.id_producto}
                className={`bg-white rounded-lg shadow-sm border overflow-hidden transition-transform hover:scale-105 ${
                  productoSeleccionado?.id_producto === producto.id_producto 
                    ? 'ring-2 ring-blue-500' 
                    : ''
                }`}
                onClick={() => setProductoSeleccionado(producto)}
              >
                <div className="p-2">
                  <div className="h-20 bg-gray-100 rounded flex items-center justify-center mb-2">
                    {producto.imagen ? (
                      <img 
                        src={producto.imagen} 
                        alt={producto.nombre}
                        className="h-full object-cover"
                      />
                    ) : (
                      <span className="text-gray-400">Sin imagen</span>
                    )}
                  </div>
                  <h3 className="font-medium text-sm truncate">{producto.nombre}</h3>
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-green-600 font-bold">S/ {producto.precio}</span>
                    {producto.stock !== undefined && (
                      <span className="text-xs text-gray-500">Stock: {producto.stock}</span>
                    )}
                  </div>
                </div>
                
                <div className="bg-gray-50 p-2 border-t">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">Cantidad:</span>
                    <div className="flex items-center space-x-1">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          const nuevaCantidad = Math.max(1, (parseFloat(cantidadActual) || 1) - 1);
                          setCantidadActual(nuevaCantidad.toString());
                        }}
                        className="w-6 h-6 flex items-center justify-center bg-gray-200 rounded"
                      >
                        -
                      </button>
                      <input
                        type="text"
                        value={cantidadActual}
                        onChange={(e) => {
                          const val = e.target.value;
                          if (val === '' || /^\d*\.?\d*$/.test(val)) {
                            setCantidadActual(val);
                          }
                        }}
                        onClick={(e) => e.stopPropagation()}
                        className="w-10 text-center border rounded"
                      />
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setCantidadActual(prev => (parseFloat(prev) || 0 + 1).toString());
                        }}
                        className="w-6 h-6 flex items-center justify-center bg-gray-200 rounded"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      agregarAlCarrito(producto);
                    }}
                    className="w-full mt-2 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600 transition-colors"
                  >
                    Agregar al carrito
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Columna del Carrito */}
        <div className="w-2/5 bg-white border-l border-gray-200 flex flex-col">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-xl font-bold">Carrito de Venta</h2>
            <div className="flex justify-between text-sm text-gray-500 mt-1">
              <span>Productos: {carrito.reduce((sum, item) => sum + item.cantidad, 0)}</span>
              <button 
                onClick={() => setCarrito([])}
                className="text-red-500 hover:text-red-700 text-sm"
                disabled={carrito.length === 0}
              >
                Vaciar carrito
              </button>
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto">
            {carrito.length === 0 ? (
              <div className="text-center text-gray-500 mt-10 p-4">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <p className="mt-2">No hay productos en el carrito</p>
                <p className="text-sm text-gray-400">Busca y agrega productos para comenzar</p>
              </div>
            ) : (
              <ul className="divide-y divide-gray-200">
                {carrito.map((item) => (
                  <li key={item.id_producto} className="p-3 hover:bg-gray-50">
                    <div className="flex justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium">{item.nombre}</h4>
                        <div className="flex items-center justify-between mt-1">
                          <span className="text-sm text-gray-600">
                            S/ {item.precio} x {item.cantidad}
                          </span>
                          <span className="font-medium">
                            S/ {(item.precio * item.cantidad).toFixed(2)}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 ml-3">
                        <button 
                          onClick={() => actualizarCantidad(item.id_producto, item.cantidad - 1)}
                          className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded hover:bg-gray-200"
                        >
                          -
                        </button>
                        <input
                          type="number"
                          min="1"
                          value={item.cantidad}
                          onChange={(e) => actualizarCantidad(item.id_producto, parseInt(e.target.value) || 1)}
                          className="w-12 text-center border rounded"
                        />
                        <button 
                          onClick={() => actualizarCantidad(item.id_producto, item.cantidad + 1)}
                          className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded hover:bg-gray-200"
                        >
                          +
                        </button>
                        <button 
                          onClick={() => quitarDelCarrito(item.id_producto)}
                          className="ml-1 text-red-500 hover:text-red-700"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
          
          {/* Resumen de la venta */}
          <div className="border-t border-gray-200 p-4">
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span>Subtotal:</span>
                <span>S/ {subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>IGV (18%):</span>
                <span>S/ {igv.toFixed(2)}</span>
              </div>
              <div className="border-t pt-2 mt-2 flex justify-between font-bold text-lg">
                <span>Total:</span>
                <span>S/ {total.toFixed(2)}</span>
              </div>
            </div>
            
            {/* Método de pago */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Método de pago
              </label>
              <div className="grid grid-cols-3 gap-2">
                {['efectivo', 'tarjeta', 'yape'].map((metodo) => (
                  <button
                    key={metodo}
                    type="button"
                    onClick={() => setMetodoPago(metodo)}
                    className={`p-2 text-sm rounded border ${
                      metodoPago === metodo
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-300 bg-white hover:bg-gray-50'
                    }`}
                  >
                    {metodo === 'efectivo' && 'Efectivo'}
                    {metodo === 'tarjeta' && 'Tarjeta'}
                    {metodo === 'yape' && 'Yape'}
                  </button>
                ))}
              </div>
            </div>
            
            {metodoPago === 'efectivo' && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Efectivo recibido
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">S/</span>
                  <input
                    ref={inputEfectivo}
                    type="number"
                    value={efectivoRecibido}
                    onChange={(e) => calcularCambio(e.target.value)}
                    placeholder="0.00"
                    className="w-full pl-10 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <TecladoNumerico onKeyPress={(key) => {
                  if (key === '⌫') {
                    setEfectivoRecibido(prev => prev.slice(0, -1));
                  } else if (key === '.') {
                    if (!efectivoRecibido.includes('.')) {
                      setEfectivoRecibido(prev => prev + '.');
                    }
                  } else {
                    setEfectivoRecibido(prev => (prev === '0' ? key : prev + key));
                  }
                }} />
                
                {efectivoRecibido && (
                  <div className="mt-2 p-2 bg-gray-50 rounded-lg">
                    <div className="flex justify-between text-sm">
                      <span>Cambio:</span>
                      <span className="font-medium">S/ {cambio}</span>
                    </div>
                  </div>
                )}
              </div>
            )}
            
            <button 
              onClick={finalizarVenta}
              disabled={carrito.length === 0 || (metodoPago === 'efectivo' && parseFloat(efectivoRecibido) < total)}
              className={`w-full py-3 px-4 rounded-lg font-bold text-white ${
                carrito.length === 0 || (metodoPago === 'efectivo' && parseFloat(efectivoRecibido) < total)
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-green-500 hover:bg-green-600'
              }`}
            >
              {metodoPago === 'efectivo' ? 'Cobrar' : 'Pagar'}
            </button>
            
            <div className="mt-2 grid grid-cols-3 gap-2">
              {[100, 50, 20].map((monto) => (
                <button
                  key={monto}
                  type="button"
                  onClick={() => {
                    const nuevoMonto = parseFloat(efectivoRecibido || '0') + monto;
                    calcularCambio(nuevoMonto.toString());
                    inputEfectivo.current.focus();
                  }}
                  className="text-xs p-2 bg-gray-100 hover:bg-gray-200 rounded"
                >
                  +S/ {monto}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RealizarVenta;