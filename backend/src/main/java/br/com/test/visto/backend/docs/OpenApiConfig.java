package br.com.test.visto.backend.docs;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI myOpenAPI() {

        SecurityScheme securityScheme = new SecurityScheme();
        securityScheme.type(SecurityScheme.Type.HTTP).scheme("basic");

        Components components = new Components();
        components.addSecuritySchemes("basicScheme", securityScheme);

        Contact contact = new Contact();
        contact.setEmail("trentor.com.br");
        contact.setName("Mateus Azevedo");
        contact.setUrl("https://www.trentor.com.br/");

        License mitLicense = new License().name("MIT License").url("https://choosealicense.com/licenses/mit/");

        Info info = new Info()
                .title("Visto Teste - DEV Mateus")
                .version("1.0")
                .contact(contact)
                .description("Essa API contém todos os endpoints do teste, versão basica")
                .termsOfService("https://www.trentor.com.br/")
                .license(mitLicense);

        return new OpenAPI().info(info).components(components);
    }
}
