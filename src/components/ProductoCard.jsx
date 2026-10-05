import { useState } from 'react'
import CantidadInput from './CantidadInput'
import { useToast } from '../context/ToastContext'
import { formatearCOP } from '../utils/formato'
import { MSG_MAXIMO, MSG_MINIMO_CATALOGO } from '../utils/mensajes'

export default function ProductoCard({ producto, enCarrito, onAgregar }) {
  const { mostrar } = useToast()
  const [cantidad, setCantidad] = useState(1)
  const agotado = enCarrito >= producto.stock

  const agregar = () => {
    onAgregar(producto, cantidad)
    setCantidad(1)
  }

  return (
    <article className="producto">
      <h2 className="producto__nombre">{producto.nombre}</h2>
      <p className="producto__precio">{formatearCOP(producto.precio)}</p>
      <p className="producto__stock">
        Stock: {producto.stock}
        {enCarrito > 0 && <span> · En tu carrito: {enCarrito}</span>}
      </p>
      {agotado ? (
        <p className="producto__agotado">Ya tienes todo el stock disponible en tu carrito.</p>
      ) : (
        <div className="producto__cantidad">
          <label htmlFor={`cantidad-${producto.id}`}>Cantidad</label>
          <CantidadInput
            id={`cantidad-${producto.id}`}
            etiqueta={`Cantidad de ${producto.nombre}`}
            value={cantidad}
            max={producto.stock}
            onChange={setCantidad}
            onMinimo={() => mostrar({ mensaje: MSG_MINIMO_CATALOGO, tipo: 'warning' })}
            onMaximo={() => mostrar({ mensaje: MSG_MAXIMO, tipo: 'warning' })}
          />
        </div>
      )}
      <button type="button" className="boton boton--primario" onClick={agregar} disabled={agotado}>
        Agregar
      </button>
    </article>
  )
}
