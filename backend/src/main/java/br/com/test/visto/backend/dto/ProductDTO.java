package br.com.test.visto.backend.dto;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.PositiveOrZero;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.io.Serial;
import java.io.Serializable;
import java.math.BigDecimal;

@Data
public class ProductDTO {
    private Long id;
    @NotBlank(message = "O nome do produto é obrigatório e não pode estar em branco.")
    private String name;

    @PositiveOrZero(message = "O preço deve ser igual ou maior que zero.")
    private BigDecimal price;

    @Size( max = 1000, message = "O nome do produto deve ter no maximo 1000 caracteres.")
    @NotBlank(message = "A descrição do produto é obrigatório e não pode estar em branco.")
    private String description;
    private String imageUrl;
}
