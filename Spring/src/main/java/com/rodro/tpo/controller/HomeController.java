package com.rodro.tpo.controller;

import java.text.DateFormat;
import java.util.Date;
import java.util.List;
import java.util.Locale;

import org.hibernate.exception.JDBCConnectionException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import com.rodro.tpo.dto.exception.ExceptionDTO;
import com.rodro.tpo.json.JsonMapper;

import controlador.Controlador;
import exceptions.CambioPasswordException;
import exceptions.LoginException;
import exceptions.UsuarioException;
import view.ClienteView;
import view.RubroView;
import view.SubRubroView;

/**
 * Handles requests for the application home page.
 */
@Controller
public class HomeController {

	private static final Logger LOGGER = LoggerFactory.getLogger(HomeController.class);

	/**
	 * Simply selects the home view to render by returning its name.
	 */

	@RequestMapping(value = "/", method = RequestMethod.GET)
	public String home(Locale locale, Model model) {
		LOGGER.info("Welcome home! The client locale is {}.", locale);

		Date date = new Date();
		DateFormat dateFormat = DateFormat.getDateTimeInstance(DateFormat.LONG, DateFormat.LONG, locale);

		String formattedDate = dateFormat.format(date);

		model.addAttribute("serverTime", formattedDate);

		return "home";
	}

	@ResponseBody
	@RequestMapping(value = "/login", method = RequestMethod.GET)
	public ResponseEntity<String> login(@RequestParam(value = "user", required = true) String user,
			@RequestParam(value = "password", required = true) String password)
			throws LoginException, CambioPasswordException, UsuarioException {
		boolean result = Controlador.getInstancia().login(user, password);
		JsonMapper mapper = new JsonMapper();
		return new ResponseEntity<String>(mapper.toJson(result), HttpStatus.OK);
	}

	@ResponseBody
	@RequestMapping(value = "/cambio-password", method = RequestMethod.GET)
	public ResponseEntity<?> cambioPassword(@RequestParam(value = "nombre", required = true) String nombre,
			@RequestParam(value = "password", required = true) String password)
			throws CambioPasswordException, UsuarioException {
		Controlador.getInstancia().cambioPassword(nombre, password);
		return new ResponseEntity<>(HttpStatus.OK);
	}

	@RequestMapping(value = "/rubros", method = RequestMethod.GET)
	public @ResponseBody String getRubros() {
		List<RubroView> rubros = Controlador.getInstancia().getRubros();
		JsonMapper mapper = new JsonMapper();
		return mapper.toJson(rubros);
	}

	@RequestMapping(value = "/sub-rubros", method = RequestMethod.GET)
	public @ResponseBody String getSubRubros() {
		List<SubRubroView> subRubros = Controlador.getInstancia().getSubRubros();
		JsonMapper mapper = new JsonMapper();
		return mapper.toJson(subRubros);
	}

	@ResponseBody
	@RequestMapping(value = "/clientes", method = RequestMethod.GET)
	public ResponseEntity<String> getClientes() {
		List<ClienteView> clientes = Controlador.getInstancia().getClientes();
		JsonMapper mapper = new JsonMapper();
		return new ResponseEntity<>(mapper.toJson(clientes), HttpStatus.OK);
	}

	@ResponseStatus(value = HttpStatus.NOT_FOUND)
	@ExceptionHandler(UsuarioException.class)
	public ResponseEntity<String> handleBadRequestExceptions(Exception ex) {
		LOGGER.error(ex.getMessage(), ex.getCause());
		ExceptionDTO exceptionDTO = new ExceptionDTO(ex.getMessage(), HttpStatus.NOT_FOUND);
		JsonMapper mapper = new JsonMapper();
		return new ResponseEntity<>(mapper.toJson(exceptionDTO), HttpStatus.NOT_FOUND);
	}

	@ResponseStatus(value = HttpStatus.UNAUTHORIZED)
	@ExceptionHandler({ LoginException.class, CambioPasswordException.class })
	public ResponseEntity<String> handleUnauthorizedExceptions(Exception ex) {
		LOGGER.error(ex.getMessage(), ex.getCause());
		ExceptionDTO exceptionDTO = new ExceptionDTO(ex.getMessage(), HttpStatus.UNAUTHORIZED);
		JsonMapper mapper = new JsonMapper();
		return new ResponseEntity<>(mapper.toJson(exceptionDTO), HttpStatus.UNAUTHORIZED);
	}

	@ResponseStatus(value = HttpStatus.INTERNAL_SERVER_ERROR)
	@ExceptionHandler(JDBCConnectionException.class)
	public ResponseEntity<String> handleInternalServerErrorException(Exception ex) {
		LOGGER.error(ex.getMessage(), ex.getCause());
		ExceptionDTO exceptionDTO = new ExceptionDTO(ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
		JsonMapper mapper = new JsonMapper();
		return new ResponseEntity<>(mapper.toJson(exceptionDTO), HttpStatus.INTERNAL_SERVER_ERROR);
	}
}
