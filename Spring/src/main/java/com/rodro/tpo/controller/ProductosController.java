package com.rodro.tpo.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.rodro.tpo.dto.ProductoViewDTO;
import com.rodro.tpo.dto.exception.ExceptionDTO;
import com.rodro.tpo.json.JsonMapper;

import controlador.Controlador;
import exceptions.ProductoException;
import exceptions.RubroException;
import exceptions.SubRubroException;
import view.ProductoView;
import view.RubroView;
import view.SubRubroView;

@Controller
@RequestMapping(value = "/productos")
public class ProductosController {

	private static final Logger LOGGER = LoggerFactory.getLogger(ProductosController.class);

	@ResponseBody
	@RequestMapping(method = RequestMethod.GET)
	public ResponseEntity<String> getProductos() {
		List<ProductoView> productos = Controlador.getInstancia().getProductos();
		JsonMapper mapper = new JsonMapper();
		return new ResponseEntity<>(mapper.toJson(productos), HttpStatus.OK);
	}

	@ResponseBody
	@RequestMapping(value = "/rubro", method = RequestMethod.GET)
	public ResponseEntity<String> getProductosByRubro(@RequestParam int codigoRubro) {
		RubroView rubroView = new RubroView(codigoRubro, null, false);
		List<ProductoView> productos = Controlador.getInstancia().getProductosByRubro(rubroView);
		JsonMapper mapper = new JsonMapper();
		return new ResponseEntity<>(mapper.toJson(productos), HttpStatus.OK);
	}

	@ResponseBody
	@RequestMapping(value = "/subrubro", method = RequestMethod.GET)
	public ResponseEntity<String> getProductosBySubRubro(@RequestParam int codigoSubRubro) {
		SubRubroView subRubroView = new SubRubroView(codigoSubRubro, null, null);
		List<ProductoView> productos = Controlador.getInstancia().getProductosBySubRubro(subRubroView);
		JsonMapper mapper = new JsonMapper();
		return new ResponseEntity<>(mapper.toJson(productos), HttpStatus.OK);
	}

	@ResponseBody
	@RequestMapping(value = "/alta", method = RequestMethod.POST)
	public ResponseEntity<String> altaProducto(@RequestBody ProductoViewDTO producto) {
		LOGGER.info("Dando de alta producto: {}", producto.toString());
		ResponseEntity<String> response = null;
		try {
			Controlador.getInstancia().altaProducto(producto.toView());
			response = new ResponseEntity<>(HttpStatus.CREATED);
		} catch (RubroException | SubRubroException ex) {
			LOGGER.error(ex.getMessage(), ex.getCause());
			ExceptionDTO exceptionDTO = new ExceptionDTO(ex.getMessage(), HttpStatus.NOT_FOUND);
			JsonMapper mapper = new JsonMapper();
			response = new ResponseEntity<>(mapper.toJson(exceptionDTO), HttpStatus.NOT_FOUND);
		}
		return response;
	}
	

	@ResponseBody 
	@RequestMapping(method = RequestMethod.DELETE)
	public ResponseEntity<String> bajaProducto(@RequestBody ProductoViewDTO producto) {
		LOGGER.info("Dando de baja producto: {}", producto.toString());
		ResponseEntity<String> response = null;
		try {
			Controlador.getInstancia().bajaProducto(producto.toView());
			response = new ResponseEntity<>(HttpStatus.OK);
		} catch (ProductoException ex) {
			LOGGER.error(ex.getMessage(), ex.getCause());
			ExceptionDTO exceptionDTO = new ExceptionDTO(ex.getMessage(), HttpStatus.NOT_FOUND);
			JsonMapper mapper = new JsonMapper();
			response = new ResponseEntity<>(mapper.toJson(exceptionDTO), HttpStatus.NOT_FOUND);
		}
		return response;
	}

	@ResponseBody
	@RequestMapping(value = "/modificar", method = RequestMethod.PUT)
	public ResponseEntity<String> modificarProducto(@RequestBody ProductoViewDTO producto) {		
		LOGGER.info("Modificando producto: {}", producto.toString());
		ResponseEntity<String> response = null;
		try {
			Controlador.getInstancia().modificaProducto(producto.toView());
			response = new ResponseEntity<>(HttpStatus.OK);
		} catch (ProductoException ex) {
			LOGGER.error(ex.getMessage(), ex.getCause());
			ExceptionDTO exceptionDTO = new ExceptionDTO(ex.getMessage(), HttpStatus.NOT_FOUND);
			JsonMapper mapper = new JsonMapper();
			response = new ResponseEntity<>(mapper.toJson(exceptionDTO), HttpStatus.NOT_FOUND);
		}
		return response;
	}
	
	// Agregado por grupo
	@ResponseBody
	@RequestMapping(value = "/byId", method = RequestMethod.GET)
	public ResponseEntity<String> getProductosById(@RequestParam(value = "identificador", required = false) int numero) {
		ResponseEntity<String> response = null;
		JsonMapper mapper = new JsonMapper();
		try {
			ProductoView productoView = Controlador.getInstancia().getProductoById(numero);
			response = new ResponseEntity<>(mapper.toJson(productoView), HttpStatus.OK);
		} catch (ProductoException ex) {
			LOGGER.error(ex.getMessage(), ex.getCause());
			ExceptionDTO exceptionDTO = new ExceptionDTO(ex.getMessage(), HttpStatus.NOT_FOUND);
			response = new ResponseEntity<>(mapper.toJson(exceptionDTO), HttpStatus.NOT_FOUND);
		}
		return response;
	}
}
