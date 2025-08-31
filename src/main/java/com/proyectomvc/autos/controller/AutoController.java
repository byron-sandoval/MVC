package com.proyectomvc.autos.controller;

import com.proyectomvc.autos.model.Auto;
import com.proyectomvc.autos.repository.AutoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/autos")
@CrossOrigin(origins = "http://localhost:3000") 
public class AutoController {
    @Autowired
    private AutoRepository autoRepository;

    @GetMapping
    public ResponseEntity<List<Auto>> listarAutos() {
        List<Auto> autos = autoRepository.findAll();
        return ResponseEntity.ok(autos);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Auto> obtenerAuto(@PathVariable Long id) {
        Auto auto = autoRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("ID de auto inválido:" + id));
        return ResponseEntity.ok(auto);
    }

    @PostMapping
    public ResponseEntity<Auto> guardarAuto(@RequestBody Auto auto) {
        Auto autoGuardado = autoRepository.save(auto);
        return ResponseEntity.status(HttpStatus.CREATED).body(autoGuardado);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Auto> actualizarAuto(@PathVariable Long id, @RequestBody Auto auto) {
        if (!autoRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        auto.setId(id);
        Auto autoActualizado = autoRepository.save(auto);
        return ResponseEntity.ok(autoActualizado);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarAuto(@PathVariable Long id) {
        autoRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}