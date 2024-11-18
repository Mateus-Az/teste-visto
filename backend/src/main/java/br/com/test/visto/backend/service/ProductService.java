package br.com.test.visto.backend.service;

import br.com.test.visto.backend.dto.ProductDTO;
import br.com.test.visto.backend.entity.Product;
import br.com.test.visto.backend.exceptions.ProductNotFound;
import br.com.test.visto.backend.repository.ProductRepository;
import br.com.test.visto.backend.utils.ProductMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.io.Serializable;

@Service
public class ProductService {



    @Autowired
    private ProductRepository repository;


    public Page<ProductDTO> findAllProducts(String name, Pageable pageable) {
        if (name != null && !name.trim().isEmpty()) {
            return repository.findByNameContainingIgnoreCase(name, pageable).map(ProductMapper::ConverterToDTO);
        }
        Page<Product> products = repository.findAll(pageable);
        return products.map(ProductMapper::ConverterToDTO);
    }

    public ProductDTO findProductById(Long id) {
        return ProductMapper.ConverterToDTO(repository.findById(id).orElseThrow(ProductNotFound::new));
    }

    public ProductDTO createProduct(ProductDTO productDTO) {
        return ProductMapper.ConverterToDTO( repository.save(ProductMapper.ConverterToEntity(productDTO)));
    }

    public ProductDTO updateProduct(Long idProduct, ProductDTO productDTO) {
        var product = repository.findById(idProduct).orElseThrow(ProductNotFound::new);
        updateProductFields(product, productDTO);
        return ProductMapper.ConverterToDTO(product);
    }

    public void deleteProduct(Long idProduct) {
     if(repository.existsById(idProduct)) repository.deleteById(idProduct);
    }

    private void updateProductFields(Product product, ProductDTO productDTO) {
        if (productDTO.getName() != null) product.setName(productDTO.getName());
        if (productDTO.getPrice() != null) product.setPrice(productDTO.getPrice());
        if (productDTO.getDescription() != null) product.setDescription(productDTO.getDescription());
        if (productDTO.getImageUrl() != null) product.setImageUrl(productDTO.getImageUrl());
    }
}
