package com.rodro.tpo.dto;

import view.ProductoView;

public class ProductoViewDTO {
	private int identificador;
	private SubRubroViewDTO subRubro;
	private RubroViewDTO rubro;
	private String nombre;
	private String marca;
	private String codigoBarras;
	private float precio;
	
	public ProductoViewDTO() {
	}

	public int getIdentificador() {
		return identificador;
	}

	public void setIdentificador(int identificador) {
		this.identificador = identificador;
	}

	public SubRubroViewDTO getSubRubro() {
		return subRubro;
	}

	public void setSubRubro(SubRubroViewDTO subRubro) {
		this.subRubro = subRubro;
	}

	public RubroViewDTO getRubro() {
		return rubro;
	}

	public void setRubro(RubroViewDTO rubro) {
		this.rubro = rubro;
	}

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public String getMarca() {
		return marca;
	}

	public void setMarca(String marca) {
		this.marca = marca;
	}

	public String getCodigoBarras() {
		return codigoBarras;
	}

	public void setCodigoBarras(String codigoBarras) {
		this.codigoBarras = codigoBarras;
	}

	public float getPrecio() {
		return precio;
	}

	public void setPrecio(float precio) {
		this.precio = precio;
	}

	public String toString(){
		return nombre + " " + codigoBarras;
	}
	
	public ProductoView toView() {
		return new ProductoView(identificador, subRubro.toView(), rubro.toView(), nombre, marca, codigoBarras, precio);
	}
}
