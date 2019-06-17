package com.rodro.tpo.dto;

import java.util.Date;
import java.util.List;

import view.PedidoView;

public class PedidoViewDTO {
	
	private int numeroPedido;
	private ClienteViewDTO cliente;
	private Date fechaPedido;
	private String estado;
	List<ItemPedidoViewDTO> items;

	public PedidoViewDTO() {
	}

	public int getNumeroPedido() {
		return numeroPedido;
	}

	public void setNumeroPedido(int numeroPedido) {
		this.numeroPedido = numeroPedido;
	}

	public ClienteViewDTO getCliente() {
		return cliente;
	}

	public void setCliente(ClienteViewDTO cliente) {
		this.cliente = cliente;
	}

	public Date getFechaPedido() {
		return fechaPedido;
	}

	public void setFechaPedido(Date fechaPedido) {
		this.fechaPedido = fechaPedido;
	}

	public String getEstado() {
		return estado;
	}

	public void setEstado(String estado) {
		this.estado = estado;
	}

	public List<ItemPedidoViewDTO> getItems() {
		return items;
	}

	public void setItems(List<ItemPedidoViewDTO> items) {
		this.items = items;
	}	
	
	public PedidoView toView() {
		return new PedidoView(numeroPedido, cliente.toView(), fechaPedido, estado);
	}
}
