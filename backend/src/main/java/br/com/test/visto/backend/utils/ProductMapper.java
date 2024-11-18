package br.com.test.visto.backend.utils;

import br.com.test.visto.backend.dto.ProductDTO;
import br.com.test.visto.backend.entity.Product;

public class ProductMapper {

    public static Product ConverterToEntity(ProductDTO dto) {
        Product product = new Product();
        product.setId(dto.getId());
        product.setName(dto.getName());
        product.setPrice(dto.getPrice());
        product.setDescription(dto.getDescription());
        product.setImageUrl(dto.getImageUrl());
        return product;
    }

    public static ProductDTO ConverterToDTO(Product product) {
        ProductDTO dto = new ProductDTO();
        dto.setId(product.getId());
        dto.setName(product.getName());
        dto.setPrice(product.getPrice());
        dto.setDescription(product.getDescription());
        dto.setImageUrl(product.getImageUrl());
        return dto;
    }

}
