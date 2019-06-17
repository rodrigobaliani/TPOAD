package com.rodro.tpo.dto;

import view.SubRubroView;

public class SubRubroViewDTO {
	
	private int codigo;
	private String descripcion;
	private RubroViewDTO rubro;
	
	public SubRubroViewDTO() {
	}

	public int getCodigo() {
		return codigo;
	}

	public void setCodigo(int codigo) {
		this.codigo = codigo;
	}

	public String getDescripcion() {
		return descripcion;
	}

	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
	}

	public RubroViewDTO getRubro() {
		return rubro;
	}

	public void setRubro(RubroViewDTO rubro) {
		this.rubro = rubro;
	}

	public String toString(){
		return codigo + " - " + descripcion;
	}
	
	public SubRubroView toView() {
		return new SubRubroView(codigo, descripcion, rubro.toView());
	}
}
