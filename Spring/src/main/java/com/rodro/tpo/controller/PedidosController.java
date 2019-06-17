package com.rodro.tpo.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.rodro.tpo.dto.PedidoViewDTO;
import com.rodro.tpo.dto.exception.ExceptionDTO;
import com.rodro.tpo.json.JsonMapper;

import controlador.Controlador;
import exceptions.ClienteException;
import exceptions.PedidoException;
import exceptions.ProductoException;
import view.PedidoView;

@Controller
@RequestMapping(value = "/pedidos")
public class PedidosController {

	private static final Logger LOGGER = LoggerFactory.getLogger(PedidosController.class);

	@ResponseBody
	@RequestMapping(value = "/crear", method = RequestMethod.POST)
	public ResponseEntity<String> crearPedido(@RequestBody PedidoViewDTO pedido) throws ClienteException {
		LOGGER.info("Creando nuevo pedido: {}", pedido.toString());
		ResponseEntity<String> response = null;
		JsonMapper mapper = new JsonMapper();
		try {
			int numeroNuevoPedido = Controlador.getInstancia().crearPedido(pedido.toView());
			response = new ResponseEntity<>(mapper.toJson(numeroNuevoPedido), HttpStatus.CREATED);
		} catch (ClienteException ex) {
			LOGGER.error(ex.getMessage(), ex.getCause());
			ExceptionDTO exceptionDTO = new ExceptionDTO(ex.getMessage(), HttpStatus.NOT_FOUND);
			response = new ResponseEntity<>(mapper.toJson(exceptionDTO), HttpStatus.NOT_FOUND);
		}
		return response;
	}

	@ResponseBody
	@RequestMapping(value = "/crear-con-cuit", method = RequestMethod.GET)
	public ResponseEntity<String> crearPedidoCuit(@RequestParam(value = "cuit", required = true) String cuit) {
		LOGGER.info("Creando nuevo pedido con cuit: {}", cuit);
		ResponseEntity<String> response = null;
		JsonMapper mapper = new JsonMapper();
		try {
			int numeroNuevoPedido = Controlador.getInstancia().crearPedido(cuit);
			response = new ResponseEntity<>(mapper.toJson(numeroNuevoPedido), HttpStatus.CREATED);
		} catch (ClienteException ex) {
			LOGGER.error(ex.getMessage(), ex.getCause());
			ExceptionDTO exceptionDTO = new ExceptionDTO(ex.getMessage(), HttpStatus.NOT_FOUND);
			response = new ResponseEntity<>(mapper.toJson(exceptionDTO), HttpStatus.NOT_FOUND);
		}
		return response;
	}

	@ResponseBody
	@RequestMapping(value = "/agregar-producto-en-pedido", method = RequestMethod.GET)
	public ResponseEntity<String> agregarProductoEnPedido(
			@RequestParam(value = "codigoPedido", required = true) int codigoPedido,
			@RequestParam(value = "codigoProducto", required = true) int codigoProducto,
			@RequestParam(value = "cantidad", required = true) int cantidad) {

		LOGGER.info("Agregando producto en pedido {}", codigoPedido);
		ResponseEntity<String> response = null;
		try {
			Controlador.getInstancia().agregarProductoEnPedido(codigoPedido, codigoProducto, cantidad);
			response = new ResponseEntity<>(HttpStatus.OK);
		} catch (PedidoException | ProductoException ex) {
			LOGGER.error(ex.getMessage(), ex.getCause());
			ExceptionDTO exceptionDTO = new ExceptionDTO(ex.getMessage(), HttpStatus.NOT_FOUND);
			JsonMapper mapper = new JsonMapper();
			response = new ResponseEntity<>(mapper.toJson(exceptionDTO), HttpStatus.NOT_FOUND);
		}
		return response;
	}

	@ResponseBody
	@RequestMapping(value = "/{numeroPedido}", method = RequestMethod.DELETE)
	public ResponseEntity<?> eliminarPedido(@PathVariable int numeroPedido) {
		LOGGER.info("Eliminando pedido numero {}", numeroPedido);
		Controlador.getInstancia().eliminarPedido(numeroPedido);
		return new ResponseEntity<>(HttpStatus.OK);
	}

	@ResponseBody
	@RequestMapping(value = "/facturar", method = RequestMethod.GET)
	public ResponseEntity<String> facturarPedido(@RequestParam(value = "numero", required = true) int numero) {
		LOGGER.info("Facturando pedido {}", numero);
		ResponseEntity<String> response = null;
		try {
			Controlador.getInstancia().facturarPedido(numero);
			response = new ResponseEntity<>(HttpStatus.OK);
		} catch (PedidoException ex) {
			LOGGER.error(ex.getMessage(), ex.getCause());
			ExceptionDTO exceptionDTO = new ExceptionDTO(ex.getMessage(), HttpStatus.NOT_FOUND);
			JsonMapper mapper = new JsonMapper();
			response = new ResponseEntity<>(mapper.toJson(exceptionDTO), HttpStatus.NOT_FOUND);
		}
		return response;
	}

	@ResponseBody
	@RequestMapping(value = "/byId", method = RequestMethod.GET)
	public ResponseEntity<String> getPedidosById(@RequestParam(value = "numero", required = false) int numero) {
		ResponseEntity<String> response = null;
		JsonMapper mapper = new JsonMapper();
		try {
			PedidoView pedidoView = Controlador.getInstancia().getPedidoById(numero);
			response = new ResponseEntity<>(mapper.toJson(pedidoView), HttpStatus.OK);
		} catch (PedidoException ex) {
			LOGGER.error(ex.getMessage(), ex.getCause());
			ExceptionDTO exceptionDTO = new ExceptionDTO(ex.getMessage(), HttpStatus.NOT_FOUND);
			response = new ResponseEntity<>(mapper.toJson(exceptionDTO), HttpStatus.NOT_FOUND);
		}
		return response;
	}

	// Agregado por grupo
	@ResponseBody
	@RequestMapping(method = RequestMethod.GET)
	public ResponseEntity<String> getPedidos() {
		JsonMapper mapper = new JsonMapper();
		List<PedidoView> pedidosView = Controlador.getInstancia().getPedidos();
		return new ResponseEntity<>(mapper.toJson(pedidosView), HttpStatus.OK);
	}
	
	// Agregado por grupo
	@ResponseBody
	@RequestMapping(value = "pedidos-by-cliente", method = RequestMethod.GET)
	public ResponseEntity<String> getPedidosByCliente(@RequestParam(value = "cuit", required = true) String cuit) {
		ResponseEntity<String> response = null;
		JsonMapper mapper = new JsonMapper();
		try {
			List<PedidoView> pedidosView = Controlador.getInstancia().getPedidosByCliente(cuit);
			response = new ResponseEntity<>(mapper.toJson(pedidosView), HttpStatus.OK);
		} catch (ClienteException ex) {
			LOGGER.error(ex.getMessage(), ex.getCause());
			ExceptionDTO exceptionDTO = new ExceptionDTO(ex.getMessage(), HttpStatus.NOT_FOUND);
			response = new ResponseEntity<>(mapper.toJson(exceptionDTO), HttpStatus.NOT_FOUND);
		}
		return response;
	}

}
