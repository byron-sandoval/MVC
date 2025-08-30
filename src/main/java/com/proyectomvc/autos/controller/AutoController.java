package com.proyectomvc.autos.controller;

import com.proyectomvc.autos.model.Auto;
import com.proyectomvc.autos.repository.AutoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/autos")

public class AutoController {
    @Autowired
    private AutoRepository autoRepository;

    @GetMapping
    public String listarAutos(Model model) {
        model.addAttribute("autos", autoRepository.findAll());
        return "lista-autos";
    }

    @GetMapping("/nuevo")
    public String formularioNuevoAuto(Model model) {
        model.addAttribute("auto", new Auto());
        return "formulario-auto";
    }

    @PostMapping("/guardar")
    public String guardarAuto(@ModelAttribute Auto auto) {
        autoRepository.save(auto);
        return "redirect:/autos";
    }

    @GetMapping("/editar/{id}")
    public String formularioEditarAuto(@PathVariable Long id, Model model) {
        Auto auto = autoRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("ID de auto inválido:" + id));
        model.addAttribute("auto", auto);
        return "formulario-auto";
    }

    @GetMapping("/eliminar/{id}")
    public String eliminarAuto(@PathVariable Long id) {
        autoRepository.deleteById(id);
        return "redirect:/autos";
    }

}
