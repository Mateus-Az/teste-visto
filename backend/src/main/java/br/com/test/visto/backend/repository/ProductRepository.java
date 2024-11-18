package br.com.test.visto.backend.repository;

import br.com.test.visto.backend.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {
}
