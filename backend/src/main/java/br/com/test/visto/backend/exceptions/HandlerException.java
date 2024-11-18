package br.com.test.visto.backend.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import java.time.LocalDateTime;
import java.util.List;

@ControllerAdvice
public class HandlerException {

    @ResponseBody
    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ExceptionHandler(ProductNotFound.class)
    public ErrorDTO handlerProducNotFound(ProductNotFound productNotFound){
        ErrorDTO errorDTO = new ErrorDTO();
        errorDTO.setMessage("Product not found. 404");
        errorDTO.setStatus(HttpStatus.NOT_FOUND.value());
        errorDTO.setTimestamp(LocalDateTime.now());
        return errorDTO;
    }

    @ResponseBody
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ErrorDTO processValidationError(MethodArgumentNotValidException ex){
        ErrorDTO errorDTO = new ErrorDTO();
        errorDTO.setStatus(HttpStatus.BAD_REQUEST.value());
        BindingResult result = ex.getBindingResult();
        List<FieldError> fieldErrors = result.getFieldErrors();
        StringBuilder sb = new StringBuilder("Valor inválido para o(s) campo(s):");
        for (FieldError fieldError: fieldErrors){
            sb.append(" ");
            sb.append(fieldError.getField()).append(" - ").append(fieldError.getDefaultMessage());
        }
        errorDTO.setMessage(sb.toString());
        errorDTO.setTimestamp(LocalDateTime.now());
        return errorDTO;
    }

    @ResponseBody
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    @ExceptionHandler(Exception.class)
    public ErrorDTO handleGeneralException(Exception ex) {
        ErrorDTO errorDTO = new ErrorDTO();
        errorDTO.setMessage("Erro interno do servidor");
        errorDTO.setStatus(HttpStatus.INTERNAL_SERVER_ERROR.value());
        errorDTO.setTimestamp(LocalDateTime.now());
        return errorDTO;
    }

}
