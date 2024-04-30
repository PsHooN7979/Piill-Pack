package com.podo.server.global.configs;

import java.io.IOException;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.resource.PathResourceResolver;
import org.springframework.core.io.Resource;

/**
 * June. client routing handling
 */
@Configuration
public class MvcConfig implements WebMvcConfigurer {

  // @Override

  // public void addResourceHandlers(ResourceHandlerRegistry registry) {
  // registry.addResourceHandler("/web/**")
  // .addResourceLocations("classpath:/static/web/dist/");
  // }

  @Override
  public void addResourceHandlers(ResourceHandlerRegistry registry) {
    registry.addResourceHandler("/web/**")
        .addResourceLocations("classpath:/static/web/dist/")
        .resourceChain(true)
        .addResolver(new PathResourceResolver() {
          @Override
          protected Resource getResource(String resourcePath, Resource location) throws IOException {
            if (resourcePath.endsWith("/web") || resourcePath.endsWith("/web/")) {
              return location.createRelative("index.html");
            }
            return location.createRelative(resourcePath).exists() && location.createRelative(resourcePath).isReadable()
                ? location.createRelative(resourcePath)
                : null;
          }

        });
  }
}

// import org.springframework.context.annotation.Configuration;
// import org.springframework.core.io.ClassPathResource;
// import
// org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
// import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
// import org.springframework.web.servlet.resource.PathResourceResolver;

// @Configuration
// public class MvcConfig implements WebMvcConfigurer {
// @Override
// public void addResourceHandlers(ResourceHandlerRegistry registry) {
// registry.addResourceHandler("/web/**")
// .addResourceLocations("classpath:/static/web/dist")
// .resourceChain(true)
// .addResolver(new PathResourceResolver() {
// @Override
// protected Resource getResource(String resourcePath,
// Resource location) throws IOException {
// Resource requestedResource = location.createRelative(resourcePath);
// return requestedResource.exists() && requestedResource.isReadable() ?
// requestedResource
// : new ClassPathResource("/static/web/dist/index.html");
// }
// });
// }
// }
