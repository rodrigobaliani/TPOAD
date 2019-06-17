package com.rodro.tpo.dto;

import view.ItemPedidoView;

public class ItemPedidoViewDTO {
	
	private ProductoViewDTO producto;
	private int cantidad;
	private float precio;
	
	public ItemPedidoViewDTO() {
	}

	public ProductoViewDTO getProducto() {
		return producto;
	}

	public void setProducto(ProductoViewDTO producto) {
		this.producto = producto;
	}

	public int getCantidad() {
		return cantidad;
	}

	public void setCantidad(int cantidad) {
		this.cantidad = cantidad;
	}

	public float getPrecio() {
		return precio;
	}

	public void setPrecio(float precio) {
		this.precio = precio;
	}
	
	public ItemPedidoView toView() {
		return new ItemPedidoView(producto.toView(), cantidad, precio);
	}

	@Override
	public String toString() {
		return "ItemPedidoViewDTO [producto=" + producto + ", cantidad=" + cantidad + ", precio=" + precio + "]";
	}

}
